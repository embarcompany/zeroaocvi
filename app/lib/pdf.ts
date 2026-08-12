import { jsPDF } from "jspdf";

export type PdfStage = { date: string; status: string };
export type PdfSummary = { destination: string; source: string; cvi: string; importPermit: string; arrivalNotice: string; notes: string };
export type PdfTravel = { tutor?: string; pet?: string; destination?: string; date?: string; modality?: string; airline?: string };
export type PdfProfile = { name: string; checks: boolean[]; timeline: Record<string, PdfStage>; summary: PdfSummary; travel?: PdfTravel };

type Rgb = [number, number, number];

const color = {
  teal: [5, 67, 74] as Rgb,
  turquoise: [0, 209, 226] as Rgb,
  pale: [244, 250, 248] as Rgb,
  lime: [198, 215, 131] as Rgb,
  line: [216, 232, 229] as Rgb,
  muted: [94, 127, 130] as Rgb,
  white: [255, 255, 255] as Rgb,
};
const pageWidth = 210;
const pageHeight = 297;
const margin = 18;
const contentWidth = pageWidth - margin * 2;

function safeFilePart(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/(^-|-$)/g, "").toLowerCase() || "processo";
}

function today() {
  return new Intl.DateTimeFormat("pt-BR").format(new Date());
}

function setText(doc: jsPDF, rgb: Rgb, size: number, style: "normal" | "bold" = "normal") {
  doc.setTextColor(...rgb);
  doc.setFont("helvetica", style);
  doc.setFontSize(size);
}

function drawHeader(doc: jsPDF, toolLabel: string, title: string, profile: PdfProfile, continuation = false) {
  doc.setFillColor(...color.teal);
  doc.rect(0, 0, pageWidth, 45, "F");
  doc.setFillColor(...color.turquoise);
  doc.circle(198, 7, 22, "F");
  doc.setFillColor(...color.lime);
  doc.roundedRect(margin, 10, 42, 7, 3.5, 3.5, "F");
  setText(doc, color.teal, 6.8, "bold");
  doc.text("FERRAMENTA PRATICA", margin + 21, 14.6, { align: "center" });
  setText(doc, color.white, 17, "bold");
  doc.text(title, margin, 28);
  setText(doc, color.white, 7.5, "normal");
  doc.text(continuation ? "continuação" : toolLabel, margin, 36);

  doc.setFillColor(...color.pale);
  doc.roundedRect(margin, 52, contentWidth, 17, 4, 4, "F");
  setText(doc, color.muted, 7, "bold");
  doc.text("PROCESSO", margin + 7, 58.5);
  setText(doc, color.teal, 10.5, "bold");
  doc.text(profile.name || "Processo sem nome", margin + 7, 64.5);
  return 82;
}

function footer(doc: jsPDF, page: number, total: number) {
  doc.setDrawColor(...color.line);
  doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);
  setText(doc, color.muted, 6.7);
  doc.text(`Gerado em ${today()} - Consulte sempre fontes oficiais vigentes.`, margin, pageHeight - 9);
  doc.text(`Embarpet  |  ${page}/${total}`, pageWidth - margin, pageHeight - 9, { align: "right" });
}

function addPage(doc: jsPDF, toolLabel: string, title: string, profile: PdfProfile) {
  doc.addPage();
  return drawHeader(doc, toolLabel, title, profile, true);
}

function finish(doc: jsPDF, kind: string, profile: PdfProfile) {
  const total = doc.getNumberOfPages();
  for (let page = 1; page <= total; page += 1) {
    doc.setPage(page);
    footer(doc, page, total);
  }
  doc.save(`embarpet-${kind}-${safeFilePart(profile.name)}.pdf`);
}

function sectionTitle(doc: jsPDF, label: string, y: number) {
  setText(doc, color.turquoise, 8, "bold");
  doc.text(label.toUpperCase(), margin, y);
  doc.setDrawColor(...color.line);
  doc.line(margin, y + 4, pageWidth - margin, y + 4);
  return y + 13;
}

function softCard(doc: jsPDF, x: number, y: number, width: number, height: number) {
  doc.setFillColor(...color.pale);
  doc.roundedRect(x, y, width, height, 4, 4, "F");
}

function paragraph(doc: jsPDF, text: string, y: number, width = contentWidth, x = margin) {
  setText(doc, color.teal, 9.5);
  const lines = doc.splitTextToSize(text || "Não informado", width);
  doc.text(lines, x, y);
  return y + lines.length * 4.8;
}

function statusColor(status: string): Rgb {
  if (status === "Concluído") return color.turquoise;
  if (status === "Em andamento") return color.lime;
  return color.pale;
}

