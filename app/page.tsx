const modules = [
  ["1", "Fundamentos da atuação", true],
  ["2", "PETC, AVIH e AVI", false],
  ["3", "Exigências e fontes oficiais", false],
  ["4", "Planejamento sanitário", false],
  ["5", "Documentação e CVI", false],
  ["6", "Embarque e orientação ao tutor", false],
];

export default function Home() {
  return <main className="reader">
    <header className="reader-header"><a className="brand" href="#top"><span>e</span>embarpet</a><p>DO ZERO AO CVI · APOSTILA DIGITAL</p><button type="button">Baixar módulo em PDF</button></header>
    <div className="reader-layout" id="top">
      <aside className="sidebar"><p className="side-label">SUMÁRIO</p><a className="intro-link" href="#conteudo">Como usar esta apostila</a>{modules.map(([n,title,active]) => <a className={`module-link ${active ? "active" : ""}`} href={active ? "#conteudo" : "#"} key={n}><b>{n}</b><span>{title}</span></a>)}<div className="sidebar-note"><b>Ferramentas práticas</b><a href="#">Checklist Passageiro Pet</a><a href="#">Cronograma sanitário</a></div></aside>
      <article className="lesson" id="conteudo">
        <div className="lesson-meta"><span>MÓDULO 1</span><span>Fundamentos da atuação</span></div>
        <h1>Como pensar um processo internacional antes de emitir qualquer documento.</h1>
        <p className="lesson-lead">O Certificado Veterinário Internacional (CVI) é uma etapa do processo — não o processo inteiro. A atuação segura começa entendendo destino, rota, modalidade de transporte, prazos e responsabilidades.</p>
        <section className="objective"><p>AO FINAL DESTE MÓDULO, VOCÊ VAI</p><ul><li>Compreender a sequência lógica de um processo internacional.</li><li>Diferenciar fonte oficial, exigência operacional e orientação clínica.</li><li>Reconhecer por que o planejamento deve acontecer antes da documentação.</li></ul></section>
        <h2>O raciocínio vem antes do documento</h2>
        <p>Em transporte internacional pet, cada caso precisa ser analisado como uma combinação de destino, rota, animal, prazo disponível e modalidade de viagem. Não existe uma resposta única que sirva para todos os embarques.</p>
        <p>O papel do profissional é transformar informações dispersas em um plano claro, viável e cuidadoso para o animal e para a família.</p>
        <div className="method"><p>FLUXO DE TRABALHO EMBARPET</p><ol><li>Entender destino e rota.</li><li>Consultar as fontes oficiais vigentes.</li><li>Organizar exigências, prazos e dependências.</li><li>Conferir documentos e emitir o CVI no momento correto.</li><li>Orientar a preparação e o embarque.</li></ol></div>
        <h2>O que sempre precisa ser confirmado</h2>
        <p>Antes de orientar um caso real, confirme as exigências junto ao MAPA, à autoridade veterinária do destino e à companhia aérea. Regras sanitárias e operacionais podem mudar e devem ser avaliadas para cada viagem.</p>
        <div className="warning"><b>Atenção</b><p>Esta apostila ensina o método de análise e organização. Ela não substitui a consulta às fontes vigentes nem a responsabilidade técnica do profissional responsável.</p></div>
        <footer className="lesson-footer"><span>Próximo módulo</span><a href="#">PETC, AVIH e AVI →</a></footer>
      </article>
    </div>
  </main>;
}
