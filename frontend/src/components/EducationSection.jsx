export default function EducationSection({ education = [] }) {
  return (
    <section className="section" id="education">
      <h2>Education</h2>
      <div className="education">
        {education.map((item, index) => (
          <div key={index} className="edu-card">
            <h4>{item.degree}</h4>
            <div className="edu-top">
              <p className="muted">{item.school}</p>
              <span className="pill">{item.period}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
