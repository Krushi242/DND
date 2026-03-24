import React from 'react';
import icon from '../../assets/images/apme_symbol-green.svg';
import Container from '../common/Container';

// Trial Images
import trial1 from '../../assets/images/why-1.png';
import trial2 from '../../assets/images/why-2.png';
import trial3 from '../../assets/images/why-3.png';
import trial4 from '../../assets/images/why-4.png';
import trial5 from '../../assets/images/why-5.png';
import trial6 from '../../assets/images/why-6.png';

const FieldTrials: React.FC = () => {
  const reasons = [
    { title: "High-yield hybrid genetics", image: trial1 },
    { title: "Early maturity options", image: trial2 },
    { title: "Strong germination standards", image: trial3 },
    { title: "Disease-resistant varieties\n(YVMV, ELCV, ToLCV)", image: trial4 },
    { title: "Uniform fruit size and market-\nfriendly quality", image: trial5 },
    { title: "Reliable supply chain and dealer\nnetwork", image: trial6 },
  ];

  return (
    <section id="why-choose-us" className="py-[60px] md:py-[100px]">
      <Container>
        <div>

          {/* Header */}
          <div className="flex flex-col items-center mb-10 md:mb-16">
            <div className="flex items-center gap-2 mb-4">
              <img src={icon} alt="icon" className="w-[16px] h-[16px]" />
              <p className="text-[#005948] text-[16px] font-regular">Why Choose Us</p>
            </div>
            <h2 className="text-center text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2]">
              Reliable Seeds. Proven Results.
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((item) => (
              <div key={item.title} className="relative w-full h-[250px] rounded-[10px] overflow-hidden group">

                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,89,72,1)_0%,rgba(0,89,72,0)_45%)]"></div>

                {/* Content */}
                <div className="absolute bottom-[24px] left-[24px] right-[24px]">
                  <p className="text-white text-[20px] font-medium leading-[1.2] tracking-[0.011em]">
                    {item.title}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* Footer Text */}
          <p className="text-center text-[#4A4A4A] text-[15px] sm:text-[16px] mt-10">
            Our seeds are developed to deliver consistent performance from planting to harvest.
          </p>

        </div>
      </Container>
    </section>
  );
};

export default FieldTrials;
