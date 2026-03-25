import React, { useState } from 'react';
import PageBanner from '../components/sections/PageBanner';
import Container from '../components/common/Container';
import SEO from '../components/common/SEO';
import { X, ZoomIn } from 'lucide-react';

// Import images
import img1 from '../assets/images/Beans.webp';
import img2 from '../assets/images/Bhendi.webp';
import img3 from '../assets/images/Bitter-Gourd.webp';
import img4 from '../assets/images/Bottle-Gourd.webp';
import img5 from '../assets/images/Chilli.webp';
import img6 from '../assets/images/Cucumber.webp';
import img7 from '../assets/images/Muskmelon.webp';
import img8 from '../assets/images/Tomato.webp';
import img9 from '../assets/images/Watermelon.webp';
import img10 from '../assets/images/featured.webp';
import galleryBg from '../assets/images/hero_bg.webp';

const galleryImages = [
  { id: 1, src: img1, title: 'French Beans', category: 'Vegetable' },
  { id: 2, src: img2, title: 'Okra (Bhendi)', category: 'Vegetable' },
  { id: 3, src: img3, title: 'Bitter Gourd', category: 'Vegetable' },
  { id: 4, src: img4, title: 'Bottle Gourd', category: 'Vegetable' },
  { id: 5, src: img5, title: 'Hot Chilli', category: 'Vegetable' },
  { id: 6, src: img6, title: 'Green Cucumber', category: 'Vegetable' },
  { id: 7, src: img7, title: 'Sweet Muskmelon', category: 'Fruit' },
  { id: 8, src: img8, title: 'Red Tomato', category: 'Vegetable' },
  { id: 9, src: img9, title: 'Juicy Watermelon', category: 'Fruit' },
  { id: 10, src: img10, title: 'Premium Hybrids', category: 'Research' },
];

import CTA from '../components/sections/CTA';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightbox = (src: string) => {
    setSelectedImage(src);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <SEO
        title="Photo Gallery - DRD Plantech LLP"
        description="Explore our high-performance hybrid seed varieties through our photo gallery. See the quality and consistency of our vegetable and field crop seeds."
        path="/gallery"
        keywords="seed gallery, vegetable seeds photos, hybrid seeds images, DRD Plantech gallery"
      />
      
      <PageBanner title="Photo Gallery" backgroundImage={galleryBg} />

      <section className="py-[60px] md:py-[100px] bg-[#FAF9F6]">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2] mb-6">
              Our High-Performance Hybrids
            </h2>
            <p className="text-[#4A4A4A] text-[16px] md:text-[18px]">
              A visual showcase of our premium seed varieties, developed through rigorous research to ensure superior yields and crop quality for farmers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {galleryImages.map((image) => (
              <div 
                key={image.id}
                className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                onClick={() => openLightbox(image.src)}
              >
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[#F26A21] text-xs font-bold uppercase tracking-wider mb-2 block">
                      {image.category}
                    </span>
                    <h3 className="text-white text-xl font-medium mb-2">
                      {image.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <ZoomIn size={16} />
                      <span>View Full Size</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        tagText="Contact Us"
        title="Ready to grow with us?"
        description="Contact our team today to learn more about our products or to become a dealer partner."
        buttonText="Get in touch"
        buttonLink="/contact"
        className="mb-[60px] md:mb-[100px]"
      />

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 animate-fadeIn"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-[#F26A21] transition-colors p-2"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          
          <img 
            src={selectedImage} 
            alt="Enlarged gallery view" 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-zoomIn"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default Gallery;
