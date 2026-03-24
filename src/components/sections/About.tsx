import React from 'react';
import Container from '../common/Container';
import aboutImg from '../../assets/images/about.png';
import Button from '../common/Button';
import icon from '../../assets/images/apme_symbol-green.svg';
import icon2 from '../../assets/images/symbol 1.svg';


const About: React.FC = () => {
  return (
    <section id="about" className="py-[60px] md:py-[100px]">
      <Container>

        {/* Top Content */}
        <div className="mb-10 md:mb-16 max-w-3xl">
          
          {/* Tag */}
          <div className="flex items-center gap-2 mb-4">
            <img src={icon} alt="icon" className="w-[16px] h-[16px]" />
            <p className="text-[#005948] text-[16px] font-regular">
              About DRD Plantech
            </p>
          </div>

          {/* Heading */}
          <h2 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2]">
            Innovation Rooted in Agricultural Excellence
          </h2>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          
          {/* Image */}
          <div className="rounded-[12px] overflow-hidden h-full">
            <img 
              src={aboutImg} 
              alt="Agriculture" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div>
            <p className="text-[#333333] text-[18px] font-normal leading-[1.2] tracking-[0.011em] mb-[10px]">
              We specialize in developing premium hybrid vegetable seeds that help farmers increase productivity and profitability. With a strong focus on research, field trials, and quality control, we provide reliable seed solutions tailored to diverse growing conditions across India.
            </p>

            <p className="text-[#333333] text-[18px] font-normal leading-[1.2] tracking-[0.011em] mb-12">
              Our portfolio covers multiple vegetable segments, supporting both small-scale growers and commercial farming operations.
            </p>

            {/* Button */}
            <Button className="flex items-center gap-[8px] md:gap-[10px] px-[14px] py-[12px] md:px-[18px] md:py-[17px] rounded-[5px] bg-[#005948] hover:bg-[#004a3b] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-white text-[14px] md:text-[16px] font-semibold">
              Read More
              <img src={icon2} alt="icon" className="w-[18px] h-[18px]" />
            </Button>
          </div>

        </div>

      </Container>
    </section>
  );
};

export default About;