
import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, Phone, Building, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { shopifyAuthService } from "@/lib/shopify-auth";

interface SignupFormProps {
  accountType?: "personal" | "b2b_buyer";
  onSuccess?: (user: any) => void;
  redirectTo?: string;
}

export function SignupForm({ accountType = "personal", onSuccess, redirectTo = "/" }: SignupFormProps) {
  const [formData, setFormData] = useState({
    // Personal fields
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    
    // B2B Wholesale Buyer fields (if accountType === "b2b_buyer")
    companyName: "",
    businessLicense: "",
    tradeLicense: "",
    
    // Agreements
    acceptTerms: false,
    acceptMarketing: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.acceptTerms) {
      toast({
        title: "Terms required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const userData = accountType === "b2b_buyer" ? {
        ...formData,
        userType: "b2b_buyer"
      } : {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        acceptMarketing: formData.acceptMarketing,
        userType: "consumer"
      };

      const user = await shopifyAuthService.signup(userData);
      
      toast({
        title: "Account created successfully!",
        description: accountType === "b2b_buyer" 
          ? "Your B2B wholesale buyer account is under review. You'll receive confirmation within 1-2 business days once your business credentials are verified."
          : "Welcome to DeliWer! You can now start trading your devices.",
      });

      if (onSuccess) {
        onSuccess(user);
      } else {
        window.location.href = redirectTo;
      }
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Card className="w-full max-w-lg bg-slate-800 border-slate-700">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-white">
          {accountType === "b2b_buyer" ? "Create B2B Wholesale Buyer Account" : "Join DeliWer"}
        </CardTitle>
        <p className="text-center text-gray-400">
          {accountType === "b2b_buyer" 
            ? "Get access to aggregated wholesale phone inventory via ChainTrack"
            : "Start your sustainability journey today"
          }
        </p>
        <div className="bg-slate-700/50 rounded-lg p-3 mt-4" data-testid="signup-benefits">
          <div className="text-center">
            <div className="text-sm font-medium text-emerald-400 mb-1">
              {accountType === "b2b_buyer" ? "B2B Wholesale Benefits" : "Starter Benefits"}
            </div>
            {accountType === "b2b_buyer" ? (
              <>
                <div className="text-xs text-gray-300">• Unified Inventory Access</div>
                <div className="text-xs text-gray-300">• Multi-Source Price Comparison</div>
                <div className="text-xs text-gray-300">• Regional Market Insights</div>
              </>
            ) : (
              <>
                <div className="text-xs text-gray-300">• Earn Planet Points</div>
                <div className="text-xs text-gray-300">• Access Trade Calculator</div>
                <div className="text-xs text-gray-300">• Unlock Rewards & Badges</div>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {accountType === "personal" ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-300">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="pl-10 bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-300">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label htmlFor="companyName" className="text-sm font-medium text-gray-300">
                  Company Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="businessLicense" className="text-sm font-medium text-gray-300">
                  Business License Number
                </label>
                <Input
                  id="businessLicense"
                  name="businessLicense"
                  placeholder="Enter business license number"
                  value={formData.businessLicense}
                  onChange={handleInputChange}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="tradeLicense" className="text-sm font-medium text-gray-300">
                  Trade License Number
                </label>
                <Input
                  id="tradeLicense"
                  name="tradeLicense"
                  placeholder="Enter trade license number"
                  value={formData.tradeLicense}
                  onChange={handleInputChange}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-300">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+971 50 123 4567"
                value={formData.phone}
                onChange={handleInputChange}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptTerms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                }
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-300">
                I agree to the{" "}
                <a href="/terms" className="text-blue-400 hover:text-blue-300">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-blue-400 hover:text-blue-300">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptMarketing"
                checked={formData.acceptMarketing}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, acceptMarketing: checked as boolean }))
                }
              />
              <label htmlFor="acceptMarketing" className="text-sm text-gray-300">
                I'd like to receive updates about DeliWer and sustainability tips
              </label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              `Create ${accountType === "b2b_buyer" ? "B2B Wholesale " : ""}Account`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
