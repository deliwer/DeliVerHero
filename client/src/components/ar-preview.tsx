import { useState, useEffect, useRef } from "react";
import { X, Camera, RotateCcw, Download, Share2, Eye, Smartphone, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ARPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    category: string;
    image: string;
    price: number;
  };
}

export function ARPreview({ isOpen, onClose, product }: ARPreviewProps) {
  const [isARSupported, setIsARSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [arMode, setArMode] = useState<'preview' | 'camera'>('preview');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      checkARSupport();
      requestCameraPermission();
    }
  }, [isOpen]);

  const checkARSupport = () => {
    setIsLoading(true);
    // Check for WebXR support (AR)
    if ('xr' in navigator && 'isSessionSupported' in (navigator as any).xr) {
      (navigator as any).xr.isSessionSupported('immersive-ar').then((supported: boolean) => {
        setIsARSupported(supported);
        setIsLoading(false);
      }).catch(() => {
        setIsARSupported(false);
        setIsLoading(false);
      });
    } else {
      // Fallback: check for basic camera support
      setIsARSupported(!!navigator.mediaDevices?.getUserMedia);
      setIsLoading(false);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setCameraPermission('granted');
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      setCameraPermission('denied');
      console.error('Camera permission denied:', error);
    }
  };

  const startARPreview = () => {
    if (cameraPermission === 'granted') {
      setArMode('camera');
      toast({
        title: "AR Preview Active",
        description: "Move your device to position the product in your space",
      });
    } else {
      toast({
        title: "Camera Access Required",
        description: "Please allow camera access to use AR preview",
        variant: "destructive"
      });
    }
  };

  const captureScreenshot = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        // Add product overlay (simplified for demo)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(10, 10, 200, 50);
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText(product.name, 15, 35);
        
        // Download the image
        const link = document.createElement('a');
        link.download = `${product.name.replace(/\s+/g, '_')}_AR_Preview.png`;
        link.href = canvas.toDataURL();
        link.click();
        
        toast({
          title: "Screenshot Saved",
          description: "AR preview image downloaded to your device",
        });
      }
    }
  };

  const shareARView = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out ${product.name} in AR`,
          text: `I'm previewing ${product.name} using DeliWer's AR feature!`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "AR preview link copied to clipboard",
      });
    }
  };

  const get3DModelPath = (category: string, productId: string) => {
    // In a real implementation, these would be actual 3D model URLs
    const models = {
      'water-solutions': `/models/water-systems/${productId}.glb`,
      'refurbished-phones': `/models/phones/${productId}.glb`,
      'premium-water': `/models/bottles/${productId}.glb`
    };
    return models[category as keyof typeof models] || '/models/placeholder.glb';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-full max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              {product.category === 'refurbished-phones' ? (
                <Smartphone className="w-5 h-5 text-white" />
              ) : (
                <Droplets className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{product.name}</h3>
              <p className="text-sm text-gray-400">AR Preview</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {arMode === 'camera' && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={captureScreenshot}
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  <Camera className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={shareARView}
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-slate-700"
              data-testid="button-close-ar"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* AR Content */}
        <div className="flex-1 p-4 h-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-white">Initializing AR...</p>
              </div>
            </div>
          ) : !isARSupported ? (
            <Card className="h-full bg-slate-800/50 border-slate-600">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">AR Not Available</h3>
                  <p className="text-gray-400 mb-4">
                    Your device doesn't support AR features, but you can still preview the product.
                  </p>
                  <div className="bg-slate-700/50 rounded-xl p-6">
                    <div className="text-4xl mb-4">{product.image}</div>
                    <h4 className="text-lg font-semibold text-white mb-2">{product.name}</h4>
                    <p className="text-2xl font-bold text-blue-400">AED {product.price.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : arMode === 'preview' ? (
            <Card className="h-full bg-slate-800/50 border-slate-600">
              <CardContent className="flex flex-col items-center justify-center h-full p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">AR Preview Ready</h3>
                  <p className="text-gray-400 mb-6 max-w-md">
                    Use your camera to see how {product.name} would look in your space.
                  </p>
                </div>

                <div className="bg-slate-700/50 rounded-xl p-6 mb-8 max-w-md">
                  <div className="text-4xl mb-4 text-center">{product.image}</div>
                  <h4 className="text-lg font-semibold text-white mb-2 text-center">{product.name}</h4>
                  <p className="text-2xl font-bold text-blue-400 text-center">AED {product.price.toLocaleString()}</p>
                </div>

                {cameraPermission === 'granted' ? (
                  <Button
                    onClick={startARPreview}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                    data-testid="button-start-ar-preview"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Start AR Preview
                  </Button>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-400 mb-4">Camera access required for AR preview</p>
                    <Button
                      onClick={requestCameraPermission}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                    >
                      Allow Camera Access
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="relative h-full rounded-xl overflow-hidden">
              {/* Camera Feed */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover rounded-xl"
              />
              
              {/* AR Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">{product.image}</div>
                    <div className="bg-black/50 rounded-lg p-3">
                      <p className="text-white font-semibold">{product.name}</p>
                      <p className="text-blue-400 font-bold">AED {product.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AR Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 pointer-events-auto">
                <Button
                  size="lg"
                  className="bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm border border-white/20"
                  onClick={() => setArMode('preview')}
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
                <Button
                  size="lg"
                  className="bg-blue-600/80 hover:bg-blue-700 text-white backdrop-blur-sm"
                  onClick={captureScreenshot}
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Capture
                </Button>
              </div>

              {/* Instructions */}
              <div className="absolute top-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-center">
                <p className="text-white text-sm">
                  Move your device to position the {product.category.includes('phone') ? 'phone' : 'water system'} in your space
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Hidden canvas for screenshots */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}