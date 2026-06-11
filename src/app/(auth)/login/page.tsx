"use client";

import Link from "next/link";
import { PenTool } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <Card className="border-t-8 border-t-[var(--accent)]">
      <div className="text-center mb-8">
        <div className="mx-auto w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] mb-4">
          <PenTool className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold font-heading text-[var(--text-primary)]">Welcome Back</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-2">Log in to continue studying</p>
      </div>

      <form onSubmit={handleDemoLogin} className="space-y-4">
        <Input 
          label="Email address" 
          type="email" 
          placeholder="student@school.edu" 
          required 
        />
        <Input 
          label="Password" 
          type="password" 
          placeholder="••••••••" 
          required 
        />
        
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-[var(--accent)] focus:ring-[var(--accent)]" />
            <span className="text-[var(--text-secondary)]">Remember me</span>
          </label>
          <a href="#" className="text-[var(--accent)] hover:underline font-medium">Forgot password?</a>
        </div>

        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
          Log In (Demo)
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-[var(--paper)] text-center text-sm">
        <p className="text-[var(--text-secondary)]">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[var(--accent)] font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </Card>
  );
}
