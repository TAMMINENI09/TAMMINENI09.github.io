export default function ContactSection({ contact = {} }) {
  return (
    <section className="section contact-section" id="contact">
      <p className="eyebrow">Contact</p>
      <h2>Let's Connect!</h2>
      <div className="contact-box">
        <div className="contact-pill">
          {contact.email ? (
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          ) : (
            <span>your@email.com</span>
          )}
        </div>
        <div className="contact-links">
          {contact.linkedin ? <a href={contact.linkedin}>LinkedIn</a> : null}
          {contact.github ? <a href={contact.github}>GitHub</a> : null}
        </div>
      </div>
    </section>
  );
}
