import { useCallback, useEffect, useState } from "react";
import Masonry from "./Masonry.jsx";

export default function GalleryGrid({ photos = [] }) {
  const items = photos.map((photo, index) => ({
    id: photo.id ?? `${index + 1}`,
    img: photo.src,
    url: photo.url || photo.link,
    alt: photo.alt,
    height: photo.height ?? 420
  }));

  const [activePhoto, setActivePhoto] = useState(null);

  const openPhoto = useCallback((item) => {
    setActivePhoto(item);
  }, []);

  const closePhoto = useCallback(() => {
    setActivePhoto(null);
  }, []);

  useEffect(() => {
    if (!activePhoto) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closePhoto();
      }
    };

    document.body.style.overflow = "hidden";
    document.body.classList.add("lightbox-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePhoto, closePhoto]);

  return (
    <section className="section gallery-grid">
      <Masonry
        items={items}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover
        hoverScale={0.95}
        blurToFocus
        colorShiftOnHover={false}
        onItemSelect={openPhoto}
      />
      {activePhoto && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          onClick={closePhoto}
        >
          <div className="gallery-lightbox__backdrop" />
          <div
            className="gallery-lightbox__content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="gallery-lightbox__close"
              type="button"
              onClick={closePhoto}
              aria-label="Close preview"
            >
              x
            </button>
            <img
              src={activePhoto.img}
              alt={activePhoto.alt || "Selected gallery image"}
            />
          </div>
        </div>
      )}
    </section>
  );
}
