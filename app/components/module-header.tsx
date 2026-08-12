type ModuleHeaderProps = {
  number: number;
  title: string;
  subtitle: string;
};

/** Shared editorial entry point for every instructional module. */
export function ModuleHeader({ number, title, subtitle }: ModuleHeaderProps) {
  const icons = [Plane, ShieldCheck, CalendarDays, SquareStack, FileCheck2, BriefcaseBusiness];
  const Icon = icons[number - 1] || Plane;
  return (
    <header className="module-header">
      <div className="lesson-meta">
        <span><Icon size={13} strokeWidth={2.4} aria-hidden="true" /> MÓDULO {number}</span>
        <span>{subtitle}</span>
      </div>
      <h1>{title}</h1>
    </header>
  );
}
import {
  BriefcaseBusiness,
  CalendarDays,
  FileCheck2,
  Plane,
  ShieldCheck,
  SquareStack,
} from "lucide-react";
