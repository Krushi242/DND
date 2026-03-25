import React from 'react';
import PageBanner from '../components/sections/PageBanner';
import Container from '../components/common/Container';
import aboutBg from '../assets/images/about_bg.webp';
import vegImg from '../assets/images/commercial.webp';
import fieldImg from '../assets/images/featured.webp';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import CTA from '../components/sections/CTA';

const Products: React.FC = () => {
  const categories = [
    {
      title: "Vegetable Seeds",
      description: "High-performance hybrid varieties engineered for exceptional yield, disease resistance, and market-leading quality.",
      image: vegImg,
      link: "/vegetable-seeds",
      tags: ["High Yield", "Disease Resistant", "Premium Quality"]
    },
    {
      title: "Field Crop Seeds",
      description: "Resilient hybrids for large-scale farming, focusing on adaptability, stress tolerance, and maximized harvest potential.",
      image: fieldImg,
      link: "/field-crop-seeds",
      tags: ["Resilient", "Stress Tolerant", "High Harvest"]
    }
  ];

  return (
    <>
      <SEO 
        title="Our Product Range - Hybrid Vegetable & Field Crop Seeds"
        description="Explore DRD Plantech LLP's extensive portfolio of high-yielding hybrid vegetable seeds and resilient field crop seeds designed for modern agriculture."
        path="/products"
      />
      
      <PageBanner title="Our Product Portfolio" backgroundImage={aboutBg} />

      <section className="py-20 md:py-32 bg-[#FAF9F6]">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
            <h2 className="text-[#1F1F1F] text-3xl md:text-4xl font-medium leading-tight mb-6">
              Empowering Agriculture with Superior Genetics
            </h2>
            <p className="text-[#4A4A4A] text-lg md:text-xl leading-relaxed">
              We provide a diverse range of hybrid seeds meticulously developed to meet the evolving needs of commercial growers and large-scale farmers across India.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {categories.map((category, index) => (
              <Link 
                key={index}
                to={category.link}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100"
              >
                {/* Image Section */}
                <div className="relative h-64 md:h-120 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                  
                  {/* Floating Tags */}
                  <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                    {category.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#005948] text-xs font-semibold rounded-full uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <h3 className="text-[#1F1F1F] text-2xl md:text-3xl font-semibold mb-4 flex items-center justify-between">
                    {category.title}
                    <span className="w-10 h-10 rounded-full bg-[#005948]/10 text-[#005948] flex items-center justify-center transition-transform duration-500 group-hover:translate-x-2">
                      <ChevronRight size={20} />
                    </span>
                  </h3>
                  <p className="text-[#4A4A4A] text-lg leading-relaxed mb-8 flex-grow">
                    {category.description}
                  </p>
                  <div className="pt-4 border-t border-gray-50">
                    <span className="text-[#F26A21] font-semibold text-sm uppercase tracking-widest flex items-center gap-2">
                      View Varieties <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTA 
        tagText="Agricultural Excellence"
        title="Looking for Expert Crop Advice?"
        description="Our agronomy team is here to help you select the best variety for your specific region and season. Let's work together to maximize your yield."
        buttonText="Talk to an Expert"
        buttonLink="/contact"
        className="mb-[60px] md:mb-[100px]"
      />
    </>
  );
};

export default Products;
