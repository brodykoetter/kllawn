import React, { useState } from "react";

// To add a project: put the before/after photos in public/images/gallery/ and list them here.
const projects = [
  { name: "overgrown", caption: "Overgrown lot cleared and mowed" },
  { name: "field", caption: "Tall grass to a clean, even lawn" },
  { name: "bed", caption: "Garden bed and hedge cleanup" },
];

const BeforeAfter = ({ name, caption }) => {
  const [pos, setPos] = useState(50);
  const base = `${process.env.PUBLIC_URL}/images/gallery/${name}`;

  return (
    <figure className="ba" style={{ "--pos": `${pos}%` }}>
      <div className="ba-frame">
        <img className="ba-img" src={`${base}-after.jpg`} alt={`${caption} (after)`} loading="lazy" draggable="false" />
        <img className="ba-img ba-before" src={`${base}-before.jpg`} alt={`${caption} (before)`} loading="lazy" draggable="false" />
        <span className="ba-tag ba-tag-before">Before</span>
        <span className="ba-tag ba-tag-after">After</span>
        <div className="ba-handle" aria-hidden="true">
          <span>‹ ›</span>
        </div>
        <input
          className="ba-range"
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare before and after: ${caption}`}
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="section section-alt">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <p className="eyebrow">Our Work</p>
          <h2>See the difference</h2>
          <p>Drag the slider to compare before and after.</p>
        </div>

        <div className="ba-grid">
          {projects.map((project, index) => (
            <div key={project.name} data-aos="zoom-in" data-aos-delay={index * 80}>
              <BeforeAfter {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
