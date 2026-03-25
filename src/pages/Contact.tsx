import React, { Suspense, lazy } from 'react';
import SEO from '../components/common/SEO';
import PageBanner from '../components/sections/PageBanner';
import ContactContent from '../components/sections/ContactContent';
import aboutBg from '../assets/images/about_bg.webp';
import btnIcon from '../assets/images/symbol 1.svg';
import greenIcon from '../assets/images/symbol 2.svg';
import CTA from '../components/sections/CTA';
import FAQ from '../components/sections/FAQ';

const OfficeLocation = lazy(() => import('../components/sections/OfficeLocation'));


const Contact: React.FC = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with DRD Plantech LLP for product inquiries, dealership opportunities, and agricultural support."
        path="/contact"
        preloadImage={aboutBg}
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

      <Suspense fallback={<div className="h-[300px] bg-gray-50 animate-pulse rounded-[10px] mx-[16px] lg:mx-[20px]"></div>}>
        <OfficeLocation />
      </Suspense>

      <FAQ
        className="py-[50px] md:py-[80px] mx-[16px] lg:mx-[20px] bg-[#F2F4F0]"
        itemClassName="bg-[#FAF9F6] rounded-[10px] overflow-hidden"
        items={[
          {
            question: "How can I become a dealer?",
            answer: "You can apply through our dealership inquiry form. Our team will review your details and contact you."
          },
          {
            question: "How quickly will I receive a response?",
            answer: "Our team typically responds within 24-48 business hours to all inquiries."
          },
          {
            question: "Do you provide crop advisory support?",
            answer: "Yes, we provide technical assistance and crop advisory support to our farmers and dealer partners."
          },
          {
            question: "Can I request bulk pricing?",
            answer: "Yes, bulk pricing is available for large-scale commercial orders. Please contact our sales team for more details."
          }
        ]}
        action={
          <button
            type="button"
            className="flex items-center gap-[8px] md:gap-[10px] px-[20px] py-[12px] md:px-[25px] md:py-[15px] rounded-[5px] bg-[#005948] hover:bg-[#004a3b] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-white text-[14px] md:text-[16px] font-semibold"
            onClick={scrollToForm}
          >
            Contact Our Sales Team
            <img src={btnIcon} alt="icon" className="w-[18px] h-[18px]" />
          </button>
        }
      />

      <CTA 
        tagText="Become a Dealer Partner"
        title="Connect With Our Team Today"
        description="We are committed to providing reliable hybrid vegetable seeds, professional support, and long-term agricultural partnerships. Contact us today to discuss your requirements."
        buttonText="Send Inquiry"
        buttonLink="#contact-form"
        className="mt-[60px] md:mt-[100px] mb-[60px] md:mb-[100px]"
        secondaryAction={
          <a
            href="tel:+917984109698"
            className="group flex items-center gap-[8px] md:gap-[10px] px-[14px] py-[12px] md:px-[18px] md:py-[17px] rounded-[5px] border border-white text-white hover:bg-white hover:text-[#005948] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,255,255,0.3)] transition-all duration-300 text-[14px] md:text-[16px] font-semibold leading-[120%]"
          >
            Call Now
            <img src={btnIcon} alt="icon" className="w-[18px] h-[18px] group-hover:hidden" />
            <img src={greenIcon} alt="icon" className="w-[18px] h-[18px] hidden group-hover:block" />
          </a>
        }
      />
      
      
    </>
  );
};

export default Contact;
