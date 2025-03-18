"use client";

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
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();
  const { toast } = useToast();

  // Function to get user's location
  const getLocation = async () => {
    return new Promise<{ latitude: number; longitude: number } | null>((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          () => resolve(null)
        );
      } else {
        resolve(null);
      }
    });
  };

  // Function to get user's IP address
  const getIPAddress = async () => {
    try {
      const res = await fetch("https://api64.ipify.org?format=json");
      const data = await res.json();
      return data.ip;
    } catch (error) {
      return "Unknown IP";
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }
    setPasswordError("");
    setIsLoading(true);

    // Fetch location and IP Address
    const location = await getLocation();
    const ipAddress = await getIPAddress();
    
    const requestBody = {
      Email: email,
      Password: password,
      Location: location || { Latitude: 0, Longitude: 0 }, // Default if location access is denied
      IpAddress: ipAddress,
      AndroidId: "a1b2c3d4e5f6g7h8" // Placeholder Android ID (if applicable)
    };

    try {
      const response = await fetch("/axion/auth/login/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Login successful",
          description: "You have been logged in successfully.",
        });
        navigate.push("/search_patient"); // Redirect to search patient
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: data.message || "Invalid credentials.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
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
            <CardTitle className="justify-center">Login</CardTitle>
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
                  <a href="/Login/ForgotPassword" className="text-xs text-primary hover:underline">Forgot password?</a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="search-input"
                />
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
            <Link href="/edit_profile">
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <Lock className="ml-2 h-4 w-4" />}
              </button>
            </Link>
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account? {" "}
                <Link href="/Register" className="text-primary hover:underline font-medium">Register</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
