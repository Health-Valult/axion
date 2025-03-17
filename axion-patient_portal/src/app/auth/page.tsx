"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FormProvider } from "@/app/components/FormContext";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import toast, {Toaster} from "react-hot-toast";
// import { randomUUID } from 'crypto';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobileNumber: string;
    nic: string;
    dateOfBirth: string;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    mobileNumber?: string;
    nic?: string;
    dateOfBirth?: string;
}

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginFormErrors {
    email?: string;
    password?: string;
}

const Auth: React.FC = () => {
    // const uuid = randomUUID();
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState("");
    const [signUpStep, setSignUpStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobileNumber: "",
        nic: "",
        dateOfBirth: "",
    });
    const [loginFormData, setLoginFormData] = useState<LoginFormData>({
        password: "",
        email: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loginErrors, setLoginErrors] = useState<LoginFormErrors>({});

    const handleRegister = () => setIsActive(true);
    const handleLogin = () => setIsActive(false);

    const validateLogin = (loginFormData: LoginFormData): LoginFormErrors => {
        const errors: LoginFormErrors = {};

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!loginFormData.email.trim()) {
            errors.email = "Email is required.";
        } else if (!emailPattern.test(loginFormData.email)) {
            errors.email = "Please enter a valid email.";
        }

        if (!loginFormData.password.trim()) {
            errors.password = "Password is required.";
        } else if (loginFormData.password.length < 6) {
            errors.password = "Password must be at least 6 characters long.";
        }

        return errors;
    }

    const validateStep1 = (formData: FormData): FormErrors => {
        const errors: FormErrors = {};

        if (!formData.firstName.trim()) {
            errors.firstName = "First Name is required.";
        }

        if (!formData.lastName.trim()) {
            errors.lastName = "Last Name is required.";
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email.trim()) {
            errors.email = "Email is required.";
        } else if (!emailPattern.test(formData.email)) {
            errors.email = "Please enter a valid email.";
        }

        if (!formData.password.trim()) {
            errors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters long.";
        }

        return errors;
    };

    const validateStep2 = (formData: FormData): FormErrors => {
        const errors: FormErrors = {};
        const mobilePattern = /^[0-9]{10}$/;
        if (!formData.mobileNumber.trim()) {
            errors.mobileNumber = "Mobile Number is required.";
        } else if (!mobilePattern.test(formData.mobileNumber)) {
            errors.mobileNumber = "Please enter a valid mobile number.";
        }

        const nicPattern = /^(?:\d{9}[xv]|\d{12})$/i;
        if (!formData.nic.trim()) {
            errors.nic = "NIC is required.";
        } else if (!nicPattern.test(formData.nic)) {
            errors.nic = "Please enter a valid NIC (9 digits ending with x/v or 12 digits).";
        }

        const currentDate = new Date();
        const birthDate = new Date(formData.dateOfBirth);
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        const month = currentDate.getMonth() - birthDate.getMonth();
        const maxAge = 100;

        if (!formData.dateOfBirth.trim()) {
            errors.dateOfBirth = "Date of Birth is required.";
        } else if (birthDate > currentDate) {
            errors.dateOfBirth = "Date of Birth cannot be in the future.";
        } else if (age > maxAge || (age === maxAge && month >= 0)) {
            errors.dateOfBirth = "Date of Birth must be within the last 100 years.";
        }

        return errors;
    };

    const login = () => {
        const validationErrors = validateLogin(loginFormData);
        if (Object.keys(validationErrors).length === 0) {
            loginUser(loginFormData.email, loginFormData.password);
        } else {
            setLoginErrors(validationErrors);
        }
    }

    const nextStep = () => {
        if (signUpStep === 1) {
            const validationErrors = validateStep1(formData);
            if (Object.keys(validationErrors).length === 0) {
                setSignUpStep((prev) => Math.min(prev + 1, 3)); // Move to Step 2
            } else {
                setErrors(validationErrors);
            }
        } else if (signUpStep === 2) {
            const validationErrors = validateStep2(formData);
            if (Object.keys(validationErrors).length === 0) {
                setSignUpStep((prev) => Math.min(prev + 1, 3)); // Move to Step 3
            } else {
                setErrors(validationErrors);
            }
        }
    };
    const prevStep = () => setSignUpStep((prev) => Math.max(prev - 1, 1));

    const renderSignUpContent = () => {
        switch (signUpStep) {
            case 1:
                return (
                    <FormProvider>
                        <h1 className="text-2xl font-bold text-gray-500 mb-5">Create Account</h1>
                        {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
                        <Input
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            className={`w-64 ${errors.firstName ? 'border-red-500' : 'border-gray-300'} mb-4 relative`}
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />

                        {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
                        <Input
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            className={`w-64 ${errors.lastName ? 'border-red-500' : 'border-gray-300'} mb-4 relative`}
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />

                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                        <Input
                            name="email"
                            type="email"
                            placeholder="Email"
                            className={`w-64 ${errors.email ? 'border-red-500' : 'border-gray-300'} mb-4 relative`}
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className={`w-64 ${errors.password ? 'border-red-500' : 'border-gray-300'} mb-4 relative`}
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                            className="bg-purple-600 text-white py-2 px-6 rounded-lg uppercase"
                            onClick={nextStep}
                        >
                            Next
                        </button>
                    </FormProvider>
                );
            case 2:
                return (
                    <FormProvider>
                        <h1 className="text-2xl font-bold text-gray-500 mb-8">Additional Information</h1>
                        {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}
                        <Input
                            name="mobileNumber"
                            type="text"
                            placeholder="Mobile Number"
                            className={`w-64 ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'} mb-4 relative`}
                            required
                            value={formData.mobileNumber}
                            onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                        />

                        {errors.nic && <p className="text-red-500 text-sm">{errors.nic}</p>}
                        <Input
                            name="nic"
                            type="text"
                            placeholder="NIC"
                            className={`w-64 ${errors.nic ? 'border-red-500' : 'border-gray-300'} mb-4 relative`}
                            required
                            value={formData.nic}
                            onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                        />

                        <p className="text-gray-500 text-left">Date of Birth</p>
                        {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
                        <Input
                            name="dateOfBirth"
                            type="date"
                            placeholder="Date of Birth"
                            className={`w-64 ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} mb-4 relative`}
                            required
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        />

                        <div className="flex space-x-4 mt-4">
                            <button className="bg-gray-500 text-white py-2 px-6 rounded-lg uppercase" onClick={prevStep}>
                                Back
                            </button>
                            <button className="bg-purple-600 text-white py-2 px-6 rounded-lg uppercase" onClick={async () => await registerUser(formData)}>
                                Register
                            </button>
                        </div>
                    </FormProvider>
                );
            case 3:
                return (
                    <FormProvider>
                        <h1 className="text-2xl font-bold text-gray-500 mb-8">OTP Verification</h1>
                        <InputOTP maxLength={6} value={value} onChange={value => setValue(value)} >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <div className="flex space-x-4 mt-4">
                            <button className="bg-purple-600 text-white py-2 px-6 rounded-lg uppercase" onClick={() => verifyOTP}>
                                Verify
                            </button>
                        </div>
                    </FormProvider>
                );
            default:
                return null;
        }
    };

    const getProgressWidth = (step: number) => {
        return step * 33.33;
    };

    const progressWidth = getProgressWidth(signUpStep);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-200 to-purple-300">
            <div><Toaster/></div>
            <div className="mt-3 mb-3">
                <Image
                    src="/logo-with-text-black.png"
                    alt="Logo"
                    width={128}
                    height={128}
                />
            </div>

            <div
                className={`relative bg-white rounded-lg shadow-xl w-[768px] max-w-full h-[600px] overflow-hidden transition-all duration-700 mb-5 ${isActive ? "active" : ""}`}
            >
                {isActive && (
                    <div className="absolute top-0 left-1/2 w-1/2 bg-gray-200">
                        <div
                            className="h-2 bg-purple-600 transition-all duration-700"
                            style={{ width: `${progressWidth}%` }}
                        ></div>
                    </div>
                )}

                <div
                    className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center transition-transform duration-700 ${isActive ? "translate-x-full opacity-100 z-10" : "translate-x-0 opacity-0 z-0"}`}
                >
                    {renderSignUpContent()}
                </div>

                <div
                    className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center transition-transform duration-700 ${isActive ? "translate-x-[-100%] opacity-0 z-0" : "translate-x-0 opacity-100 z-10"}`}
                >
                    <FormProvider>
                        <h1 className="text-2xl font-bold text-gray-500 mb-8">Sign In</h1>
                        {loginErrors.email && <p className="text-red-500 text-sm">{loginErrors.email}</p>}
                        <Input
                            name="Email"
                            type="text"
                            placeholder="Email"
                            className={`w-64 ${loginErrors.email ? 'border-red-500' : 'border-gray-300'} mb-4 relative`}
                            required
                            value={loginFormData.email}
                            onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })}
                        />
                        {loginErrors.password && <span className="text-red-500 text-sm">{loginErrors.password}</span>}
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className={`w-64 ${loginErrors.password ? 'border-red-500' : 'border-gray-300'} mb-4 relative`}
                            required
                            value={loginFormData.password}
                            onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
                        />
                        <a href="#" className="text-sm text-blue-500 mb-4">Forget Your Password?</a>
                        <button className="bg-purple-600 text-white py-2 px-6 rounded-lg uppercase mt-4" onClick={() =>  login()}>
                            Sign In
                        </button>
                    </FormProvider>
                </div>

                <div
                    className={`absolute top-0 left-1/2 w-1/2 h-full bg-purple-600 text-white flex flex-col justify-center items-center transition-transform duration-700 ${isActive ? "translate-x-[-100%]" : ""}`}
                >
                    <div className="text-center px-6">
                        <h1 className="text-2xl font-bold mb-4">
                            {isActive ? "Welcome Back!" : "Hello There!"}
                        </h1>
                        <p className="text-sm mb-6">
                            {isActive
                                ? "Enter your details to access the site."
                                : "Register with your personal details to safely access your medical records."}
                        </p>
                        <button
                            className="bg-white text-purple-600 py-2 px-6 rounded-lg uppercase"
                            onClick={isActive ? handleLogin : handleRegister}
                        >
                            {isActive ? "Sign In" : "Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const registerUser = async (formData: FormData) => {
    try {
        const response = await fetch(`/api/signup-proxy`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "NIC": formData.nic,
                    "FirstName": formData.firstName,
                    "LastName": formData.lastName,
                    "Email": formData.email,
                    "Telephone": formData.mobileNumber,
                    "DateOfBirth":formData.dateOfBirth ,
                    "Password": formData.password
                }
            ),
        });

        if (!response.ok) {
            const errorData = await response.json();
            toast.error("Something went wrong during registration");
            throw new Error(errorData.message || "Something went wrong during registration.");
        }

        // Handle the successful registration response
        const data = await response.json();
        toast.success("Successfully Registered!");
        return data;

    } catch (error) {
        console.error("Error during registration:", error);
        toast.error("Registration failed");
    }
};

