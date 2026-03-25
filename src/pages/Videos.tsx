import React from 'react';
import PageBanner from '../components/sections/PageBanner';
import Container from '../components/common/Container';
import SEO from '../components/common/SEO';
import videoSrc from '../assets/video/futured-video.mp4';
import videoBg from '../assets/images/hero_bg.webp';
import icon from '../assets/images/apme_symbol-green.svg';

import CTA from '../components/sections/CTA';

const Videos: React.FC = () => {
  return (
    <>
      <SEO
        title="Video Gallery - DRD Plantech LLP"
        description="Watch our featured videos and learn more about our hybrid seed research, field trials, and quality standards."
        path="/videos"
        keywords="seed research video, hybrid seeds trials, DRD Plantech videos, agriculture videos India"
      />
      
      <PageBanner title="Video Gallery" backgroundImage={videoBg} />

      <section className="py-[60px] md:py-[100px] bg-[#FAF9F6]">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <img src={icon} alt="icon" className="w-[16px] h-[16px]" />
                <p className="text-[#005948] text-[16px] font-medium italic">
                  Featured Presentation
                </p>
              </div>
              <h2 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2] mb-6">
                Innovation in Every Seed
              </h2>
              <p className="text-[#4A4A4A] text-[16px] md:text-[18px]">
                Watch our featured video to discover the dedication, research, and technology behind our high-performance hybrid seeds.
              </p>
            </div>

            {/* Video Player Section */}
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl bg-black border border-[#005948]/10 aspect-video">
              <video 
                controls
                className="w-full h-full object-contain"
                poster={videoBg}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-[#005948]/80 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                  DRD Plantech Official
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100" style={{ cursor: 'default' }}>
                <h3 className="text-[#1F1F1F] text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#005948]/10 text-[#005948] flex items-center justify-center text-sm font-bold">1</span>
                  Field Research Trials
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Our videos showcase the rigorous multi-location trials and performance evaluations each hybrid undergoes before reaching the market.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100" style={{ cursor: 'default' }}>
                <h3 className="text-[#1F1F1F] text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#005948]/10 text-[#005948] flex items-center justify-center text-sm font-bold">2</span>
                  Quality Assurance
                </h3>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  From genetic purity to physical quality, see how we maintain the highest standards in seed processing and packaging.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTA
        tagText="Contact Us"
        title="Ready to grow with us?"
        description="Contact our team today to learn more about our products or to become a dealer partner."
        buttonText="Get in touch"
        buttonLink="/contact"
        className="mb-[60px] md:mb-[100px]"
      />
    </>
  );
};

export default Videos;
