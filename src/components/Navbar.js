import React, { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Our Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">
        <a href="#top" className="navbar-logo" onClick={closeMenu}>
          <img
            className="logo-img"
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt="Koetter's Lawn & Landscaping"
          />
        </a>

        <button
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary btn-sm" onClick={closeMenu}>
            Free Quote
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
