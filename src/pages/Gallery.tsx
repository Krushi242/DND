import React, { useEffect, useState } from 'react';
import PageBanner from '../components/sections/PageBanner';
import Container from '../components/common/Container';
import SEO from '../components/common/SEO';
import { X, ZoomIn } from 'lucide-react';
import galleryBg from '../assets/images/hero_bg.webp';
import { GALLERY_UPDATED_EVENT, getGalleryItems } from '../utils/gallery';
import type { GalleryItem } from '../utils/gallery';

import CTA from '../components/sections/CTA';

const Gallery: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const syncGalleryImages = () => {
      void getGalleryItems().then((items) => {
        setGalleryImages(items);
      });
    };

    syncGalleryImages();
    window.addEventListener(GALLERY_UPDATED_EVENT, syncGalleryImages);
    window.addEventListener('focus', syncGalleryImages);
    document.addEventListener('visibilitychange', syncGalleryImages);

    return () => {
      window.removeEventListener(GALLERY_UPDATED_EVENT, syncGalleryImages);
      window.removeEventListener('focus', syncGalleryImages);
      document.removeEventListener('visibilitychange', syncGalleryImages);
    };
  }, []);

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

      <section className="rounded-[20px] bg-[#FAF9F6] py-[60px] md:mx-[20px] md:py-[100px]">
        <Container size="wide">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-[#1F1F1F] text-[28px] md:text-[36px] font-medium leading-[1.2] mb-6">
              Our High-Performance Hybrids
            </h2>
            <p className="text-[#4A4A4A] text-[16px] md:text-[18px]">
              A visual showcase of our premium seed varieties, developed through rigorous research to ensure superior yields and crop quality for farmers.
            </p>
          </div>

          {galleryImages.length === 0 ? (
            <div className="mx-auto max-w-3xl rounded-[18px] border border-[#E5E7EB] bg-white px-6 py-14 text-center shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
              <h3 className="text-[24px] font-medium text-[#1F1F1F] md:text-[28px]">Gallery Coming Soon</h3>
              <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-7 text-[#5F6B6D]">
                No gallery items are available right now.
              </p>
            </div>
          ) : (
            <div className="columns-1 gap-5 sm:columns-2 md:gap-6 lg:columns-3 lg:gap-7">
              {galleryImages.map((image) => (
                <div 
                  key={image.id}
                  className="group relative mb-5 break-inside-avoid cursor-pointer overflow-hidden rounded-[18px] bg-transparent transition-all duration-500 hover:-translate-y-1 md:mb-6 lg:mb-7"
                  onClick={() => openLightbox(image.src)}
                >
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="h-auto min-h-[240px] w-full max-h-[420px] rounded-[18px] object-cover transition-transform duration-700 group-hover:scale-[1.02] md:min-h-[280px] md:max-h-[460px]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-[18px] bg-[linear-gradient(180deg,rgba(9,18,16,0.02)_0%,rgba(9,18,16,0.72)_100%)] p-4 opacity-100 transition-all duration-500 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <span className="mb-2 inline-flex rounded-full bg-[#F26A21] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
                          {image.category}
                        </span>
                        <h3 className="truncate text-lg font-medium text-white md:text-[22px]">
                          {image.title}
                        </h3>
                      </div>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm">
                        <ZoomIn size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
