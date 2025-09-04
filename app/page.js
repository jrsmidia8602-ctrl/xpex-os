const hubConfig = {
  type: "page",
  name: "Hub XMENTE.I.A",
  theme: "dark",
  sections: [
    {
      type: "hero",
      background: "#0a0a0a",
      content: {
        logo: "https://cdn.builder.io/api/v1/image/assets%2F57bd8ab362ad44d49f58eb09ed32ad9a%2F48b2612c1a5b4d15887cf64fa953f459?format=webp&width=800",
        headline: "🚀 Bem-vindo ao HUB XMENTE.I.A",
        subheadline: "Guias, Ferramentas e Cursos para dominar a Inteligência Artificial",
        cta: { text: "Explorar Agora", link: "#guias" },
      },
    },
    {
      type: "grid",
      id: "guias",
      title: "📚 Guias & E-books (Grátis)",
      items: [
        {
          title: "Guia de Prompt Engineering",
          description: "Aprenda a criar prompts que geram resultados poderosos.",
          button: { text: "Baixar Grátis", link: "/downloads/prompt-engineering.pdf" },
        },
        {
          title: "Mini eBook Automação IA",
          description: "Descubra como automatizar processos com Inteligência Artificial.",
          button: { text: "Baixar Grátis", link: "/downloads/automacao-ia.pdf" },
        },
      ],
    },
    {
      type: "grid",
      id: "ferramentas",
      title: "🛠️ Ferramentas Recomendadas",
      items: [
        {
          title: "Jasper AI",
          description: "A melhor IA para copywriting profissional.",
          button: { text: "Testar Agora", link: "https://jasper.ai?afiliado=xmenteia" },
        },
        {
          title: "MidJourney",
          description: "Crie artes únicas com IA generativa.",
          button: { text: "Testar Agora", link: "https://midjourney.com?afiliado=xmenteia" },
        },
      ],
    },
    {
      type: "grid",
      id: "cursos",
      title: "🎓 Cursos Validados",
      items: [
        {
          title: "Curso de ChatGPT para Negócios",
          description: "Domine o ChatGPT e aplique em vendas, marketing e automação.",
          button: { text: "Quero Aprender IA Agora", link: "https://hotmart.com/chatgpt-negocios?afiliado=xmenteia" },
        },
        {
          title: "IA no Design e Branding",
          description: "Use IA para criar identidades visuais e produtos digitais únicos.",
          button: { text: "Quero Aprender IA Agora", link: "https://hotmart.com/ia-design?afiliado=xmenteia" },
        },
      ],
    },
  ],
};

function CtaButton({ href, label }) {
  return (
    <a className="cta-primary" href={href} rel="noopener noreferrer">
      {label}
    </a>
  );
}

function HeroSection({ data }) {
  const { background, content } = data;
  return (
    <section className="hero-banner" style={{ background }}>
      <div className="hero-container">
        {content.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="brand-logo"
            src={content.logo}
            alt="Logo XMENTE.I.A"
          />
        ) : null}
        <h1 className="hero-headline">{content.headline}</h1>
        <p className="hero-subheadline">{content.subheadline}</p>
        {content.cta ? (
          <div className="hero-actions">
            <CtaButton href={content.cta.link} label={content.cta.text} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function GridSection({ data }) {
  const { id, title, items } = data;
  return (
    <section id={id} className="section-block">
      <div className="section-inner">
        <h2 className="section-title">{title}</h2>
        <div className="card-grid">
          {items.map((item, idx) => (
            <article key={idx} className="resource-card">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-description">{item.description}</p>
              {item.button ? (
                <a
                  className="card-action"
                  href={item.button.link}
                  target={item.button.link.startsWith("http") ? "_blank" : undefined}
                  rel={item.button.link.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {item.button.text}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HubPage() {
  const sections = hubConfig.sections || [];
  const isDark = hubConfig.theme === "dark";

  return (
    <main className={isDark ? "theme-dark" : undefined}>
      {sections.map((section, i) => {
        if (section.type === "hero") return <HeroSection key={i} data={section} />;
        if (section.type === "grid") return <GridSection key={i} data={section} />;
        return null;
      })}
    </main>
  );
}
