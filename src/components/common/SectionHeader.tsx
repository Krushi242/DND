import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  badge, 
  centered = true,
  className = '' 
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      {badge && (
        <span className="inline-block px-5 py-1.5 mb-6 text-xs font-bold tracking-[0.1em] text-primary uppercase bg-[#E8F1F0] rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-[28px] md:text-5xl font-heading mb-6 text-heading leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl mx-auto text-subtext text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