function travelFields(doc: jsPDF, profile: PdfProfile, y: number) {
  y = sectionTitle(doc, "Dados da viagem", y);
  const travel = profile.travel || {};
  const fields: Array<[string, string]> = [
    ["Tutor", travel.tutor || ""], ["Pet", travel.pet || ""],
    ["Destino", travel.destination || ""], ["Data", travel.date || ""],
    ["Modalidade", travel.modality || ""], ["Companhia aérea", travel.airline || ""],
  ];
  fields.forEach(([label, value], index) => {
    const x = margin + (index % 2) * 88;
    const yy = y + Math.floor(index / 2) * 17;
    setText(doc, color.muted, 6.8, "bold"); doc.text(label.toUpperCase(), x, yy);
    doc.setDrawColor(...color.line); doc.line(x, yy + 9, x + 78, yy + 9);
    if (value) { setText(doc, color.teal, 8.8); doc.text(value, x, yy + 6.5); }
  });
  return y + 57;
}

export function downloadChecklistPdf(profile: PdfProfile, items: string[], attention: string[] = []) {
  const toolLabel = "Checklist de embarque";
  const title = "Checklist Passageiro Pet";
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = drawHeader(doc, toolLabel, title, profile);
  y = travelFields(doc, profile, y);
  y = sectionTitle(doc, "Conferência antes do embarque", y);

  items.forEach((item, index) => {
    if (y > 262) {
      y = addPage(doc, toolLabel, title, profile);
      y = sectionTitle(doc, "Conferência antes do embarque", y);
    }
    const done = Boolean(profile.checks[index]);
    softCard(doc, margin, y - 7, contentWidth, 12);
    doc.setFillColor(...(done ? color.turquoise : color.white));
    doc.setDrawColor(...(done ? color.turquoise : color.line));
    doc.roundedRect(margin + 5, y - 3, 6, 6, 1.5, 1.5, done ? "F" : "FD");
    if (done) {
      setText(doc, color.teal, 7, "bold");
      doc.text("✓", margin + 8, y + 1.5, { align: "center" });
    }
    setText(doc, color.teal, 9.5, done ? "bold" : "normal");
    const lines = doc.splitTextToSize(item, contentWidth - 24);
    doc.text(lines, margin + 17, y + 1.5);
    y += Math.max(12, lines.length * 4.6 + 6);
  });

  if (attention.length) {
    y = addPage(doc, toolLabel, title, profile);
    y = sectionTitle(doc, "Pontos de atenção", y);
    attention.forEach((point, index) => {
      softCard(doc, margin, y - 6, contentWidth, 18);
      setText(doc, color.turquoise, 8, "bold"); doc.text(String(index + 1).padStart(2, "0"), margin + 7, y + 2);
      setText(doc, color.teal, 9); doc.text(doc.splitTextToSize(point, contentWidth - 28), margin + 19, y + 2);
      y += 23;
    });
  }
  if (y > 246) y = addPage(doc, toolLabel, title, profile);
  softCard(doc, margin, y + 4, contentWidth, 24);
  setText(doc, color.turquoise, 7.5, "bold");
  doc.text("LEMBRETE OPERACIONAL", margin + 8, y + 12);
  paragraph(doc, "A conferência final deve considerar rota, companhia aérea e exigências vigentes do destino.", y + 19, contentWidth - 16, margin + 8);
  finish(doc, "checklist", profile);
}

export function downloadTimelinePdf(profile: PdfProfile, stages: string[]) {
  const toolLabel = "Planejamento sanitário";
  const title = "Cronograma Sanitário";
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = drawHeader(doc, toolLabel, title, profile);
  y = travelFields(doc, profile, y);
  y = sectionTitle(doc, "Etapas do processo", y);

  stages.forEach((stage, index) => {
    if (y > 258) {
      y = addPage(doc, toolLabel, title, profile);
      y = sectionTitle(doc, "Etapas do processo", y);
    }
    const data = profile.timeline[stage] || { date: "", status: "Pendente" };
    softCard(doc, margin, y - 7, contentWidth, 15);
    doc.setFillColor(...color.teal);
    doc.circle(margin + 8, y, 4.3, "F");
    setText(doc, color.white, 6.4, "bold");
    doc.text(String(index + 1).padStart(2, "0"), margin + 8, y + 2.1, { align: "center" });
    setText(doc, color.teal, 9, "bold");
    const stageLines = doc.splitTextToSize(stage, 82);
    doc.text(stageLines, margin + 17, y + (stageLines.length > 1 ? -1.6 : 1.5));
    setText(doc, color.muted, 7.5);
    const date = data.date ? new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(`${data.date}T00:00:00`)) : "";
    if (date) doc.text(date, 143, y + 1.5, { align: "right" }); else { doc.setDrawColor(...color.line); doc.line(108, y + 3.5, 143, y + 3.5); }
    doc.setFillColor(...statusColor(data.status));
    doc.roundedRect(148, y - 4, 44, 8, 4, 4, "F");
    setText(doc, color.teal, 6.5, "bold");
    doc.text(data.status, 170, y + 1.2, { align: "center" });
    y += 19;
  });
  finish(doc, "cronograma", profile);
}

