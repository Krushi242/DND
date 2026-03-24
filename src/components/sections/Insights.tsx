import React from 'react';
import Container from '../common/Container';
import knowledgeImg from '../../assets/images/knowledge.png';
import icon from '../../assets/images/apme_symbol-green.svg';
import btnIcon from '../../assets/images/symbol 1.svg';

const Insights: React.FC = () => {
  return (
    <section id="insights" className="py-[60px] md:py-[100px]">
      <Container>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-20 items-center">

            {/* Left Column */}
            <div className="flex flex-col py-6">
              <div className="mb-5 md:mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <img src={icon} alt="icon" className="w-[16px] h-[16px]" />
                  <p className="text-[#005948] text-[16px] font-regular">Knowledge Center</p>
                </div>

                <h2 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2]">
                  Practical Farming Insights
                </h2>
              </div>

              <div className="text-[#333333] text-[15px] lg:text-[16px] leading-[1.6]">
                <p className="mb-4 text-[#333333]">
                  Stay informed with expert guidance and cultivation strategies:
                </p>
                <ul className="list-disc pl-5 text-[#333333] text-[16px] font-medium leading-[1.2] space-y-[4px] mt-4 mb-6 md:mb-16">
                  <li>How to choose the right hybrid seeds</li>
                  <li>Disease management techniques</li>
                  <li>Seasonal crop planning tips</li>
                  <li>Yield improvement practices</li>
                </ul>
              </div>

              <div>
                <button className="inline-flex items-center gap-[8px] md:gap-[10px] px-[14px] py-[12px] md:px-[20px] md:py-[16px] rounded-[5px] bg-[#005948] hover:bg-[#004a3b] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-white text-[14px] md:text-[15px] lg:text-[16px] font-semibold">
                  Visit Knowledge Center
                  <img src={btnIcon} alt="icon" className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full h-full min-h-[300px] lg:min-h-[400px] rounded-[10px] overflow-hidden">
              <img
                src={knowledgeImg}
                alt="Practical Farming Insights"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default Insights;
