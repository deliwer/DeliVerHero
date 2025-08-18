// Image optimization utilities and configurations

export interface ImageOptimizationConfig {
  quality: number;
  format: 'webp' | 'jpg' | 'png' | 'auto';
  width?: number;
  height?: number;
  fit: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

export interface ResponsiveImageConfig {
  breakpoints: number[];
  formats: string[];
  quality: number;
  lazy: boolean;
}

// Default configuration for image optimization
export const DEFAULT_IMAGE_CONFIG: ResponsiveImageConfig = {
  breakpoints: [320, 480, 768, 1024, 1280, 1920],
  formats: ['webp', 'jpg'],
  quality: 75,
  lazy: true,
};

// Detect device capabilities
export function getDeviceCapabilities() {
  const canvas = document.createElement('canvas');
  const webpSupport = canvas.toDataURL('image/webp').indexOf('webp') !== -1;
  const avifSupport = canvas.toDataURL('image/avif').indexOf('avif') !== -1;
  
  return {
    webp: webpSupport,
    avif: avifSupport,
    devicePixelRatio: window.devicePixelRatio || 1,
    connection: (navigator as any).connection?.effectiveType || 'unknown',
  };
}

// Get optimal image format based on browser support
export function getOptimalFormat(): 'webp' | 'jpg' | 'png' {
  const capabilities = getDeviceCapabilities();
  
  if (capabilities.webp) return 'webp';
  return 'jpg';
}

// Generate responsive image URLs
export function generateResponsiveImageUrls(
  baseSrc: string,
  config: Partial<ResponsiveImageConfig> = {}
): {
  srcSet: string;
  sizes: string;
  fallback: string;
} {
  const finalConfig = { ...DEFAULT_IMAGE_CONFIG, ...config };
  const capabilities = getDeviceCapabilities();
  
  // Adjust quality based on connection speed
  let quality = finalConfig.quality;
  if (capabilities.connection === 'slow-2g' || capabilities.connection === '2g') {
    quality = Math.max(40, quality - 20);
  }
  
  const srcSet = finalConfig.breakpoints
    .map(width => {
      const optimizedWidth = Math.round(width * capabilities.devicePixelRatio);
      return `${buildImageUrl(baseSrc, {
        width: optimizedWidth,
        quality,
        format: getOptimalFormat(),
        fit: 'cover',
      })} ${width}w`;
    })
    .join(', ');

  const sizes = generateSizesString(finalConfig.breakpoints);
  const fallback = buildImageUrl(baseSrc, {
    width: 1280,
    quality,
    format: 'jpg',
    fit: 'cover',
  });

  return { srcSet, sizes, fallback };
}

// Build optimized image URL with parameters
export function buildImageUrl(
  src: string,
  config: Partial<ImageOptimizationConfig>
): string {
  const params = new URLSearchParams();
  
  if (config.width) params.set('w', config.width.toString());
  if (config.height) params.set('h', config.height.toString());
  if (config.quality) params.set('q', config.quality.toString());
  if (config.format && config.format !== 'auto') params.set('f', config.format);
  if (config.fit) params.set('fit', config.fit);
  
  const separator = src.includes('?') ? '&' : '?';
  return `${src}${separator}${params.toString()}`;
}

// Generate sizes string for responsive images
function generateSizesString(breakpoints: number[]): string {
  return breakpoints
    .slice(0, -1)
    .map((bp, index) => {
      const nextBp = breakpoints[index + 1];
      return `(max-width: ${bp}px) ${bp}px`;
    })
    .concat([`${breakpoints[breakpoints.length - 1]}px`])
    .join(', ');
}

// Preload critical images
export function preloadImage(src: string, priority: 'high' | 'low' = 'low'): Promise<void> {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    if (priority === 'high') {
      link.setAttribute('fetchpriority', 'high');
    }
    
    link.onload = () => resolve();
    link.onerror = reject;
    
    document.head.appendChild(link);
  });
}

// Lazy loading intersection observer
export function createLazyLoadObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, defaultOptions);
}

// Performance monitoring for images
export class ImagePerformanceMonitor {
  private static instance: ImagePerformanceMonitor;
  private metrics: Map<string, any> = new Map();

  static getInstance(): ImagePerformanceMonitor {
    if (!ImagePerformanceMonitor.instance) {
      ImagePerformanceMonitor.instance = new ImagePerformanceMonitor();
    }
    return ImagePerformanceMonitor.instance;
  }

  trackImageLoad(src: string, startTime: number, endTime: number) {
    const loadTime = endTime - startTime;
    this.metrics.set(src, {
      loadTime,
      timestamp: Date.now(),
      cached: loadTime < 50, // Assume cached if very fast
    });
  }

  getMetrics(): Record<string, any> {
    return Object.fromEntries(this.metrics);
  }

  getAverageLoadTime(): number {
    const times = Array.from(this.metrics.values()).map(m => m.loadTime);
    return times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  }
}

// Image optimization service worker registration
export function registerImageServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw-image-optimizer.js')
      .then(registration => {
        console.log('Image optimization SW registered:', registration);
      })
      .catch(error => {
        console.log('Image optimization SW registration failed:', error);
      });
  }
}