type ModuleHeaderProps = {
  number: number;
  title: string;
  subtitle: string;
};

/** Shared editorial entry point for every instructional module. */
export function ModuleHeader({ number, title, subtitle }: ModuleHeaderProps) {
  return (
    <header className="module-header">
      <div className="lesson-meta">
        <span>MÓDULO {number}</span>
        <span>{subtitle}</span>
      </div>
      <h1>{title}</h1>
    </header>
  );
}
