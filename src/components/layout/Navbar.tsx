import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from '../common/Container';
import Button from '../common/Button';
import logo from '../../assets/images/logo.svg';
import icon from '../../assets/images/symbol 1.svg';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // ✅ Updated navLinks with dropdown
  type NavLink = {
    name: string;
    href?: string;
    dropdown?: { name: string; href: string }[];
  };

  const navLinks: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' }, // href: '/about'
    {
      name: 'Products',
      dropdown: [
        { name: 'Vegetable Seeds', href: '#' }, // href: '/product-1'
        { name: 'Field Crop Seeds', href: '#' }, // href: '/product-2'
      ],
    },
    {
      name: 'Media',
      dropdown: [
        { name: 'News', href: '#' },
        { name: 'Blogs', href: '#' },
      ],
    },
  ];

  const isActive = (href?: string) => {
    if (!href || href === '#') return false;
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const isDropdownActive = (dropdown?: { href: string }[]) => {
    if (!dropdown) return false;
    return dropdown.some(item => isActive(item.href));
  };

  return (
    <nav className={`sticky bg-[#FAF9F6] top-0 left-0 right-0 z-50 transition-all duration-300 h-[80px] md:h-[138px] flex items-center`}>
      
      <Container className="flex items-center justify-between h-full">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Krushi" className="w-[50px] md:w-[90px] h-[98px] object-contain" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8 h-full">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group h-full flex items-center z-10">
              
              {link.dropdown ? (
                <div className="flex items-center cursor-pointer h-full px-4 lg:px-6 z-10 transition-all duration-300">
                  {/* Active Background Tab */}
                  {(isActive(link.href) || isDropdownActive(link.dropdown)) && (
                    <div className="absolute top-0 left-0 right-0 h-[80px] md:h-[105px] bg-[#005948] rounded-b-[12px] -z-10 shadow-md"></div>
                  )}
                  <span
                    className={`flex items-center gap-1 text-[18px] font-medium transition-all duration-300 ${
                      isActive(link.href) || isDropdownActive(link.dropdown)
                        ? 'text-white border-b-[2px] border-white pb-[2px]'
                        : 'text-[#333] hover:text-[#F26A21] hover:-translate-y-0.5'
                    }`}
                  >
                    {link.name}
                    <span className="text-xs">▼</span>
                  </span>
                </div>
              ) : (
                <Link 
                  to={link.href || '#'}
                  className="flex items-center h-full px-4 lg:px-6 z-10 transition-all duration-300"
                >
                  {/* Active Background Tab */}
                  {isActive(link.href) && (
                    <div className="absolute top-0 left-0 right-0 h-[80px] md:h-[105px] bg-[#005948] rounded-b-[12px] -z-10 shadow-md"></div>
                  )}
                  <span
                    className={`text-[18px] font-medium transition-all duration-300 inline-block ${
                      isActive(link.href)
                        ? 'text-white border-b-[2px] border-white pb-[2px]'
                        : 'text-[#333] hover:text-[#F26A21] hover:-translate-y-0.5'
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              )}

              {/* Dropdown */}
              {link.dropdown && (
                <div className="absolute left-0 top-[70%] hidden group-hover:block z-[100]">
                  <div className="bg-white shadow-lg rounded-b-md py-3 min-w-[180px] border-t-2 border-[#005948] overflow-hidden">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-5 py-2 text-[15px] text-[#333] hover:bg-gray-50 hover:text-[#F26A21] transition-all duration-300"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Contact Button */}
          <Link to="/contact">
            <Button
              variant="primary"
              size="sm"
              className="flex items-center gap-[10px] px-[18px] py-[17px] rounded-[5px] bg-[#005948] hover:bg-[#004a3b] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-white text-[16px] font-semibold leading-[120%]"
            >
              Contact Us
              <img src={icon} alt="icon" className="w-[18px] h-[18px]" />
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[#005948] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-[26px] h-[26px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </Container>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg border-t border-gray-100 py-6 px-4 flex flex-col space-y-4 animate-fadeIn">
          {navLinks.map((link) => (
            <div key={link.name}>
              
              {link.dropdown ? (
                <div className="text-lg font-medium text-text py-2 block">
                  {link.name}
                </div>
              ) : (
                <Link 
                  to={link.href || '#'}
                  className={`text-lg font-medium py-2 block transition-all duration-300 ${
                    isActive(link.href) ? 'text-[#0F5D4E]' : 'text-text hover:text-[#F26A21] hover:translate-x-1'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )}

              {/* Mobile Dropdown */}
              {link.dropdown && (
                <div className="ml-4 flex flex-col space-y-2">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-gray-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full">
            <Button variant="primary" className="w-full flex items-center justify-center gap-2 bg-[#005948] hover:bg-[#004a3b] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-white py-3 rounded-[5px]">
              Contact Us
              <img src={icon} alt="icon" className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
