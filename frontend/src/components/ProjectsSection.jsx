export default function ProjectsSection({ projects = [] }) {
  return (
    <section className="section" id="projects">
      <div className="section-header">
        <h2>Projects</h2>
        <p className="muted">A few of my favorite builds.</p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article key={index} className="project-card">
            <div>
              <p className="project-type">{project.type}</p>
              <h3>{project.name}</h3>
              <p className="card-summary">{project.summary}</p>
            </div>
            <div className="project-footer">
              <div className="stack">
                {(project.stack || []).map((item, idx) => (
                  <span key={idx}>{item}</span>
                ))}
              </div>
              {project.link ? (
                <a className="link" href={project.link} target="_blank" rel="noreferrer">
                  View
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
