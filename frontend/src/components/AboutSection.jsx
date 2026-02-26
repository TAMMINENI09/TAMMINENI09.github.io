export default function AboutSection({ about = {}, meta = {} }) {
  const summarySource = Array.isArray(about.summary)
    ? about.summary
    : (about.summary || meta.summary || "Add your story.").split(/\n\s*\n/);

  const cards =
    about.cards && about.cards.length
      ? about.cards
      : [
          {
            label: "Programming Experience",
            value: meta.programmingExperience || meta.availability || "Add experience"
          },
          {
            label: "Focus",
            value: meta.focus || meta.tagline || "Add focus"
          },
          {
            label: "Currently",
            value: meta.currently || meta.role || "Add role"
          }
        ];

  return (
    <section className="section about-section" id="about">
      <h2>About</h2>
      <p className="eyebrow">{about.eyebrow || "Impact"}</p>
      {summarySource
        .filter(Boolean)
        .map((paragraph, index) => (
          <p key={index} className="about-summary">
            {paragraph}
          </p>
        ))}
      <div className="about-cards">
        {cards.map((card, index) => (
          <article key={index} className="about-card">
            <p className="about-label">{card.label}</p>
            <p className="about-value">{card.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
