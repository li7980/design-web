import { useState } from 'react';
import { Layers } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export function SafeImage({ src, alt, title, className = '' }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#F1F5F9] text-[#475569] p-6 select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <Layers className="w-7 h-7 text-[#2563EB] mb-3 stroke-[1.5]" />
        <span className="text-xs font-medium text-center max-w-[200px] leading-relaxed">
          {title || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
