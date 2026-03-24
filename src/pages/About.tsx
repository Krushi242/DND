import React from 'react';
import PageBanner from '../components/sections/PageBanner';
import CTA from '../components/sections/CTA';
import ResearchInnovation from '../components/sections/ResearchInnovation';
import QualityAssurance from '../components/sections/QualityAssurance';
import SplitSection from '../components/common/SplitSection';
import GeographicPresence from '../components/sections/GeographicPresence';
import SustainableAgriculture from '../components/sections/SustainableAgriculture';
import Container from '../components/common/Container';
import SEO from '../components/common/SEO';
import aboutImg from '../assets/images/about.webp';
import farmersImg from '../assets/images/commercial.webp';
import icon from '../assets/images/apme_symbol-green.svg';
import aboutBg from '../assets/images/about_bg.webp';

const AboutPage: React.FC = () => {
  return (
    <>
      <SEO
        title="About DRD Plantech LLP"
        description="Learn about DRD Plantech LLP, our hybrid seed research, quality standards, farmer-focused approach, and commitment to sustainable agriculture."
        path="/about"
        keywords="about DRD Plantech LLP, hybrid seed company, seed research, quality assurance seeds, sustainable agriculture India"
        preloadImage="/src/assets/images/about_bg.webp"
      />
      <PageBanner title="About DRD Plantech LLP" backgroundImage={aboutBg} />
      
      <section className="py-[60px] md:py-[100px]">
        <Container>
          {/* Top Content */}
          <div className="mb-10 lg:mb-12 max-w-4xl">
            {/* Tag */}
            <div className="flex items-center gap-2 mb-4">
              <img src={icon} alt="icon" className="w-[16px] h-[16px]" />
              <p className="text-[#005948] text-[16px] font-medium">
                About DRD Plantech
              </p>
            </div>

            {/* Heading */}
            <h2 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2]">
              Hybrid Vegetable Seed Company Focused on Performance and Reliability
            </h2>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image (matches the homepage style) */}
            <div className="rounded-[12px] overflow-hidden h-full">
              <img 
                src={aboutImg} 
                alt="Agriculture" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description (Custom detailed content for the About Page) */}
            <div>
              <p className="text-[#333333] text-[16px] md:text-[18px] font-normal tracking-[0.011em] mb-[10px]">
                DRD Plantech LLP is a hybrid vegetable seed company dedicated to developing high-yield, disease-resistant, and market-oriented seed varieties for modern agriculture. We specialize in producing premium hybrid seeds that support commercial vegetable growers, progressive farmers, and distribution partners across India.
              </p>
              
              <p className="text-[#333333] text-[16px] md:text-[18px] font-normal tracking-[0.011em] mb-[26px]">
                Our product portfolio includes multiple vegetable segments such as okra, watermelon, muskmelon, bitter gourd, bottle gourd, chilli, tomato, cucumber, cluster bean, and beans. Each variety is developed with a focus on productivity, uniformity, adaptability, and farmer profitability.
              </p>

              <p className="text-[#1F1F1F] text-[16px] md:text-[18px] font-semibold mb-[10px]">
                Our Vision
              </p>
              <p className="text-[#333333] text-[16px] md:text-[18px] font-normal tracking-[0.011em] mb-[40px]">
                To contribute to sustainable agricultural growth by delivering innovative hybrid vegetable seed solutions that improve crop performance and enhance farmer income.
              </p>

              <p className="text-[#1F1F1F] text-[16px] md:text-[18px] font-semibold mb-[10px]">
                Our Mission
              </p>
              <ul className="list-disc pl-5 text-[#333333] text-[16px] md:text-[18px] font-normal leading-[1.4] tracking-[0.011em] space-y-[6px] mb-[30px]">
                <li>To develop high-performance hybrid vegetable seeds through research-driven breeding programs</li>
                <li>To ensure strong germination, genetic purity, and disease resistance</li>
                <li>To support farmers with reliable seed solutions suited to diverse climatic conditions</li>
                <li>To build a trusted distribution network across key agricultural regions</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Research & Innovation Section */}
      <ResearchInnovation />

      {/* Quality Assurance Section */}
      <QualityAssurance />

      {/* Farmer-Centric Approach Section */}
      <SplitSection
        title="Farmer-Centric Approach"
        listTitle="We understand that seed selection directly impacts yield and profitability. Our hybrids are developed to meet the needs of:"
        listItems={[
          "Commercial vegetable growers",
          "Multi-season cultivators",
          "Export-oriented producers",
          "Progressive and small-scale farmers"
        ]}
        footerText="We emphasize early maturity cycles, strong fruit quality, and transport durability to support market-driven agriculture."
        image={farmersImg}
        imageAlt="Farmer holding vegetables"
        variant="split"
      />

      
      {/* Geographic Presence Section */}
      <GeographicPresence />

      {/* Sustainable Agriculture Section */}
      <SustainableAgriculture />


      {/* Reusable CTA with custom content for the About Page */}
      <CTA 
        tagText="Become a Dealer Partner"
        title="Partner With Us"
        description="Whether you are a farmer seeking high-performance hybrids or a dealer looking to expand your portfolio with reliable seed varieties, DRD Plantech LLP is committed to supporting your growth."
        buttonText="Apply for Dealership"
        className="mb-[100px]"
      />
    </>
  );
};

export default AboutPage;
