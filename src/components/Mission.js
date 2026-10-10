import React from "react";

const values = [
  {
    title: "Detail-obsessed",
    text: "Clean edges, no missed spots, and a tidy property when we leave.",
  },
  {
    title: "Reliable",
    text: "We show up when we say we will and keep you in the loop.",
  },
  {
    title: "Fairly priced",
    text: "Straightforward quotes with no surprises on the bill.",
  },
];

const Mission = () => {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div className="about-text" data-aos="fade-right">
          <p className="eyebrow">About Us</p>
          <h2>Local, hands-on, and serious about quality</h2>
          <p>
            Koetter's Lawn &amp; Landscaping is a locally owned business serving the northern
            Twin Cities suburbs. Our goal is simple: turn your outdoor space into something
            you love coming home to, and make the whole process easy.
          </p>
          <p>
            When you work with us, you're working directly with the owner. That means real
            accountability, clear communication, and work we're proud to put our name on.
          </p>
        </div>

        <ul className="values" data-aos="fade-left">
          {values.map((value) => (
            <li key={value.title}>
              <span className="check" aria-hidden="true">✓</span>
              <div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Mission;
