import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false 
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Create a low-quality placeholder
  const placeholder = `data:image/svg+xml;base64,${btoa(`
    <svg width="${width || 400}" height="${height || 400}" viewBox="0 0 ${width || 400} ${height || 400}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <circle cx="50%" cy="45%" r="15%" fill="#d1d5db"/>
      <rect x="30%" y="65%" width="40%" height="4%" rx="2%" fill="#d1d5db"/>
      <rect x="35%" y="75%" width="30%" height="3%" rx="1.5%" fill="#e5e7eb"/>
    </svg>
  `)}`;

  useEffect(() => {
    if (!src) return;

    // Show placeholder initially
    setImageSrc(placeholder);

    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      setHasError(true);
      setImageSrc(placeholder);
    };

    // Load image
    img.src = src;
  }, [src, placeholder]);

  return (
    <div className="relative overflow-hidden">
      <img
        src={imageSrc}
        alt={alt}
        className={`transition-all duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-60'
        } ${className}`}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={{
          filter: isLoaded ? 'none' : 'blur(5px)',
          transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
        }}
      />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}