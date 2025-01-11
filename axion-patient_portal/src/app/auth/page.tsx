"use client";

import React, { useState } from "react";
import Image from "next/image";

const Auth: React.FC = () => {
    const [isActive, setIsActive] = useState(false);

    const [signUpStep, setSignUpStep] = useState(1);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        nic: "",
        dateOfBirth: "",
        houseNumber: "",
        street: "",
        city: "",
        district: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

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
                    <>
                        <h1 className="text-2xl font-bold text-gray-500 mb-8">Create Account</h1>
                        <div className="relative mb-3">
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="peer w-full mb-4 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-transparent"
                            />
                            <label
                                className="absolute py-2 left-4 text-gray-500 transform transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-focus:translate-y-[-30px] peer-focus:text-purple-600"
                                htmlFor="firstName"
                            >
                                First Name
                            </label>
                        </div>
                        <div className="relative mb-3">
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="peer w-full mb-4 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-transparent"
                            />
                            <label
                                className="absolute py-2 left-4 text-gray-500 transform transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-focus:translate-y-[-30px] peer-focus:text-purple-600"
                                htmlFor="lastName"
                            >
                                Last Name
                            </label>
                        </div>
                        <div className="relative mb-3">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="peer w-full mb-4 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-transparent"
                            />
                            <label
                                className="absolute py-2 left-4 text-gray-500 transform transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-focus:translate-y-[-30px] peer-focus:text-purple-600"
                                htmlFor="email"
                            >
                                Email
                            </label>
                        </div>
                        <button
                            className="bg-purple-600 text-white py-2 px-6 rounded-lg uppercase mt-4"
                            onClick={nextStep}
                        >
                            Next
                        </button>
                    </>
                );
            case 2:
                return (
                    <>
                        <h1 className="text-2xl font-bold text-gray-500 mb-8">Additional Information</h1>
                        <div className="relative mb-3">
                            <input
                                type="text"
                                name="mobileNumber"
                                id="mobileNumber"
                                placeholder="Mobile Number"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                className="peer w-full mb-4 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-transparent"
                            />
                            <label
                                className="absolute py-2 left-4 text-gray-500 transform transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-focus:translate-y-[-30px] peer-focus:text-purple-600"
                                htmlFor="mobileNumber"
                            >
                                Mobile Number
                            </label>
                        </div>
                        <div className="relative mb-3">
                            <input
                                type="text"
                                name="nic"
                                id="nic"
                                placeholder="NIC"
                                value={formData.nic}
                                onChange={handleChange}
                                className="peer w-full mb-4 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-transparent"
                            />
                            <label
                                className="absolute py-2 left-4 text-gray-500 transform transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-focus:translate-y-[-30px] peer-focus:text-purple-600"
                                htmlFor="nic"
                            >
                                NIC
                            </label>
                        </div>
                        <div className="relative mb-3">
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="peer max-w-full mb-4 px-4 py-3 bg-gray-100 rounded-lg border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-transparent"
                            />
                            <label
                                className="absolute left-4 text-gray-500 transform transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-focus:translate-y-[-25px] peer-focus:text-purple-600"
                                htmlFor="dateOfBirth"
                            >
                                Date of Birth
                            </label>
                        </div>
                        <div className="flex space-x-4 mt-4">
                            <button
                                className="bg-gray-500 text-white py-2 px-6 rounded-lg uppercase"
                                onClick={prevStep}
                            >
                                Back
                            </button>
                            <button
                                className="bg-purple-600 text-white py-2 px-6 rounded-lg uppercase"
                                onClick={nextStep}
                            >
                                Next
                            </button>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <h1 className="text-2xl font-bold text-gray-500 mb-5">Address Details</h1>
                        <div className="relative mb-3">
                            <input
                                type="text"
                                name="houseNumber"
                                id="houseNumber"
                                placeholder="House Number"
                                value={formData.houseNumber}
                                onChange={handleChange}
                                className="peer w-full mb-4 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-transparent"
                            />
                            <label
                                className="absolute py-2 left-4 text-gray-500 transform transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-focus:translate-y-[-30px] peer-focus:text-purple-600"
                                htmlFor="houseNumber"
                            >
                                House Number
                            </label>
                        </div>
                        <div className="relative mb-3">
                            <input
                                type="text"
                                name="street"
                                id="street"
                                placeholder="Street"
                                value={formData.street}
                                onChange={handleChange}
                                className="peer w-full mb-4 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-transparent"
                            />
                            <label
                                className="absolute py-2 left-4 text-gray-500 transform transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-focus:translate-y-[-30px] peer-focus:text-purple-600"
                                htmlFor="street"
                            >
                                Street
                            </label>
                        </div>
                        <div className="relative mb-3">
                            <input
                                type="text"
                                name="city"
                                id="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                className="peer w-full mb-4 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-transparent"
                            />
                            <label
                                className="absolute py-2 left-4 text-gray-500 transform transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-focus:translate-y-[-30px] peer-focus:text-purple-600"
                                htmlFor="city"
                            >
                                City
                            </label>
                        </div>
                        <div className="relative mb-3">
                            <input
                                type="text"
                                name="district"
                                id="district"
                                placeholder="District"
                                value={formData.district}
                                onChange={handleChange}
                                className="peer w-full mb-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-transparent"
                            />
                            <label
                                className="absolute py-2 left-4 text-gray-500 transform transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-focus:translate-y-[-30px] peer-focus:text-purple-600"
                                htmlFor="district"
                            >
                                District
                            </label>
                        </div>
                        <div className="flex space-x-4 mt-4">
                            <button
                                className="bg-gray-500 text-white py-2 px-6 rounded-lg uppercase"
                                onClick={prevStep}
                            >
                                Back
                            </button>
                            <button
                                className="bg-purple-600 text-white py-2 px-6 rounded-lg uppercase"
                                onClick={nextStep}
                            >
                                Next
                            </button>
                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                        <h1 className="text-2xl font-bold text-gray-500 mb-8">Set Password</h1>
                        <div className="relative mb-3">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="peer w-full mb-4 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-transparent"
                            />
                            <label
                                className="absolute py-2 left-4 text-gray-500 transform transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-focus:translate-y-[-30px] peer-focus:text-purple-600"
                                htmlFor="password"
                            >
                                Password
                            </label>
                        </div>
                        <div className="relative mb-3">
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="peer w-full mb-4 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-transparent"
                            />
                            <label
                                className="absolute py-2 left-4 text-gray-500 transform transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-focus:translate-y-[-30px] peer-focus:text-purple-600"
                                htmlFor="confirmPassword"
                            >
                                Confirm Password
                            </label>
                        </div>
                        <div className="flex space-x-4 mt-4">
                            <button
                                className="bg-gray-500 text-white py-2 px-6 rounded-lg uppercase"
                                onClick={prevStep}
                            >
                                Back
                            </button>
                            <button className="bg-purple-600 text-white py-2 px-6 rounded-lg uppercase">
                                Submit
                            </button>
                        </div>
                    </>
                );
            default:
                return null;
        }
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
                    <h1 className="text-2xl font-bold text-gray-500 mb-8">Sign In</h1>
                    <div className="relative mb-3">
                        <input
                            type="text"
                            name="nicNumber"
                            id="nicNumber"
                            placeholder="NIC Number"
                            value={formData.nic}
                            onChange={handleChange}
                            className="peer w-full mb-4 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-transparent"
                        />
                        <label
                            className="absolute py-2 left-4 text-gray-500 transform transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-focus:translate-y-[-30px] peer-focus:text-purple-600"
                            htmlFor="nicNumber"
                        >
                            NIC Number
                        </label>
                    </div>

                    <div className="relative mb-3">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="peer w-full mb-4 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-transparent"
                        />
                        <label
                            className="absolute py-2 left-4 text-gray-500 transform transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-focus:translate-y-[-30px] peer-focus:text-purple-600"
                            htmlFor="password"
                        >
                            Password
                        </label>
                    </div>
                    <a href="#" className="text-sm text-blue-500 mb-4">
                        Forget Your Password?
                    </a>
                    <button className="bg-purple-600 text-white py-2 px-6 rounded-lg uppercase mt-4">
                        Sign In
                    </button>
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
