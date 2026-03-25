import React from 'react';
import PageBanner from '../components/sections/PageBanner';
import aboutBg from '../assets/images/about_bg.webp';
import ProductShowcase from '../components/common/ProductShowcase';
// Using featured.webp as a temporary placeholder
import featuredImg from '../assets/images/featured.webp';
import CTA from '../components/sections/CTA';
import FAQ from '../components/sections/FAQ';
import ContactForm from '../components/sections/ContactForm';
import SEO from '../components/common/SEO';

const Product2: React.FC = () => {
  return (
    <>
      <SEO
        title="Field Crop Seeds"
        description="Browse DRD Plantech LLP field crop seeds for maize, paddy, cotton, pulses, and millets developed for strong performance, resilience, and market-ready output."
        path="/Field Crop Seeds"
        keywords="field crop seeds India, maize seeds, paddy seeds, cotton seeds, pulse seeds, DRD Plantech LLP"
        preloadImage="/src/assets/images/hero_bg.webp"
      />
      <PageBanner title="Our Field Crop Seeds" backgroundImage={aboutBg} />
      
      <ProductShowcase 
        title="Maize"
        image={featuredImg}
        variants={[
          {
            name: "DRD WHITE GOLD",
            features: [
              "Strong stem and roots with excellent standability",
              "High yielding potential with uniform cobs",
              "High shelling percentage and grain weight",
              "Excellent disease tolerance and deep root system",
              "Tolerant to lodging and water stress",
              "High yielding hybrid suitable for cultivation"
            ]
          },
          {
            name: "DRD SUPER KHOMBA",
            features: [
              "Semi-dent grain type with yellow-orange color",
              "Excellent test weight and attractive glossy grains",
              "High shelling percentage (80-82%)",
              "High tolerance to lodging",
              "Attractive cob coverage with close husk",
              "Early maturity (105-115 days)"
            ]
          }
        ]}
      />

      <ProductShowcase 
        title="Paddy (Rice)"
        image={featuredImg}
        reverse={true}
        theme="alternate"
        variants={[
          {
            name: "DRD GOLD 777",
            features: [
              "Fine grain quality with excellent cooking characteristics",
              "Long slender grains with excellent milling recovery",
              "Strong plant structure with good lodging resistance",
              "High yield potential per acre",
              "Tolerant to major diseases and pests",
              "Consistent performance across seasons"
            ]
          },
          {
            name: "DRD SUPER 111",
            features: [
              "Early maturity hybrid (115-120 days)",
              "Medium slender grains with excellent taste",
              "High number of productive tillers",
              "Strong plant type with resistance to lodging",
              "High yield potential and milling recovery"
            ]
          }
        ]}
      />

      <ProductShowcase 
        title="Cotton"
        image={featuredImg}
        variants={[
          {
            name: "DRD COTTON 111",
            features: [
              "Vigorous plant growth with strong branching",
              "High yield potential with excellent boll retention",
              "Excellent fibre quality and staple length",
              "Tolerant to major sucking pests and diseases",
              "Early maturity with synchronized boll bursting",
              "High ginning outturn (GOT) and easy picking"
            ]
          }
        ]}
      />

      <ProductShowcase 
        title="Pulses (Red gram / Tur)"
        image={featuredImg}
        reverse={true}
        theme="alternate"
        variants={[
          {
            name: "DRD SUPER PULSE",
            features: [
              "Vigorous plant with strong root system",
              "High yield potential with excellent pod filling",
              "Early to medium duration hybrid",
              "Tolerant to wilt and sterility mosaic disease",
              "High protein content and excellent cooking quality",
              "Suitable for rainfed and irrigated farming"
            ]
          }
        ]}
      />

      <ProductShowcase 
        title="Sorghum / Millets (Optional Expansion)"
        image={featuredImg}
        variants={[
          {
            name: "DRD MAX YIELD",
            features: [
              "Strong plant with excellent fodder/grain quality",
              "High yield potential with long panicles",
              "Excellent tolerance to drought conditions",
              "Good grain color and attractive appearance",
              "Ideal for both grain and fodder purposes"
            ]
          }
        ]}
      />

      <CTA 
        tagText="Become a Dealer Partner"
        title="Grow Your Business with a Trusted Seed Brand"
        description="We offer strong product demand, reliable supply, and structured dealer support. Join our expanding distribution network and serve the growing agricultural market with confidence."
        buttonText="Apply for Dealership"
        buttonLink="/contact"
      />
      
      <FAQ />
      
      <ContactForm />
    </>
  );
};

export default Product2;
