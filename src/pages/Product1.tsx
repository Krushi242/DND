import React from 'react';
import PageBanner from '../components/sections/PageBanner';
import aboutBg from '../assets/images/about_bg.webp';
import ProductShowcase from '../components/common/ProductShowcase';
import tomatoImg from '../assets/images/Tomato.webp';
import okraImg from '../assets/images/Bhendi.webp';
import bitterGourdImg from '../assets/images/Bitter-Gourd.webp';
import bottleGourdImg from '../assets/images/Bottle-Gourd.webp';
import watermelonImg from '../assets/images/Watermelon.webp';
import muskmelonImg from '../assets/images/Muskmelon.webp';
import cucumberImg from '../assets/images/Cucumber.webp';
import chilliImg from '../assets/images/Chilli.webp';
import beansImg from '../assets/images/Beans.webp';
import CTA from '../components/sections/CTA';
import FAQ from '../components/sections/FAQ';
import ContactForm from '../components/sections/ContactForm';
import SEO from '../components/common/SEO';

const Product1: React.FC = () => {
  return (
    <>
      <SEO
        title="Vegetable Seeds"
        description="Explore DRD Plantech LLP vegetable seed hybrids including tomato, okra, bitter gourd, bottle gourd, watermelon, muskmelon, cucumber, chilli, and beans."
        path="/Vegetable Seeds"
        keywords="vegetable seeds India, tomato hybrid seeds, okra seeds, chilli seeds, cucumber seeds, DRD Plantech LLP products"
        preloadImage="/src/assets/images/hero_bg.webp"
      />
      <PageBanner title="Our Vegetable Seeds" backgroundImage={aboutBg} />
      
      <ProductShowcase 
        title="Tomato"
        image={tomatoImg}
        variants={[
          {
            name: "DRD 101 (Premium Hybrid)",
            features: [
              "Semi-determinate plant with strong vigor and balanced canopy",
              "Fruits are round, smooth, and bright red with excellent shine",
              "Average fruit weight: 90–110 grams",
              "Early harvest: 60–65 days after transplanting",
              "High firmness ensures suitability for long-distance transportation",
              "Tolerant to ToLCV and adaptable to multiple growing seasons",
              "Ideal for fresh market and bulk supply"
            ]
          },
          {
            name: "DRD SHAKTI",
            features: [
              "Determinate hybrid with compact growth and high fruit setting",
              "Uniform, flat, round fruits with a deep red color at maturity",
              "Average fruit weight: 80–100 grams",
              "Early to mid-season maturity",
              "Strong shelf life with good transport quality",
              "High-yielding hybrid suitable for year-round cultivation"
            ]
          }
        ]}
      />

      <ProductShowcase 
        title="Okra (Bhendi)"
        image={okraImg}
        reverse={true}
        theme="alternate"
        variants={[
          {
            name: "DRD GREEN GOLD",
            features: [
              "Strong, vigorous plants with excellent branching",
              "Dark green, tender fruits with a smooth surface",
              "High tolerance to YVMV (Yellow Vein Mosaic Virus)",
              "Early picking with continuous harvesting",
              "Uniform fruit size with high market preference",
              "Suitable for multiple harvest cycles"
            ]
          },
          {
            name: "DRD SHIVAM",
            features: [
              "Medium-tall plants with strong stems and foliage",
              "Dark green pods, tender and fiberless",
              "Early maturity with high yield potential",
              "Consistent fruiting across picking cycles",
              "Performs well in diverse climatic conditions"
            ]
          }
        ]}
      />

      <ProductShowcase 
        title="Bitter Gourd"
        image={bitterGourdImg}
        variants={[
          {
            name: "DRD KRANTI",
            features: [
              "Vigorous vine growth with high branching",
              "Dark green fruits with thick spines",
              "Early harvesting and continuous fruiting",
              "Uniform size and attractive appearance",
              "High-yielding hybrid suitable for commercial farming"
            ]
          }
        ]}
      />

      <ProductShowcase 
        title="Bottle Gourd"
        image={bottleGourdImg}
        reverse={true}
        theme="alternate"
        variants={[
          {
            name: "DRD SHREE",
            features: [
              "Strong vine with excellent fruit setting",
              "Cylindrical, glossy green fruits",
              "Uniform length and smooth surface",
              "Early maturity with high productivity",
              "Suitable for long-distance transportation"
            ]
          }
        ]}
      />

      <ProductShowcase 
        title="Watermelon"
        image={watermelonImg}
        variants={[
          {
            name: "DRD RED STAR",
            features: [
              "Strong vine with high fruit setting capacity",
              "Deep red flesh with high sweetness (high TSS)",
              "Uniform oval fruits with strong rind",
              "Excellent shelf life and transport quality",
              "Ideal for commercial cultivation and bulk markets"
            ]
          }
        ]}
      />

      <ProductShowcase 
        title="Muskmelon"
        image={muskmelonImg}
        reverse={true}
        theme="alternate"
        variants={[
          {
            name: "DRD SWEET KING",
            features: [
              "Early maturity hybrid with uniform fruit development",
              "High sweetness and strong aroma",
              "Netted skin with an attractive appearance",
              "Good shelf life and market demand",
              "Suitable for early-season cultivation"
            ]
          }
        ]}
      />

      <ProductShowcase 
        title="Cucumber"
        image={cucumberImg}
        variants={[
          {
            name: "DRD FRESH LINE",
            features: [
              "Vigorous plant with high fruiting capacity",
              "Long, straight, glossy green fruits",
              "Crisp texture with excellent taste",
              "Early harvesting with consistent yield",
              "Suitable for open field and protected cultivation"
            ]
          }
        ]}
      />

      <ProductShowcase 
        title="Chilli"
        image={chilliImg}
        reverse={true}
        theme="alternate"
        variants={[
          {
            name: "DRD SPICY PRO",
            features: [
              "Strong plant with high branching",
              "Dark green fruits with high pungency",
              "Dual-purpose hybrid (green & dry use)",
              "Uniform fruit size and strong yield performance",
              "Adaptable to multiple seasons"
            ]
          }
        ]}
      />

      <ProductShowcase 
        title="Cluster Bean & Beans"
        image={beansImg}
        variants={[
          {
            name: "DRD MAX YIELD",
            features: [
              "High branching plants with dense pod setting",
              "Uniform, tender pods with excellent market quality",
              "Early maturity with multiple harvest cycles",
              "High-yielding potential with consistent performance"
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

export default Product1;
