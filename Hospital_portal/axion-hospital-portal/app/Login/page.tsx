"use client"

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { Hospital, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This would be replaced with actual authentication logic
    setTimeout(() => {
      setIsLoading(false);
      
      if (email && password) {
        toast({
          title: "Login successful",
          description: "You have been logged in successfully.",
        });
        navigate.push("/search_patient");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please check your credentials and try again."
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-2">
            <Hospital className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Hospital Portal</h1>
          <p className="text-muted-foreground">Sign in to access your hospital dashboard.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className ="justify-center">Login</CardTitle>
            <CardDescription>
              Enter your credentials to sign in to your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hospital@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="search-input"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-muted-foreground">Password</label>
                  <a
                    href="#"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="search-input"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <Lock className="ml-2 h-4 w-4" />}
              </button>
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/Register" className="text-primary hover:underline font-medium">
                Register
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;


              