"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@nextui-org/react";
import Link from "next/link";
import { Hospital, Lock, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{ Latitude: number; Longitude: number } | null>(null);
  const [ipAddress, setIpAddress] = useState("Unknown");
  const [androidId] = useState("Unknown");
  const [step] = useState(1);
  const { toast } = useToast();
  // At the top of your component:
  const navigate = useRouter();

  // Function to validate email
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Function to validate password
  const validatePassword = (password: string) => password.length >= 8;

  // Get User's Geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLocation({
            Latitude: position.coords.latitude,
            Longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation(null);
        }
      );
    }
  }, []);
  
  // Get User's IP Address
  useEffect(() => {
    fetch("https://api64.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIpAddress(data.ip))
      .catch((err) => console.error("Error fetching IP address:", err));
  }, []);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    let isValid = true;
  
    // Validate Email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }
  
    // Validate Password
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError("");
    }
  
    if (!isValid) return;
  
    setIsLoading(true);
  
    try {
      const response = await fetch("http://localhost:3000/api/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({           
          Email: email,
          Password: password,
          Location: location,
          IpAddress: ipAddress,
          AndroidId: androidId,
        })
      });
      const data = await response.json();
      console.log("Request Body:", JSON.stringify({           
        Email: email,
        Password: password,
        Location: location,
        IpAddress: ipAddress,
        AndroidId: androidId,
      }));
      
  
      if (response.ok) {
        toast({
          title: "Login successful",
          description: `You have been logged in successfully from ${ipAddress}.`,
        });
        
        // Check if data and tokens exist before storing
        if (data && data.session_token && data.refresh_token) {
          // Store both tokens consistently
          sessionStorage.setItem("session_token", data.session_token);
          sessionStorage.setItem("refresh_token", data.refresh_token);
                    
          // Navigate to dashboard
          navigate.push("/search_patient");
        } else {
          console.error("Missing token data in response:", data);
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "Authentication error: Invalid token data received.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: data.message || "Invalid credentials.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white text-blackdark:bg-black dark:text-white">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-2">
            <Hospital className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Hospital Portal</h1>
          <p className="text-muted-foreground">Sign in to access your hospital dashboard.</p>
        </div>

        <Card className="bg-white text-black dark:bg-black dark:text-white dark:border-white">
          <CardHeader>
            <CardTitle className="justify-center">{step === 1 ? "Login" : "Enter OTP"}</CardTitle>
            <CardDescription>{step === 1 ? "Enter your credentials to sign in" : "A 6-digit OTP has been sent to your email"}</CardDescription>
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
                  onBlur={() => {
                    if (!validateEmail(email)) {
                      setEmailError("Please enter a valid email address.");
                    } else {
                      setEmailError("");
                    }
                  }}
                  required
                  className="bg-white text-black"
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-muted-foreground">Password</label>
                  <Link href="/Login/reset-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value.length < 8) {
                      setPasswordError("Password must be at least 8 characters long.");
                    } else {
                      setPasswordError("");
                    }
                  }}
                  required
                  className="bg-white text-black"
                />
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              </div>

              {/* Display Location Info */}
              <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                {location ? (
                  <p>Logging in from: {location.Latitude}, {location.Longitude}</p>
                ) : (
                  <p>Fetching location...</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? "Logging In..." : "Login"}
                {!isLoading && <Lock className="ml-2 h-4 w-4" />}
              </button>
              <p className="text-center text-sm text-muted-foreground">
                Don`&apos`t have an account?{" "}
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