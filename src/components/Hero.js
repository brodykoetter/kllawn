import React from "react";

const Hero = () => {
  return (
    <section id="top" className="hero">
      <div className="container hero-content" data-aos="fade-up">
        <p className="eyebrow">Serving the Northern Twin Cities Suburbs</p>
        <h1>
          A yard you're proud of, <span>without lifting a finger.</span>
        </h1>
        <p className="hero-sub">
          Mowing, trimming, cleanups, and landscaping done right, on schedule, every time.
          Locally owned and run by people who care how your lawn looks.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            Get a Free Quote
          </a>
          <a href="tel:6123609041" className="btn btn-ghost">
            Call (612) 360-9041
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
