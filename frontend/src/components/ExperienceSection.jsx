export default function ExperienceSection({ experience = [] }) {
  return (
    <section className="section" id="experience">
      <h2>Experience</h2>
      <div className="timeline">
        {experience.map((role, index) => (
          <article key={index} className="card">
            <div className="card-top">
              <div>
                <h3>{role.role}</h3>
                <p className="muted">{role.company}</p>
              </div>
              <span className="pill">{role.period}</span>
            </div>
            <p className="card-summary">{role.summary}</p>
            <ul>
              {(role.bullets || []).map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
