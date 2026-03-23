import React from 'react';
import Container from '../common/Container';

// We assume these SVGs exist or will be added to the assets/images folder
import qa1 from '../../assets/images/qa1.svg';
import qa2 from '../../assets/images/qa2.svg';
import qa3 from '../../assets/images/qa3.svg';
import qa4 from '../../assets/images/qa4.svg';
import qa5 from '../../assets/images/qa5.svg';

const QualityAssurance: React.FC = () => {
  const cards = [
    { icon: qa1, title: 'Genetic purity monitoring' },
    { icon: qa2, title: 'Germination Percentage testing' },
    { icon: qa3, title: 'Moisture level control' },
    { icon: qa4, title: 'Seed vigor assessment' },
    { icon: qa5, title: 'Physical purity inspection' },
  ];

  return (
    <section className="py-24 bg-[#FAFAF9]">
      <Container>
        <div className="flex flex-col items-center text-center">
          
          {/* Header */}
          <h2 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2] mb-[15px]">
            Quality Assurance
          </h2>
          <p className="text-[#4A4A4A] text-[18px] font-normal leading-[1.4] mb-[40px] max-w-2xl">
            Quality is maintained at every stage of seed production and processing.
          </p>
          <p className="text-[#333333] text-[18px] font-medium leading-[1.4] mb-[40px]">
            Our quality standards include:
          </p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[20px] w-full mb-[50px]">
            {cards.map((card, index) => (
              <div 
                key={index} 
                className="bg-[#F2F4F0] rounded-[10px] p-[30px] flex flex-col items-center justify-center min-h-[220px] transition-transform duration-300 hover:-translate-y-1"
              >
                <img src={card.icon} alt={card.title} className="w-[64px] h-[64px] mb-[24px]" />
                <p className="text-[#1F1F1F] text-[15px] font-medium leading-[1.4] text-center">
                  {card.title}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Text */}
          <p className="text-[#4A4A4A] text-[16px] font-normal leading-[1.5] max-w-3xl text-center">
            Seeds are processed, graded, and packed using controlled procedures to preserve viability and ensure consistent field performance.
          </p>

        </div>
      </Container>
    </section>
  );
};

export default QualityAssurance;
