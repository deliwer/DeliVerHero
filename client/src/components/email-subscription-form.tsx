import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertEmailSubscriberSchema } from "@shared/schema";

const subscriptionFormSchema = insertEmailSubscriberSchema.pick({
  email: true,
  firstName: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "Name must be at least 2 characters"),
});

type SubscriptionFormData = z.infer<typeof subscriptionFormSchema>;

interface EmailSubscriptionFormProps {
  variant?: "footer" | "inline";
}

export function EmailSubscriptionForm({ variant = "footer" }: EmailSubscriptionFormProps) {
  const { toast } = useToast();

  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: SubscriptionFormData) => {
      return await apiRequest("POST", "/api/email/subscribers", {
        email: data.email,
        firstName: data.firstName,
        subscriberType: "consumer",
        source: "website",
      });
    },
    onSuccess: () => {
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for joining our sustainability community.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Subscription Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SubscriptionFormData) => {
    subscribeMutation.mutate(data);
  };

  if (variant === "footer") {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                      <Input
                        {...field}
                        placeholder="Your name"
                        className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-400"
                        data-testid="input-subscriber-name"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-gray-400"
                        data-testid="input-subscriber-email"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={subscribeMutation.isPending}
            data-testid="button-subscribe"
          >
            {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
          </Button>
          <p className="text-xs text-gray-400 text-center">
            Get updates on sustainability initiatives and exclusive offers
          </p>
        </form>
      </Form>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input {...field} placeholder="Your name" data-testid="input-subscriber-name-inline" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input {...field} type="email" placeholder="your@email.com" data-testid="input-subscriber-email-inline" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={subscribeMutation.isPending}
          data-testid="button-subscribe-inline"
        >
          {subscribeMutation.isPending ? "..." : "Subscribe"}
        </Button>
      </form>
    </Form>
  );
}
