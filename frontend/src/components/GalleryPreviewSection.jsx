import { useCallback, useEffect, useState } from "react";

export default function GalleryPreviewSection({ galleryPage }) {
  const photos = (galleryPage?.photos || []).slice(0, 3);
  const [activePhoto, setActivePhoto] = useState(null);

  const openPhoto = useCallback((photo) => {
    setActivePhoto(photo);
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
    <section className="section gallery-section" id="gallery">
      <div className="section-header">
        <div>
          <h2>Gallery</h2>
          {/* <p className="muted">A quick look at my hobby.</p> */}
        </div>
        <a className="ghost-button" href="#/gallery">
          View more
        </a>
      </div>
      <p className="gallery-note">
        This is where I share moments from my hobby and visual experiments.
      </p>
      <div className="gallery-preview">
        {photos.map((photo, index) => (
          <article
            key={index}
            className="photo-card is-clickable"
            role="button"
            tabIndex={0}
            onClick={() => openPhoto(photo)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openPhoto(photo);
              }
            }}
          >
            <div className="photo-frame">
              <img
                src={photo.src}
                alt={photo.alt || "Gallery photo"}
                loading="lazy"
              />
            </div>
          </article>
        ))}
      </div>
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
              src={activePhoto.src}
              alt={activePhoto.alt || "Selected gallery image"}
            />
          </div>
        </div>
      )}
    </section>
  );
}
