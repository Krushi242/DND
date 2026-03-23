import React from 'react';
import Container from './Container';

export interface ProductVariant {
  name: string;
  features: string[];
}

export interface ProductShowcaseProps {
  title: string;
  image: string;
  imageAlt?: string;
  variants: ProductVariant[];
  reverse?: boolean;
  theme?: 'default' | 'alternate';
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  title,
  image,
  imageAlt = "Product image",
  variants,
  reverse = false,
  theme = 'default'
}) => {
  const outerBg = theme === 'alternate' ? 'bg-[#F2F4F0]' : 'bg-[#FAFAF9]';
  const innerBg = theme === 'alternate' ? 'bg-[#FAFAF9]' : 'bg-[#F2F4F0]';

  return (
    <section className={`py-16 lg:py-24 ${outerBg}`}>
      <Container>
        {/* Title */}
        <h2 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2] text-center mb-10 lg:mb-16">
          {title}
        </h2>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[40px] items-stretch">
          
          {/* Image Column */}
          <div className={`rounded-[12px] overflow-hidden w-full h-full min-h-[400px] ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
            <img 
              src={image} 
              alt={imageAlt} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Variants Column */}
          <div className={`flex flex-col gap-6 w-full h-full ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
            {variants.map((variant, index) => (
              <div 
                key={index} 
                className={`${innerBg} rounded-[10px] p-8 lg:p-10 flex flex-col justify-center flex-1`}
              >
                <h3 className="text-[#1F1F1F] text-[18px] sm:text-[20px] font-semibold leading-[1.2] mb-5">
                  {variant.name}
                </h3>
                <ul className="list-disc pl-5 text-[#333333] text-[15px] sm:text-[16px] font-normal leading-[1.6] space-y-[6px]">
                  {variant.features.map((feature, i) => (
                    <li key={i} className="pl-1">{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
};

export default ProductShowcase;
