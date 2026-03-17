"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoogleButton from "./GoogleButton";
import { api } from "@/lib/api";
import { setAuthToken } from "@/lib/auth";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when typing
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    let hasError = false;
    const newErrors = { email: "", password: "" };
    
    if (!formData.email) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      hasError = true;
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response: any = await api.auth.login(formData.email, formData.password);
      if (response && response.token) {
        setAuthToken(response.token);
      }
      router.push("/dashboard");
    } catch (error) {
      // Mock fallback — remove when backend is ready
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Google login clicked");
    router.push("/dashboard");
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center sm:items-start mb-8">
        <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center mb-6">
          <div className="w-3 h-3 bg-white rounded-sm"></div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">Welcome back</h1>
        <p className="text-sm text-zinc-500">Sign in to your agents.room account</p>
      </div>

      <GoogleButton onClick={handleGoogleLogin} isLoading={isLoading} />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-xs text-zinc-400">or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-[13px] font-medium text-zinc-700 mb-1.5">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full h-11 px-4 rounded-xl border ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-zinc-200 focus:ring-zinc-900'} bg-white text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-150`}
            placeholder="name@example.com"
          />
          {errors.email && (
            <p className="mt-1.5 text-[12px] text-red-400 flex items-center gap-1.5">
              <span className="text-[10px]">⚠️</span> {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-[13px] font-medium text-zinc-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full h-11 px-4 rounded-xl border ${errors.password ? 'border-red-300 focus:ring-red-500' : 'border-zinc-200 focus:ring-zinc-900'} bg-white text-[14px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-150`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none p-1"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/><line x1="3" y1="3" x2="21" y2="21"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-[12px] text-red-400 flex items-center gap-1.5">
              <span className="text-[10px]">⚠️</span> {errors.password}
            </p>
          )}
        </div>

        <div className="flex justify-end pt-1 pb-2">
          <Link href="/forgot-password" className="text-sm text-zinc-500 hover:text-zinc-800 transition-colors">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-zinc-900 hover:bg-zinc-700 text-white rounded-xl text-[14px] font-medium transition-colors disabled:opacity-50 disabled:bg-zinc-900 flex items-center justify-center gap-2"
        >
          {isLoading && (
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isLoading ? "Signing in..." : "Sign in"}
        </button>

        <p className="text-center text-sm text-zinc-500 pt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-zinc-900 font-medium hover:underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
