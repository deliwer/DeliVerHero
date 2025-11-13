import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AquaCafeComparisonTable() {
  const features = [
    { name: "Filtration Stages", starter: "3-Stage", pro: "5-Stage", elite: "7-Stage" },
    { name: "TDS Reduction", starter: "85%", pro: "95%", elite: "99%" },
    { name: "Flow Rate", starter: "2L/min", pro: "3L/min", elite: "4L/min" },
    { name: "Filter Life", starter: "12 months", pro: "18 months", elite: "36 months" },
    { name: "Warranty", starter: "1 Year", pro: "1 Year", elite: "1 Year" },
    { name: "Installation Discount", starter: true, pro: true, elite: true },
    { name: "Smart Monitoring", starter: false, pro: true, elite: true },
    { name: "UV Sterilization", starter: false, pro: false, elite: true },
    { name: "Alkaline Enhancement", starter: false, pro: false, elite: true },
    { name: "Annual Maintenance", starter: false, pro: false, elite: true },
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Compare AquaCafe Systems
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Choose the perfect water filtration system for your needs
        </p>

        <div className="overflow-x-auto">
          <table className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg">
            <thead>
              <tr className="border-b-2">
                <th className="p-4 text-left font-bold">Feature</th>
                <th className="p-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-muted-foreground">Hero Minimal</span>
                    <span className="font-bold text-lg">Starter</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">AED 1,299</span>
                  </div>
                </th>
                <th className="p-4 text-center bg-blue-50 dark:bg-blue-950">
                  <div className="flex flex-col items-center">
                    <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded-full mb-1">POPULAR</span>
                    <span className="text-sm text-muted-foreground">Hero Premium</span>
                    <span className="font-bold text-lg">Pro</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">AED 1,499</span>
                  </div>
                </th>
                <th className="p-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-muted-foreground">Hero Elite</span>
                    <span className="font-bold text-lg">Ultimate</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">AED 2,299</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr 
                  key={index} 
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                  data-testid={`row-feature-${index}`}
                >
                  <td className="p-4 font-medium">{feature.name}</td>
                  <td className="p-4 text-center">
                    {typeof feature.starter === 'boolean' ? (
                      feature.starter ? (
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )
                    ) : (
                      <span className="font-semibold">{feature.starter}</span>
                    )}
                  </td>
                  <td className="p-4 text-center bg-blue-50 dark:bg-blue-950">
                    {typeof feature.pro === 'boolean' ? (
                      feature.pro ? (
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )
                    ) : (
                      <span className="font-semibold">{feature.pro}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof feature.elite === 'boolean' ? (
                      feature.elite ? (
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mx-auto" />
                      )
                    ) : (
                      <span className="font-semibold">{feature.elite}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          All systems include discounted installation for loyalty members across Dubai and 1-year warranty
        </p>
      </div>
    </section>
  );
}
