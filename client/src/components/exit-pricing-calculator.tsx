import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MessageCircle, Calculator } from "lucide-react";

import { DirhamSymbol } from "@/components/dirham-symbol";

export function ExitPricingCalculator({ isMoveIn }: { isMoveIn?: boolean }) {
  const [apartmentSize, setApartmentSize] = useState("studio");
  const [totalPrice, setTotalPrice] = useState(0);

  const pricing = {
    studio: 999,
    "1br": 1499,
    "2br": 1999,
    "3br": 2499,
    "villa": 3499
  };

  useEffect(() => {
    setTotalPrice(pricing[apartmentSize as keyof typeof pricing]);
  }, [apartmentSize]);

  const handleWhatsApp = () => {
    const type = isMoveIn ? "Move-In" : "Exit";
    const text = `Hello DeliWer, I used the ${type} Calculator for my ${apartmentSize} apartment. Quote: Dirham ${totalPrice}. I'd like to proceed.`;
    window.open(`https://wa.me/971523906019?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <Card className="bg-slate-900 border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
      <CardHeader className="p-8 border-b border-white/5 bg-white/5">
        <CardTitle className="text-2xl font-black uppercase flex items-center gap-2 text-white">
          <Calculator className="w-6 h-6 text-emerald-500" />
          {isMoveIn ? "Move-In Calculator" : "Exit & Move-Out Calculator"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        <div className="space-y-4">
          <Label className="text-gray-400 uppercase tracking-widest text-xs font-black">Select Apartment Size</Label>
          <RadioGroup value={apartmentSize} onValueChange={setApartmentSize} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(pricing).map((size) => (
              <div key={size} className="relative">
                <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                <Label
                  htmlFor={`size-${size}`}
                  className="flex items-center justify-center p-4 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-500/10 transition-all cursor-pointer uppercase text-sm font-bold text-gray-300 peer-data-[state=checked]:text-white"
                >
                  {size}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-center">
          <p className="text-gray-300 text-sm uppercase font-black mb-1">Estimated Base Package</p>
          <div className="flex items-center justify-center gap-2">
            <DirhamSymbol className="w-6 h-6 brightness-0 invert" />
            <p className="text-4xl font-black text-emerald-400">{totalPrice.toLocaleString()}</p>
          </div>
        </div>

        <Button 
          onClick={handleWhatsApp}
          size="lg" 
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black h-16 rounded-xl text-lg"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Get Exact Quote via WhatsApp
        </Button>
        <p className="text-center text-[10px] text-gray-500 uppercase font-bold tracking-tighter">
          *{isMoveIn ? "Price includes deep cleaning, utility setup assistance, and move-in support." : "Price includes base cleaning, utility closure assistance, and handover support."}
        </p>
      </CardContent>
    </Card>
  );
}
