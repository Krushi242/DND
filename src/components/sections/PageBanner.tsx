import React from 'react';
import Container from '../common/Container';

interface PageBannerProps {
  title: string;
  backgroundImage?: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ title, backgroundImage }) => {
  return (
    <section 
      className="mx-[20px] rounded-[10px] bg-[#0F5D4E] mt-[20px] relative overflow-hidden h-[467px] flex items-center bg-cover bg-center"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {/* No overlay for background image */}
      {/* Text Content */}
      <Container className="h-full relative z-10 flex items-center w-full">
        <h1 className="text-white text-[34px] md:text-[56px] font-medium tracking-[0.011em] leading-[1.2]">
          {title}
        </h1>
      </Container>
      
      {/* Optional decorative layer here if needed in the future */}
      {!backgroundImage && (
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{
          backgroundImage: 'radial-gradient(circle at right center, rgba(255,255,255,0.2) 0%, transparent 50%)'
        }}></div>
      )}
    </section>
  );
};

export default PageBanner;
