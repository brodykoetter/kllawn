import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-brand">Koetter's Lawn &amp; Landscaping</p>
          <p>Proudly serving the Northern Twin Cities suburbs.</p>
        </div>
        <div className="footer-contact">
          <a href="tel:6123609041">(612) 360-9041</a>
          <a href="mailto:brodykoetter@gmail.com">brodykoetter@gmail.com</a>
        </div>
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()} Koetter's Lawn &amp; Landscaping. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
