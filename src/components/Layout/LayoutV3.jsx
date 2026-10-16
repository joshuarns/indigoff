import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import NavbarV3 from '../NavbarV3/NavbarV3';
import Footer from '../Footer/Footer';
import RouteSeo from '../Seo/Seo';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import '../Layout/Layout.css';

function LayoutV3() {
  return (
    <div className="layout layout--v3">
      <ScrollToTop />
      <RouteSeo />
      <NavbarV3 />
      <main className="layout__main"><Outlet /></main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default LayoutV3;
