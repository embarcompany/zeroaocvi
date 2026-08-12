"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Highlighter,
  Italic,
  MapPin,
  Moon,
  PawPrint,
  Plane,
  Settings2,
  ShieldCheck,
  SquareStack,
  Stethoscope,
  Strikethrough,
  Type,
  Underline,
  UserRound,
  X,
  ZapOff,
} from "lucide-react";
import {
  downloadChecklistPdf,
  downloadProcessPdf,
  downloadSummaryPdf,
  downloadTimelinePdf,
} from "./lib/pdf";

const modules = [
  ["Modalidades de viagem de animais", "PETC, AVIH, AVI e situações especiais"],
  [
    "Exigências sanitárias internacionais",
    "Como interpretar regras por destino",
  ],
  ["Assessoria técnica e planejamento", "Do diagnóstico à viagem"],
  ["Bolsas e caixas de transporte", "Conforto, segurança e compatibilidade"],
  ["Documentação veterinária e emissão do CVI", "Conferência e certificação"],
  ["Gestão e precificação do serviço", "Valor técnico da atuação"],
] as const;

const moduleLessons = [
  [
    "1.1 PETC",
    "1.2 AVIH",
    "1.3 AVI",
    "1.4 Cão de serviço",
    "1.5 Suporte emocional",
    "1.6 Embarque por liminar",
  ],
  [
    "2.1 Acordo sanitário",
    "2.2 Import Permit",
    "2.3 Notificação de chegada",
    "2.4 Respaldo sanitário",
    "2.5 Exigências por destino",
    "2.6 Sorologia antirrábica",
    "2.7 Laboratórios",
    "2.8 CVI por destino",
  ],
  [
    "3.1 Planejamento",
    "3.2 Destino e rota",
    "3.3 Modalidade",
    "3.4 Risco sanitário",
    "3.5 Comunicação",
    "3.6 Papel do veterinário",
    "3.7 Erros comuns",
    "3.8 Cronograma",
    "3.9 IATA e IPATA",
  ],
  ["4.1 Medir o pet", "4.2 Padrões IATA", "4.3 Restrições", "4.4 Bolsa PETC"],
  [
    "5.1 Carteira de vacinação",
    "5.2 Implantação do microchip",
    "5.3 Leitura do microchip",
    "5.4 Sorologia",
    "5.5 Responsabilidade técnica",
    "5.6 O que é CVI",
    "5.7 CVI presencial",
    "5.8 e-CVI",
    "5.9 Cadastro MAPA",
    "5.10 Emissão e-CVI",
  ],
  [
    "6.1 Responsabilidade",
    "6.2 O que é vendido",
    "6.3 Consulta × certificação",
    "6.4 Formação do valor",
    "6.5 Precificação",
  ],
] as const;

const checklist = [
  "Passageiro pet",
  "Caixa ou bolsa de transporte",
  "4 tapetes absorventes",
  "Lencinho umedecido",
  "Cata-caca",
  "Lacres",
  "Recipiente para água e ração",
  "4 porções de refeições",
  "Carteirinha de vacinação (original)",
  "Laudo da sorologia ou exames adicionais (se o país exigir)",
  "Certificado de microchip (se o país exigir)",
  "CVI emitido",
  "Import Permit (se o país exigir)",
  "Notificação de chegada (se o país exigir)",
  "Atestado de saúde",
  "Reserva do pet confirmada",
  "Identificação e contatos atualizados",
];
const attentionPoints = [
  "Chegar no aeroporto com 4 horas de antecedência antes do embarque, para que a companhia aérea avalie toda a documentação.",
  "Não recomendamos ração dentro de 6 horas antes do embarque.",
  "Água sempre à disposição do pet.",
  "Confira toda a documentação antes de sair de casa.",
  "Identifique a caixa de transporte com etiqueta e contatos atualizados.",
];
const stages = [
  "Planejamento da viagem",
  "Microchip implantado",
  "Leitura do microchip",
  "Vacina antirrábica 1",
  "Vacina antirrábica 2 (se houver)",
  "Cumprimento dos 30/21 dias",
  "Coleta da sorologia",
  "Resultado da sorologia",
  "Final da quarentena (90/180 dias)",
  "Solicitação do Import Permit",
  "Recebimento do Import Permit",
  "Exame clínico",
  "Emissão do Atestado de Saúde",
  "Solicitação do CVI",
  "Emissão do CVI",
  "Endosso (quando aplicável)",
  "Notificação de chegada",
  "Conferência final",
  "Embarque",
];
const technicalChecklist = [
  "Cliente possui data do embarque.",
  "Cliente possui bilhete aéreo.",
  "Modalidade de transporte definida.",
  "Microchip conferido.",
  "Vacinação válida.",
  "Sorologia exigida e conferida.",
  "Laboratório reconhecido.",
  "Import Permit necessário?",
  "Import Permit emitido.",
  "Notificação de chegada necessária?",
  "Notificação enviada.",
  "Atestado de Saúde correto.",
  "CVI emitido.",
  "Endosso realizado (quando aplicável).",
  "Documentos revisados.",
  "Caixa/Bolsa conforme padrão IATA.",
  "Cópias digitais e físicas organizadas.",
];
const validationDocuments = [
  "Microchip",
  "Carteira de vacinação",
  "Sorologia",
  "Import Permit",
  "Atestado de Saúde",
  "CVI",
  "Documento do tutor",
  "Passaporte/CPF",
  "Bilhete aéreo",
  "Notificação de chegada",
];
const cviDestinations = [
  [
    "União Europeia",
    "Sim",
    "Alemanha, Espanha, Irlanda, Itália, Países Baixos e Suécia",
    "Não",
    "Não",
    "Portugal e Irlanda",
  ],
  ["Estados Unidos", "Sim", "Não", "Não", "Não", "Não"],
  ["Canadá", "Sim", "Sim", "Não", "Não", "Não"],
  ["México", "Sim", "Sim", "Não", "Não", "Não"],
  ["Japão", "Sim", "Não", "Não", "Sim", "Sim"],
  ["Chile", "Sim", "Não", "Não", "Não", "Não"],
  ["Colômbia", "Sim", "Sim", "Não", "Não", "Não"],
  ["Peru", "Sim", "Não", "Não", "Não", "Não"],
  ["Venezuela", "Sim", "Não", "Não", "Não", "Não"],
  ["Argentina", "Sim", "Não", "Não", "Não", "Não"],
  ["Paraguai", "Sim", "Sim", "Não", "Não", "Não"],
  ["Bolívia", "Sim", "Sim", "Não", "Não", "Não"],
  ["Uruguai", "Sim", "Não", "Não", "Não", "Não"],
  ["Grã-Bretanha", "Sim", "Sim", "Não", "Não", "Não"],
  ["Suíça", "Sim", "Não", "Não", "Sim", "Não"],
  ["Emirados Árabes Unidos", "Não", "—", "Sim", "Sim", "Não"],
  ["África do Sul", "Não", "—", "Sim", "Sim", "Não"],
  ["China", "Não", "—", "Sim", "Não", "Não"],
  ["Coreia do Sul", "Não", "—", "Sim", "Não", "Sim"],
  ["Israel", "Não", "—", "Sim", "Sim", "Não"],
  ["Hong Kong", "Não", "—", "Sim", "Sim", "Sim"],
  ["Costa Rica", "Não", "—", "Sim", "Não", "Não"],
  ["Guatemala", "Não", "—", "Sim", "Não", "Não"],
  ["Panamá", "Não", "—", "Sim", "Sim", "Sim"],
  ["Equador", "Não", "—", "Sim", "Não", "Não"],
  ["Índia", "Não", "—", "Sim", "Sim", "Não"],
  ["Marrocos", "Não", "—", "Sim", "Não", "Não"],
  ["Turquia", "Não", "—", "Sim", "Não", "Não"],
  ["Taiwan", "Não", "—", "Sim", "Sim", "Sim"],
  ["Angola", "Não", "—", "Sim", "Não", "Não"],
] as const;
type Tool = "checklist" | "cronograma" | "quadro" | null;
type Theme = "light" | "dark";
type StageData = {
  date: string;
  status: "Pendente" | "Em andamento" | "Concluído";
  completed?: boolean;
};
type SummaryData = {
  destination: string;
  source: string;
  cvi: string;
  importPermit: string;
  arrivalNotice: string;
  notes: string;
};
type TravelData = {
  tutor: string;
  pet: string;
  speciesBreed: string;
  destination: string;
  date: string;
  airline: string;
  modality: string;
  passenger: string;
  addressBrazil: string;
  addressAbroad: string;
  phoneBrazil: string;
  phoneAbroad: string;
};
type CourseBlock =
  | {
      type: "heading" | "paragraph";
      level?: number | null;
      text: string;
      module: number;
    }
  | { type: "table"; rows: string[][]; module: number };
type TextMarkStyle = "highlight" | "underline" | "italic" | "strike";
type TextMark = {
  id: string;
  text: string;
  style: TextMarkStyle;
  blockId?: string;
  start?: number;
  end?: number;
};
type ReaderProfile = {
  id: string;
  name: string;
  theme: Theme;
  fontScale: "normal" | "large";
  reduceMotion: boolean;
  visited: boolean[];
  completedModules: boolean[];
  completedLessons: Record<string, boolean>;
  highlights: Record<string, string[]>;
  textMarks: Record<string, TextMark[]>;
  annotations: Record<string, string>;
  checks: boolean[];
  timeline: Record<string, StageData>;
  technicalChecks: boolean[];
  validationChecks: boolean[];
  validationNotes: Record<string, string>;
  summary: SummaryData;
  travel: TravelData;
};
const profilesKey = "embarpet:profiles:v1";
const emptySummary: SummaryData = {
  destination: "",
  source: "",
  cvi: "",
  importPermit: "",
  arrivalNotice: "",
  notes: "",
};
const createProfile = (name: string): ReaderProfile => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  name,
  theme: "light",
  fontScale: "normal",
  reduceMotion: false,
  visited: [true, false, false, false, false, false],
  completedModules: [false, false, false, false, false, false],
  completedLessons: {},
  highlights: {},
  textMarks: {},
  annotations: {},
  checks: checklist.map(() => false),
  timeline: {},
  technicalChecks: technicalChecklist.map(() => false),
  validationChecks: validationDocuments.map(() => false),
  validationNotes: {},
  summary: emptySummary,
  travel: {
    tutor: "",
    pet: "",
    speciesBreed: "",
    destination: "",
    date: "",
    airline: "",
    modality: "",
    passenger: "",
    addressBrazil: "",
    addressAbroad: "",
    phoneBrazil: "",
    phoneAbroad: "",
  },
});
const moduleIcons = [
  Plane,
  ShieldCheck,
  CalendarDays,
  SquareStack,
  Stethoscope,
  BriefcaseBusiness,
];
const moduleVisuals = [
  "/images/embarpet-hero-pet-travel.png",
  "/images/embarpet-sanitario-requirements.png",
  "/images/embarpet-trip-planning.png",
  "/images/embarpet-crate-preparation.png",
  "/images/embarpet-documentacao-cvi.png",
  "/images/embarpet-service-management.png",
] as const;

