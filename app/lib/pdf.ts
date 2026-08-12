import { jsPDF } from "jspdf";

export type PdfStage = { date: string; status: string };
export type PdfSummary = { destination: string; source: string; cvi: string; importPermit: string; arrivalNotice: string; notes: string };
export type PdfProfile = { name: string; checks: boolean[]; timeline: Record<string, PdfStage>; summary: PdfSummary };

type Rgb = [number, number, number];
const teal: Rgb = [5, 67, 74];
const turquoise: Rgb = [0, 209, 226];
const pale: Rgb = [244, 250, 248];
const lime: Rgb = [198, 215, 131];
const pageWidth = 210;
const margin = 18;

function safeFilePart(value: string) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/(^-|-$)/g, "").toLowerCase() || "processo"; }
function today() { return new Intl.DateTimeFormat("pt-BR").format(new Date()); }
function docBase(title: string, profile: PdfProfile) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFillColor(...teal); doc.rect(0, 0, pageWidth, 42, "F");
  doc.setFillColor(...turquoise); doc.circle(188, 10, 24, "F");
  doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(19); doc.text("embarpet", margin, 17);
  doc.setFontSize(8); doc.text("DO ZERO AO CVI - MATERIAL DE APOIO", margin, 25);
  doc.setFontSize(18); doc.text(title, margin, 35);
  doc.setTextColor(...teal); doc.setFontSize(9); doc.setFont("helvetica", "bold"); doc.text("PROCESSO", margin, 54);
  doc.setFontSize(13); doc.text(profile.name, margin, 61);
  doc.setDrawColor(216, 232, 229); doc.line(margin, 67, pageWidth - margin, 67);
  return doc;
}
function footer(doc: jsPDF) {
  const height = doc.internal.pageSize.getHeight();
  doc.setDrawColor(216, 232, 229); doc.line(margin, height - 15, pageWidth - margin, height - 15);
  doc.setTextColor(94, 127, 130); doc.setFont("helvetica", "normal"); doc.setFontSize(7);
  doc.text(`Gerado em ${today()} - Confirme sempre requisitos sanitarios e operacionais nas fontes vigentes.`, margin, height - 9);
  doc.text("Embarpet", pageWidth - margin, height - 9, { align: "right" });
}
function sectionTitle(doc: jsPDF, label: string, y: number) { doc.setTextColor(...turquoise); doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.text(label.toUpperCase(), margin, y); return y + 8; }
function paragraph(doc: jsPDF, text: string, y: number, width = pageWidth - margin * 2) { doc.setTextColor(...teal); doc.setFont("helvetica", "normal"); doc.setFontSize(10); const lines = doc.splitTextToSize(text || "Não informado", width); doc.text(lines, margin, y); return y + lines.length * 5 + 5; }
function save(doc: jsPDF, kind: string, profile: PdfProfile) { footer(doc); doc.save(`embarpet-${kind}-${safeFilePart(profile.name)}.pdf`); }

export function downloadChecklistPdf(profile: PdfProfile, items: string[]) {
  const doc = docBase("Checklist Passageiro Pet", profile); let y = sectionTitle(doc, "Conferencia antes do embarque", 80);
  items.forEach((item, index) => { const done = Boolean(profile.checks[index]); doc.setFillColor(...(done ? turquoise : pale)); doc.roundedRect(margin, y - 4, 5, 5, 1, 1, "F"); if (done) { doc.setTextColor(...teal); doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.text("OK", margin + 2.5, y, { align: "center" }); } doc.setTextColor(...teal); doc.setFont("helvetica", done ? "bold" : "normal"); doc.setFontSize(10); doc.text(item, margin + 10, y); y += 10; });
  doc.setFillColor(...pale); doc.roundedRect(margin, y + 4, pageWidth - margin * 2, 22, 4, 4, "F"); doc.setTextColor(...teal); doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.text("LEMBRETE", margin + 8, y + 12); doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.text("A conferencia final deve considerar a rota, a companhia e as exigencias vigentes do destino.", margin + 8, y + 19);
  save(doc, "checklist", profile);
}

