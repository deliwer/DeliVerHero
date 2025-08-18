import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  sizes = '100vw',
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const [optimizedSrc, setOptimizedSrc] = useState<string>('');

  // Generate responsive image URLs based on screen size
  const generateResponsiveUrls = (baseSrc: string) => {
    const sizes = [480, 768, 1024, 1280, 1920];
    const formats = ['webp', 'jpg'];
    
    return {
      srcSet: sizes.map(size => 
        formats.map(format => 
          `${baseSrc}?w=${size}&q=${quality}&f=${format} ${size}w`
        ).join(', ')
      ).join(', '),
      fallback: `${baseSrc}?w=1280&q=${quality}&f=jpg`
    };
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Set optimized source when in view
  useEffect(() => {
    if (isInView) {
      const { fallback } = generateResponsiveUrls(src);
      setOptimizedSrc(fallback);
    }
  }, [isInView, src, quality]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  // Placeholder while loading
  const renderPlaceholder = () => {
    if (placeholder === 'blur' && blurDataURL) {
      return (
        <img
          src={blurDataURL}
          alt=""
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
            !isLoading && 'opacity-0'
          )}
        />
      );
    }

    return (
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse transition-opacity duration-300',
          !isLoading && 'opacity-0'
        )}
      />
    );
  };

  // Error state
  if (hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-slate-100 text-slate-500',
          className
        )}
        style={{ width, height }}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)} ref={imgRef}>
      {isLoading && renderPlaceholder()}
      
      {isInView && (
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          data-testid="optimized-image"
        />
      )}
    </div>
  );
}

// Hook for image preloading
export function useImagePreload(src: string, priority: boolean = false) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!priority) return;

    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = src;
  }, [src, priority]);

  return isLoaded;
}

// Utility for generating blur data URLs
export function generateBlurDataURL(
  width: number = 10,
  height: number = 10,
  color: string = '#f1f5f9'
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
}