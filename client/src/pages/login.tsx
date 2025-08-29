
import { LoginForm } from "@/components/auth/login-form";
import { Link } from "wouter";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <img 
            src="/deliwer-logo.png" 
            alt="DeliWer Logo" 
            className="h-12 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400">
            Sign in to continue your sustainability journey
          </p>
        </div>

        <LoginForm />

        <div className="text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Sign up
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
