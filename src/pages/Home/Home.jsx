import Hero from '../../components/Hero/Hero';
import QuotesSlider from '../../components/QuotesSlider/QuotesSlider';
import Feature from '../../components/Feature/Feature';
import Projects from '../../components/Projects/Projects';
import FeaturedFinishes from '../../components/FeaturedFinishes/FeaturedFinishes';
import Clients from '../../components/Clients/Clients';
import featurePlaceholder from '../../assets/img/4728403.png';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <Hero />
      <QuotesSlider />
      <Feature
        image={featurePlaceholder}
        imageAlt="Wood Textures"
        title="Silence, shaped with intention"
        description="Indigoff creates bespoke acoustic elements where technical performance is resolved with material sensitivity, proportion, and enduring architectural presence."
        buttonLabel="Discover Indigoff Air"
        to="/indigoff-air"
        corner="tr"
      />
      <Projects />
      <FeaturedFinishes />
      <Clients />
      {/* Aquí irán las siguientes secciones del home de marca */}
    </div>
  );
}

export default Home;
