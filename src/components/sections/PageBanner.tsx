import React from 'react';
import Container from '../common/Container';

interface PageBannerProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  backgroundImage?: string;
  className?: string;
  contentClassName?: string;
}

const PageBanner: React.FC<PageBannerProps> = ({
  title,
  description,
  actions,
  backgroundImage,
  className = '',
  contentClassName = '',
}) => {
  return (
    <section 
      className={`mx-[16px] md:mx-[20px] rounded-[10px] bg-[#0F5D4E] relative overflow-hidden h-[300px] md:h-[467px] flex items-center bg-cover bg-center ${className}`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {/* No overlay for background image */}
      {/* Text Content */}
      <Container size="wide" className="h-full relative z-10 flex items-center w-full">
        <div className={`max-w-3xl ${contentClassName}`}>
          <h1 className="text-white text-[34px] md:text-[56px] font-medium tracking-[0.011em] leading-[1.2]">
            {title}
          </h1>

          {description && (
            <p className="text-white/90 text-[16px] sm:text-[18px] leading-[1.6] mt-6 max-w-2xl">
              {description}
            </p>
          )}

          {actions && (
            <div className="flex flex-wrap items-center gap-4 mt-10">
              {actions}
            </div>
          )}
        </div>
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
