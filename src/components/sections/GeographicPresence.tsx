import React from 'react';
import Container from '../common/Container';
import mapImg from '../../assets/images/map.png';

const GeographicPresence: React.FC = () => {
  return (
    <section className="pt-[56px]">
      <Container>
        <div 
          className="relative rounded-[12px] overflow-hidden w-full min-h-[450px] lg:min-h-[716px] flex items-end"
          style={{
            backgroundImage: `url(${mapImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Linear Gradient Overlay (Dark green fading up to transparent) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#005948] via-[#005948]/60 to-transparent"></div>

          {/* Content */}
          <div className="relative z-10 p-[20px] md:p-[60px] max-w-5xl">
            <h2 className="text-white text-[28px] md:text-[36px] font-medium leading-[1.2] mb-[20px]">
              Geographic Presence
            </h2>
            <p className="text-white text-[16px] md:text-[18px] font-normal">
              Based in Ahmedabad, Gujarat, we serve multiple agricultural regions across India through a growing dealer and distributor network. Our objective is to expand our footprint while maintaining product reliability and service consistency.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GeographicPresence;
