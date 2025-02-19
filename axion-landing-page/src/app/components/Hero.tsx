"use client"

import React from "react";
import { Button } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-block animate-fade-in">
              <span className="px-3 py-1 text-sm font-medium bg-accent/10 text-accent rounded-full">
                Secure Healthcare Platform
              </span>
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 animate-fade-up">
              Your Health, One
              <br />
              <span className="text-primary">Vault</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Centralize and manage your medical records effortlessly while ensuring top-notch privacy and security. Access your health data anytime, anywhere.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Button size="lg" className="group">
                Register Now
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              {/* <Button size="lg" variant="bordered">
                Watch Demo
              </Button> */}
            </div>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
              alt="HealthVault Dashboard"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full bg-accent/10 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;