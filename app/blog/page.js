const blogConfig = {
  type: "page",
  name: "Blog & News - XMENTE.I.A",
  theme: "dark",
  sections: [
    {
      type: "hero",
      background: "#0b0b0b",
      content: {
        headline: "📰 Blog & Notícias XMENTE.I.A",
        subheadline:
          "As últimas novidades, hacks e insights sobre Inteligência Artificial",
        cta: { text: "Explorar Artigos", link: "#posts" },
      },
    },
    {
      type: "grid",
      id: "posts",
      title: "Artigos Recentes",
      items: [
        {
          title: "5 Ferramentas de IA que vão dominar 2025",
          description: "Descubra as ferramentas que estão transformando negócios.",
          button: { text: "Ler Agora", link: "/blog/ferramentas-2025" },
        },
        {
          title: "Guia Definitivo de Prompt Engineering",
          description: "Como escrever prompts que realmente funcionam.",
          button: { text: "Ler Agora", link: "/blog/prompt-engineering" },
        },
        {
          title: "IA e Marketing Digital: Hacks para escalar vendas",
          description: "Use IA para aumentar conversão e reduzir custos.",
          button: { text: "Ler Agora", link: "/blog/ia-marketing" },
        },
      ],
    },
    {
      type: "cta",
      background: "#111111",
      content: {
        headline: "📩 Receba insights exclusivos direto no seu e-mail",
        button: { text: "Assinar Newsletter", link: "/newsletter" },
      },
    },
  ],
};

function PrimaryButton({ href, label }) {
  return (
    <a className="cta-primary" href={href} rel="noopener noreferrer">
      {label}
    </a>
  );
}

function HeroBlock({ data }) {
  return (
    <section className="hero-banner" style={{ background: data.background }}>
      <div className="hero-container">
        <h1 className="hero-headline">{data.content.headline}</h1>
        <p className="hero-subheadline">{data.content.subheadline}</p>
        <div className="hero-actions">
          <PrimaryButton href={data.content.cta.link} label={data.content.cta.text} />
        </div>
      </div>
    </section>
  );
}

function PostsGrid({ data }) {
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
              <a className="card-action" href={item.button.link}>{item.button.text}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand({ data }) {
  return (
    <section className="cta-band" style={{ background: data.background }}>
      <div className="cta-band-inner">
        <h2 className="cta-band-title">{data.content.headline}</h2>
        <PrimaryButton href={data.content.button.link} label={data.content.button.text} />
      </div>
    </section>
  );
}

export default function BlogPage() {
  const sections = blogConfig.sections || [];
  const isDark = blogConfig.theme === "dark";

  return (
    <main className={isDark ? "theme-dark" : undefined}>
      {sections.map((section, i) => {
        if (section.type === "hero") return <HeroBlock key={i} data={section} />;
        if (section.type === "grid") return <PostsGrid key={i} data={section} />;
        if (section.type === "cta") return <CtaBand key={i} data={section} />;
        return null;
      })}
    </main>
  );
}
