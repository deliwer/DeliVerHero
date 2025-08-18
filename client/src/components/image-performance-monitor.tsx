import { useState, useEffect } from 'react';
import { useImagePerformance } from '@/hooks/use-image-optimization';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function ImagePerformanceMonitor() {
  const { metrics, averageLoadTime } = useImagePerformance();
  const [isVisible, setIsVisible] = useState(false);

  // Only show in development or when explicitly enabled
  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    const showMonitor = localStorage.getItem('deliwer-show-image-monitor') === 'true';
    setIsVisible(isDev || showMonitor);
  }, []);

  if (!isVisible || Object.keys(metrics).length === 0) {
    return null;
  }

  const totalImages = Object.keys(metrics).length;
  const cachedImages = Object.values(metrics).filter((m: any) => m.cached).length;
  const cacheHitRate = totalImages > 0 ? (cachedImages / totalImages) * 100 : 0;
  const fastLoads = Object.values(metrics).filter((m: any) => m.loadTime < 100).length;
  const fastLoadRate = totalImages > 0 ? (fastLoads / totalImages) * 100 : 0;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="bg-slate-900/95 border-slate-700 text-white backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center justify-between">
            Image Performance
            <button
              onClick={() => setIsVisible(false)}
              className="text-slate-400 hover:text-white"
            >
              ×
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-slate-400">Total Images</div>
              <div className="font-bold">{totalImages}</div>
            </div>
            <div>
              <div className="text-slate-400">Avg Load Time</div>
              <div className="font-bold">{Math.round(averageLoadTime)}ms</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Cache Hit Rate</span>
              <span>{Math.round(cacheHitRate)}%</span>
            </div>
            <Progress value={cacheHitRate} className="h-1" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Fast Loads (&lt;100ms)</span>
              <span>{Math.round(fastLoadRate)}%</span>
            </div>
            <Progress value={fastLoadRate} className="h-1" />
          </div>

          <div className="flex flex-wrap gap-1">
            {Object.entries(metrics).slice(0, 3).map(([url, metric]: [string, any]) => (
              <Badge
                key={url}
                variant={metric.cached ? "secondary" : "outline"}
                className="text-xs"
              >
                {metric.loadTime < 100 ? '🟢' : metric.loadTime < 500 ? '🟡' : '🔴'}
                {Math.round(metric.loadTime)}ms
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Development helper to toggle monitor visibility
export function toggleImageMonitor() {
  const current = localStorage.getItem('deliwer-show-image-monitor') === 'true';
  localStorage.setItem('deliwer-show-image-monitor', (!current).toString());
  window.location.reload();
}