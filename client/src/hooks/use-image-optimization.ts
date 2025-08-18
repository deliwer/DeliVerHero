import { useState, useEffect, useCallback } from 'react';
import { 
  generateResponsiveImageUrls, 
  getDeviceCapabilities, 
  ImagePerformanceMonitor,
  registerImageServiceWorker 
} from '@/lib/image-optimizer';

export interface UseImageOptimizationOptions {
  quality?: number;
  formats?: string[];
  lazy?: boolean;
  priority?: boolean;
  breakpoints?: number[];
}

export function useImageOptimization(
  src: string,
  options: UseImageOptimizationOptions = {}
) {
  const [optimizedUrls, setOptimizedUrls] = useState<{
    srcSet: string;
    sizes: string;
    fallback: string;
  } | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadTime, setLoadTime] = useState<number | null>(null);

  // Generate optimized URLs when src or options change
  useEffect(() => {
    if (!src) return;

    const urls = generateResponsiveImageUrls(src, options);
    setOptimizedUrls(urls);
  }, [src, options]);

  // Track image load performance
  const handleLoad = useCallback(() => {
    const endTime = performance.now();
    const startTime = (window as any).__imageLoadStart?.[src];
    
    if (startTime) {
      const duration = endTime - startTime;
      setLoadTime(duration);
      
      const monitor = ImagePerformanceMonitor.getInstance();
      monitor.trackImageLoad(src, startTime, endTime);
    }
    
    setIsLoading(false);
  }, [src]);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
  }, []);

  // Mark start time for load tracking
  useEffect(() => {
    if (src && !options.lazy) {
      (window as any).__imageLoadStart = {
        ...(window as any).__imageLoadStart,
        [src]: performance.now()
      };
    }
  }, [src, options.lazy]);

  return {
    optimizedUrls,
    isLoading,
    hasError,
    loadTime,
    handleLoad,
    handleError,
  };
}

export function useImagePreloader() {
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

  const preloadImage = useCallback((src: string, priority: 'high' | 'low' = 'low') => {
    if (preloadedImages.has(src)) return Promise.resolve();

    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        setPreloadedImages(prev => new Set(prev).add(src));
        resolve();
      };
      
      img.onerror = reject;
      
      // Set priority if supported
      if (priority === 'high' && 'fetchPriority' in img) {
        (img as any).fetchPriority = 'high';
      }
      
      img.src = src;
    });
  }, [preloadedImages]);

  const preloadImages = useCallback((urls: string[]) => {
    return Promise.all(urls.map(url => preloadImage(url)));
  }, [preloadImage]);

  return {
    preloadImage,
    preloadImages,
    preloadedImages: Array.from(preloadedImages),
  };
}

export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState(() => getDeviceCapabilities());

  useEffect(() => {
    // Update capabilities if connection changes
    const handleConnectionChange = () => {
      setCapabilities(getDeviceCapabilities());
    };

    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
      return () => connection.removeEventListener('change', handleConnectionChange);
    }
  }, []);

  return capabilities;
}

export function useImageServiceWorker() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const capabilities = useDeviceCapabilities();

  useEffect(() => {
    setIsSupported('serviceWorker' in navigator);
    
    if ('serviceWorker' in navigator) {
      try {
        registerImageServiceWorker();
        setIsRegistered(true);
      } catch (error) {
        setIsRegistered(false);
      }
    }
  }, []);

  // Update service worker with current capabilities
  useEffect(() => {
    if (isRegistered && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.active?.postMessage({
          type: 'UPDATE_CONNECTION',
          data: { connectionType: capabilities.connection }
        });
        
        registration.active?.postMessage({
          type: 'UPDATE_FORMAT_SUPPORT',
          data: { 
            optimalFormat: capabilities.webp ? 'webp' : 'jpg'
          }
        });
      });
    }
  }, [isRegistered, capabilities]);

  const preloadImages = useCallback((urls: string[]) => {
    if (isRegistered && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.active?.postMessage({
          type: 'PRELOAD_IMAGES',
          data: { urls }
        });
      });
    }
  }, [isRegistered]);

  return {
    isSupported,
    isRegistered,
    preloadImages,
  };
}

export function useImagePerformance() {
  const [metrics, setMetrics] = useState<Record<string, any>>({});

  useEffect(() => {
    const monitor = ImagePerformanceMonitor.getInstance();
    
    const updateMetrics = () => {
      setMetrics(monitor.getMetrics());
    };

    // Update metrics every 5 seconds
    const interval = setInterval(updateMetrics, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getAverageLoadTime = useCallback(() => {
    const monitor = ImagePerformanceMonitor.getInstance();
    return monitor.getAverageLoadTime();
  }, []);

  return {
    metrics,
    averageLoadTime: getAverageLoadTime(),
  };
}