export default function Home() {
  const [active, setActive] = useState(0);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tool, setTool] = useState<Tool>(null);
  const [profiles, setProfiles] = useState<ReaderProfile[]>([
    createProfile("Meu processo Embarpet"),
  ]);
  const [activeProfileId, setActiveProfileId] = useState("");
  const [profilesReady, setProfilesReady] = useState(false);
  const [profileManagerOpen, setProfileManagerOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [backupMessage, setBackupMessage] = useState("");
  const backupInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    try {
      const saved = JSON.parse(
        window.localStorage.getItem(profilesKey) || "null",
      ) as { profiles?: ReaderProfile[]; activeProfileId?: string } | null;
      if (saved?.profiles?.length) {
        const restored = saved.profiles.map((profile) => {
          const completedLessons = { ...(profile.completedLessons || {}) };
          moduleLessons.forEach((lessons, index) => {
            if (profile.completedModules?.[index])
              lessons.forEach((lesson) => {
                completedLessons[`${index}:${lesson}`] = true;
              });
          });
          return {
            ...createProfile(profile.name),
            ...profile,
            fontScale: profile.fontScale === "large" ? "large" : "normal",
            reduceMotion: Boolean(profile.reduceMotion),
            completedModules: moduleLessons.map((lessons, index) =>
              lessons.every((lesson) =>
                Boolean(completedLessons[`${index}:${lesson}`]),
              ),
            ),
            completedLessons,
            highlights: profile.highlights || {},
            textMarks:
              profile.textMarks ||
              Object.fromEntries(
                Object.entries(profile.highlights || {}).map(([key, texts]) => [
                  key,
                  Array.isArray(texts)
                    ? texts.map((text) => ({
                        id: `legacy-${key}-${text}`,
                        text,
                        style: "highlight" as const,
                      }))
                    : [],
                ]),
              ),
            annotations: profile.annotations || {},
            checks: checklist.map((_, index) =>
              Boolean(profile.checks?.[index]),
            ),
            technicalChecks: technicalChecklist.map((_, index) =>
              Boolean(profile.technicalChecks?.[index]),
            ),
            validationChecks: validationDocuments.map((_, index) =>
              Boolean(profile.validationChecks?.[index]),
            ),
            validationNotes: profile.validationNotes || {},
            travel: {
              ...createProfile(profile.name).travel,
              ...profile.travel,
            },
          };
        });
        setProfiles(restored);
        setActiveProfileId(saved.activeProfileId || restored[0].id);
      } else {
        const legacyTheme = window.localStorage.getItem(
          "embarpet:reader-settings:v1",
        );
        const initialProfile = createProfile("Meu processo Embarpet");
        initialProfile.theme =
          legacyTheme === "dark" || legacyTheme === "light"
            ? legacyTheme
            : "light";
        setProfiles([initialProfile]);
        setActiveProfileId(initialProfile.id);
      }
    } catch {
      const initialProfile = createProfile("Meu processo Embarpet");
      setProfiles([initialProfile]);
      setActiveProfileId(initialProfile.id);
    }
    setProfilesReady(true);
  }, []);
  useEffect(() => {
    const match =
      window.location.hash.match(/^#module-(\d+)$/) ||
      window.location.hash.match(/^#lesson-(\d+)-\d+$/);
    if (!match) return;
    const index = Number(match[1]) - 1;
    if (index >= 0 && index < modules.length) setActive(index);
  }, []);
  useEffect(() => {
    if (!profilesReady) return;
    window.localStorage.setItem(
      profilesKey,
      JSON.stringify({ profiles, activeProfileId }),
    );
  }, [profiles, activeProfileId, profilesReady]);
  const activeProfile =
    profiles.find((profile) => profile.id === activeProfileId) || profiles[0];
  useEffect(() => {
    if (activeProfile) {
      document.documentElement.dataset.theme = activeProfile.theme;
      document.documentElement.dataset.fontScale = activeProfile.fontScale;
      document.documentElement.dataset.reduceMotion = String(
        activeProfile.reduceMotion,
      );
    }
  }, [
    activeProfile?.theme,
    activeProfile?.fontScale,
    activeProfile?.reduceMotion,
  ]);
  const updateActiveProfile = (
    update: (profile: ReaderProfile) => ReaderProfile,
  ) =>
    setProfiles((current) =>
      current.map((profile) =>
        profile.id === activeProfile.id ? update(profile) : profile,
      ),
    );
  const selectModule = (index: number) => {
    setActive(index);
    setTool(null);
    window.history.replaceState(null, "", `#module-${index + 1}`);
    window.setTimeout(
      () =>
        document
          .getElementById(`module-${index + 1}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      40,
    );
  };
  const toggleModuleComplete = (index: number) =>
    updateActiveProfile((profile) => {
      const lessons = moduleLessons[index];
      const isComplete = lessons.every((lesson) =>
        Boolean(profile.completedLessons[`${index}:${lesson}`]),
      );
      const completedLessons = { ...profile.completedLessons };
      lessons.forEach((lesson) => {
        completedLessons[`${index}:${lesson}`] = !isComplete;
      });
      return {
        ...profile,
        completedLessons,
        completedModules: profile.completedModules.map((item, position) =>
          position === index ? !isComplete : item,
        ),
      };
    });
  const toggleLessonComplete = (moduleIndex: number, lesson: string) =>
    updateActiveProfile((profile) => {
      const key = `${moduleIndex}:${lesson}`;
      const completedLessons = {
        ...profile.completedLessons,
        [key]: !profile.completedLessons[key],
      };
      const moduleComplete = moduleLessons[moduleIndex].every((item) =>
        Boolean(completedLessons[`${moduleIndex}:${item}`]),
      );
      return {
        ...profile,
        completedLessons,
        completedModules: profile.completedModules.map((item, index) =>
          index === moduleIndex ? moduleComplete : item,
        ),
      };
    });
  const toggleTextMark = (
    moduleIndex: number,
    mark: Omit<TextMark, "id" | "style">,
    style: TextMarkStyle,
  ) =>
    updateActiveProfile((profile) => {
      const current = profile.textMarks[moduleIndex] || [];
      const existing = current.find(
        (item) =>
          item.style === style &&
          item.blockId === mark.blockId &&
          item.start === mark.start &&
          item.end === mark.end,
      );
      return {
        ...profile,
        textMarks: {
          ...profile.textMarks,
          [moduleIndex]: existing
            ? current.filter((item) => item.id !== existing.id)
            : [
                ...current,
                {
                  ...mark,
                  style,
                  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                },
              ],
        },
      };
    });
  const updateAnnotation = (
    moduleIndex: number,
    lesson: string,
    value: string,
  ) =>
    updateActiveProfile((profile) => ({
      ...profile,
      annotations: {
        ...profile.annotations,
        [`${moduleIndex}:${lesson}`]: value,
      },
    }));
  const selectLesson = (moduleIndex: number, lesson: string) => {
    setExpandedModule(moduleIndex);
    selectModule(moduleIndex);
    const target = `lesson-${lesson.split(" ", 1)[0].replace(".", "-")}`;
    window.history.replaceState(null, "", `#${target}`);
    window.setTimeout(
      () =>
        document
          .getElementById(target)
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      120,
    );
  };
  const selectTool = (nextTool: Exclude<Tool, null>) => {
    setTool(nextTool);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const createNewProfile = () => {
    const name = profileName.trim();
    if (!name) return;
    const profile = createProfile(name);
    setProfiles((current) => [...current, profile]);
    setActiveProfileId(profile.id);
    setProfileName("");
    setProfileManagerOpen(false);
    setActive(0);
    setTool(null);
  };
  const renameActiveProfile = () => {
    const name = profileName.trim();
    if (!name) return;
    updateActiveProfile((profile) => ({ ...profile, name }));
    setProfileName("");
  };
  const deleteActiveProfile = () => {
    if (profiles.length === 1) return;
    const remaining = profiles.filter(
      (profile) => profile.id !== activeProfile.id,
    );
    setProfiles(remaining);
    setActiveProfileId(remaining[0].id);
    setProfileManagerOpen(false);
    setActive(0);
    setTool(null);
  };
  const exportBackup = () => {
    const payload = {
      app: "Apostila Digital Embarpet",
      version: 1,
      exportedAt: new Date().toISOString(),
      profiles,
      activeProfileId,
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "embarpet-backup-perfis.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setBackupMessage("Backup baixado. Guarde este arquivo em local seguro.");
  };
  const importBackup = async (file?: File) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as {
        profiles?: ReaderProfile[];
      };
      if (!Array.isArray(parsed.profiles) || !parsed.profiles.length)
        throw new Error("invalid");
      const imported = parsed.profiles
        .filter((profile) => profile && typeof profile.name === "string")
        .map((profile) => ({
          ...createProfile(profile.name),
          ...profile,
          id: profiles.some((current) => current.id === profile.id)
            ? createProfile(profile.name).id
            : profile.id,
        }));
      if (!imported.length) throw new Error("invalid");
      setProfiles((current) => [...current, ...imported]);
      setActiveProfileId(imported[0].id);
      setProfileManagerOpen(false);
      setActive(0);
      setTool(null);
      setBackupMessage(
        `${imported.length} perfil(is) importado(s) com sucesso.`,
      );
    } catch {
      setBackupMessage(
        "Não foi possível importar este arquivo. Selecione um backup Embarpet válido.",
      );
    } finally {
      if (backupInputRef.current) backupInputRef.current.value = "";
    }
  };
  useEffect(() => {
    if (!profileManagerOpen) return;
    const manager = document.querySelector(".profile-manager");
    if (!manager || manager.querySelector("[data-backup-controls]")) return;
    const controls = document.createElement("div");
    controls.dataset.backupControls = "true";
    controls.className = "backup-actions";
    const exportButton = document.createElement("button");
    exportButton.type = "button";
    exportButton.textContent = "Baixar backup";
    exportButton.onclick = exportBackup;
    const importButton = document.createElement("button");
    importButton.type = "button";
    importButton.textContent = "Importar backup";
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.hidden = true;
    input.onchange = () => importBackup(input.files?.[0]);
    importButton.onclick = () => input.click();
    controls.append(exportButton, importButton, input);
    manager.append(controls);
    if (backupMessage) {
      const message = document.createElement("p");
      message.className = "backup-message";
      message.textContent = backupMessage;
      manager.append(message);
    }
  }, [profileManagerOpen, backupMessage, profiles]);
  const totalLessons = moduleLessons.reduce(
    (total, lessons) => total + lessons.length,
    0,
  );
  const completedLessonsTotal = moduleLessons.reduce(
    (total, lessons, moduleIndex) =>
      total +
      lessons.filter(
        (lesson) => activeProfile.completedLessons[`${moduleIndex}:${lesson}`],
      ).length,
    0,
  );
  const progress = Math.round((completedLessonsTotal / totalLessons) * 100);
  const currentLessons = moduleLessons[active] || [];
  const completedCurrentLessons = currentLessons.filter(
    (lesson) => activeProfile.completedLessons[`${active}:${lesson}`],
  ).length;
  const currentModuleProgress = Math.round(
    (completedCurrentLessons / Math.max(currentLessons.length, 1)) * 100,
  );

  return (
    <main className="reader" id="top">
      {profileManagerOpen && (
        <div
          className="profile-backdrop"
          role="presentation"
          onMouseDown={() => setProfileManagerOpen(false)}
        >
          <section
            className="profile-manager"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-manager-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="dialog-close"
              type="button"
              onClick={() => setProfileManagerOpen(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <p className="side-label">PERFIS LOCAIS</p>
            <h2 id="profile-manager-title">Organize seus processos</h2>
            <p>
              Os dados ficam apenas neste navegador e não se misturam entre
              perfis.
            </p>
            <label>
              Nome do perfil
              <input
                value={profileName}
                onChange={(event) => setProfileName(event.target.value)}
                placeholder="Ex.: Família Silva — Canadá"
              />
            </label>
            <div className="profile-actions">
              <button type="button" onClick={renameActiveProfile}>
                Renomear atual
              </button>
              <button type="button" onClick={createNewProfile}>
                Criar novo
              </button>
            </div>
            <button
              type="button"
              className="delete-profile"
              onClick={deleteActiveProfile}
              disabled={profiles.length === 1}
            >
              Excluir perfil atual
            </button>
          </section>
        </div>
      )}
      <div
        className={
          sidebarCollapsed ? "reader-layout sidebar-collapsed" : "reader-layout"
        }
      >
        <aside
          className={sidebarCollapsed ? "sidebar sidebar-collapsed" : "sidebar"}
        >
          <button
            type="button"
            className="sidebar-brand-logo"
            onClick={() => setSidebarCollapsed((value) => !value)}
            aria-label={
              sidebarCollapsed
                ? "Expandir menu lateral"
                : "Recolher menu lateral"
            }
            aria-expanded={!sidebarCollapsed}
          >
            <img
              className="logo-on-light"
              src="/images/logo-embarpet-light.png"
              alt="Embarpet — Embarque de Animais"
            />
            <img
              className="logo-on-dark"
              src="/images/logo-embarpet-dark.png"
              alt=""
              aria-hidden="true"
            />
            <img
              className="logo-symbol"
              src="/images/logo-embarpet-symbol.png"
              alt=""
              aria-hidden="true"
            />
          </button>
          <div className="sidebar-scroll">
            <div className="sidebar-head">
              <p className="side-label">SEU PERCURSO</p>
              <div className="progress-copy">
                <strong>{progress}%</strong>
                <span>da apostila explorada</span>
              </div>
              <div
                className="progress-track"
                aria-label={`${progress}% da apostila explorada`}
              >
                <i style={{ width: `${progress}%` }} />
              </div>
            </div>
            <nav aria-label="Módulos da apostila">
              <p className="side-label">SUMÁRIO DA APOSTILA</p>
              {modules.map(([title], index) => {
                const Icon = moduleIcons[index];
                return (
                  <section
                    className={
                      expandedModule === index
                        ? "nav-section expanded"
                        : "nav-section"
                    }
                    key={title}
                  >
                    <div
                      className={
                        activeProfile.completedModules[index]
                          ? "module-nav-row is-complete"
                          : "module-nav-row"
                      }
                    >
                      <a
                        className={
                          !tool && active === index
                            ? "nav-item active"
                            : "nav-item"
                        }
                        href={`#module-${index + 1}`}
                        onClick={(event) => {
                          event.preventDefault();
                          setExpandedModule(
                            expandedModule === index ? null : index,
                          );
                          selectModule(index);
                        }}
                        aria-current={
                          !tool && active === index ? "page" : undefined
                        }
                        aria-expanded={expandedModule === index}
                        title={title}
                      >
                        <Icon
                          className="nav-icon"
                          size={18}
                          strokeWidth={2.1}
                        />
                        <b>{String(index + 1).padStart(2, "0")}</b>
                        <span>{title}</span>
                        <ChevronDown
                          className="nav-chevron"
                          size={15}
                          aria-hidden="true"
                        />
                      </a>
                      <button
                        type="button"
                        className={
                          activeProfile.completedModules[index]
                            ? "module-completion done"
                            : "module-completion"
                        }
                        aria-label={
                          activeProfile.completedModules[index]
                            ? "Marcar " + title + " como não concluído"
                            : "Marcar " + title + " como concluído"
                        }
                        aria-pressed={activeProfile.completedModules[index]}
                        onClick={() => toggleModuleComplete(index)}
                      >
                        <span className="completion-mark" aria-hidden="true">
                          <Check size={14} strokeWidth={3} />
                        </span>
                      </button>
                    </div>
                    {expandedModule === index && (
                      <div className="nav-lessons">
                        {moduleLessons[index].map((lesson) => {
                          const lessonKey = index + ":" + lesson;
                          const lessonDone = Boolean(
                            activeProfile.completedLessons[lessonKey],
                          );
                          return (
                            <div className="nav-lesson-row" key={lesson}>
                              <button
                                type="button"
                                className={
                                  lessonDone
                                    ? "lesson-completion done"
                                    : "lesson-completion"
                                }
                                aria-label={
                                  lessonDone
                                    ? "Marcar " + lesson + " como não concluído"
                                    : "Marcar " + lesson + " como concluído"
                                }
                                aria-pressed={lessonDone}
                                onClick={() =>
                                  toggleLessonComplete(index, lesson)
                                }
                              >
                                <span aria-hidden="true">
                                  {lessonDone && (
                                    <Check size={10} strokeWidth={3} />
                                  )}
                                </span>
                              </button>
                              <button
                                type="button"
                                onClick={() => selectLesson(index, lesson)}
                              >
                                {lesson}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </section>
                );
              })}
            </nav>
            <section
              className="sidebar-tools"
              aria-label="Ferramentas práticas"
            >
              <div className="tools-heading">
                <b>FERRAMENTAS</b>
                <span>3 recursos</span>
              </div>
              <button
                className={
                  tool === "checklist"
                    ? "tool-link tool-checklist selected"
                    : "tool-link tool-checklist"
                }
                onClick={() => selectTool("checklist")}
              >
                <span className="tool-icon-wrap">
                  <ClipboardCheck className="tool-icon" size={17} />
                </span>
                <span>
                  <strong>Checklist</strong>
                  <small>Passageiro pet</small>
                </span>
              </button>
              <button
                className={
                  tool === "cronograma"
                    ? "tool-link tool-cronograma selected"
                    : "tool-link tool-cronograma"
                }
                onClick={() => selectTool("cronograma")}
              >
                <span className="tool-icon-wrap">
                  <CalendarDays className="tool-icon" size={17} />
                </span>
                <span>
                  <strong>Cronograma</strong>
                  <small>Planejamento sanitário</small>
                </span>
              </button>
              <button
                className={
                  tool === "quadro"
                    ? "tool-link tool-quadro selected"
                    : "tool-link tool-quadro"
                }
                onClick={() => selectTool("quadro")}
              >
                <span className="tool-icon-wrap">
                  <FileCheck2 className="tool-icon" size={17} />
                </span>
                <span>
                  <strong>Quadro de CVI</strong>
                  <small>Regras por destino</small>
                </span>
              </button>
            </section>
          </div>
          <details className="sidebar-accessibility">
            <summary aria-label="Abrir configurações de leitura">
              <Settings2 size={16} aria-hidden="true" />
              <span>Configurações</span>
              <ChevronDown size={14} aria-hidden="true" />
            </summary>
            <div
              className="accessibility-panel"
              aria-label="Opções de acessibilidade"
            >
              <b>ACESSIBILIDADE</b>
              <p>Preferências desta leitura</p>
              <div>
                <button
                  type="button"
                  className="accessibility-control"
                  title={
                    activeProfile.theme === "light"
                      ? "Ativar tema escuro"
                      : "Ativar tema claro"
                  }
                  aria-label={
                    activeProfile.theme === "light"
                      ? "Ativar tema escuro"
                      : "Ativar tema claro"
                  }
                  aria-pressed={activeProfile.theme === "dark"}
                  onClick={() =>
                    updateActiveProfile((profile) => ({
                      ...profile,
                      theme: profile.theme === "light" ? "dark" : "light",
                    }))
                  }
                >
                  <Moon size={18} strokeWidth={2.2} aria-hidden="true" />
                  <span>Tema</span>
                </button>
                <button
                  type="button"
                  className="accessibility-control"
                  title={
                    activeProfile.fontScale === "large"
                      ? "Usar texto padrão"
                      : "Aumentar texto"
                  }
                  aria-label={
                    activeProfile.fontScale === "large"
                      ? "Usar texto padrão"
                      : "Aumentar texto"
                  }
                  aria-pressed={activeProfile.fontScale === "large"}
                  onClick={() =>
                    updateActiveProfile((profile) => ({
                      ...profile,
                      fontScale:
                        profile.fontScale === "normal" ? "large" : "normal",
                    }))
                  }
                >
                  <Type size={19} strokeWidth={2.2} aria-hidden="true" />
                  <span>Texto</span>
                </button>
                <button
                  type="button"
                  className="accessibility-control"
                  title={
                    activeProfile.reduceMotion
                      ? "Usar movimento normal"
                      : "Reduzir movimento"
                  }
                  aria-label={
                    activeProfile.reduceMotion
                      ? "Usar movimento normal"
                      : "Reduzir movimento"
                  }
                  aria-pressed={activeProfile.reduceMotion}
                  onClick={() =>
                    updateActiveProfile((profile) => ({
                      ...profile,
                      reduceMotion: !profile.reduceMotion,
                    }))
                  }
                >
                  <ZapOff size={18} strokeWidth={2.2} aria-hidden="true" />
                  <span>Movimento</span>
                </button>
              </div>
            </div>
          </details>
        </aside>
        <article
          className="lesson"
          id={!tool ? `module-${active + 1}` : undefined}
        >
          {!tool && (
            <section
              className="module-reading-progress"
              aria-label={`Progresso de leitura do módulo ${active + 1}`}
            >
              <div className="module-reading-copy">
                <strong>{currentModuleProgress}%</strong>
              </div>
              <div
                className="module-reading-track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={currentModuleProgress}
                aria-label={`${currentModuleProgress}% lido neste módulo`}
              >
                <i style={{ width: `${currentModuleProgress}%` }} />
              </div>
            </section>
          )}
          {tool === "checklist" ? (
            <Checklist
              checks={activeProfile.checks}
              setChecks={(checks) =>
                updateActiveProfile((profile) => ({ ...profile, checks }))
              }
              travel={activeProfile.travel}
              onTravelChange={(travel) =>
                updateActiveProfile((profile) => ({ ...profile, travel }))
              }
              onExport={() => downloadChecklistPdf(activeProfile, checklist)}
            />
          ) : tool === "cronograma" ? (
            <Cronograma
              value={activeProfile.timeline}
              onChange={(timeline) =>
                updateActiveProfile((profile) => ({ ...profile, timeline }))
              }
              travel={activeProfile.travel}
              onTravelChange={(travel) =>
                updateActiveProfile((profile) => ({ ...profile, travel }))
              }
              technicalChecks={activeProfile.technicalChecks}
              setTechnicalChecks={(technicalChecks) =>
                updateActiveProfile((profile) => ({
                  ...profile,
                  technicalChecks,
                }))
              }
              validationChecks={activeProfile.validationChecks}
              setValidationChecks={(validationChecks) =>
                updateActiveProfile((profile) => ({
                  ...profile,
                  validationChecks,
                }))
              }
              validationNotes={activeProfile.validationNotes}
              setValidationNotes={(validationNotes) =>
                updateActiveProfile((profile) => ({
                  ...profile,
                  validationNotes,
                }))
              }
              onExport={() => downloadTimelinePdf(activeProfile, stages)}
            />
          ) : tool === "quadro" ? (
            <Quadro
              value={activeProfile.summary}
              onChange={(summary) =>
                updateActiveProfile((profile) => ({ ...profile, summary }))
              }
              onExport={() => downloadSummaryPdf(activeProfile)}
            />
          ) : (
            <ModulePage
              module={modules[active]}
              number={active + 1}
              lessons={moduleLessons[active]}
              completedLessons={activeProfile.completedLessons}
              textMarks={activeProfile.textMarks[active] || []}
              annotations={activeProfile.annotations}
              moduleCompleted={activeProfile.completedModules[active]}
              onToggleLesson={(lesson) => toggleLessonComplete(active, lesson)}
              onToggleTextMark={(mark, style) =>
                toggleTextMark(active, mark, style)
              }
              onUpdateAnnotation={(lesson, value) =>
                updateAnnotation(active, lesson, value)
              }
              onToggleModule={() => toggleModuleComplete(active)}
              onPrevious={
                active > 0 ? () => selectModule(active - 1) : undefined
              }
              onNext={
                active < modules.length - 1
                  ? () => selectModule(active + 1)
                  : undefined
              }
            />
          )}
        </article>
      </div>
    </main>
  );
}

function ModulePage({
  module,
  number,
  lessons,
  completedLessons,
  textMarks,
  annotations,
  moduleCompleted,
  onToggleLesson,
  onToggleTextMark,
  onUpdateAnnotation,
  onToggleModule,
  onPrevious,
  onNext,
}: {
  module: readonly string[];
  number: number;
  lessons: readonly string[];
  completedLessons: Record<string, boolean>;
  textMarks: TextMark[];
  annotations: Record<string, string>;
  moduleCompleted: boolean;
  onToggleLesson: (lesson: string) => void;
  onToggleTextMark: (
    mark: Omit<TextMark, "id" | "style">,
    style: TextMarkStyle,
  ) => void;
  onUpdateAnnotation: (lesson: string, value: string) => void;
  onToggleModule: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}) {
  const [title, subtitle] = module;
  return (
    <>
      <div className="lesson-meta">
        <span>MÓDULO {number}</span>
        <span>{subtitle}</span>
      </div>
      <h1>{title}</h1>
      {number === 1 ? (
        <ModalidadesContent />
      ) : number === 2 ? (
        <SanitarioContent />
      ) : number === 3 ? (
        <PlanejamentoContent />
      ) : number === 4 ? (
        <CaixasContent />
      ) : number === 5 ? (
        <DocumentacaoContent />
      ) : number === 6 ? (
        <GestaoContent />
      ) : (
        <ComingContent number={number} />
      )}
      <NativeCourseContent
        module={number}
        lessons={lessons}
        completedLessons={completedLessons}
        textMarks={textMarks}
        annotations={annotations}
        onToggleLesson={onToggleLesson}
        onToggleTextMark={onToggleTextMark}
        onUpdateAnnotation={onUpdateAnnotation}
      />
      <ModuleRecap
        number={number}
        completed={moduleCompleted}
        onToggle={onToggleModule}
      />
      <nav className="lesson-footer" aria-label="Navegação entre módulos">
        <button type="button" onClick={onPrevious} disabled={!onPrevious}>
          ← Módulo anterior
        </button>
        <span>
          Módulo {number} de {modules.length}
        </span>
        <button type="button" onClick={onNext} disabled={!onNext}>
          Próximo módulo →
        </button>
      </nav>
    </>
  );
}

function ModuleRecap({
  number,
  completed,
  onToggle,
}: {
  number: number;
  completed: boolean;
  onToggle: () => void;
}) {
  const recaps = [
    [
      "Modalidade vem antes da documentação.",
      "Valide rota, companhia e condição individual do animal.",
    ],
    [
      "Destino define o processo.",
      "Registre fonte oficial, prazo e cada requisito confirmado.",
    ],
    [
      "Planejamento reduz urgências.",
      "Monte o cronograma de trás para frente e preserve margem.",
    ],
    [
      "A caixa faz parte da segurança.",
      "Meça, adapte e confirme a compatibilidade operacional.",
    ],
    [
      "CVI depende de respaldo correto.",
      "Revise dados, datas e anexos antes da emissão.",
    ],
    [
      "Escopo claro valoriza o serviço.",
      "Separe honorário técnico, custos externos e responsabilidades.",
    ],
  ][number - 1];
  return (
    <section className="module-recap">
      <p>
        <BookOpenCheck size={15} strokeWidth={2.4} /> VOCÊ CHEGOU AO FIM DO
        MÓDULO
      </p>
      <h2>{recaps[0]}</h2>
      <span>{recaps[1]}</span>
      <button
        type="button"
        className={
          completed ? "module-finish-button done" : "module-finish-button"
        }
        onClick={onToggle}
        aria-pressed={completed}
      >
        {completed ? (
          <>
            <Check size={16} strokeWidth={3} /> Módulo concluído
          </>
        ) : (
          <>
            <Check size={16} strokeWidth={3} /> Concluir módulo
          </>
        )}
      </button>
    </section>
  );
}

function NativeCourseContent({
  module,
  lessons,
  completedLessons,
  textMarks,
  annotations,
  onToggleLesson,
  onToggleTextMark,
  onUpdateAnnotation,
}: {
  module: number;
  lessons: readonly string[];
  completedLessons: Record<string, boolean>;
  textMarks: TextMark[];
  annotations: Record<string, string>;
  onToggleLesson: (lesson: string) => void;
  onToggleTextMark: (
    mark: Omit<TextMark, "id" | "style">,
    style: TextMarkStyle,
  ) => void;
  onUpdateAnnotation: (lesson: string, value: string) => void;
}) {
  const [blocks, setBlocks] = useState<CourseBlock[] | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [selectedMark, setSelectedMark] = useState<Omit<
    TextMark,
    "id" | "style"
  > | null>(null);
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });
  const courseRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let active = true;
    fetch("/course-content.json")
      .then((response) =>
        response.ok
          ? (response.json() as Promise<{ blocks: CourseBlock[] }>)
          : Promise.reject(new Error("content-unavailable")),
      )
      .then((data) => {
        if (active)
          setBlocks(data.blocks.filter((block) => block.module === module));
      })
      .catch(() => {
        if (active) setBlocks([]);
      });
    return () => {
      active = false;
    };
  }, [module]);

  const renderHeading = (text: string, level?: number | null) => {
    const sectionCode = text.match(/^(\d+\.\d+)/)?.[1];
    const id = sectionCode
      ? `lesson-${sectionCode.replace(".", "-")}`
      : undefined;
    const lesson = sectionCode
      ? lessons.find((item) => item.startsWith(sectionCode))
      : undefined;
    const completed = lesson
      ? Boolean(completedLessons[`${module - 1}:${lesson}`])
      : false;
    const noteKey = lesson ? `${module - 1}:${lesson}` : "";
    const heading =
      level === 4 ? (
        <h4 id={id}>{text}</h4>
      ) : level === 3 ? (
        <h3 id={id}>{text}</h3>
      ) : (
        <h2 id={id}>{text}</h2>
      );
    if (!lesson) return heading;
    return (
      <>
        <div className="topic-heading-row">
          {heading}
          <button
            type="button"
            className={
              completed ? "topic-finish-button done" : "topic-finish-button"
            }
            onClick={() => onToggleLesson(lesson)}
            aria-pressed={completed}
          >
            {completed ? (
              <>
                <Check size={14} strokeWidth={3} /> Concluído
              </>
            ) : (
              <>
                <Check size={14} strokeWidth={3} /> Marcar tópico
              </>
            )}
          </button>
        </div>
        <details className="topic-annotation">
          <summary>
            <FileText size={13} /> Anotação local
          </summary>
          <textarea
            value={annotations[noteKey] || ""}
            onChange={(event) => onUpdateAnnotation(lesson, event.target.value)}
            placeholder="Registre uma observação deste tópico…"
          />
        </details>
      </>
    );
  };
  const renderHighlightedText = (text: string, blockId: string) => {
    const mark = [...textMarks]
      .reverse()
      .find(
        (item) =>
          item.text.length > 2 &&
          (item.blockId === blockId
            ? item.start !== undefined && item.end !== undefined
            : text.includes(item.text)),
      );
    if (!mark) return text;
    if (
      mark.blockId === blockId &&
      mark.start !== undefined &&
      mark.end !== undefined
    )
      return (
        <>
          {text.slice(0, mark.start)}
          <mark className={`text-mark text-mark-${mark.style}`}>
            {text.slice(mark.start, mark.end)}
          </mark>
          {text.slice(mark.end)}
        </>
      );
    return text.split(mark.text).map((part, index, pieces) => (
      <span key={`${part}-${index}`}>
        {part}
        {index < pieces.length - 1 && (
          <mark className={`text-mark text-mark-${mark.style}`}>
            {mark.text}
          </mark>
        )}
      </span>
    ));
  };
  const captureSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString() || "";
    const anchorElement =
      selection?.anchorNode?.nodeType === Node.ELEMENT_NODE
        ? (selection.anchorNode as Element)
        : selection?.anchorNode?.parentElement;
    if (
      !selection?.anchorNode ||
      !anchorElement?.closest(".lesson") ||
      text.length < 3 ||
      text.length > 320
    )
      return;
    const range = selection.getRangeAt(0);
    const block = anchorElement.closest<HTMLElement>(
      "[data-reader-block], p, li, h1, h2, h3, h4, td, th, figcaption",
    );
    if (!block || !block.contains(range.commonAncestorContainer)) return;
    if (!block.dataset.readerBlock)
      block.dataset.readerBlock = `reader-${module}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const prefix = document.createRange();
    prefix.selectNodeContents(block);
    prefix.setEnd(range.startContainer, range.startOffset);
    const start = prefix.toString().length;
    const end = start + text.length;
    const rect = range.getBoundingClientRect();
    setSelectionPosition({
      x: Math.min(
        Math.max(rect.left + rect.width / 2, 118),
        window.innerWidth - 118,
      ),
      y: rect.top > 76 ? rect.top - 10 : rect.bottom + 10,
    });
    setSelectedText(text);
    setSelectedMark({ text, blockId: block.dataset.readerBlock, start, end });
  };

  const applySelectionStyle = (style: TextMarkStyle) => {
    const command =
      style === "highlight"
        ? "hiliteColor"
        : style === "underline"
          ? "underline"
          : style === "italic"
            ? "italic"
            : "strikeThrough";
    document.execCommand(
      command,
      false,
      style === "highlight" ? "#c6d783" : undefined,
    );
  };

  useEffect(() => {
    const handleMouseUp = () => window.requestAnimationFrame(captureSelection);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  });

  if (blocks === null)
    return (
      <section className="native-course">
        <p className="native-label">CONTEÚDO COMPLETO DO MÓDULO</p>
        <div className="source-loading">Organizando as aulas deste módulo…</div>
      </section>
    );
  if (!blocks.length)
    return (
      <section className="native-course">
        <div className="warning">
          <b>Conteúdo indisponível</b>
          <p>
            Não foi possível carregar esta aula. Atualize a página para tentar
            novamente.
          </p>
        </div>
      </section>
    );

  return (
    <section className="native-course" ref={courseRef}>
      <div className="native-course-head">
        <p className="native-label">CONTEÚDO COMPLETO DO MÓDULO</p>
        <h2>Aulas, exemplos e referências técnicas</h2>
        <p>
          Todo o conteúdo da apostila-mestre foi convertido para esta leitura
          digital. Use o sumário lateral para acessar cada aula.
        </p>
      </div>
      {selectedText && (
        <div
          className="selection-tools"
          role="toolbar"
          aria-label="Formatar texto selecionado"
          style={{ left: selectionPosition.x, top: selectionPosition.y }}
        >
          {(
            [
              ["highlight", Highlighter, "Marca-texto"],
              ["underline", Underline, "Sublinhar"],
              ["italic", Italic, "Itálico"],
              ["strike", Strikethrough, "Tachar"],
            ] as const
          ).map(([style, Icon, label]) => (
            <button
              key={style}
              type="button"
              title={label}
              aria-label={label}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                applySelectionStyle(style);
                if (selectedMark) onToggleTextMark(selectedMark, style);
                setSelectedText("");
                setSelectedMark(null);
                window.getSelection()?.removeAllRanges();
              }}
            >
              <Icon size={15} strokeWidth={2.2} />
            </button>
          ))}
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              setSelectedText("");
              setSelectedMark(null);
            }}
            aria-label="Cancelar seleção"
          >
            ×
          </button>
        </div>
      )}
      <div className="native-blocks">
        {blocks.map((block, index) =>
          block.type === "table" ? (
            <div className="native-table-wrap" key={`table-${index}`}>
              <table>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={`${index}-${rowIndex}`}>
                      {row.map((cell, cellIndex) =>
                        rowIndex === 0 ? (
                          <th key={`${index}-${rowIndex}-${cellIndex}`}>
                            {cell}
                          </th>
                        ) : (
                          <td key={`${index}-${rowIndex}-${cellIndex}`}>
                            {cell}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : block.type === "heading" ? (
            <div className="native-heading" key={`heading-${index}`}>
              {renderHeading(block.text, block.level)}
              {block.level === 2 && /^\d+\.\d+/.test(block.text) && (
                <figure className={`topic-visual topic-visual-${index % 4}`}>
                  <img
                    src={moduleVisuals[module - 1]}
                    alt={`Ilustração editorial para ${block.text}`}
                    loading="lazy"
                  />
                </figure>
              )}
            </div>
          ) : (
            <p
              className="native-paragraph"
              data-reader-block={`paragraph-${index}`}
              key={`paragraph-${index}`}
            >
              {renderHighlightedText(block.text, `paragraph-${index}`)}
            </p>
          ),
        )}
      </div>
    </section>
  );
}

function ModalidadesContent() {
  return (
    <>
      <p className="lesson-lead">
        PETC, AVIH e AVI não são apenas siglas: cada modalidade define onde o
        animal viaja, como é feita a operação e o que precisa ser confirmado
        antes da documentação.
      </p>
      <figure className="hero-visual">
        <img
          src="/images/embarpet-hero-pet-travel.png"
          alt="Cão tranquilo ao lado de caixa de transporte em um aeroporto, acompanhado pela tutora"
        />
        <figcaption>
          Planejamento, documentação e cuidado: a viagem começa muito antes do
          embarque.
        </figcaption>
      </figure>
      <section className="objective">
        <p>OBJETIVO DO MÓDULO</p>
        <ul>
          <li>
            Reconhecer as diferenças entre cabine, bagagem acompanhada e carga
            viva.
          </li>
          <li>Identificar limites operacionais e riscos de cada modalidade.</li>
          <li>Escolher a modalidade antes de emitir qualquer documento.</li>
        </ul>
      </section>
      <h2>Como decidir a modalidade</h2>
      <div className="decision-grid">
        <div>
          <b>1. Onde o pet pode viajar?</b>
          <span>
            Cabine, porão acompanhado ou carga, conforme rota e companhia.
          </span>
        </div>
        <div>
          <b>2. O caso atende aos limites?</b>
          <span>
            Peso, caixa ou bolsa, espécie, conexão e condições operacionais.
          </span>
        </div>
        <div>
          <b>3. O destino aceita?</b>
          <span>
            Valide exigências sanitárias e regras locais antes de fechar a rota.
          </span>
        </div>
      </div>
      <h2>PETC: Pet in Cabin</h2>
      <p>
        No PETC, o animal viaja na cabine com o tutor, acomodado em bolsa
        apropriada sob o assento. A autorização depende das regras da companhia
        aérea, do destino, do peso total e das condições físicas e
        comportamentais do animal.
      </p>
      <div className="method">
        <p>QUANDO CONSIDERAR</p>
        <ol>
          <li>
            Animal de pequeno porte, clinicamente saudável e adaptado à bolsa.
          </li>
          <li>Peso e dimensões dentro do limite da companhia aérea.</li>
          <li>Rota e país de destino aceitam a modalidade.</li>
        </ol>
      </div>
      <h2>AVIH: Animal in Hold</h2>
      <p>
        No AVIH, o animal viaja no compartimento de cargas vivas no mesmo voo do
        tutor. Ele fica em caixa rígida, seguindo os requisitos aplicáveis da
        companhia aérea e da IATA. Não confunda com AVI: o AVIH permanece
        vinculado à passagem do tutor.
      </p>
      <h2>AVI: Live Animals Cargo</h2>
      <p>
        No AVI, o animal é transportado como carga aérea independente, com
        processo logístico próprio. Pode ser necessário quando o destino ou a
        companhia exige carga, quando o tutor não viaja no mesmo voo ou quando
        os limites operacionais impedem PETC e AVIH.
      </p>
      <div className="warning">
        <b>Decisão técnica</b>
        <p>
          Para raças braquicefálicas, evite afirmações absolutas. A decisão deve
          considerar condição clínica individual, histórico respiratório, rota,
          ambiente e política da companhia aérea.
        </p>
      </div>
      <h2>Situações especiais</h2>
      <div className="special-cases">
        <section>
          <span>CÃO DE SERVIÇO</span>
          <h3>Assistência com tarefa treinada</h3>
          <p>
            É o cão treinado para executar tarefas diretamente relacionadas à
            deficiência de uma pessoa. A condição deve ser avaliada conforme as
            regras da companhia e do destino, junto da documentação sanitária
            aplicável.
          </p>
        </section>
        <section>
          <span>SUPORTE EMOCIONAL</span>
          <h3>Não é a mesma categoria</h3>
          <p>
            O animal de suporte emocional oferece conforto, mas não precisa de
            treinamento de tarefa. Muitas companhias e destinos o tratam como
            pet regular; um laudo, por si só, não garante transporte em cabine.
          </p>
        </section>
        <section>
          <span>LIMINAR</span>
          <h3>Medida excepcional</h3>
          <p>
            Uma liminar é uma decisão judicial individual, não uma modalidade de
            transporte. Ela pode afetar uma política da companhia, mas não
            substitui a avaliação operacional nem os requisitos sanitários do
            destino.
          </p>
        </section>
      </div>
      <div className="method">
        <p>ANTES DE ORIENTAR O TUTOR</p>
        <ol>
          <li>Confirme a modalidade realmente aceita naquela rota e data.</li>
          <li>
            Separe documentos sanitários, formulários da companhia e eventuais
            comprovantes específicos.
          </li>
          <li>
            Registre as confirmações importantes e explique ao tutor o que ainda
            depende de validação.
          </li>
        </ol>
      </div>
      <Alert />
    </>
  );
}

function SanitarioContent() {
  return (
    <>
      <p className="lesson-lead">
        A exigência sanitária não nasce do animal isoladamente: ela depende do
        país de destino, da origem, do trânsito, da espécie e da data em que
        cada etapa foi realizada.
      </p>
      <section className="objective">
        <p>OBJETIVO DO MÓDULO</p>
        <ul>
          <li>Ler o requisito do destino antes de criar o cronograma.</li>
          <li>
            Distinguir documento sanitário, autorização de importação e aviso de
            chegada.
          </li>
          <li>Transformar regras técnicas em uma sequência verificável.</li>
        </ul>
      </section>
      <h2>Comece pelo destino, não pelo documento</h2>
      <p>
        Antes de orientar vacina, exame ou emissão de CVI, identifique o país de
        destino e as escalas. Depois, confirme a fonte oficial vigente e
        registre o requisito aplicável. A mesma etapa pode mudar conforme
        origem, espécie, idade do animal e tipo de entrada.
      </p>
      <div className="decision-grid">
        <div>
          <b>Origem e trânsito</b>
          <span>
            Verifique se o país de partida e as conexões alteram as exigências.
          </span>
        </div>
        <div>
          <b>Destino e espécie</b>
          <span>
            Separe o que é obrigatório para cão, gato e outras espécies.
          </span>
        </div>
        <div>
          <b>Data da viagem</b>
          <span>
            Conte prazos mínimos e validade dos documentos a partir da data real
            de embarque.
          </span>
        </div>
      </div>
      <h2>Os quatro blocos de conferência</h2>
      <div className="special-cases">
        <section>
          <span>1 · REQUISITO SANITÁRIO</span>
          <h3>Vacina, microchip e exames</h3>
          <p>
            O destino pode definir identificação por microchip, vacinação
            antirrábica, tratamento parasitário, sorologia e outros exames. A
            ordem e as datas importam: uma etapa feita fora da sequência exigida
            pode não ser aceita.
          </p>
        </section>
        <section>
          <span>2 · AUTORIZAÇÃO</span>
          <h3>Import Permit</h3>
          <p>
            Alguns destinos exigem permissão prévia de importação. Ela não se
            confunde com o CVI e normalmente precisa estar aprovada antes do
            embarque. Confirme órgão emissor, prazo, validade e dados que devem
            coincidir com os documentos do pet.
          </p>
        </section>
        <section>
          <span>3 · CHEGADA</span>
          <h3>Notificação e ponto de entrada</h3>
          <p>
            Há países que pedem aviso de chegada, agendamento de inspeção ou
            entrada por aeroporto específico. Registre quem envia, quando envia
            e qual comprovante deve acompanhar o processo.
          </p>
        </section>
        <section>
          <span>4 · CERTIFICAÇÃO</span>
          <h3>CVI e respaldo documental</h3>
          <p>
            O CVI formaliza a certificação sanitária para o destino, mas é
            emitido com base no histórico do animal e nos documentos corretos. A
            conferência deve incluir dados do tutor, identificação, vacinações,
            exames e anexos exigidos.
          </p>
        </section>
      </div>
      <h2>Sorologia antirrábica: trate como cronograma</h2>
      <p>
        Quando exigida, a sorologia envolve coleta, laboratório aceito,
        resultado e, em alguns casos, período de espera posterior. Não prometa
        prazo apenas olhando a data da coleta: valide o protocolo completo do
        destino e mantenha o laudo original no dossiê.
      </p>
      <div className="method">
        <p>ROTINA DE CONFERÊNCIA</p>
        <ol>
          <li>
            Confirme se a sorologia é exigida para a origem e para a rota.
          </li>
          <li>
            Valide a identificação do pet antes da coleta e o laboratório aceito
            pelo destino.
          </li>
          <li>
            Registre data da coleta, resultado, validade e possível período de
            espera.
          </li>
        </ol>
      </div>
      <h2>Respaldo: o dossiê que sustenta o CVI</h2>
      <p>
        Respaldo é a organização das evidências que demonstram o cumprimento da
        regra. Reúna originais e cópias legíveis da carteira de vacinação,
        certificado de microchip, laudos, tratamentos, permissões e formulários.
        Divergência de nome, data, identificação ou espécie deve ser corrigida
        antes da emissão.
      </p>
      <div className="warning">
        <b>Não use uma lista genérica como regra final</b>
        <p>
          Quadros-resumo são ótimos para organizar. A confirmação final deve
          sempre ser feita na fonte oficial vigente do destino e nos canais de
          emissão aplicáveis.
        </p>
      </div>
      <Alert />
    </>
  );
}

function PlanejamentoContent() {
  return (
    <>
      <p className="lesson-lead">
        Assessoria não é apenas reunir documentos. É transformar uma viagem
        complexa em um plano técnico, com decisões tomadas na ordem certa e
        margem para ajustes.
      </p>
      <section className="objective">
        <p>OBJETIVO DO MÓDULO</p>
        <ul>
          <li>Fazer o diagnóstico antes de prometer prazo ou modalidade.</li>
          <li>Organizar rota, exigências e responsáveis em um único plano.</li>
          <li>Antecipar pontos de risco antes que eles virem urgência.</li>
        </ul>
      </section>
      <h2>O diagnóstico vem antes da cotação</h2>
      <p>
        O primeiro contato precisa revelar o que muda o processo: destino, data,
        espécie, raça, idade, condição clínica, cidade de origem, rota desejada,
        acompanhante e histórico sanitário. Sem isso, uma orientação pode
        parecer simples, mas estar baseada em premissas erradas.
      </p>
      <div className="decision-grid">
        <div>
          <b>Viagem</b>
          <span>
            Destino final, escalas, data desejada, aeroporto de origem e
            acompanhante.
          </span>
        </div>
        <div>
          <b>Animal</b>
          <span>
            Espécie, raça, porte, idade, peso, caixa, comportamento e condição
            clínica.
          </span>
        </div>
        <div>
          <b>Histórico</b>
          <span>
            Microchip, vacinas, exames, documentos já emitidos e pendências
            conhecidas.
          </span>
        </div>
      </div>
      <h2>O método Embarpet para organizar o caso</h2>
      <div className="special-cases">
        <section>
          <span>ETAPA 1 · DIAGNÓSTICO</span>
          <h3>Entender o caso real</h3>
          <p>
            Registre as informações do tutor e identifique decisões que não
            podem esperar: modalidade, elegibilidade da rota, exigências
            sanitárias e janela de viagem.
          </p>
        </section>
        <section>
          <span>ETAPA 2 · VALIDAÇÃO</span>
          <h3>Confirmar antes de orientar</h3>
          <p>
            Consulte as fontes do destino, as políticas operacionais da
            companhia e, quando aplicável, o agente de carga. Separe o que está
            confirmado do que ainda exige retorno.
          </p>
        </section>
        <section>
          <span>ETAPA 3 · CRONOGRAMA</span>
          <h3>Voltar da data de embarque</h3>
          <p>
            Monte as etapas de trás para frente. Inclua prazo de exames,
            períodos de espera, validade de documentos, emissão do CVI, reserva
            do pet e uma margem de segurança.
          </p>
        </section>
        <section>
          <span>ETAPA 4 · ACOMPANHAMENTO</span>
          <h3>Conduzir até o embarque</h3>
          <p>
            Atualize o tutor com clareza, revise documentos e confirme reserva,
            caixa e chegada ao aeroporto. A experiência melhora quando cada
            responsável sabe sua próxima ação.
          </p>
        </section>
      </div>
      <h2>Rota: não é só o menor preço</h2>
      <p>
        Uma rota tecnicamente adequada considera conexões, tempo de espera,
        aeroportos que aceitam animais, trecho operado por parceiro,
        sazonalidade, modalidade disponível e regras do destino. Alterar um voo
        pode alterar também a viabilidade do processo; por isso, a validação vem
        antes da emissão definitiva.
      </p>
      <div className="method">
        <p>CHECKPOINT ANTES DA EMISSÃO</p>
        <ol>
          <li>
            Modalidade confirmada para todos os trechos, inclusive conexões e
            code-share.
          </li>
          <li>
            Data compatível com cada etapa sanitária e com a validade dos
            documentos.
          </li>
          <li>
            Reserva do animal, aeroporto de entrada e necessidade de carga ou
            inspeção validados.
          </li>
        </ol>
      </div>
      <h2>Margem de segurança é parte do cuidado</h2>
      <p>
        Não trabalhe no limite de prazo. Recoleta de exame, correção de dados,
        indisponibilidade de agenda, alteração de voo e retorno de autorização
        podem acontecer. A margem não é excesso de tempo: é proteção para o
        animal, para o tutor e para a qualidade do serviço.
      </p>
      <Alert />
    </>
  );
}

function CaixasContent() {
  return (
    <>
      <p className="lesson-lead">
        A caixa ou bolsa precisa funcionar para o pet e para a operação.
        Conforto, medidas, ventilação e compatibilidade com a companhia precisam
        ser confirmados antes da reserva.
      </p>
      <figure className="hero-visual hero-visual-compact">
        <img
          src="/images/embarpet-crate-preparation.png"
          alt="Cão confortável dentro de caixa de transporte enquanto a tutora confere a porta e o recipiente de água"
        />
        <figcaption>
          Uma caixa adequada combina espaço, segurança e adaptação gradual do
          pet.
        </figcaption>
      </figure>
      <section className="objective">
        <p>OBJETIVO DO MÓDULO</p>
        <ul>
          <li>Escolher o tipo correto de acomodação para cada modalidade.</li>
          <li>Medir o pet de forma útil para a avaliação técnica.</li>
          <li>
            Preparar o animal para viajar com mais segurança e menos estresse.
          </li>
        </ul>
      </section>
      <h2>Bolsa e caixa têm papéis diferentes</h2>
      <div className="special-cases">
        <section>
          <span>PETC · BOLSA DE CABINE</span>
          <h3>Flexível, segura e compatível</h3>
          <p>
            Para cabine, a bolsa normalmente precisa caber sob o assento e
            permitir que o animal permaneça acomodado durante o voo. Confirme
            dimensões, peso total permitido, ventilação, fechamento seguro e
            aceitação da companhia para a rota.
          </p>
        </section>
        <section>
          <span>AVIH E AVI · CAIXA RÍGIDA</span>
          <h3>Estrutura para transporte aéreo</h3>
          <p>
            Para porão acompanhado ou carga, a caixa é parte da segurança
            operacional. Ela deve ser resistente, ventilada, ter porta segura e
            dimensões adequadas para o animal se posicionar com conforto,
            conforme os requisitos aplicáveis da companhia e da IATA.
          </p>
        </section>
      </div>
      <h2>Medidas do animal: avalie, não adivinhe</h2>
      <p>
        As medidas servem para definir se o animal consegue ficar em pé, virar e
        deitar de forma natural. Registre comprimento do focinho à base da
        cauda, altura do chão ao topo da cabeça ou ponta da orelha, largura e
        peso. Não escolha a caixa apenas pelo peso ou pelo “tamanho de raça”.
      </p>
      <div className="decision-grid">
        <div>
          <b>Em pé</b>
          <span>
            O animal deve manter postura natural sem encostar de forma contínua
            no teto.
          </span>
        </div>
        <div>
          <b>Girando</b>
          <span>
            Ele precisa conseguir mudar de posição dentro da caixa com
            segurança.
          </span>
        </div>
        <div>
          <b>Deitado</b>
          <span>
            Deve haver espaço para descansar sem ficar comprimido ou curvado.
          </span>
        </div>
      </div>
      <h2>Checklist técnico da caixa</h2>
      <div className="method">
        <p>ANTES DE APROVAR</p>
        <ol>
          <li>
            Confirme medidas internas, peso total, tipo de porta e ventilação
            nos quatro lados quando aplicável.
          </li>
          <li>
            Verifique se a montagem, travas, parafusos e acessórios são aceitos
            pela companhia aérea.
          </li>
          <li>
            Garanta identificação externa, contato atualizado, tapete absorvente
            e recipientes apropriados para água e alimento.
          </li>
          <li>
            Revise exigências adicionais da rota, do aeroporto e da modalidade
            escolhida.
          </li>
        </ol>
      </div>
      <h2>Adaptação é parte da preparação</h2>
      <p>
        O pet não deve conhecer a bolsa ou caixa apenas no dia da viagem.
        Oriente o tutor a apresentar o espaço de forma gradual, associando-o a
        descanso e recompensa, sem forçar a entrada. A adaptação ajuda a reduzir
        ansiedade e também permite observar se o tamanho escolhido realmente
        funciona.
      </p>
      <div className="warning">
        <b>Caixa aprovada não substitui avaliação do caso</b>
        <p>
          Mesmo uma caixa adequada pode não ser aceita se houver divergência com
          a modalidade, o tipo de aeronave, a política da companhia ou a
          condição do animal. Confirme o conjunto completo antes de emitir a
          reserva.
        </p>
      </div>
      <Alert />
    </>
  );
}

function DocumentacaoContent() {
  return (
    <>
      <p className="lesson-lead">
        O CVI é a etapa de certificação, não o ponto de partida. Um processo
        seguro começa com o histórico veterinário correto, documentos coerentes
        e uma conferência feita antes de chegar à emissão.
      </p>
      <figure className="hero-visual hero-visual-compact">
        <img
          src="/images/embarpet-documentacao-cvi.png"
          alt="Veterinária revisando documentos com cão tranquilo e itens de identificação sobre a mesa"
        />
        <figcaption>
          O dossiê organizado sustenta uma emissão segura e reduz retrabalho no
          processo.
        </figcaption>
      </figure>
      <section className="objective">
        <p>OBJETIVO DO MÓDULO</p>
        <ul>
          <li>
            Organizar os documentos que sustentam a certificação sanitária.
          </li>
          <li>
            Evitar divergências entre identificação, vacinações, exames e dados
            do tutor.
          </li>
          <li>
            Entender a diferença entre preparo, emissão e conferência final do
            CVI.
          </li>
        </ul>
      </section>
      <h2>O dossiê vem antes do certificado</h2>
      <p>
        Antes de iniciar a emissão, reúna a documentação exigida para o destino
        e confira se as informações contam a mesma história. Nome do tutor,
        espécie, sexo, raça, data de nascimento, identificação do animal, datas
        de vacina e resultados de exames precisam estar consistentes.
      </p>
      <div className="special-cases">
        <section>
          <span>IDENTIFICAÇÃO</span>
          <h3>Microchip e dados do pet</h3>
          <p>
            Quando exigido, o microchip precisa estar registrado corretamente e
            compatível com os demais documentos. Confira leitura, numeração e a
            sequência exigida pelo destino antes de vincular vacinações ou
            exames.
          </p>
        </section>
        <section>
          <span>HISTÓRICO SANITÁRIO</span>
          <h3>Vacinas, tratamentos e exames</h3>
          <p>
            Carteira de vacinação, certificados, resultados laboratoriais e
            comprovantes de tratamentos compõem a base do processo. Confirme
            prazo, validade, fabricante e datas antes de assumir que uma etapa
            está cumprida.
          </p>
        </section>
        <section>
          <span>INFORMAÇÕES DA VIAGEM</span>
          <h3>Destino, rota e responsável</h3>
          <p>
            O certificado deve refletir o caso real: país de destino, finalidade
            da viagem, tutor ou responsável e dados do trajeto quando aplicável.
            Mudanças de rota ou data exigem nova revisão.
          </p>
        </section>
      </div>
      <h2>Sequência de conferência</h2>
      <div className="decision-grid">
        <div>
          <b>1. Conferir origem</b>
          <span>
            Use os documentos originais e identifique pendências, divergências e
            datas críticas.
          </span>
        </div>
        <div>
          <b>2. Validar requisito</b>
          <span>
            Compare o dossiê com a regra vigente do destino antes de preencher
            qualquer certificado.
          </span>
        </div>
        <div>
          <b>3. Emitir e revisar</b>
          <span>
            Preencha, revise cada campo e valide anexos, assinaturas e prazo de
            utilização.
          </span>
        </div>
      </div>
      <h2>Emissão presencial e e-CVI</h2>
      <p>
        A modalidade de emissão depende do destino e dos canais disponíveis para
        aquele processo. Em alguns casos, o fluxo pode ser eletrônico; em
        outros, pode exigir atendimento presencial. Não trate a ferramenta de
        emissão como confirmação de elegibilidade: ela apenas formaliza um
        processo já validado.
      </p>
      <div className="method">
        <p>ANTES DE SOLICITAR A EMISSÃO</p>
        <ol>
          <li>
            Confirme que todos os requisitos sanitários foram cumpridos dentro
            das janelas exigidas.
          </li>
          <li>
            Revise a grafia dos nomes, o número do microchip e as datas contra
            os originais.
          </li>
          <li>
            Valide o formato de emissão, documentos anexos, local de atendimento
            e prazo para usar o CVI.
          </li>
          <li>
            Guarde cópia organizada do certificado emitido e de todos os
            respaldos.
          </li>
        </ol>
      </div>
      <h2>Responsabilidade técnica</h2>
      <p>
        Quem orienta precisa distinguir o que foi declarado pelo tutor, o que
        foi comprovado por documento e o que foi validado na fonte oficial. Se
        existir inconsistência, ela deve ser esclarecida antes da emissão.
        Corrigir depois do certificado pronto pode afetar prazo, custo e
        viabilidade do embarque.
      </p>
      <div className="warning">
        <b>Conferência final obrigatória</b>
        <p>
          Antes de liberar o tutor para o aeroporto, compare novamente a versão
          final do CVI, os anexos, a reserva do animal e a data real da viagem.
          O documento certo para uma viagem em outra data pode deixar de servir.
        </p>
      </div>
      <Alert />
    </>
  );
}

function GestaoContent() {
  return (
    <>
      <p className="lesson-lead">
        O valor da assessoria está na leitura correta do caso, na organização do
        processo e na redução de riscos. Precificar bem é tornar esse trabalho
        visível, sem simplificar uma operação que exige responsabilidade.
      </p>
      <section className="objective">
        <p>OBJETIVO DO MÓDULO</p>
        <ul>
          <li>Definir com clareza o que está incluído em cada serviço.</li>
          <li>Separar honorários técnicos de custos de terceiros.</li>
          <li>
            Construir uma comunicação comercial transparente e profissional.
          </li>
        </ul>
      </section>
      <h2>Venda escopo, não promessa genérica</h2>
      <p>
        O tutor precisa entender o que a Embarpet fará, o que depende de fontes
        externas e quais decisões ainda precisam de validação. Uma proposta bem
        estruturada reduz ruído, protege o relacionamento e mostra que
        planejamento é cuidado.
      </p>
      <div className="special-cases">
        <section>
          <span>DIAGNÓSTICO E PLANEJAMENTO</span>
          <h3>Entender o caso e definir o caminho</h3>
          <p>
            Inclui análise inicial, rota, modalidade, cronograma e identificação
            de exigências. É a base para uma orientação responsável — e não deve
            ser tratada como conversa informal sem valor técnico.
          </p>
        </section>
        <section>
          <span>ASSESSORIA DOCUMENTAL</span>
          <h3>Organizar, conferir e acompanhar</h3>
          <p>
            Inclui orientação de documentos, revisão de dados, acompanhamento de
            etapas e preparação para emissão. Descreva limites do serviço e
            quais documentos continuam sob responsabilidade do tutor ou do
            médico-veterinário responsável.
          </p>
        </section>
        <section>
          <span>OPERAÇÃO E LOGÍSTICA</span>
          <h3>Coordenar o que precisa acontecer</h3>
          <p>
            Pode envolver reserva do animal, caixa, contato com companhia,
            agente de carga e orientação de embarque. Cada item precisa indicar
            se está incluso, se é opcional ou se será contratado à parte.
          </p>
        </section>
      </div>
      <h2>Formação de preço com transparência</h2>
      <p>
        O preço deve refletir tempo técnico, complexidade sanitária, quantidade
        de destinos ou escalas, modalidade de transporte, urgência, número de
        animais, fornecedores envolvidos e necessidade de acompanhamento. Custos
        de companhia aérea, taxas, exames, caixa, despachante e órgãos públicos
        não devem se misturar ao honorário sem explicação.
      </p>
      <div className="decision-grid">
        <div>
          <b>Honorário técnico</b>
          <span>
            Remunera análise, planejamento, conferência, comunicação e
            responsabilidade profissional.
          </span>
        </div>
        <div>
          <b>Custos de terceiros</b>
          <span>
            São valores de companhias, laboratórios, órgãos, agentes e
            fornecedores; informe como estimativa ou conforme cotação.
          </span>
        </div>
        <div>
          <b>Adicionais de complexidade</b>
          <span>
            Urgência, rota especial, carga, múltiplos pets e acompanhamento
            podem compor itens claros na proposta.
          </span>
        </div>
      </div>
      <h2>Proposta que dá segurança ao tutor</h2>
      <div className="method">
        <p>ESTRUTURA ESSENCIAL</p>
        <ol>
          <li>
            Resumo do caso: animal, destino, período e objetivo da viagem.
          </li>
          <li>
            Escopo incluído: entregas, acompanhamento e responsabilidades da
            Embarpet.
          </li>
          <li>
            Fora de escopo: taxas, serviços de terceiros, documentos que
            dependem do tutor e exceções.
          </li>
          <li>
            Investimento, forma de pagamento, validade da proposta e condições
            para início.
          </li>
          <li>
            Premissas: confirmação de regras vigentes, disponibilidade de voo e
            aprovação de documentos.
          </li>
        </ol>
      </div>
      <h2>Comunicação é parte da entrega</h2>
      <p>
        Atualizações objetivas evitam ansiedade e retrabalho. Em cada contato,
        informe o que foi concluído, o que está pendente, quem é responsável e
        qual a próxima data relevante. Quando houver risco ou mudança de regra,
        explique o impacto e apresente o próximo passo possível — sem gerar
        medo.
      </p>
      <div className="warning">
        <b>Posicionamento profissional</b>
        <p>
          A Embarpet não vende apenas um certificado ou uma reserva. Ela conduz
          um processo que envolve bem-estar animal, família, regras sanitárias e
          operação internacional. O preço precisa refletir essa
          responsabilidade.
        </p>
      </div>
      <Alert />
    </>
  );
}

function ComingContent({ number }: { number: number }) {
  return (
    <>
      <p className="lesson-lead">
        Este módulo será aprofundado na próxima etapa, usando a mesma lógica:
        explicação objetiva, aplicação prática e pontos que exigem confirmação.
      </p>
      <section className="objective">
        <p>NESTE MÓDULO</p>
        <ul>
          <li>Entenda a lógica antes de atuar no caso.</li>
          <li>Organize as informações em uma sequência clara.</li>
          <li>
            Confirme requisitos sanitários e operacionais nas fontes vigentes.
          </li>
        </ul>
      </section>
      <h2>Como aplicar</h2>
      <p>
        Use a apostila para orientar o raciocínio técnico e registrar o que foi
        validado. O conteúdo específico do Módulo {number} será incluído na
        sequência.
      </p>
      <Alert />
    </>
  );
}

function Checklist({
  checks,
  setChecks,
  travel,
  onTravelChange,
  onExport,
}: {
  checks: boolean[];
  setChecks: (values: boolean[]) => void;
  travel: TravelData;
  onTravelChange: (value: TravelData) => void;
  onExport: () => void;
}) {
  const completed = checks.filter(Boolean).length;
  const update = (field: keyof TravelData, value: string) =>
    onTravelChange({ ...travel, [field]: value });
  return (
    <>
      <h1>Checklist de embarque do pet</h1>
      <p className="lesson-lead">
        Confira o processo deste perfil antes de sair para o aeroporto. Os
        campos e a conferência ficam salvos localmente.
      </p>
      <div className="tool-bento checklist-bento">
        <section className="travel-card">
          <div>
            <UserRound size={17} />
            <label>
              Tutor
              <input
                value={travel.tutor}
                onChange={(event) => update("tutor", event.target.value)}
                placeholder="Nome do tutor"
              />
            </label>
          </div>
          <div>
            <PawPrint size={17} />
            <label>
              Pet
              <input
                value={travel.pet}
                onChange={(event) => update("pet", event.target.value)}
                placeholder="Nome do pet"
              />
            </label>
          </div>
          <div>
            <MapPin size={17} />
            <label>
              Destino
              <input
                value={travel.destination}
                onChange={(event) => update("destination", event.target.value)}
                placeholder="País ou cidade"
              />
            </label>
          </div>
          <div>
            <CalendarDays size={17} />
            <label>
              Viagem
              <input
                type="date"
                value={travel.date}
                onChange={(event) => update("date", event.target.value)}
              />
            </label>
          </div>
          <div>
            <Plane size={17} />
            <label>
              Modalidade
              <select
                value={travel.modality}
                onChange={(event) => update("modality", event.target.value)}
              >
                <option value="">A confirmar</option>
                <option>PETC</option>
                <option>AVIH</option>
                <option>AVI</option>
              </select>
            </label>
          </div>
        </section>
        <div className="checklist-progress">
          <span>Conferência do processo</span>
          <b>
            {completed}/{checklist.length}
          </b>
          <i>
            <em style={{ width: `${(completed / checklist.length) * 100}%` }} />
          </i>
        </div>
        <div className="checklist">
          {checklist.map((item, index) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={checks[index]}
                onChange={() =>
                  setChecks(
                    checks.map((value, position) =>
                      position === index ? !value : value,
                    ),
                  )
                }
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <div className="tool-actions">
          <button
            className="clear"
            onClick={() => setChecks(checklist.map(() => false))}
          >
            Limpar checklist
          </button>
          <button className="export-pdf" onClick={onExport}>
            Baixar PDF personalizado
          </button>
        </div>
        <section className="attention-panel">
          <b>
            <AlertTriangle size={17} /> Pontos de atenção
          </b>
          <div>
            {attentionPoints.map((point, index) => (
              <p key={point}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {point}
              </p>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
function Cronograma({
  value,
  onChange,
  travel,
  onTravelChange,
  technicalChecks,
  setTechnicalChecks,
  validationChecks,
  setValidationChecks,
  validationNotes,
  setValidationNotes,
  onExport,
}: {
  value: Record<string, StageData>;
  onChange: (value: Record<string, StageData>) => void;
  travel: TravelData;
  onTravelChange: (value: TravelData) => void;
  technicalChecks: boolean[];
  setTechnicalChecks: (values: boolean[]) => void;
  validationChecks: boolean[];
  setValidationChecks: (values: boolean[]) => void;
  validationNotes: Record<string, string>;
  setValidationNotes: (value: Record<string, string>) => void;
  onExport: () => void;
}) {
  const updateStage = (stage: string, update: Partial<StageData>) =>
    onChange({
      ...value,
      [stage]: {
        date: "",
        status: "Pendente",
        completed: false,
        ...value[stage],
        ...update,
      },
    });
  const updateTravel = (field: keyof TravelData, nextValue: string) =>
    onTravelChange({ ...travel, [field]: nextValue });
  const toggle = (
    values: boolean[],
    index: number,
    setValues: (next: boolean[]) => void,
  ) =>
    setValues(
      values.map((item, position) => (position === index ? !item : item)),
    );
  const updateNote = (document: string, note: string) =>
    setValidationNotes({ ...validationNotes, [document]: note });
  const travelFields: Array<[keyof TravelData, string, string]> = [
    ["tutor", "Tutor", "Nome do tutor"],
    ["pet", "Pet", "Nome do pet"],
    ["speciesBreed", "Espécie / raça", "Ex.: cão · Golden Retriever"],
    ["destination", "País de destino", "Destino final"],
    ["date", "Data do embarque", ""],
    ["airline", "Companhia aérea", "Companhia responsável"],
    ["modality", "Modalidade", "PETC, AVIH ou AVI"],
    ["passenger", "Passageiro com o pet", "Nome do passageiro"],
    ["addressBrazil", "Endereço no Brasil", "Cidade e endereço"],
    ["addressAbroad", "Endereço no exterior", "Cidade e endereço"],
    ["phoneBrazil", "Telefone Brasil", "Contato com DDI"],
    ["phoneAbroad", "Telefone exterior", "Contato com DDI"],
  ];
  return (
    <>
      <h1>Cronograma sanitário e checklist técnico</h1>
      <p className="lesson-lead">
        Preencha no início da assessoria e mantenha atualizado até o embarque.
        Todas as etapas e conferências ficam salvas neste perfil.
      </p>
      <div className="tool-bento cronograma-bento">
        <section className="tool-section">
          <p className="tool-section-label">DADOS DA VIAGEM</p>
          <div className="travel-form">
            {travelFields.map(([field, label, placeholder]) => (
              <label key={field}>
                {label}
                {field === "date" ? (
                  <input
                    type="date"
                    value={travel[field]}
                    onChange={(event) =>
                      updateTravel(field, event.target.value)
                    }
                  />
                ) : (
                  <input
                    value={travel[field]}
                    placeholder={placeholder}
                    onChange={(event) =>
                      updateTravel(field, event.target.value)
                    }
                  />
                )}
              </label>
            ))}
          </div>
        </section>
        <section className="tool-section">
          <p className="tool-section-label">CRONOGRAMA SANITÁRIO</p>
          <div className="timeline full-timeline">
            {stages.map((stage, index) => (
              <div key={stage}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <span>{stage}</span>
                <input
                  aria-label={`Data de ${stage}`}
                  type="date"
                  value={value[stage]?.date || ""}
                  onChange={(event) =>
                    updateStage(stage, { date: event.target.value })
                  }
                />
                <label className="stage-complete">
                  <input
                    type="checkbox"
                    checked={Boolean(value[stage]?.completed)}
                    onChange={() =>
                      updateStage(stage, {
                        completed: !value[stage]?.completed,
                        status: !value[stage]?.completed
                          ? "Concluído"
                          : "Pendente",
                      })
                    }
                  />
                  Concluído
                </label>
              </div>
            ))}
          </div>
        </section>
        <section className="tool-section">
          <p className="tool-section-label">CHECKLIST TÉCNICO</p>
          <div className="checklist compact-checklist">
            {technicalChecklist.map((item, index) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={technicalChecks[index]}
                  onChange={() =>
                    toggle(technicalChecks, index, setTechnicalChecks)
                  }
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </section>
        <section className="tool-section">
          <p className="tool-section-label">VALIDAÇÃO CRUZADA DE DOCUMENTOS</p>
          <p className="tool-section-copy">
            Confira se nome do pet, número do microchip, datas e dados do tutor
            batem entre todos os documentos.
          </p>
          <div className="validation-grid">
            {validationDocuments.map((item, index) => (
              <label key={item}>
                <span>{item}</span>
                <input
                  type="checkbox"
                  checked={validationChecks[index]}
                  onChange={() =>
                    toggle(validationChecks, index, setValidationChecks)
                  }
                  aria-label={`Conferir ${item}`}
                />
                <textarea
                  placeholder="Observações"
                  value={validationNotes[item] || ""}
                  onChange={(event) => updateNote(item, event.target.value)}
                />
              </label>
            ))}
          </div>
        </section>
        <div className="tool-actions">
          <button className="export-pdf" onClick={onExport}>
            Baixar PDF personalizado
          </button>
        </div>
        <Alert />
      </div>
    </>
  );
}
function Quadro({
  value,
  onChange,
  onExport,
}: {
  value: SummaryData;
  onChange: (value: SummaryData) => void;
  onExport: () => void;
}) {
  const update = (field: keyof SummaryData, nextValue: string) =>
    onChange({ ...value, [field]: nextValue });
  return (
    <>
      <h1>Quadro-resumo de emissão de CVI por destino</h1>
      <p className="lesson-lead">
        Consulte este quadro para orientar a forma de emissão. Antes de emitir,
        valide sempre o requisito vigente no MAPA e na autoridade veterinária do
        destino.
      </p>
      <div className="tool-bento quadro-bento">
        <section className="destination-guide">
          <div className="guide-intro">
            <b>Como ler este quadro</b>
            <p>
              CVI online: emissão eletrônica. Endosso: chancela física. Emissão
              presencial: certificado em papel com assinatura física. Import
              Permit: permissão prévia. Notificação: aviso às autoridades de
              destino.
            </p>
          </div>
          <h2>Grupo 1 — Países com CVI online (e-CVI)</h2>
          <DestinationTable rows={cviDestinations.slice(0, 15)} />
          <h2>Grupo 2 — Emissão presencial obrigatória</h2>
          <DestinationTable rows={cviDestinations.slice(15)} />
          <p className="guide-note">
            * Alemanha, Espanha, Irlanda, Itália, Países Baixos e Suécia exigem
            endosso físico mesmo quando o CVI é emitido eletronicamente.
          </p>
        </section>
        <section className="tool-section">
          <p className="tool-section-label">CONFERÊNCIA DESTE PROCESSO</p>
          <div className="summary">
            <label>
              Destino
              <input
                placeholder="País de destino"
                value={value.destination}
                onChange={(event) => update("destination", event.target.value)}
              />
            </label>
            <label>
              Fonte oficial consultada
              <input
                placeholder="Link ou órgão responsável"
                value={value.source}
                onChange={(event) => update("source", event.target.value)}
              />
            </label>
            <label>
              Emissão de CVI
              <select
                value={value.cvi}
                onChange={(event) => update("cvi", event.target.value)}
              >
                <option value="" disabled>
                  Selecionar
                </option>
                <option>Online</option>
                <option>Presencial</option>
                <option>Confirmar</option>
              </select>
            </label>
            <label>
              Import Permit
              <select
                value={value.importPermit}
                onChange={(event) => update("importPermit", event.target.value)}
              >
                <option value="" disabled>
                  Selecionar
                </option>
                <option>Exigido</option>
                <option>Não exigido</option>
                <option>Confirmar</option>
              </select>
            </label>
            <label>
              Notificação de chegada
              <select
                value={value.arrivalNotice}
                onChange={(event) =>
                  update("arrivalNotice", event.target.value)
                }
              >
                <option value="" disabled>
                  Selecionar
                </option>
                <option>Exigida</option>
                <option>Não exigida</option>
                <option>Confirmar</option>
              </select>
            </label>
            <label>
              Observações
              <textarea
                placeholder="Prazos, ressalvas e próximos passos"
                value={value.notes}
                onChange={(event) => update("notes", event.target.value)}
              />
            </label>
          </div>
        </section>
        <div className="tool-actions">
          <button className="export-pdf" onClick={onExport}>
            Baixar PDF personalizado
          </button>
        </div>
        <Alert />
      </div>
    </>
  );
}
function DestinationTable({ rows }: { rows: readonly (readonly string[])[] }) {
  const status = (value: string) =>
    value === "Sim" ? (
      <span className="destination-status yes" aria-label="Sim">
        <Check size={15} strokeWidth={3} />
        <span className="sr-only">Sim</span>
      </span>
    ) : value === "Não" ? (
      <span className="destination-status no" aria-label="Não">
        <X size={15} strokeWidth={3} />
        <span className="sr-only">Não</span>
      </span>
    ) : (
      value
    );
  return (
    <div className="destination-table-wrap">
      <table>
        <thead>
          <tr>
            <th>Destino</th>
            <th>CVI online</th>
            <th>Endosso</th>
            <th>Presencial</th>
            <th>Import Permit</th>
            <th>Notificação</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) => (
                <td key={`${row[0]}-${index}`}>
                  {index === 0 ? cell : status(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function Meta({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <div className="lesson-meta">
        <span>
          <FileText size={13} strokeWidth={2.4} /> FERRAMENTA PRÁTICA
        </span>
        <span>{subtitle}</span>
      </div>
      <h1>{title}</h1>
    </>
  );
}
function Alert() {
  return (
    <div className="warning">
      <b>
        <AlertTriangle size={15} strokeWidth={2.4} /> Atenção
      </b>
      <p>
        Este material apoia a organização do processo. Confirme sempre
        requisitos sanitários e operacionais nas fontes vigentes.
      </p>
    </div>
  );
}
