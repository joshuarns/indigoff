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
import Portfolio from './pages/Portfolio/Portfolio';
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
          <Route path="contact" element={<Contact />} />
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
