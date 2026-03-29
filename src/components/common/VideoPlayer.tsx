import React, { useState } from 'react';
import { isEmbeddableVideoUrl } from '../../utils/mediaLinks';

interface VideoPlayerProps {
  src: string;
  title?: string;
  className?: string; // Optional wrapper class
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, title = "Video", className = "" }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative aspect-video w-full bg-black overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#F8FAFC]">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#005948]"></div>
        </div>
      )}
      
      {isEmbeddableVideoUrl(src) ? (
        <iframe
          src={src}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
          onLoad={handleLoad}
          style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
        />
      ) : (
        <video 
          controls 
          className="h-full w-full object-contain"
          onLoadedData={handleLoad}
          style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
        >
          <source src={src} />
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
