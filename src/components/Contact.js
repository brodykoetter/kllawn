import React, { useState } from "react";

const emptyForm = { name: "", email: "", phone: "", message: "" };

const Contact = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "pending", text: "Sending..." });

    try {
      const response = await fetch("https://formspree.io/f/xwplkgnd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: "success", text: "Thanks! We'll get back to you within one business day." });
        setFormData(emptyForm);
      } else {
        setStatus({ type: "error", text: "Something went wrong. Please try again or give us a call." });
      }
    } catch (error) {
      setStatus({ type: "error", text: "Couldn't send your message. Please try again or give us a call." });
    }
  };

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <p className="eyebrow">Get in Touch</p>
          <h2>Get your free quote</h2>
          <p>Tell us a bit about your yard and what you need. No pressure, no obligation.</p>
        </div>

        <div className="contact-grid" data-aos="fade-up">
          <aside className="contact-info">
            <h3>Talk to the owner directly</h3>
            <p className="contact-owner">Brody Koetter</p>
            <ul>
              <li>
                <span className="contact-label">Phone</span>
                <a href="tel:6123609041">(612) 360-9041</a>
              </li>
              <li>
                <span className="contact-label">Email</span>
                <a href="mailto:brodykoetter@gmail.com">brodykoetter@gmail.com</a>
              </li>
              <li>
                <span className="contact-label">Service Area</span>
                <span>Northern Twin Cities, MN Suburbs</span>
              </li>
            </ul>
          </aside>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Name
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </label>
              <label>
                Phone
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </label>
            </div>
            <label>
              Email
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
              How can we help?
              <textarea
                name="message"
                rows="5"
                placeholder="Address, services you're interested in, anything else we should know..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit" className="btn btn-primary" disabled={status.type === "pending"}>
              {status.type === "pending" ? "Sending..." : "Request My Free Quote"}
            </button>
            {status.text && status.type !== "pending" && (
              <p className={`form-status ${status.type}`} role="status">
                {status.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