const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch(`api/login-proxy`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                Email: email,
                Password: password,
                Location: {
                    Latitude: 12.3456,
                    Longitude: 78.9012
                },
                IpAddress: "192.168.1.1",
                AndroidId: "unique_device_id"
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Error: ${response.status} - ${errorData}`);
        }

        const data = await response.json();
        toast.success("Login successful!");

        if (data) {
            const { session_token, refresh_token } = data;
            sessionStorage.setItem("session_token", session_token);
            sessionStorage.setItem("refresh_token", refresh_token);

            // document.cookie = `session_token=${session_token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`;
            // document.cookie = `refresh_token=${refresh_token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=2592000`;

            window.location.href = "/";
        } else {
            console.error("No data in response.");
            toast.error("Login failed!");
        }

    } catch (error) {
        console.error("Error during login:", error);
        toast.error("Login failed!");
    }
};

async function verifyOTP(otp: number, token: string) {
    try {
        const response = await fetch(`https://axiontestgateway.azure-api.net/axion/auth/verify/otp`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp }),
        });

        if (response.ok) {
            const data = await response.json();
            toast.success("OTP verified!");
            console.log('OTP verified:', data.msg);
        } else {
            const errorData = await response.json();
            toast.error("OTP verification failed!");
            console.error('OTP verification failed:', errorData.msg);
        }
    } catch (error) {
        toast.error("Error during OTP verification!");
        console.error('Error during OTP verification:', error);
    }
}

export default Auth;
