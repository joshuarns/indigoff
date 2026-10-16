import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import NavbarV2 from '../NavbarV2/NavbarV2';
import Footer from '../Footer/Footer';
import RouteSeo from '../Seo/Seo';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import './Layout.css';

// Variante de Layout para la propuesta de rediseño (home-v2): mismo footer y
// utilidades, pero con el NavbarV2 (overlay transparente sobre el hero).
// La clase layout--v2 permite que el contenido fluya bajo la barra fija.
function LayoutV2() {
  return (
    <div className="layout layout--v2">
      <ScrollToTop />
      <RouteSeo />
      <NavbarV2 />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default LayoutV2;
