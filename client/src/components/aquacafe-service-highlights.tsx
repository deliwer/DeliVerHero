import { Truck, Shield, RefreshCw, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AquaCafeServiceHighlights() {
  const highlights = [
    {
      icon: <Truck className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
      title: "Professional Installation",
      description: "Discounted installation for AquaCafe loyalty members across all Dubai areas"
    },
    {
      icon: <Shield className="w-10 h-10 text-green-600 dark:text-green-400" />,
      title: "1-Year Warranty",
      description: "Comprehensive warranty coverage on all parts and filters for peace of mind"
    },
    {
      icon: <RefreshCw className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: "Filter Replacement Subscription",
      description: "Convenient auto-delivery of replacement filters when you need them"
    },
    {
      icon: <Award className="w-10 h-10 text-amber-600 dark:text-amber-400" />,
      title: "Eco Rewards via DeliWer Points",
      description: "Earn points for every purchase and eco-friendly action to redeem rewards"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Why Choose AquaCafe?
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Experience premium water filtration with unmatched service and support across Dubai
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <Card key={index} className="border-2 hover:border-blue-400 transition-all hover:shadow-lg" data-testid={`card-service-${index}`}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {highlight.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