export function downloadTimelinePdf(profile: PdfProfile, stages: string[]) {
  const doc = docBase("Cronograma Sanitario", profile); let y = sectionTitle(doc, "Etapas do processo", 80);
  stages.forEach((stage, index) => { if (y > 260) { footer(doc); doc.addPage(); y = sectionTitle(doc, "Etapas do processo - continuação", 25); } const data = profile.timeline[stage] || { date: "", status: "Pendente" }; doc.setFillColor(...teal); doc.circle(margin + 4, y - 3, 4, "F"); doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.text(String(index + 1).padStart(2, "0"), margin + 4, y - 1, { align: "center" }); doc.setTextColor(...teal); doc.setFontSize(10); doc.text(stage, margin + 13, y); doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.text(data.date ? new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(`${data.date}T00:00:00`)) : "Data não definida", 145, y, { align: "right" }); doc.setFillColor(...(data.status === "Concluído" ? turquoise : data.status === "Em andamento" ? lime : pale)); doc.roundedRect(150, y - 6, 42, 8, 3, 3, "F"); doc.setTextColor(...teal); doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.text(data.status, 171, y - .6, { align: "center" }); doc.setDrawColor(216, 232, 229); doc.line(margin + 13, y + 5, pageWidth - margin, y + 5); y += 15; });
  save(doc, "cronograma", profile);
}

export function downloadSummaryPdf(profile: PdfProfile) {
  const doc = docBase("Quadro-resumo de CVI", profile); let y = sectionTitle(doc, "Dados registrados", 80);
  const fields = [["Destino", profile.summary.destination], ["Fonte oficial consultada", profile.summary.source], ["Emissão de CVI", profile.summary.cvi], ["Import Permit", profile.summary.importPermit], ["Notificação de chegada", profile.summary.arrivalNotice]];
  fields.forEach(([label, value]) => { doc.setFillColor(...pale); doc.roundedRect(margin, y - 5, pageWidth - margin * 2, 16, 3, 3, "F"); doc.setTextColor(...teal); doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.text(label, margin + 6, y); doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.text(value || "A confirmar", margin + 6, y + 7); y += 21; });
  y = sectionTitle(doc, "Observações", y + 4); doc.setFillColor(...pale); doc.roundedRect(margin, y - 5, pageWidth - margin * 2, 48, 3, 3, "F"); paragraph(doc, profile.summary.notes || "Nenhuma observação registrada.", y + 4, pageWidth - margin * 2 - 12);
  save(doc, "quadro-cvi", profile);
}

export function downloadProcessPdf(profile: PdfProfile, items: string[], stages: string[]) {
  const doc = docBase("Resumo do Processo", profile); let y = sectionTitle(doc, "Visão geral", 80);
  y = paragraph(doc, `Destino: ${profile.summary.destination || "A confirmar"}`, y); y = paragraph(doc, `Checklist: ${profile.checks.filter(Boolean).length} de ${items.length} itens concluídos`, y); y = paragraph(doc, `CVI: ${profile.summary.cvi || "A confirmar"} | Import Permit: ${profile.summary.importPermit || "A confirmar"}`, y);
  y = sectionTitle(doc, "Próximas etapas", y + 5); stages.forEach((stage) => { const item = profile.timeline[stage]; if (item?.status !== "Concluído") { doc.setTextColor(...teal); doc.setFont("helvetica", "normal"); doc.setFontSize(10); doc.text(`- ${stage}${item?.date ? ` (${item.date})` : ""}`, margin, y); y += 7; } });
  y = sectionTitle(doc, "Observações", y + 8); paragraph(doc, profile.summary.notes || "Nenhuma observação registrada.", y); save(doc, "resumo-processo", profile);
}
