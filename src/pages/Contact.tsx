import React from 'react';
import PageBanner from '../components/sections/PageBanner';
import ContactContent from '../components/sections/ContactContent';
import aboutBg from '../assets/images/about_bg.png';
import btnIcon from '../assets/images/symbol 1.svg';
import greenIcon from '../assets/images/symbol 2.svg';
import CTA from '../components/sections/CTA';
import FAQ from '../components/sections/FAQ';
import SEO from '../components/common/SEO';


const Contact: React.FC = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <SEO
        title="Contact DRD Plantech LLP"
        description="Contact DRD Plantech LLP for hybrid seed inquiries, dealership opportunities, bulk orders, and crop support from our agricultural team."
        path="/contact"
        keywords="contact DRD Plantech LLP, seed company contact, dealership inquiry, bulk seed orders, agricultural support"
      />
      <PageBanner
        title="Contact Us"
        description="Get in touch with our team for product inquiries, dealership opportunities, bulk orders, and crop advisory support. We are committed to providing prompt, professional assistance to farmers, dealers, and agricultural partners."
        backgroundImage={aboutBg}
        actions={
          <>
            <button
              type="button"
              className="flex items-center gap-[8px] md:gap-[10px] px-[14px] py-[12px] md:px-[18px] md:py-[17px] rounded-[5px] bg-[#F26A21] hover:bg-[#e05a12] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(242,106,33,0.3)] transition-all duration-300 text-white text-[14px] md:text-[16px] font-semibold leading-[120%]"
              onClick={scrollToForm}
            >
              Send Inquiry
              <img src={btnIcon} alt="icon" className="w-[18px] h-[18px]" />
            </button>
            <a
              href="tel:+917984109698"
              className="group flex items-center gap-[8px] md:gap-[10px] px-[14px] py-[12px] md:px-[18px] md:py-[17px] rounded-[5px] border border-white text-white hover:bg-white hover:text-[#005948] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,255,255,0.3)] transition-all duration-300 text-[14px] md:text-[16px] font-semibold leading-[120%]"
            >
              Call Now
              <img src={btnIcon} alt="icon" className="w-[18px] h-[18px] group-hover:hidden" />
              <img src={greenIcon} alt="icon" className="w-[18px] h-[18px] hidden group-hover:block" />
            </a>
          </>
        }
      />
      <ContactContent />

      <FAQ />

      <CTA 
        tagText="Become a Dealer Partner"
        title="Connect With Our Team Today"
        description="We are committed to providing reliable hybrid vegetable seeds, professional support, and long-term agricultural partnerships. Contact us today to discuss your requirements."
        buttonText="Send Inquiry"
        className="mb-[100px]"

      />
      
      
    </>
  );
};

export default Contact;
