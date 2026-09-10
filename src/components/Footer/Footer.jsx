import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {year} Indigoff. Contenido gestionado con WordPress.</p>
      </div>
    </footer>
  );
}

export default Footer;
