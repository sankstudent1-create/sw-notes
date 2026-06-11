"use client";

import Link from "next/link";
import { PenTool } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/onboarding");
    }, 1000);
  };

  return (
    <Card className="border-t-8 border-t-[var(--terracotta)]">
      <div className="text-center mb-8">
        <div className="mx-auto w-12 h-12 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center text-[var(--terracotta)] mb-4">
          <PenTool className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold font-heading text-[var(--text-primary)]">Create an Account</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-2">Start your smarter learning journey</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <Input 
          label="Full Name" 
          type="text" 
          placeholder="e.g. Aditi Sharma" 
          required 
        />
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
        
        <div className="text-sm text-[var(--text-secondary)] mt-4">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </div>

        <Button type="submit" className="w-full bg-[var(--terracotta)] hover:bg-[#a66243] focus:ring-[var(--terracotta)]" size="lg" isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-[var(--paper)] text-center text-sm">
        <p className="text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--terracotta)] font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </Card>
  );
}
