const modules = [
  ["01", "Fundamentos da atuação", "A lógica técnica por trás de um processo internacional seguro."],
  ["02", "PETC, AVIH e AVI", "Entenda a modalidade antes de construir o planejamento."],
  ["03", "Exigências e fontes oficiais", "Onde consultar, como interpretar e o que precisa ser confirmado."],
  ["04", "Planejamento sanitário", "Transforme exigências em cronogramas possíveis e organizados."],
  ["05", "Documentação e CVI", "Conferência, emissão e organização do processo documental."],
  ["06", "Embarque e orientação ao tutor", "Da preparação final ao acompanhamento com clareza."],
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Embarpet, início">
          <span className="brand-mark">E</span>
          <span>embarpet</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#modulos">Apostila</a>
          <a href="#ferramentas">Ferramentas</a>
          <a href="#fontes">Fontes oficiais</a>
        </nav>
        <a className="outline-button" href="#modulos">Acessar material</a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">DO ZERO AO CVI</p>
          <h1>O material de referência para quem atua com transporte internacional pet.</h1>
          <p className="lead">
            Uma apostila digital pensada para estudar, consultar e transformar informação técnica em um planejamento seguro.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#modulos">Começar a apostila</a>
            <a className="text-link" href="#como-funciona">Como funciona</a>
          </div>
        </div>
        <div className="hero-editorial" aria-label="Destaque editorial">
          <p className="editorial-label">O MÉTODO EMBARPET</p>
          <p className="editorial-quote">O documento é a última etapa. O trabalho especializado começa no planejamento.</p>
          <div className="editorial-rule" />
          <p className="editorial-caption">Planejamento · documentação · cuidado</p>
        </div>
      </section>

      <section className="intro" id="como-funciona">
        <p className="section-kicker">UMA APOSTILA QUE TRABALHA COM VOCÊ</p>
        <div className="intro-grid">
          <h2>Menos páginas para decorar. Mais clareza para decidir.</h2>
          <p>
            Cada capítulo combina explicação objetiva, orientação de aplicação e ferramentas práticas. O conteúdo online é a referência viva; o PDF permite estudar, imprimir e manter uma versão offline.
          </p>
        </div>
        <div className="principles">
          <article><span>01</span><h3>Aprenda a lógica</h3><p>Entenda o caminho antes de procurar a resposta.</p></article>
          <article><span>02</span><h3>Consulte com critério</h3><p>Separe fonte oficial, regra operacional e recomendação clínica.</p></article>
          <article><span>03</span><h3>Transforme em processo</h3><p>Converta exigências em cronograma, conferência e orientação.</p></article>
        </div>
      </section>

      <section className="modules-section" id="modulos">
        <div className="section-heading">
          <div><p className="section-kicker">CONTEÚDO DIDÁTICO</p><h2>Conheça a apostila</h2></div>
          <p>Seis módulos organizados para acompanhar a jornada de um processo internacional.</p>
        </div>
        <div className="modules-list">
          {modules.map(([number, title, description]) => (
            <a className="module-row" href="#" key={number} aria-label={`Em breve: módulo ${number}, ${title}`}>
              <span className="module-number">{number}</span>
              <span className="module-title">{title}</span>
              <span className="module-description">{description}</span>
              <span className="module-state">Em breve</span>
            </a>
          ))}
        </div>
      </section>

      <section className="tools" id="ferramentas">
        <div className="tools-copy">
          <p className="section-kicker">FERRAMENTAS PRÁTICAS</p>
          <h2>Material para aprender. Ferramentas para aplicar.</h2>
          <p>Os recursos operacionais estarão dentro da apostila, próximos ao conteúdo que orienta seu uso.</p>
        </div>
        <div className="tool-cards">
          <article className="tool-card featured"><p>DISPONÍVEL PRIMEIRO</p><h3>Checklist Passageiro Pet</h3><span>Preencher, salvar e exportar em PDF</span></article>
          <article className="tool-card"><p>PRÓXIMO RECURSO</p><h3>Cronograma sanitário</h3><span>Organize etapas, prazos e pendências</span></article>
          <article className="tool-card"><p>EM DESENVOLVIMENTO</p><h3>Conferência documental</h3><span>Uma visão técnica antes da emissão</span></article>
        </div>
      </section>

      <section className="sources" id="fontes">
        <div><p className="section-kicker">SEGURANÇA TÉCNICA</p><h2>Conteúdo didático não substitui a fonte vigente.</h2></div>
        <p>Em qualquer processo real, valide exigências no MAPA, na autoridade veterinária do destino e na companhia aérea. A apostila ensina o método para fazer essa consulta com segurança.</p>
      </section>

      <footer>
        <div className="brand"><span className="brand-mark">E</span><span>embarpet</span></div>
        <p>Do Zero ao CVI · Apostila Digital</p>
        <p>Versão de fundação · 2026</p>
      </footer>
    </main>
  );
}
