import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Crown, 
  Calendar, 
  Building2, 
  Briefcase, 
  Home as HomeIcon,
  Landmark,
  LogOut,
  CheckCircle2,
  Star,
  ArrowLeft
} from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  tier: z.enum(["circle", "inner-ring"]),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  tier: z.enum(["circle", "inner-ring"]),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface RelocateMember {
  id: number;
  name: string;
  email: string;
  tier: "circle" | "inner-ring";
}

interface RelocateEvent {
  id: number;
  name: string;
  date: string;
  description: string;
  tiers: string[];
}

export default function RelocateCommunity() {
  const [user, setUser] = useState<RelocateMember | null>(null);
  const [activeTab, setActiveTab] = useState("login");
  const { toast } = useToast();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#inner-ring") {
      setActiveTab("register");
    }
  }, []);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      tier: "circle",
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      tier: "circle",
    },
  });

  const { data: events = [], isLoading: eventsLoading } = useQuery<RelocateEvent[]>({
    queryKey: ["/api/relocate/events"],
    enabled: !!user,
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await fetch("/api/relocate/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Login failed");
      }
      return response.json() as Promise<RelocateMember>;
    },
    onSuccess: (data: RelocateMember) => {
      setUser(data);
      toast({
        title: "Welcome back!",
        description: `Logged in as ${data.name}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Member not found or wrong tier",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await fetch("/api/relocate/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Registration failed");
      }
      return response.json() as Promise<RelocateMember>;
    },
    onSuccess: (data: RelocateMember) => {
      setUser(data);
      toast({
        title: "Welcome to the community!",
        description: data.tier === "inner-ring" 
          ? "Your Inner Ring application has been submitted" 
          : "You have joined the Relocate Circle",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.message || "Could not complete registration",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const onLoginSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  const partnerResources = [
    { icon: Building2, title: "Licensed Immigration Consultants", description: "Verified experts in UAE immigration law" },
    { icon: Briefcase, title: "Business Setup Agencies", description: "Trusted partners for company formation" },
    { icon: HomeIcon, title: "Real Estate Developers & Brokers", description: "Premium property solutions" },
    { icon: Landmark, title: "Banking & Investment Partners", description: "Financial services tailored for expats" },
  ];

  const userEvents = user 
    ? events.filter(ev => ev.tiers.includes(user.tier))
    : [];

  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/relocate">
                <Button variant="ghost" size="icon" data-testid="button-back">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="font-bold">DeliWer Community</h1>
                <p className="text-sm text-muted-foreground">Member Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={user.tier === "inner-ring" ? "default" : "secondary"} data-testid="badge-tier">
                {user.tier === "inner-ring" ? (
                  <><Crown className="w-3 h-3 mr-1" /> Inner Ring</>
                ) : (
                  <><Users className="w-3 h-3 mr-1" /> Relocate Circle</>
                )}
              </Badge>
              <Button variant="ghost" size="sm" onClick={handleLogout} data-testid="button-logout">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2" data-testid="text-welcome">
              Welcome, {user.name}!
            </h2>
            <p className="text-muted-foreground">
              Membership Tier: {user.tier === "inner-ring" ? "Inner Ring" : "Relocate Circle"}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card data-testid="card-events">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>
                  Events available for your membership tier
                </CardDescription>
              </CardHeader>
              <CardContent>
                {eventsLoading ? (
                  <p className="text-muted-foreground">Loading events...</p>
                ) : userEvents.length === 0 ? (
                  <p className="text-muted-foreground">No upcoming events</p>
                ) : (
                  <ul className="space-y-4">
                    {userEvents.map((event) => (
                      <li key={event.id} className="flex items-start gap-3 p-3 rounded-md bg-muted/50" data-testid={`event-${event.id}`}>
                        <Calendar className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">{event.name}</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                          {event.description && (
                            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card data-testid="card-resources">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Partner Resources
                </CardTitle>
                <CardDescription>
                  Verified partners and service providers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {partnerResources.map((resource, index) => (
                    <li key={index} className="flex items-start gap-3" data-testid={`resource-${index}`}>
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <resource.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{resource.title}</p>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {user.tier === "circle" && (
            <Card className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5" data-testid="card-upgrade">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  Upgrade to Inner Ring
                </CardTitle>
                <CardDescription>
                  Get access to exclusive VIP events, curated investments, and private advisory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm">VIP networking events</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm">Curated investment deals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm">Private advisory sessions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm">Dubai concierge service</span>
                  </li>
                </ul>
                <Button data-testid="button-apply-upgrade">
                  Apply for Inner Ring
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <Link href="/relocate" className="inline-flex items-center gap-2 text-muted-foreground mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Relocate Gateway
            </Link>
            <h1 className="text-4xl font-bold mb-4" data-testid="text-title">
              DeliWer Community
            </h1>
            <p className="text-muted-foreground">
              Access the network of founders, investors, and partners. 
              Your journey in Dubai starts here.
            </p>
          </div>
        </div>
      </section>

      <section id="membership" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8" data-testid="text-tiers-title">
            Membership Tiers
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <Card className="relative" data-testid="card-circle-tier">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  <Users className="w-3 h-3 mr-1" />
                  Open Access
                </Badge>
                <CardTitle>The Relocate Circle</CardTitle>
                <CardDescription>
                  Join our community for free access to webinars, networking events, and partner resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm">Community webinars</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm">Networking events</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm">Partner resources</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm">Market insights</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card id="inner-ring" className="relative border-primary" data-testid="card-inner-ring-tier">
              <div className="absolute -top-3 right-4">
                <Badge className="bg-primary">
                  <Crown className="w-3 h-3 mr-1" />
                  Exclusive
                </Badge>
              </div>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">
                  <Crown className="w-3 h-3 mr-1" />
                  By Application
                </Badge>
                <CardTitle>The Inner Ring</CardTitle>
                <CardDescription>
                  Exclusive access for qualified investors and entrepreneurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm">VIP events & expeditions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm">Curated investments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm">Private advisory</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-sm">Dubai concierge</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-md mx-auto" data-testid="card-auth">
            <CardHeader>
              <CardTitle>Join the Community</CardTitle>
              <CardDescription>Login or register to access member features</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="login" className="flex-1" data-testid="tab-login">Login</TabsTrigger>
                  <TabsTrigger value="register" className="flex-1" data-testid="tab-register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} data-testid="input-login-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="tier"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Membership Tier</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-login-tier">
                                  <SelectValue placeholder="Select tier" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="circle">Relocate Circle</SelectItem>
                                <SelectItem value="inner-ring">Inner Ring</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loginMutation.isPending}
                        data-testid="button-login-submit"
                      >
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} data-testid="input-register-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} data-testid="input-register-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="tier"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Membership Tier</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-register-tier">
                                  <SelectValue placeholder="Select tier" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="circle">Relocate Circle (Free)</SelectItem>
                                <SelectItem value="inner-ring">Inner Ring (Application)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={registerMutation.isPending}
                        data-testid="button-register-submit"
                      >
                        {registerMutation.isPending ? "Registering..." : "Register"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
