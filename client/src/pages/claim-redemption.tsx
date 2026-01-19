import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, ShieldCheck, CreditCard } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const claimSchema = z.object({
  partnerId: z.string().min(1, "Partner ID is required"),
  trackingCode: z.string().min(1, "Tracking code is required"),
  leadName: z.string().min(1, "Lead name is required"),
  serviceDetails: z.string().min(1, "Service details are required"),
});

export default function ClaimRedemptionPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof claimSchema>>({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      partnerId: "",
      trackingCode: "",
      leadName: "",
      serviceDetails: "Exit Concierge",
    },
  });

  async function onSubmit(values: z.infer<typeof claimSchema>) {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/claims", values);
      toast({
        title: "Claim Submitted",
        description: "Your commission claim has been recorded for manual verification.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your claim. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black text-white uppercase tracking-tighter">
              Commission Redemption
            </CardTitle>
            <p className="text-gray-400">DeBacci Group Community Partner Portal</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                <ShieldCheck className="text-emerald-400 w-5 h-5" />
                <span className="text-sm text-emerald-100 font-medium">Verified Tracking</span>
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center gap-3">
                <CreditCard className="text-blue-400 w-5 h-5" />
                <span className="text-sm text-blue-100 font-medium">Monthly Payouts</span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="partnerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Partner ID (DeBacci Group)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your unique ID" {...field} className="bg-slate-800 border-slate-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="trackingCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Tracking Code / Lead Reference</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. WA-EXIT-001" {...field} className="bg-slate-800 border-slate-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="leadName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Customer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name of the referred client" {...field} className="bg-slate-800 border-slate-700 text-white" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-[#FFC845] hover:bg-[#e6b43e] text-[#0A3D62] font-black h-14 rounded-xl text-lg uppercase"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Claim for Verification"}
                </Button>
              </form>
            </Form>

            <div className="mt-12 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#FFC845]" />
                Manual Verification Process
              </h4>
              <ul className="text-sm text-gray-400 space-y-3">
                <li className="flex gap-2">
                  <span className="text-[#FFC845] font-bold">1.</span>
                  <span>Submit the claim form with the correct tracking code provided to the customer.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FFC845] font-bold">2.</span>
                  <span>Our team cross-references the WhatsApp conversation history for requirement validation.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FFC845] font-bold">3.</span>
                  <span>Once the service is initiated/completed, your commission is marked as 'Verified'.</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
