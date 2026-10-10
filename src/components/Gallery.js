import React from "react";

// To add photos: put image files in public/images/gallery/ and list them here, e.g.
// { src: "/images/gallery/front-yard.jpg", caption: "Front yard refresh" },
const photos = [];

const PLACEHOLDER_COUNT = 6;

const Gallery = () => {
  return (
    <section id="gallery" className="section section-alt">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <p className="eyebrow">Our Work</p>
          <h2>See the difference</h2>
          <p>A few of the yards we've had the pleasure of taking care of.</p>
        </div>

        <div className="gallery-grid">
          {photos.length > 0
            ? photos.map((photo, index) => (
                <figure key={photo.src} className="gallery-item" data-aos="zoom-in" data-aos-delay={index * 60}>
                  <img src={photo.src} alt={photo.caption} loading="lazy" />
                  {photo.caption && <figcaption>{photo.caption}</figcaption>}
                </figure>
              ))
            : Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => (
                <div key={index} className="gallery-item gallery-placeholder" data-aos="zoom-in" data-aos-delay={index * 60}>
                  <span>Photo coming soon</span>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
