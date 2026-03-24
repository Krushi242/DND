import React from 'react';
import Container from '../common/Container';
import logo from '../../assets/images/logo.svg';
import locationIcon from '../../assets/images/location.svg';
import callIcon from '../../assets/images/call.svg';
import mailIcon from '../../assets/images/email.svg';
import facebookIcon from '../../assets/images/facebook.svg';
import instagramIcon from '../../assets/images/instagram.svg';
import linkedinIcon from '../../assets/images/linkedin.svg';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#005948] text-white pt-[60px]">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr] gap-10 lg:gap-14 mb-16 mx-auto">

          {/* Column 1: About & Social */}
          <div className="flex flex-col pr-8 col-span-2 lg:col-span-1">
            <img src={logo} alt="DRD Plantech Logo" className="w-[90px] h-[98px] object-contain mb-[20px]" />
            <p className="text-[14px] mb-[30px] pr-2">
              DRD Plantech LLP is a hybrid vegetable seed company committed to delivering high-yield, disease-resistant, and field-tested seed varieties. We focus on innovation, quality control, and farmer-centric solutions to support commercial vegetable cultivation across India.
            </p>
            <div>
              <p className="font-semibold text-white mb-[20px] text-[14px]">Stay Connected :</p>
              <div className="flex space-x-3 mb-8">
                <a href="#" className="flex items-center justify-center">
                  <img src={facebookIcon} alt="Facebook" className="w-[32px] h-[32px]" />
                </a>
                <a href="#" className="flex items-center justify-center">
                  <img src={instagramIcon} alt="Instagram" className="w-[32px] h-[32px]" />
                </a>
                <a href="#" className="flex items-center justify-center">
                  <img src={linkedinIcon} alt="LinkedIn" className="w-[32px] h-[32px]" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col col-span-1">
            <h4 className="text-[20px] font-medium text-white mb-6">Quick Links</h4>
            <ul className="space-y-[8px] text-[16px]">
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Home</a></li>
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Products</a></li>
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Research & Innovation</a></li>
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Why Choose Us</a></li>
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Knowledge Center</a></li>
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Dealer / Distributor</a></li>
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Our Product */}
          <div className="flex flex-col col-span-1">
            <h4 className="text-[20px] font-medium text-white mb-6">Our Product</h4>
            <ul className="space-y-[8px] text-[16px]">
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Okra Seeds</a></li>
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Watermelon Seeds</a></li>
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Muskmelon Seeds</a></li>
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Bitter Gourd Seeds</a></li>
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Bottle Gourd Seeds</a></li>
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Chilli Seeds</a></li>
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Tomato Seeds</a></li>
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Cucumber Seeds</a></li>
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Cluster Bean Seeds</a></li>
              <li><a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Beans Seeds</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="flex flex-col col-span-2 lg:col-span-1">
            <h4 className="text-[20px] font-medium text-white mb-6">Contact Information</h4>
            <ul className="space-y-6 text-[16px]">
              <li className="flex items-center gap-[10px]">
                <div className="w-[24px] flex justify-center shrink-0">
                  <img src={locationIcon} alt="Location" className="w-[18px] h-[22px]" />
                </div>
                <span className="leading-snug font-medium">DRD Plantech LLP<br /><span className="font-normal">Ahmedabad, Gujarat, India</span></span>
              </li>
              <li className="flex items-center gap-[10px]">
                <div className="w-[24px] flex justify-center shrink-0">
                  <img src={callIcon} alt="Phone" className="w-[18px] h-[18px]" />
                </div>
                <span className="font-medium">+91 79841 09698</span>
              </li>
              <li className="flex items-center gap-[10px]">
                <div className="w-[24px] flex justify-center shrink-0">
                  <img src={mailIcon} alt="Email" className="w-[20px] h-[16px]" />
                </div>
                <span className="font-medium">info@drdplantech.com</span>
              </li>
            </ul>
          </div>

        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="bg-[#005242] py-[20px]">
        <div className="max-w-[1440px] mx-auto px-[20px] flex flex-col lg:flex-row justify-between items-center text-center lg:text-left text-[13px] text-[#E5E5E5]">
          <p className="mb-4 lg:mb-0 lg:max-w-none">© 2026 DRD Plantech LLP. All Rights Reserved. Hybrid Vegetable Seed Manufacturer in India.</p>
          <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 gap-y-2 font-medium">
            <a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Privacy Policy</a>
            <span className="text-[#1A6A5A]">|</span>
            <a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Terms & Conditions</a>
            <span className="text-[#1A6A5A]">|</span>
            <a href="#" className="hover:text-[#F26A21] hover:translate-x-1 inline-block transition-all duration-300">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
