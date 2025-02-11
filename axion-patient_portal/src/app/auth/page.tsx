"use client";

import React, { useState } from "react";

import Image from "next/image";

import ValidatedInput from "@/app/components/validatedInput";
import {FormProvider} from "@/app/components/FormContext";

const Auth: React.FC = () => {
    const [isActive, setIsActive] = useState(false);

    const [signUpStep, setSignUpStep] = useState(1);

    const handleRegister = () => {
        setIsActive(true);
        setSignUpStep(1);
    };

    const handleLogin = () => setIsActive(false);

    const nextStep = () => setSignUpStep((prev) => Math.min(prev + 1, 4));
    const prevStep = () => setSignUpStep((prev) => Math.max(prev - 1, 1));

    const renderSignUpContent = () => {
        switch (signUpStep) {
            case 1:
                return (
                    <FormProvider>
                        <h1 className="text-2xl font-bold text-gray-500 mb-8">Create Account</h1>
                        <ValidatedInput name="firstName" type="text" placeholder="First Name" label="First Name" />
                        <ValidatedInput name="lastName" type="text" placeholder="Last Name" label="Last Name" />
                        <ValidatedInput name="email" type="email" placeholder="Email" label="Email" />
                        <button
                            className="bg-purple-600 text-white py-2 px-6 rounded-lg uppercase mt-4"
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
                        <ValidatedInput name="mobileNumber" type="text" placeholder="Mobile Number" label="Mobile Number" />
                        <ValidatedInput name="nic" type="text" placeholder="NIC" label="NIC" />
                        <ValidatedInput name="dateOfBirth" type="date" placeholder="Date of Birth" label="Date of Birth" />
                        <div className="flex space-x-4 mt-4">
                            <button className="bg-gray-500 text-white py-2 px-6 rounded-lg uppercase" onClick={prevStep}>
                                Back
                            </button>
                            <button className="bg-purple-600 text-white py-2 px-6 rounded-lg uppercase" onClick={nextStep}>
                                Next
                            </button>
                        </div>
                    </FormProvider>
                );
            case 3:
                return (
                    <FormProvider>
                        <h1 className="text-2xl font-bold text-gray-500 mb-8">Address Details</h1>
                        <ValidatedInput name="houseNumber" type="text" placeholder="House Number" label="House Number" />
                        <ValidatedInput name="street" type="text" placeholder="Street" label="Street" />
                        <ValidatedInput name="city" type="text" placeholder="City" label="City" />
                        <ValidatedInput name="district" type="text" placeholder="District" label="District" />
                        <div className="flex space-x-4 mt-4">
                            <button className="bg-gray-500 text-white py-2 px-6 rounded-lg uppercase" onClick={prevStep}>
                                Back
                            </button>
                            <button className="bg-purple-600 text-white py-2 px-6 rounded-lg uppercase" onClick={nextStep}>
                                Next
                            </button>
                        </div>
                    </FormProvider>
                );
            case 4:
                return (
                    <FormProvider>
                        <h1 className="text-2xl font-bold text-gray-500 mb-8">Set Password</h1>
                        <ValidatedInput name="password" type="password" placeholder="Password" label="Password" />
                        <ValidatedInput name="confirmPassword" type="password" placeholder="Confirm Password" label="Confirm Password" />
                        <div className="flex space-x-4 mt-4">
                            <button className="bg-gray-500 text-white py-2 px-6 rounded-lg uppercase" onClick={prevStep}>
                                Back
                            </button>
                            <button className="bg-purple-600 text-white py-2 px-6 rounded-lg uppercase" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </FormProvider>
                );
            default:
                return null;
        }
    };

    const handleSubmit = async () => {
        window.location.href = "/";
    };

    const getProgressWidth = (step: number) => {
        return step * 25;
    };

    const progressWidth = getProgressWidth(signUpStep);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-200 to-purple-300">
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
                    className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center transition-transform duration-700 ${isActive ? "translate-x-full opacity-100 z-10" : "opacity-0 z-0"}`}
                >
                    {renderSignUpContent()}
                </div>

                <div
                    className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center transition-transform duration-700 ${isActive ? "opacity-0 z-0" : "translate-x-0 opacity-100 z-10"}`}
                >
                    <FormProvider>
                        <h1 className="text-2xl font-bold text-gray-500 mb-8">Sign In</h1>
                        <ValidatedInput name="nic" type="text" placeholder="NIC" label="NIC" />
                        <ValidatedInput name="password" type="password" placeholder="Password" label="Password" />
                        <a href="#" className="text-sm text-blue-500 mb-4">Forget Your Password?</a>
                        <button className="bg-purple-600 text-white py-2 px-6 rounded-lg uppercase mt-4">
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

export default Auth;