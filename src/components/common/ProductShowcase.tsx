import React, { useEffect, useRef, useState } from 'react';
import Container from './Container';
import ProductRichText from './ProductRichText';
import { toGalleryImageUrl } from '../../utils/mediaLinks';

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
  imageAlt = 'Product image',
  variants,
  reverse = false,
  theme = 'default',
}) => {
  const outerBg = theme === 'alternate' ? 'bg-[#F2F4F0]' : 'bg-[#FAFAF9]';
  const innerBg = theme === 'alternate' ? 'bg-[#FAFAF9]' : 'bg-[#F2F4F0]';
  const sectionPadding = 'py-[60px] md:py-[100px]';
  const sectionMargin = theme === 'alternate' ? 'mx-[16px] md:mx-[20px]' : '';
  const hasSeparateVariantImages = variants.length > 1 && variants.every((variant) => Boolean(variant.image || image));

  const multiContentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const singleContentRef = useRef<HTMLDivElement | null>(null);
  const [multiContentHeights, setMultiContentHeights] = useState<number[]>([]);
  const [singleContentHeight, setSingleContentHeight] = useState<number | null>(null);

  useEffect(() => {
    const isDesktop = () => typeof window !== 'undefined' && window.innerWidth >= 1024;
    const observers: ResizeObserver[] = [];

    const updateMultiHeights = () => {
      if (!isDesktop()) {
        setMultiContentHeights([]);
        return;
      }

      setMultiContentHeights(
        multiContentRefs.current.map((element) => (element ? Math.ceil(element.getBoundingClientRect().height) : 0))
      );
    };

    const updateSingleHeight = () => {
      if (!isDesktop() || !singleContentRef.current) {
        setSingleContentHeight(null);
        return;
      }

      setSingleContentHeight(Math.ceil(singleContentRef.current.getBoundingClientRect().height));
    };

    if (typeof window !== 'undefined' && typeof ResizeObserver !== 'undefined') {
      multiContentRefs.current.forEach((element) => {
        if (!element) {
          return;
        }

        const observer = new ResizeObserver(updateMultiHeights);
        observer.observe(element);
        observers.push(observer);
      });

      if (singleContentRef.current) {
        const observer = new ResizeObserver(updateSingleHeight);
        observer.observe(singleContentRef.current);
        observers.push(observer);
      }
    }

    updateMultiHeights();
    updateSingleHeight();

    const handleResize = () => {
      updateMultiHeights();
      updateSingleHeight();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [hasSeparateVariantImages, variants]);

  return (
    <section className={`${sectionPadding} ${outerBg} ${sectionMargin} mb-[16px] md:mb-[20px] rounded-[12px] overflow-hidden`}>
      <Container size="wide">
        <h2 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2] text-center mb-6 lg:mb-12">
          {title}
        </h2>

        {hasSeparateVariantImages ? (
          <div className="flex flex-col gap-6 lg:gap-[30px]">
            {variants.map((variant, index) => {
              const rowReverse = reverse ? index % 2 === 0 : index % 2 !== 0;
              const desktopHeight = multiContentHeights[index];

              return (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[30px] items-start"
                >
                  <div
                    className={`rounded-[12px] overflow-hidden w-full h-[260px] sm:h-[300px] self-start ${rowReverse ? 'lg:order-2' : 'lg:order-1'}`}
                    style={desktopHeight ? { height: `${desktopHeight}px` } : undefined}
                  >
                    {variant.image || image ? (
                        <img
                          src={toGalleryImageUrl(variant.image || image || '')}
                          alt={variant.imageAlt || imageAlt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                    ) : null}
                  </div>

                  <div className={`w-full ${rowReverse ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div
                      ref={(element) => {
                        multiContentRefs.current[index] = element;
                      }}
                      className={`${innerBg} rounded-[10px] p-[20px] md:p-[30px]`}
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
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-[30px] items-start">
            <div
              className={`rounded-[12px] overflow-hidden w-full h-[260px] sm:h-[300px] self-start ${reverse ? 'lg:order-2' : 'lg:order-1'}`}
              style={singleContentHeight ? { height: `${singleContentHeight}px` } : undefined}
            >
              {image ? (
                <img
                  src={toGalleryImageUrl(image)}
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : null}
            </div>

            <div
              ref={singleContentRef}
              className={`flex flex-col gap-6 w-full ${reverse ? 'lg:order-1' : 'lg:order-2'}`}
            >
              {variants.map((variant, index) => (
                <div
                  key={index}
                  className={`${innerBg} rounded-[10px] p-[20px] md:p-[30px]`}
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
