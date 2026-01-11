import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import marketImage from "@assets/stock_images/dubai_downtown_skyli_01395ddb.jpg";

const intakeSchema = z.object({
  need: z.enum([
    "looking_for_stay",
    "found_place_move_in",
    "short_term_living",
    "not_sure"
  ]),
  timeline: z.string().optional(),
  area: z.string().optional(),
  keys: z.enum(["yes", "not_yet", "exploring"]),
  name: z.string().min(2, "Name is required"),
  whatsapp: z.string().min(8, "Valid WhatsApp number required"),
  email: z.string().email().optional().or(z.literal("")),
});

type IntakeFormValues = z.infer<typeof intakeSchema>;

export default function FindAPlace() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      need: "looking_for_stay",
      timeline: "6+ months",
      area: "",
      keys: "exploring",
      name: "",
      whatsapp: "",
      email: "",
    }
  });

  const onSubmit = async (data: IntakeFormValues) => {
    console.log("Form submitted:", data);
    setSubmitted(true);
    toast({
      title: "Request Received",
      description: "A DeliWer team member will review your request and guide you on the next steps.",
    });
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-xl w-full bg-slate-900 border-white/10 text-center p-12 shadow-2xl">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Thanks — a DeliWer team member will review your request and guide you on the next steps.</h2>
          <p className="text-gray-400 mb-8">Usually within the same day.</p>
          <Button 
            className="bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-6 rounded-xl"
            onClick={() => {
              const message = encodeURIComponent("Hi DeliWer, I need help with residence in Dubai.\nI’ve submitted the form and would like guidance.");
              window.open(`https://wa.me/971523946311?text=${message}`, "_blank");
            }}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Continue on WhatsApp
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 overflow-hidden min-h-[400px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.8) 100%), url(${marketImage})`,
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Get residence help</h1>
          <p className="text-xl text-gray-300">One conversation. We guide you from here.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-slate-900 border-white/10 shadow-2xl overflow-hidden">
            <CardHeader className="bg-white/5 border-b border-white/5 p-8">
              <CardTitle className="text-2xl text-white">
                {step === 1 && "What do you need help with?"}
                {step === 2 && "How long do you plan to stay?"}
                {step === 3 && "Where are you looking?"}
                {step === 4 && "Have you received your keys?"}
                {step === 5 && "How should we reach you?"}
              </CardTitle>
              <p className="text-sm text-gray-500 mt-2">
                {step === 1 && "Choose what best describes your situation. You can change this later."}
                {step === 3 && "Exact address not needed. This helps us check community coverage."}
                {step === 5 && "We don’t share your details. No agent calls."}
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {step === 1 && (
                  <div className="space-y-4">
                    {[
                      { value: "looking_for_stay", label: "I’m looking for a place to stay" },
                      { value: "found_place_move_in", label: "I’ve found a place and need move-in help" },
                      { value: "short_term_living", label: "I need short-term living" },
                      { value: "not_sure", label: "I’m not sure yet" }
                    ].map(option => (
                      <div key={option.value} className="flex items-center space-x-3 p-4 border border-white/10 rounded-xl hover:bg-white/5 cursor-pointer transition-all" onClick={() => {
                        form.setValue("need", option.value as any);
                        nextStep();
                      }}>
                        <div className={`w-5 h-5 rounded-full border-2 ${form.watch("need") === option.value ? "border-blue-500 bg-blue-500" : "border-white/20"}`} />
                        <span className="text-white font-medium">{option.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    {["Less than 1 month", "1–3 months", "3–6 months", "6+ months", "Not sure yet"].map(option => (
                      <div key={option} className="flex items-center space-x-3 p-4 border border-white/10 rounded-xl hover:bg-white/5 cursor-pointer transition-all" onClick={() => {
                        form.setValue("timeline", option);
                        nextStep();
                      }}>
                        <div className={`w-5 h-5 rounded-full border-2 ${form.watch("timeline") === option ? "border-blue-500 bg-blue-500" : "border-white/20"}`} />
                        <span className="text-white font-medium">{option}</span>
                      </div>
                    ))}
                    <Button variant="ghost" className="w-full text-gray-500" onClick={prevStep}>Back</Button>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <Input 
                      placeholder="e.g. JVC, Marina, Business Bay" 
                      className="bg-black/20 border-white/10 text-white h-14"
                      {...form.register("area")}
                    />
                    <div className="flex gap-4">
                      <Button variant="ghost" className="flex-1 text-gray-500" onClick={prevStep}>Back</Button>
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-500 h-14 font-bold" onClick={nextStep}>Next</Button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    {[
                      { value: "yes", label: "Yes, I have the keys" },
                      { value: "not_yet", label: "Not yet" },
                      { value: "exploring", label: "I’m just exploring" }
                    ].map(option => (
                      <div key={option.value} className="flex items-center space-x-3 p-4 border border-white/10 rounded-xl hover:bg-white/5 cursor-pointer transition-all" onClick={() => {
                        form.setValue("keys", option.value as any);
                        nextStep();
                      }}>
                        <div className={`w-5 h-5 rounded-full border-2 ${form.watch("keys") === option.value ? "border-blue-500 bg-blue-500" : "border-white/20"}`} />
                        <span className="text-white font-medium">{option.label}</span>
                      </div>
                    ))}
                    <Button variant="ghost" className="w-full text-gray-500" onClick={prevStep}>Back</Button>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Input placeholder="Your Name" className="bg-black/20 border-white/10 text-white h-14" {...form.register("name")} />
                      <Input placeholder="WhatsApp Number" className="bg-black/20 border-white/10 text-white h-14" {...form.register("whatsapp")} />
                      <Input placeholder="Email (Optional)" className="bg-black/20 border-white/10 text-white h-14" {...form.register("email")} />
                    </div>
                    <div className="flex gap-4">
                      <Button variant="ghost" className="flex-1 text-gray-500" onClick={prevStep}>Back</Button>
                      <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-500 h-14 font-bold">
                        Submit Request
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
