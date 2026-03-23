import React from 'react';
import Container from '../common/Container';
import iconWhite from '../../assets/images/apme_symbol-white.svg';
import ctaBg from '../../assets/images/cta-bg.png';
import Button from '../common/Button';
import icon2 from '../../assets/images/symbol 1.svg';

export interface CTAProps {
  tagText?: string;
  title: string;
  description: string;
  buttonText: string;
  className?: string;
}

const CTA: React.FC<CTAProps> = ({
  tagText,
  title,
  description,
  buttonText,
  className = '',
}) => {
  return (
    <section
  className={`mx-[16px] lg:mx-[20px] rounded-[10px] py-[50px] px-[20px] md:py-[60px] md:px-[60px] bg-cover bg-center min-h-[430px] flex items-center ${className}`}
  style={{ backgroundImage: `url(${ctaBg})`, backgroundColor: '#F26A21', backgroundSize: 'cover' }}
>
      <Container className="!px-0">

        <div className="flex flex-col items-center justify-center text-center">

          {/* Tag */}
          {tagText && (
            <div className="flex items-center gap-2 mb-4">
              <img src={iconWhite} alt="icon" className="w-[16px] h-[16px]" />
              <p className="text-white text-[16px] font-medium">
                {tagText}
              </p>
            </div>
          )}

          {/* Heading */}
          <h2 className="text-white text-[28px] md:text-[36px] font-medium leading-[1.2] mb-6 max-w-4xl">
            {title}
          </h2>

          {/* Paragraph */}
          <p className="text-white text-[16px] leading-relaxed max-w-4xl mb-12 leading-[1.2]">
            {description}
          </p>

          {/* Button */}
          <Button className="flex items-center gap-[8px] md:gap-[10px] px-[14px] py-[12px] md:px-[18px] md:py-[17px] rounded-[5px] bg-[#005948] hover:bg-[#004a3b] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-white text-[14px] md:text-[16px] font-semibold">
            {buttonText}
            <img src={icon2} alt="icon" className="w-[18px] h-[18px]" />
          </Button>

        </div>

      </Container>
    </section>
  );
};

export default CTA;
