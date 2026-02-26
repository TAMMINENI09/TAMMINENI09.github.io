import SplitText from "./SplitText.jsx";
import TextType from "./TextType.jsx";

export default function HeroSection({ meta }) {
  return (
    <div className="hero">
      <div className="hero-glow" />
      <section className="hero-body">
        <div>
          <h1 className="hero-name-highlight">
            <SplitText text={meta.name || "Your Name"} mode="words" />
          </h1>
          <p className="eyebrow">{meta.location || "Location"}</p>
          <h2>{meta.tagline || "Your headline goes here."}</h2>
          <p className="hero-summary">
            <TextType
              text={meta.summary || "Add your story."}
              loop={false}
              typingSpeed={36}
              pauseDuration={1400}
              showCursor={false}
            />
          </p>
        </div>
      </section>
    </div>
  );
}
