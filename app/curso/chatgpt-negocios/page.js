const pageConfig = {
  type: "page",
  name: "Detalhes Curso/Ferramenta - XMENTE.I.A",
  theme: "dark",
  sections: [
    {
      type: "hero",
      background: "#0d0d0d",
      content: {
        headline: "🔥 Curso de ChatGPT para Negócios",
        subheadline:
          "Domine a IA mais poderosa do mundo e gere resultados reais no seu negócio.",
        cta: {
          text: "Quero Aprender Agora",
          link: "https://hotmart.com/chatgpt-negocios?afiliado=xmenteia",
        },
      },
    },
    {
      type: "two-column",
      content: {
        image: "/images/chatgpt-course.png",
        title: "O que você vai aprender:",
        list: [
          "✅ Como usar o ChatGPT em marketing digital",
          "✅ Automação de funis e atendimento com IA",
          "✅ Hacks secretos para copywriting persuasivo",
          "✅ Casos reais e estratégias aplicáveis",
        ],
      },
    },
    {
      type: "testimonial",
      title: "Depoimentos de Alunos",
      items: [
        {
          name: "Maria Silva",
          comment:
            "Esse curso mudou minha forma de vender online! Já recuperei o investimento na primeira semana.",
          avatar: "/avatars/maria.png",
        },
        {
          name: "João Pereira",
          comment:
            "ChatGPT agora é meu braço direito. Automatizei meu funil inteiro com as aulas.",
          avatar: "/avatars/joao.png",
        },
      ],
    },
    {
      type: "cta",
      background: "#111111",
      content: {
        headline:
          "🚀 Pronto para dominar o ChatGPT e transformar seu negócio?",
        button: {
          text: "Garantir Minha Vaga",
          link: "https://hotmart.com/chatgpt-negocios?afiliado=xmenteia",
        },
      },
    },
  ],
};

function PrimaryButton({ href, label }) {
  return (
    <a className="cta-primary" href={href} target="_blank" rel="noopener noreferrer">
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

function TwoColumn({ data }) {
  const { image, title, list } = data.content;
  return (
    <section className="split-section">
      <div className="split-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="split-media" src={image} alt={title} />
        <div className="split-content">
          <h2 className="section-title">{title}</h2>
          <ul className="feature-list">
            {list.map((item, i) => (
              <li key={i} className="feature-item">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Testimonials({ data }) {
  return (
    <section className="testimonial-section">
      <div className="section-inner">
        <h2 className="section-title">{data.title}</h2>
        <div className="testimonial-grid">
          {data.items.map((t, i) => (
            <figure key={i} className="testimonial-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="avatar" src={t.avatar} alt={t.name} />
              <blockquote className="testimonial-text">{t.comment}</blockquote>
              <figcaption className="testimonial-author">{t.name}</figcaption>
            </figure>
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

export default function CourseDetailsPage() {
  const sections = pageConfig.sections || [];
  const isDark = pageConfig.theme === "dark";
  return (
    <main className={isDark ? "theme-dark" : undefined}>
      {sections.map((section, i) => {
        if (section.type === "hero") return <HeroBlock key={i} data={section} />;
        if (section.type === "two-column") return <TwoColumn key={i} data={section} />;
        if (section.type === "testimonial") return <Testimonials key={i} data={section} />;
        if (section.type === "cta") return <CtaBand key={i} data={section} />;
        return null;
      })}
    </main>
  );
}
