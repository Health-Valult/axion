"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@nextui-org/react"; // Changed from NextUI to match first file
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Lock as LockIcon, ShieldCheck, Mail, Key } from "lucide-react";
//import { Button } from "@/components/ui/button"; // Added Button import to match first file

const ResetPassword = () => {
  const router = useRouter(); // Changed variable name to match convention
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [uuid, setUuid] = useState("");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });
  const [token, setToken] = useState<string | null>(null); // Added token state to match first file

  useEffect(() => {
    // Get token from session storage like in first file
    const sessionToken = sessionStorage.getItem("session_token");
    setToken(sessionToken);
    
    if (typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined') {
      // Get email from profile data in session storage
      const profileData = sessionStorage.getItem("profileData");
      if (profileData) {
        try {
          const parsedData = JSON.parse(profileData);
          if (parsedData.email) {
            setEmail(parsedData.email);
          }
        } catch (error) {
          console.error("Error parsing profile data:", error);
          toast({
            title: "Error",
            description: "Could not retrieve profile data.",
            variant: "destructive"
          });
        }
      }
    }
  }, [toast]);

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  

  // Function to send OTP
  const sendOtp = async () => {
    if (!email) {
      toast({ title: "Error", description: "No email found in profile!", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const uuidGenerated = crypto.randomUUID(); // Generate unique ID
      setUuid(uuidGenerated);

      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "" // Added authorization header
        },
        body: JSON.stringify({ tempID: uuidGenerated, type: "email", data: email }),
      });

      if (response.ok) {
        toast({ title: "OTP Sent", description: `A 6-digit OTP has been sent to ${email}.` });
        setStep(2); // Move to OTP verification step
      } else {
        const errorData = await response.json();
        toast({ 
          title: "Error", 
          description: errorData.message || "Failed to send OTP. Try again later.", 
          variant: "destructive" 
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast({ title: "Error", description: "Something went wrong!", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "" // Added authorization header
        },
        body: JSON.stringify({ tempID: uuid, otp }),
      });

      if (response.ok) {
        toast({ title: "OTP Verified", description: "You can now reset your password." });
        setStep(3); // Move to password reset step
      } else {
        const errorData = await response.json();
        toast({ 
          title: "Invalid OTP", 
          description: errorData.message || "Please enter the correct OTP.", 
          variant: "destructive" 
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({ title: "Error", description: "OTP verification failed!", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to reset password - modified to match first file's approach
  const resetPassword = async () => {
    if (passwords.newPassword.length < 8) {
      toast({ title: "Error", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }

    // Validate Email
    if (!validateEmail(email)) {
      toast({ title: "Error", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    

    setIsLoading(true);
    try {
      // Use the same endpoint as in the first file
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "" // Added token from session
        },
        body: JSON.stringify({ 
          Old: "",  // Changed to match API expectations in first file
          New: passwords.newPassword 
        }),
      });

      if (response.ok) {
        toast({ title: "Success", description: "Your password has been reset. You can now log in." });
        router.push("/Login"); // Redirect to login
      } else {
        const errorData = await response.json();
        console.log(errorData);
        toast({ 
          title: "Error", 
          description: errorData.message || "Failed to reset password.", 
          variant: "destructive" 
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast({ title: "Error", description: "Something went wrong!", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 py-12 bg-white text-black dark:bg-black dark:text-white">
      <div className="w-full max-w-md space-y-6">
        <Card className="dark:bg-black dark:text-white">
          <CardHeader>
            <CardTitle>{step === 1 ? "Reset Password" : step === 2 ? "Verify OTP" : "Set New Password"}</CardTitle>
            <CardDescription>
              {step === 1 && "We will send an OTP to your registered email."}
              {step === 2 && "Enter the OTP received in your email."}
              {step === 3 && "Create a new password for your account."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1: Send OTP */}
            {step === 1 && (
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
                      toast({ title: "Error", description: "Please enter a valid email address.", variant: "destructive" });
                    }
                  }}
                  required
                  className="bg-white text-black"
                />
              </div>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <div className="space-y-2">
                <label>Enter OTP *</label>
                <Input 
                  id="otp" 
                  name="otp" 
                  type="text" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  required 
                />
              </div>
            )}

            {/* Step 3: Reset Password */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label>New Password *</label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    value={passwords.newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label>Confirm New Password *</label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    value={passwords.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step === 1 && (
              <button
                className="btn-primary" // Added proper styling to match first file
                onClick={sendOtp}
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"} <Mail className="ml-2 h-4 w-4" />
              </button>
            )}

            {step === 2 && (
              <button
                className="btn-primary" // Added proper styling
                onClick={verifyOtp}
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify OTP"} <ShieldCheck className="ml-2 h-4 w-4" />
              </button>
            )}

            {step === 3 && (
              <button
                className="btn-primary" // Added proper styling
                onClick={resetPassword}
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"} <Key className="ml-2 h-4 w-4" />
              </button>
            )}
            
            {/* Added cancel button to match first file UX */}
            <button
              className="btn-primary"
              onClick={() => router.push('/profile')}
            >
              Cancel
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;