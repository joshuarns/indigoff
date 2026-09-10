import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.css';

// Estructura común (navbar + contenido + footer) para todas las páginas.
// <Outlet /> renderiza la ruta activa.
function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
