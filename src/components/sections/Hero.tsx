import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import Button from '../common/Button';
import heroBg from '../../assets/images/hero_bg.webp';
import tagIcon from '../../assets/images/apme_symbol-white.svg';
import icon from '../../assets/images/symbol 1.svg';
import greenIcon from '../../assets/images/symbol 2.svg';


const Hero: React.FC = () => {
  return (
    <section className="relative py-[60px] lg:py-0 lg:h-[calc(100vh-162px)] lg:min-h-[700px] flex items-center mx-[16px] lg:mx-[20px] rounded-[10px] overflow-hidden">      {/* Background Image with Overlay */}
      <img 
        src={heroBg} 
        alt="Hero Background" 
        className="absolute inset-0 z-0 w-full h-full object-cover"
      />
      
      {/* Mobile Bottom Overlay for clear button contrast */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] z-[5] bg-gradient-to-t from-[#002f23] via-[#002f23]/60 to-transparent opacity-90 md:hidden pointer-events-none"></div>

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4 mt-8 md:mt-0">
            <img src={tagIcon} alt="icon" className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]" />
            <p className="text-white text-[14px] md:text-[16px] tracking-wide">
              Welcome To Our Plantech
            </p>
          </div>
          <h1 className="text-white mb-6 leading-[1.2] md:leading-[1.2] text-[34px] md:text-[56px] tracking-[0.011em]">
            Hybrid Vegetable Seeds <br className="hidden md:block" />
            Built for Higher Yield & <br className="hidden md:block" />
            Stronger Performance
          </h1>
          <p className="text-[15px] md:text-[18px] text-white mb-10 md:mb-12 max-w-2xl font-body tracking-[0.011em]">
            Delivering high-performance hybrid vegetable seeds designed for commercial farmers, dealers, and modern agriculture markets. Our varieties are developed for superior yield, disease resistance, uniform quality, and dependable results across seasons.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link to="/products">
              <Button
                variant="secondary"
                size="lg"
                className="flex items-center gap-[8px] md:gap-[10px] px-[14px] py-[12px] md:px-[18px] md:py-[17px] rounded-[5px] bg-[#F26A21] hover:bg-[#e05a12] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(242,106,33,0.3)] transition-all duration-300 text-white text-[14px] md:text-[16px] font-semibold leading-[120%]"
              >
                Explore Our Products
                <img src={icon} alt="icon" className="w-[18px] h-[18px]" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="white"
                size="lg"
                className="flex items-center gap-[8px] md:gap-[10px] px-[14px] py-[12px] md:px-[18px] md:py-[17px] rounded-[5px] !bg-transparent border !border-white text-white hover:!bg-white hover:!text-[#005948] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(255,255,255,0.3)] transition-all duration-300 text-[14px] md:text-[16px] font-semibold leading-[120%] group"
              >
                Become a Dealer
                <img src={icon} alt="icon" className="w-[18px] h-[18px] group-hover:hidden" />
                <img src={greenIcon} alt="icon" className="w-[18px] h-[18px] hidden group-hover:block" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
      
    </section>
  );
};

export default Hero;
