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
        title="We transform silence into design"
        description="We design bespoke acoustic solutions that merge design with performance. Our panels enhance sound quality, elevate interiors, and transform spaces into immersive environments where design is seen, heard, and felt."
        buttonLabel="Read More"
        to="/collections"
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
