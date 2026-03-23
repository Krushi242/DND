import React from 'react';
import Container from '../common/Container';
import icon from '../../assets/images/apme_symbol-green.svg';

interface Props {
  tag?: string;
  title: string;
  description?: string;
  listTitle?: string;
  listItems?: string[];
  footerText?: string;
  children?: React.ReactNode;
  image: string;
  imageAlt?: string;
  button?: React.ReactNode;
  variant?: 'split' | 'top';
}

const SplitSection: React.FC<Props> = ({
  tag,
  title,
  description,
  listTitle,
  listItems,
  footerText,
  children,
  image,
  imageAlt = "section image",
  button,
  variant = 'split',
}) => {
  return (
    <section className="bg-[#F2F4F0] mx-[20px] rounded-[10px] py-[50px] md:py-[80px]">
      <Container>

        {/* COMMON HEADER */}
        <div className="mb-10 lg:mb-12">
          {tag && (
            <div className="flex items-center gap-2 mb-4">
              <img src={icon} alt="icon" className="w-[16px] h-[16px]" />
              <p className="text-[#005948] text-[15px] font-medium">
                {tag}
              </p>
            </div>
          )}

          <h2 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2]">
            {title}
          </h2>
        </div>

        {/* TOP LAYOUT (Image Left, Content Right) */}
        {variant === 'top' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 items-start">

            {/* Image */}
            <div className="rounded-[10px] overflow-hidden w-full h-full">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text & Content */}
            <div className="flex flex-col py-2 lg:py-6">
              {description && (
                <p className="text-[#4A4A4A] text-[16px] leading-[1.6] mb-5">
                  {description}
                </p>
              )}

              {/* Dynamic List Block */}
              {(listTitle || (listItems && listItems.length > 0) || footerText) && (
                <div className="text-[#333333] text-[15px] lg:text-[16px] leading-[1.6]">
                  {listTitle && <p className="mb-4 text-[#333333]">{listTitle}</p>}
                  
                  {listItems && listItems.length > 0 && (
                    <ul className="list-disc pl-5 text-[#333333] text-[16px] font-medium leading-[1.2] space-y-[4px] mt-4 mb-6">
                      {listItems.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                  
                  {footerText && <p className="text-[#333333]">{footerText}</p>}
                </div>
              )}

              {children}

              {button && <div className="mt-8">{button}</div>}
            </div>

          </div>
        )}

        {/* SPLIT LAYOUT (Image Left, Content Right - Matching uniform style) */}
        {variant === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 items-start">

            <div className="rounded-[10px] overflow-hidden w-full h-full">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center h-full">
                 {description && (
                <p className="text-[#4A4A4A] text-[16px] leading-[1.6] mb-5">
                  {description}
                </p>
              )}

              {/* Dynamic List Block */}
              {(listTitle || (listItems && listItems.length > 0) || footerText) && (
                <div className="text-[#333333] text-[15px] lg:text-[16px] leading-[1.6]">
                  {listTitle && <p className="mb-4 text-[#333333]">{listTitle}</p>}
                  
                  {listItems && listItems.length > 0 && (
                    <ul className="list-disc pl-5 text-[#333333] text-[16px] font-medium leading-[1.2] space-y-[4px] mt-4 mb-6">
                      {listItems.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                  
                  {footerText && <p className="text-[#333333]">{footerText}</p>}
                </div>
              )}

              {children}

              {button && <div className="mt-8">{button}</div>}
            </div>

          </div>
        )}

      </Container>
    </section>
  );
};

export default SplitSection;