export function downloadSummaryPdf(profile: PdfProfile) {
  const toolLabel = "Consulta e conferência";
  const title = "Quadro-resumo de CVI";
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = drawHeader(doc, toolLabel, title, profile);
  y = sectionTitle(doc, "Dados registrados", y);
  const fields = [
    ["Destino", profile.summary.destination],
    ["Fonte oficial consultada", profile.summary.source],
    ["Emissão de CVI", profile.summary.cvi],
    ["Import Permit", profile.summary.importPermit],
    ["Notificação de chegada", profile.summary.arrivalNotice],
  ];
  fields.forEach(([label, value]) => {
    softCard(doc, margin, y - 6, contentWidth, 18);
    setText(doc, color.turquoise, 7.2, "bold");
    doc.text(label.toUpperCase(), margin + 7, y);
    setText(doc, color.teal, 10, "bold");
    const lines = value ? doc.splitTextToSize(value, contentWidth - 14) : [];
    if (lines.length) doc.text(lines, margin + 7, y + 7); else { doc.setDrawColor(...color.line); doc.line(margin + 7, y + 9, pageWidth - margin - 7, y + 9); }
    y += Math.max(22, lines.length * 4.8 + 13);
  });
  y = sectionTitle(doc, "Observações", y + 2);
  softCard(doc, margin, y - 6, contentWidth, 48);
  if (profile.summary.notes) paragraph(doc, profile.summary.notes, y + 3, contentWidth - 14, margin + 7);
  else { doc.setDrawColor(...color.line); [y + 8, y + 17, y + 26, y + 35].forEach((lineY) => doc.line(margin + 7, lineY, pageWidth - margin - 7, lineY)); }
  finish(doc, "quadro-cvi", profile);
}

export function downloadProcessPdf(profile: PdfProfile, items: string[], stages: string[]) {
  const toolLabel = "Planejamento completo";
  const title = "Resumo do Processo";
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = drawHeader(doc, toolLabel, title, profile);
  y = sectionTitle(doc, "Visão geral", y);
  const metrics = [
    ["DESTINO", profile.summary.destination || "A confirmar"],
    ["CHECKLIST", `${profile.checks.filter(Boolean).length} de ${items.length} itens concluídos`],
    ["CVI", profile.summary.cvi || "A confirmar"],
  ];
  metrics.forEach(([label, value]) => {
    softCard(doc, margin, y - 6, contentWidth, 17);
    setText(doc, color.turquoise, 7.2, "bold");
    doc.text(label, margin + 7, y);
    setText(doc, color.teal, 10, "bold");
    doc.text(value, margin + 7, y + 7);
    y += 22;
  });
  y = sectionTitle(doc, "Próximas etapas", y + 2);
  stages.forEach((stage, index) => {
    const item = profile.timeline[stage];
    if (item?.status === "Concluído") return;
    if (y > 258) {
      y = addPage(doc, toolLabel, title, profile);
      y = sectionTitle(doc, "Próximas etapas", y);
    }
    softCard(doc, margin, y - 6, contentWidth, 13);
    doc.setFillColor(...color.turquoise);
    doc.circle(margin + 8, y, 3.2, "F");
    setText(doc, color.teal, 6.3, "bold");
    doc.text(String(index + 1), margin + 8, y + 1.9, { align: "center" });
    setText(doc, color.teal, 9.2, "bold");
    doc.text(stage, margin + 16, y + 1.5);
    if (item?.date) {
      setText(doc, color.muted, 7.3);
      doc.text(item.date, pageWidth - margin - 7, y + 1.5, { align: "right" });
    }
    y += 17;
  });
  y = sectionTitle(doc, "Observações", y + 3);
  softCard(doc, margin, y - 6, contentWidth, 40);
  paragraph(doc, profile.summary.notes || "Nenhuma observação registrada.", y + 3, contentWidth - 14, margin + 7);
  finish(doc, "resumo-processo", profile);
}
