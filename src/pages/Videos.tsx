import React, { useEffect, useState } from 'react';
import PageBanner from '../components/sections/PageBanner';
import Container from '../components/common/Container';
import SEO from '../components/common/SEO';
import videoBg from '../assets/images/hero_bg.webp';
import icon from '../assets/images/apme_symbol-green.svg';
import CTA from '../components/sections/CTA';
import { getVideoItems } from '../utils/videos';
import type { VideoItem } from '../utils/videos';

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    void getVideoItems().then((items) => {
      setVideos(items);
    });
  }, []);

  return (
    <>
      <SEO
        title="Video Gallery - DRD Plantech LLP"
        description="Watch our featured videos and learn more about our hybrid seed research, field trials, and quality standards."
        path="/videos"
        keywords="seed research video, hybrid seeds trials, DRD Plantech videos, agriculture videos India"
      />

      <PageBanner title="Video Gallery" backgroundImage={videoBg} />

      <section className="rounded-[20px] bg-[#FAF9F6] py-[60px] md:mx-[20px] md:py-[100px]">
        <Container size="wide">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <div className="mb-4 flex items-center justify-center gap-2">
                <img src={icon} alt="icon" className="h-[16px] w-[16px]" />
                <p className="text-[16px] font-medium italic text-[#005948]">
                  Featured Presentation
                </p>
              </div>
              <h2 className="mb-6 text-[28px] font-medium leading-[1.2] text-[#1F1F1F] md:text-[36px]">
                Innovation in Every Seed
              </h2>
              <p className="text-[16px] text-[#4A4A4A] md:text-[18px]">
                Watch our featured videos to discover the dedication, research, and technology behind our high-performance hybrid seeds.
              </p>
            </div>

            {videos.length === 0 ? (
              <div className="mx-auto max-w-3xl rounded-[18px] border border-[#E5E7EB] bg-white px-6 py-14 text-center shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
                <h3 className="text-[24px] font-medium text-[#1F1F1F] md:text-[28px]">Videos Coming Soon</h3>
                <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-7 text-[#5F6B6D]">
                  No videos are available right now.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    className="overflow-hidden rounded-[18px] border border-[#005948]/10 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
                  >
                    <div className="relative aspect-video bg-black">
                      <video
                        controls
                        className="h-full w-full object-contain"
                        poster={videoBg}
                      >
                        <source src={video.videoUrl} />
                        Your browser does not support the video tag.
                      </video>

                      <div className="pointer-events-none absolute left-4 top-4 z-10">
                        <div className="rounded-full bg-[#005948]/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                          DRD Plantech Video {index + 1}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 px-5 py-5 md:px-6">
                      <h3 className="text-xl font-semibold text-[#1F1F1F]">
                        Featured Video {index + 1}
                      </h3>
                      <p className="text-sm leading-7 text-[#64748B]">
                        A closer look at our hybrid seed research, field performance, and quality standards.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
    </>
  );
};

export default Videos;
