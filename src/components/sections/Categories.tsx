import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import Button from '../common/Button';
import icon from '../../assets/images/apme_symbol-green.svg';
import icon2 from '../../assets/images/symbol 1.svg';

// Icons
import chilliIcon from '../../assets/images/chilli-seeds.svg';
import tomatoIcon from '../../assets/images/tomato-seeds.svg';
import bitterGourdIcon from '../../assets/images/bitter-gourd-seeds.svg';
import bottleGourdIcon from '../../assets/images/bottle-gourd-seeds.svg';
import clusterBeansIcon from '../../assets/images/cluster-beans-seeds.svg';
import cucumberIcon from '../../assets/images/cucumber-seeds.svg';
import muskmelonIcon from '../../assets/images/muskmelon-seeds.svg';
import okraIcon from '../../assets/images/okra-seeds.svg';
import watermelonIcon from '../../assets/images/watermelon-seeds.svg';

const Categories: React.FC = () => {
  const categories = [
    {
      name: 'Okra Seeds',
      desc: 'YVMV resistant, dark green, high-yield hybrids',
      icon: okraIcon,
    },
    {
      name: 'Watermelon Seeds',
      desc: 'High TSS, red flesh, strong transport quality',
      icon: watermelonIcon,
    },
    {
      name: 'Muskmelon Seeds',
      desc: 'Early maturity, excellent sweetness, uniform fruits',
      icon: muskmelonIcon,
    },
    {
      name: 'Bitter Gourd Seeds',
      desc: 'Dark green, thick spines, early harvest',
      icon: bitterGourdIcon,
    },
    {
      name: 'Bottle Gourd Seeds',
      desc: 'Cylindrical, glossy fruits with strong vine growth',
      icon: bottleGourdIcon,
    },
    {
      name: 'Chilli Seeds',
      desc: 'Green & dual purpose hybrids with strong pungency',
      icon: chilliIcon,
    },
    {
      name: 'Tomato Seeds',
      desc: 'ToLCV-tolerant, firm fruits suitable for shipping',
      icon: tomatoIcon,
    },
    {
      name: 'Cucumber Seeds',
      desc: 'Long, straight, glossy varieties',
      icon: cucumberIcon,
    },
    {
      name: 'Cluster & Beans Seeds',
      desc: 'High branching, uniform pods',
      icon: clusterBeansIcon,
    },
  ];

  return (
    <section className="bg-[#F2F4F0] mx-[16px] lg:mx-[20px]  rounded-[10px] py-[50px] md:py-[80px] overflow-hidden">
      
      <Container>

        {/* Top Tag + Heading */}
        <div className="text-center mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={icon} className="w-[16px] h-[16px]" />
            <p className="text-[#005948] text-[16px] font-regular">
              Our Product Categories
            </p>
          </div>

          <h2 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2]">
            High-Performance Hybrid Varieties Across Crops
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((item, i) => (
            <div key={i} className="flex items-center gap-[14px] bg-[#FAF9F6] border border-black/5 rounded-[10px] px-[20px] py-[20px] w-full">

            {/* Icon */}
            <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] shrink-0 flex items-center justify-center rounded-full border border-[#F26A21]">
              <img src={item.icon} alt={item.name} className="w-[26px] h-[26px] md:w-[40px] md:h-[40px] object-contain" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-[10px] max-w-[244px]">
              
              {/* Title */}
              <h4 className="text-[#1F1F1F] text-[20px] lg:text-[22px] font-medium leading-[1.2] tracking-[0.011em]">
                {item.name}
              </h4>

              {/* Description */}
              <p className="text-[#333333] text-[16px] font-normal leading-[1.2] tracking-[0.011em]">
                {item.desc}
              </p>

            </div>

          </div>
          ))}
        </div>

        {/* Button */}
        <div className="flex justify-center mt-14">
          <Link to="/products">
            <Button className="flex items-center gap-[8px] md:gap-[10px] px-[14px] py-[12px] md:px-[18px] md:py-[17px] rounded-[5px] bg-[#005948] hover:bg-[#004a3b] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-white text-[14px] md:text-[16px] font-semibold">
              View All Varieties
              <img src={icon2} className="w-[18px] h-[18px]" />
            </Button>
          </Link>
        </div>

      </Container>
    </section>
  );
};

export default Categories;