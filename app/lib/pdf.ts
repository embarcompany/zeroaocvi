import { jsPDF } from "jspdf";

export type PdfStage = { date: string; status: string; completed?: boolean };
export type PdfSummary = { destination: string; source: string; cvi: string; importPermit: string; arrivalNotice: string; notes: string };
export type PdfTravel = { tutor?: string; pet?: string; speciesBreed?: string; destination?: string; date?: string; airline?: string; modality?: string; passenger?: string; addressBrazil?: string; addressAbroad?: string; phoneBrazil?: string; phoneAbroad?: string };
export type PdfProfile = { name: string; checks: boolean[]; timeline: Record<string, PdfStage>; summary: PdfSummary; travel?: PdfTravel; technicalChecks?: boolean[] };

const teal = [5, 67, 74] as const;
const turquoise = [0, 209, 226] as const;
const soft = [244, 250, 248] as const;
const line = [216, 232, 229] as const;
const pageWidth = 210;
const margin = 16;

function safeFilePart(value: string) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/(^-|-$)/g, "").toLowerCase() || "processo"; }
function dateLabel(value = "") { return value ? new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(`${value}T00:00:00`)) : ""; }
function base(title: string, profile: PdfProfile) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFillColor(...teal); doc.rect(0, 0, pageWidth, 39, "F");
  doc.setFillColor(...turquoise); doc.circle(194, 7, 24, "F");
  doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(20); doc.text("embarpet", margin, 16);
  doc.setFontSize(7.5); doc.text("DO ZERO AO CVI · MATERIAL DE APOIO", margin, 23);
  doc.setFontSize(15); doc.text(title, margin, 32);
  doc.setTextColor(...teal); doc.setFontSize(8); doc.text("PROCESSO", margin, 49);
  doc.setFontSize(12); doc.text(profile.name, margin, 56);
  doc.setDrawColor(...line); doc.line(margin, 62, pageWidth - margin, 62);
  return doc;
}
function footer(doc: jsPDF) { const h = doc.internal.pageSize.getHeight(); doc.setDrawColor(...line); doc.line(margin, h - 13, pageWidth - margin, h - 13); doc.setTextColor(94,127,130); doc.setFont("helvetica","normal"); doc.setFontSize(7); doc.text("Material de apoio · confirme requisitos sanitários e operacionais nas fontes vigentes.", margin, h - 8); doc.text("Embarpet", pageWidth - margin, h - 8, { align: "right" }); }
function section(doc: jsPDF, label: string, y: number) { doc.setTextColor(...turquoise); doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.text(label.toUpperCase(), margin, y); return y + 7; }
function newPage(doc: jsPDF, label: string) { footer(doc); doc.addPage(); return section(doc, label, 20); }
function lineField(doc: jsPDF, label: string, value: string, x: number, y: number, width: number) { doc.setTextColor(...teal); doc.setFont("helvetica","bold"); doc.setFontSize(7.5); doc.text(label.toUpperCase(), x, y); doc.setDrawColor(...line); doc.line(x, y + 10, x + width, y + 10); if (value) { doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.text(value, x, y + 7); } }
function box(doc: jsPDF, label: string, value: string, y: number, height = 17) { doc.setFillColor(...soft); doc.roundedRect(margin, y, pageWidth - margin * 2, height, 3, 3, "F"); doc.setTextColor(...teal); doc.setFont("helvetica","bold"); doc.setFontSize(8); doc.text(label, margin + 6, y + 6); if (value) { doc.setFont("helvetica","normal"); doc.setFontSize(9.5); const lines = doc.splitTextToSize(value, pageWidth - margin * 2 - 12); doc.text(lines, margin + 6, y + 12); } else { doc.setDrawColor(...line); doc.line(margin + 6, y + height - 5, pageWidth - margin - 6, y + height - 5); } return y + height + 6; }
function save(doc: jsPDF, name: string, profile: PdfProfile) { footer(doc); doc.save(`embarpet-${name}-${safeFilePart(profile.name)}.pdf`); }
function travelFields(doc: jsPDF, profile: PdfProfile, y: number) { const t = profile.travel || {}; y = section(doc, "Dados da viagem", y); const fields: Array<[string,string]> = [["Tutor",t.tutor || ""],["Pet",t.pet || ""],["Destino",t.destination || ""],["Data da viagem",dateLabel(t.date)],["Modalidade",t.modality || ""],["Companhia aérea",t.airline || ""]]; fields.forEach(([label,value], index) => { const col = index % 2; lineField(doc,label,value,margin + col * 90,y + Math.floor(index / 2) * 17,82); }); return y + 58; }

