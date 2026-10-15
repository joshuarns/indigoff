import { useState } from 'react';
import './Contact.css';

const INITIAL = { name: '', lastName: '', phone: '', email: '', message: '' };

function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) {
      next.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: conectar el envío real (endpoint de Elementor Forms en WordPress,
    // un servicio tipo Formspree, o un endpoint propio en WP). Por ahora se
    // muestra el estado de confirmación.
    setSent(true);
  };

  return (
    <section className="contact">
      <div className="contact__inner">
        {/* --- Columna izquierda: info --- */}
        <div className="contact__info">
          <h1 className="contact__title">Begin a conversation</h1>
          <p className="contact__intro">
            Tell us about your project. Our team will guide you through the
            right acoustic expression, from material selection and samples to
            specification support and bespoke requirements.
          </p>
          <a className="contact__email" href="mailto:info@indigoff.com">
            info@indigoff.com
          </a>
        </div>

        {/* --- Columna derecha: formulario --- */}
        <div className="contact__form-wrap">
          {sent ? (
            <div className="contact__success" role="status">
              <h2>Thank you for your enquiry.</h2>
              <p>
                Your message has been received. A member of our team will be in
                touch shortly.
              </p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="contact__row">
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <span className="field__error">{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contact__row">
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">
                    Email <span className="field__req">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <span className="field__error">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="contact__submit">
                Submit enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
