import React from 'react';
import Container from './Container';
import ProductRichText from './ProductRichText';

export interface ProductVariant {
  name: string;
  features: string[];
  description?: string;
  image?: string;
  imageAlt?: string;
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
  const sectionPadding = 'py-[60px] md:py-[100px]';
  const sectionMargin = theme === 'alternate' ? 'mx-[16px] md:mx-[20px]' : '';
  const hasSeparateVariantImages = variants.length > 1 && variants.every((variant) => Boolean(variant.image || image));

  return (
    <section className={`${sectionPadding} ${outerBg} ${sectionMargin} mb-[16px] md:mb-[20px] rounded-[12px] overflow-hidden`}>
      <Container size="wide">
        {/* Title */}
        <h2 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2] text-center mb-6 lg:mb-12">
          {title}
        </h2>

        {hasSeparateVariantImages ? (
          <div className="flex flex-col gap-6 lg:gap-[30px]">
            {variants.map((variant, index) => {
              const rowReverse = reverse ? index % 2 === 0 : index % 2 !== 0;

              return (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[30px] items-stretch"
                >
                  <div className={`rounded-[12px] overflow-hidden w-full h-[280px] sm:h-[340px] lg:h-full ${rowReverse ? 'lg:order-2' : 'lg:order-1'}`}>
                    {variant.image || image ? (
                      <img
                        src={variant.image || image}
                        alt={variant.imageAlt || imageAlt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>

                  <div className={`w-full h-full ${rowReverse ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className={`${innerBg} rounded-[10px] p-[20px] md:p-[30px] flex flex-col justify-center h-full`}>
                      <h3 className="text-[#1F1F1F] text-[18px] sm:text-[20px] font-semibold leading-[1.2] mb-5">
                        {variant.name}
                      </h3>
                      {variant.description ? (
                        <ProductRichText content={variant.description} />
                      ) : (
                        <ul className="list-disc pl-5 text-[#333333] text-[15px] sm:text-[16px] font-normal space-y-[6px]">
                          {variant.features.map((feature, i) => (
                            <li key={i} className="pl-1">{feature}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[30px] items-stretch">
            <div className={`rounded-[12px] overflow-hidden w-full h-[280px] sm:h-[340px] lg:h-full ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
              {image ? (
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : null}
            </div>

            <div className={`flex flex-col gap-6 w-full h-full ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
              {variants.map((variant, index) => (
                <div
                  key={index}
                  className={`${innerBg} rounded-[10px] p-[20px] md:p-[30px] flex flex-col justify-center flex-1`}
                >
                  <h3 className="text-[#1F1F1F] text-[18px] sm:text-[20px] font-semibold leading-[1.2] mb-5">
                    {variant.name}
                  </h3>
                  {variant.description ? (
                    <ProductRichText content={variant.description} />
                  ) : (
                    <ul className="list-disc pl-5 text-[#333333] text-[15px] sm:text-[16px] font-normal space-y-[6px]">
                      {variant.features.map((feature, i) => (
                        <li key={i} className="pl-1">{feature}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProductShowcase;
