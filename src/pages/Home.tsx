import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Categories from '../components/sections/Categories';
import FieldTrials from '../components/sections/FieldTrials';
import Featured from '../components/sections/Featured';
import KnowledgeCenter from '../components/sections/KnowledgeCenter';
import Insights from '../components/sections/Insights';
import CTA from '../components/sections/CTA';
import FAQ from '../components/sections/FAQ';
import ContactForm from '../components/sections/ContactForm';
import Commercial from '../components/sections/Commercial';
import SEO from '../components/common/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Hybrid Vegetable Seeds Company in India"
        description="DRD Plantech LLP delivers high-performance hybrid vegetable and field crop seeds focused on yield, uniformity, reliability, and dealer support."
        path="/"
        keywords="hybrid vegetable seeds India, DRD Plantech LLP, vegetable seed company, field crop seeds, dealer network, commercial farming"
        preloadImage="/src/assets/images/hero_bg.webp"
      />
      <Hero />
      <About />
      <Categories />
      <FieldTrials />
      <Featured />
      <KnowledgeCenter />
      <Commercial /> 
      <Insights />
      <CTA 
        tagText="Become a Dealer Partner"
        title="Grow Your Business with a Trusted Seed Brand"
        description="We offer strong product demand, reliable supply, and structured dealer support. Join our expanding distribution network and serve the growing agricultural market with confidence."
        buttonText="Apply for Dealership"
      />
      <FAQ />
      <ContactForm />
    </>
  );
};

export default Home;
