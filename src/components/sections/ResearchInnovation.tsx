import React from 'react';
import Container from '../common/Container';

const ResearchInnovation: React.FC = () => {
  return (
    <section>
      <Container>
        <div className="bg-[#F2F4F0] rounded-[10px] p-[20px] md:p-[60px] lg:p-[80px] py-[50px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[80px]">
            
            {/* Left Column */}
            <div>
              <h2 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium mb-[24px]">
                Research & Innovation
              </h2>
              <p className="text-[#333333] text-[16px] md:text-[18px] font-normal tracking-[0.011em]">
                Innovation is central to our operations. Our hybrid development process involves structured breeding programs, careful parent line selection, and extensive field evaluation.
              </p>
            </div>

            {/* Right Column */}
            <div>
              <p className="text-[#1F1F1F] text-[16px] md:text-[18px] font-semibold mb-[20px]">
                We focus on:
              </p>
              <ul className="list-disc pl-5 text-[#333333] text-[16px] md:text-[18px] font-normal tracking-[0.011em] space-y-[6px] mb-[30px]">
                <li className="pl-2">High-yield genetic combinations</li>
                <li className="pl-2">Resistance and tolerance to major crop diseases such as YVMV, ELCV, and ToLCV</li>
                <li className="pl-2">Early maturity traits</li>
                <li className="pl-2">High TSS and superior fruit quality</li>
                <li className="pl-2">Multi-season adaptability</li>
              </ul>
              <p className="text-[#333333] text-[16px] md:text-[18px] font-normal tracking-[0.011em]">
                Field trials and performance assessments are conducted to evaluate yield stability, fruit uniformity, and environmental adaptability before commercial release.
              </p>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default ResearchInnovation;