export function downloadChecklistPdf(profile: PdfProfile, items: string[], attention: string[] = []) {
  const doc = base("Checklist de embarque do pet", profile); let y = travelFields(doc, profile, 74); y = section(doc, "Itens obrigatórios", y);
  items.forEach((item,index) => { if (y > 265) y = newPage(doc, "Itens obrigatórios · continuação"); const done = Boolean(profile.checks[index]); doc.setDrawColor(...line); doc.roundedRect(margin,y - 4,5,5,1,1,"S"); if(done){doc.setFillColor(...turquoise);doc.roundedRect(margin,y-4,5,5,1,1,"F");doc.setTextColor(...teal);doc.setFont("helvetica","bold");doc.setFontSize(6);doc.text("✓",margin+2.5,y-0.2,{align:"center"});} doc.setTextColor(...teal);doc.setFont("helvetica",done?"bold":"normal");doc.setFontSize(9.5);const lines=doc.splitTextToSize(item,155);doc.text(lines,margin+10,y); y += Math.max(8,lines.length*4.5+3); });
  y = newPage(doc,"Pontos de atenção"); attention.forEach((item,index)=>{ doc.setFillColor(...soft);doc.roundedRect(margin,y-4,pageWidth-margin*2,16,3,3,"F");doc.setTextColor(...turquoise);doc.setFont("helvetica","bold");doc.setFontSize(8);doc.text(String(index+1).padStart(2,"0"),margin+6,y+3);doc.setTextColor(...teal);doc.setFont("helvetica","normal");doc.setFontSize(9);const lines=doc.splitTextToSize(item,155);doc.text(lines,margin+19,y+2);y+=Math.max(20,lines.length*4+8);}); save(doc,"checklist",profile);
}

export function downloadTimelinePdf(profile: PdfProfile, stages: string[], technical: string[] = [], technicalChecks: boolean[] = []) {
  const doc = base("Cronograma sanitário", profile); let y = travelFields(doc, profile, 74); y = section(doc,"Cronograma sanitário",y);
  stages.forEach((stage,index)=>{if(y>264)y=newPage(doc,"Cronograma sanitário · continuação");const data=profile.timeline[stage]||{};doc.setDrawColor(...line);doc.line(margin,y+7,pageWidth-margin,y+7);doc.setFillColor(...(data.completed?[0,209,226]:soft));doc.circle(margin+4,y,4,"F");doc.setTextColor(...teal);doc.setFont("helvetica","bold");doc.setFontSize(7);doc.text(String(index+1).padStart(2,"0"),margin+4,y+1.9,{align:"center"});doc.setFontSize(9.5);doc.text(stage,margin+13,y+1);lineField(doc,"Data",dateLabel(data.date),143,y-5,50);y+=13;});
  y = newPage(doc,"Checklist técnico"); technical.forEach((item,index)=>{const done=Boolean(technicalChecks[index]);const col=index%2;if(col===0&&y>266)y=newPage(doc,"Checklist técnico · continuação");doc.setDrawColor(...line);doc.roundedRect(margin+col*90,y-4,82,13,3,3,"S");doc.roundedRect(margin+col*90+5,y,4,4,1,1,"S");if(done){doc.setFillColor(...turquoise);doc.roundedRect(margin+col*90+5,y,4,4,1,1,"F");}doc.setTextColor(...teal);doc.setFont("helvetica",done?"bold":"normal");doc.setFontSize(8.2);doc.text(doc.splitTextToSize(item,65),margin+col*90+14,y+3);if(col===1||index===technical.length-1)y+=18;}); save(doc,"cronograma",profile);
}

export function downloadSummaryPdf(profile: PdfProfile, destinations: readonly (readonly string[])[]) {
  const doc = base("Quadro-resumo de emissão de CVI", profile); let y = section(doc,"Conferência deste processo",74); y = box(doc,"Destino",profile.summary.destination,y); y = box(doc,"Fonte oficial consultada",profile.summary.source,y); y = box(doc,"Emissão de CVI",profile.summary.cvi,y); y = box(doc,"Import Permit",profile.summary.importPermit,y); y = box(doc,"Notificação de chegada",profile.summary.arrivalNotice,y); y = box(doc,"Observações",profile.summary.notes,y,35);
  y=newPage(doc,"Quadro-resumo por destino"); const headers=["Destino","e-CVI","Endosso","Presencial","Import Permit","Notificação"]; doc.setFillColor(...teal);doc.rect(margin,y-5,pageWidth-margin*2,9,"F");doc.setTextColor(255,255,255);doc.setFont("helvetica","bold");doc.setFontSize(6.5);headers.forEach((header,index)=>doc.text(header,margin+[0,39,59,92,119,153][index],y));y+=10;destinations.forEach((row)=>{if(y>270){y=newPage(doc,"Quadro-resumo por destino · continuação");}doc.setDrawColor(...line);doc.line(margin,y+5,pageWidth-margin,y+5);doc.setTextColor(...teal);doc.setFont("helvetica","normal");doc.setFontSize(6.4);row.forEach((cell,index)=>doc.text(doc.splitTextToSize(cell, [36,18,30,24,31,26][index]),margin+[0,39,59,92,119,153][index],y));y+=Math.max(8,Math.max(...row.map((cell,index)=>doc.splitTextToSize(cell,[36,18,30,24,31,26][index]).length))*3.3+3);});save(doc,"quadro-cvi",profile);
}

export function downloadProcessPdf(profile: PdfProfile, items: string[], stages: string[]) { const doc=base("Resumo do processo",profile);let y=travelFields(doc,profile,74);y=section(doc,"Progresso",y);y=box(doc,"Checklist",`${profile.checks.filter(Boolean).length} de ${items.length} itens concluídos`,y);y=section(doc,"Próximas etapas",y);stages.filter((stage)=>!profile.timeline[stage]?.completed).forEach((stage)=>{doc.setTextColor(...teal);doc.setFontSize(9);doc.text(`• ${stage}`,margin,y);y+=7;});save(doc,"resumo-processo",profile); }
