import React from 'react';
import Container from '../common/Container';

// Assuming these SVGs have been placed in the assets directory
import a1 from '../../assets/images/a1.svg';
import a2 from '../../assets/images/a2.svg';
import a3 from '../../assets/images/a3.svg';
import a4 from '../../assets/images/a4.svg';

const SustainableAgriculture: React.FC = () => {
  const cards = [
    { icon: a1, title: 'Efficient hybrid seed\\ndevelopment' },
    { icon: a2, title: 'Yield-enhancing genetic\\nsolutions' },
    { icon: a3, title: 'Crop adaptability\\nimprovements' },
    { icon: a4, title: 'Long-term farmer\\npartnerships' },
  ];

  return (
    <section className="py-24 bg-[#FAFAF9]">
      <Container>
        <div className="flex flex-col items-center text-center">
          
          {/* Header */}
          <h2 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2] mb-[20px]">
            Commitment to Sustainable Agriculture
          </h2>
          <p className="text-[#4A4A4A] text-[18px] font-normal leading-[1.4] mb-[50px]">
            We support responsible agricultural practices through:
          </p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[25px] w-full mb-[50px]">
            {cards.map((card, index) => (
              <div 
                key={index} 
                className="bg-[#F2F4F0] rounded-[10px] p-[30px] flex flex-col items-center justify-center min-h-[220px] transition-transform duration-300 hover:-translate-y-1"
              >
                <img src={card.icon} alt={card.title} className="w-[64px] h-[64px] mb-[24px]" />
                <p className="text-[#1F1F1F] text-[16px] font-medium leading-[1.4] text-center whitespace-pre-line">
                  {card.title.replace('\\n', '\n')}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Text */}
          <p className="text-[#4A4A4A] text-[16px] font-normal leading-[1.5] max-w-4xl text-center">
            Our focus remains on delivering seeds that contribute to stable productivity and sustainable growth.
          </p>

        </div>
      </Container>
    </section>
  );
};

export default SustainableAgriculture;
