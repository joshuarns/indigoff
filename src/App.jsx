import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import CollectionAir from './pages/CollectionAir/CollectionAir';
import CollectionSkins from './pages/CollectionSkins/CollectionSkins';
import CollectionGlow from './pages/CollectionGlow/CollectionGlow';
import CollectionOn from './pages/CollectionOn/CollectionOn';
import CollectionGallery from './pages/CollectionGallery/CollectionGallery';
import Fusetex from './pages/Fusetex/Fusetex';
import Woolskin from './pages/Woolskin/Woolskin';
import Contact from './pages/Contact/Contact';
import Possibilities from './pages/Possibilities/Possibilities';
import Colors from './pages/Colors/Colors';
import Print from './pages/Print/Print';
import Texture from './pages/Texture/Texture';
import Engraving from './pages/Engraving/Engraving';
import Embossed from './pages/Embossed/Embossed';
import Portfolio from './pages/Portfolio/Portfolio';
import FindARep from './pages/FindARep/FindARep';
import ProductCategory from './pages/ProductCategory/ProductCategory';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import PostDetail from './pages/PostDetail/PostDetail';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="indigoff-air" element={<CollectionAir />} />
          <Route path="indigoff-air/:categorySlug" element={<ProductCategory />} />
          <Route path="producto/:slug" element={<ProductDetail />} />
          <Route path="indigoff-skin" element={<CollectionSkins />} />
          <Route path="indigoff-skin/:categorySlug" element={<ProductCategory />} />
          <Route path="indigoff-glow" element={<CollectionGlow />} />
          <Route path="indigoff-glow/:categorySlug" element={<ProductCategory />} />
          <Route path="indigoff-on" element={<CollectionOn />} />
          <Route path="indigoff-on/:categorySlug" element={<ProductCategory />} />
          <Route path="indigoff-gallery" element={<CollectionGallery />} />
          <Route path="indigoff-gallery/:categorySlug" element={<ProductCategory />} />
          <Route path="fusetex" element={<Fusetex />} />
          <Route path="fusetex/:categorySlug" element={<ProductCategory />} />
          <Route path="indigoff-woolskin" element={<Woolskin />} />
          <Route path="indigoff-woolskin/:categorySlug" element={<ProductCategory />} />
          {/* Fckoff es una categoría raíz con productos directos (sin subcats). */}
          <Route path="indigoff-fckoff" element={<ProductCategory slug="fckoff" />} />
          {/* Ceiling Lights es una categoría raíz suelta (fuera de una colección). */}
          <Route path="ceiling-lights" element={<ProductCategory slug="ceiling-lights" />} />
          <Route path="contact" element={<Contact />} />
          <Route path="find-a-rep" element={<FindARep />} />
          <Route path="possibilities" element={<Possibilities />} />
          <Route path="colors" element={<Colors />} />
          <Route path="printed" element={<Print />} />
          <Route path="texture" element={<Texture />} />
          <Route path="routing" element={<Engraving />} />
          <Route path="embossed" element={<Embossed />} />
          <Route path="projects" element={<Portfolio />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="post/:slug" element={<PostDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
