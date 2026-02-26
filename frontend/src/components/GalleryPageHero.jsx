export default function GalleryPageHero({ meta = {}, galleryPage = {} }) {
  return (
    <section className="section about-hero">
      {/* <p className="eyebrow">{meta.location || "Location"}</p> */}
      <h1>{galleryPage.title || "Gallery"}</h1>
      <p className="hero-summary">{galleryPage.intro}</p>
    </section>
  );
}
