"use client"

import React from "react";
import { ShieldCheck, Lock, History, Key } from "lucide-react";

const Security = () => {
  const securityFeatures = [
    {
      icon: ShieldCheck,
      title: "HIPAA Compliant",
      description: "Meets all healthcare data protection standards",
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Your data is encrypted at rest and in transit",
    },
    {
      icon: History,
      title: "Audit Logs",
      description: "Track all access to your medical records",
    },
    {
      icon: Key,
      title: "Multi-Factor Authentication",
      description: "Extra layer of security for your account",
    },
  ];

  return (
    <section className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Security & Compliance</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your health data is protected by industry-leading security measures
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 p-8 bg-white rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise-Grade Security</h3>
              <p className="text-gray-600 max-w-xl">
                Your health data is encrypted, secure, and accessible only to you and authorized professionals.
                We comply with HIPAA, GDPR, and HL7 standards.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&q=80"
              alt="Security illustration"
              className="rounded-lg shadow-md w-full md:w-64 h-48 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export {Security};