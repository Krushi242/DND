import React, { useState } from 'react';
import Container from '../common/Container';
import icon from '../../assets/images/apme_symbol-green.svg';
import faqImg from '../../assets/images/faq.png';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What are hybrid vegetable seeds?",
      answer: "Hybrid seeds are developed by combining selected parent lines to achieve superior yield, disease resistance, and uniform crop performance."
    },
    {
      question: "Do you offer disease-resistant varieties?",
      answer: "Yes, our seeds are scientifically bred to offer strong resistance to common pests and diseases, ensuring healthier crops and better output."
    },
    {
      question: "Are your seeds suitable for all seasons?",
      answer: "We offer both seasonal and all-season hybrid varieties. Please refer to our product catalog for specific sowing windows across different regions."
    },
    {
      question: "Do you supply across India?",
      answer: "Yes, we have an extensive distribution network and dealer partners supplying our seeds across all major agricultural regions in India."
    }
  ];

  return (
    <section id="faq" className="py-[60px] md:py-[100px] bg-[#FAF9F6]">
      <Container>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 items-stretch">
            
            {/* Left Column */}
            <div className="flex flex-col">
              {/* Header */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <img src={icon} alt="icon" className="w-[16px] h-[16px]" />
                  <p className="text-[#005948] text-[15px] font-medium">FAQ's</p>
                </div>
                <h2 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2]">
                  Frequently Asked Questions
                </h2>
              </div>
              
              {/* Image */}
              <div className="w-full mt-auto rounded-[12px] overflow-hidden">
                <img 
                  src={faqImg} 
                  alt="Farmer inspecting crops" 
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Column - Accordion */}
            <div className="flex flex-col justify-center space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-[#F2F4F0] rounded-[8px] overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="text-[18px] font-medium text-[#1F1F1F]">
                        {faq.question}
                    </span>
                    <span className={`ml-4 flex-shrink-0 text-[#333333] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 6L0 0H10L5 6Z" fill="currentColor"/>
                      </svg>
                    </span>
                  </button>
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[#333333] text-[16px] leading-[1.4] pr-12">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
