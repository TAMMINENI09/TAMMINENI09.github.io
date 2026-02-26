export default function SkillsSection({ skills = [] }) {
  return (
    <section className="section" id="skills">
      <h2>Skills</h2>
      <div className="skills">
        {skills.map((group, index) => (
          <div key={index} className="skill-card">
            <h4>{group.group}</h4>
            <div className="skill-items">
              {(group.items || []).map((item, idx) => (
                <span key={idx}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
