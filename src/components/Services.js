import React from "react";

const icon = (path) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {path}
  </svg>
);

const services = [
  {
    title: "Lawn Mowing",
    description:
      "Weekly or bi-weekly cuts at the right height for a thick, healthy lawn, with clippings cleaned off walks and driveways.",
    icon: icon(<path d="M3 20h18M5 20c1-4 1-8 0-12M9 20c.5-3 .5-6-1-9M13 20c0-3 1-6 3-8M17 20c0-2 1-4 3-5" />),
  },
  {
    title: "Trimming & Edging",
    description:
      "Crisp lines along sidewalks, beds, and fences, plus trimming around trees and obstacles the mower can't reach.",
    icon: icon(<><path d="M4 20 20 4" /><path d="M14 4h6v6" /><path d="M4 14v6h6" /></>),
  },
  {
    title: "Seasonal Cleanup",
    description:
      "Spring and fall cleanups: leaves, sticks, and debris cleared out so your yard is ready for the season ahead.",
    icon: icon(<><path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 12-4 16-9 16Z" /><path d="M4 20c4-4 7-7 11-11" /></>),
  },
  {
    title: "Landscaping",
    description:
      "Fresh mulch, new plantings, and bed refreshes that give your home real curb appeal.",
    icon: icon(<><path d="M12 22v-8" /><path d="M12 14c-4 0-6-3-6-6 3 0 6 2 6 6Z" /><path d="M12 14c4 0 6-3 6-6-3 0-6 2-6 6Z" /><path d="M7 22h10" /></>),
  },
  {
    title: "Retaining Walls",
    description:
      "Sturdy, good-looking block walls that hold back soil, level out slopes, and define your outdoor space.",
    icon: icon(<><rect x="3" y="14" width="18" height="6" rx="1" /><rect x="3" y="8" width="18" height="6" rx="1" /><path d="M9 8v6M15 14v6M15 8v6" /></>),
  },
];

const Services = () => {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <p className="eyebrow">What We Do</p>
          <h2>Everything your yard needs, all in one place</h2>
          <p>From weekly mowing to full outdoor projects, we've got it covered.</p>
        </div>

        <div className="service-grid">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="service-card"
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
