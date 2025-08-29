
import { useState } from "react";
import { SignupForm } from "@/components/auth/signup-form";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { User, Building } from "lucide-react";

export default function SignupPage() {
  const [accountType, setAccountType] = useState<"personal" | "company">("personal");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center">
          <img 
            src="/deliwer-logo.png" 
            alt="DeliWer Logo" 
            className="h-12 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-white mb-2">
            Join DeliWer
          </h1>
          <p className="text-gray-400">
            Start your sustainability journey today
          </p>
        </div>

        {/* Account Type Selector */}
        <div className="flex gap-3 p-1 bg-slate-800 rounded-lg">
          <Button
            variant={accountType === "personal" ? "default" : "ghost"}
            onClick={() => setAccountType("personal")}
            className={`flex-1 ${
              accountType === "personal" 
                ? "bg-emerald-600 hover:bg-emerald-700" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            Personal
          </Button>
          <Button
            variant={accountType === "company" ? "default" : "ghost"}
            onClick={() => setAccountType("company")}
            className={`flex-1 ${
              accountType === "company" 
                ? "bg-blue-600 hover:bg-blue-700" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Building className="w-4 h-4 mr-2" />
            Company
          </Button>
        </div>

        <SignupForm accountType={accountType} />

        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
            ← Back to DeliWer
          </Link>
        </div>
      </div>
    </div>
  );
}
