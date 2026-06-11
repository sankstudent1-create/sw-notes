"use client";

import Link from "next/link";
import { PenTool } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setIsLoading(false);
    }
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

      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-md">
            {error}
          </div>
        )}
        <Input 
          label="Email address" 
          type="email" 
          placeholder="student@school.edu" 
          required 
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input 
          label="Password" 
          type="password" 
          placeholder="••••••••" 
          required 
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-[var(--accent)] focus:ring-[var(--accent)]" />
            <span className="text-[var(--text-secondary)]">Remember me</span>
          </label>
          <a href="#" className="text-[var(--accent)] hover:underline font-medium">Forgot password?</a>
        </div>

        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
          Log In
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
