"use client"
import { Database, UserCircle, Upload, Lock, Bell, BarChart3 } from "lucide-react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export const Feature = () => {
  const features = [
    {
      icon: Database,
      title: "Centralized Medical Records",
      description: "Access all your health data in one secure place, anytime, anywhere.",
    },
    {
      icon: UserCircle,
      title: "Doctor & Patient Dashboard",
      description: "Real-time access and updates for healthcare providers and patients.",
    },
    {
      icon: Upload,
      title: "Easy Record Management",
      description: "Seamlessly upload and view medical records with just a few clicks.",
    },
    {
      icon: Lock,
      title: "Data Privacy & Security",
      description: "HIPAA, GDPR, and HL7 compliant with top-tier encryption.",
    },
    {
      icon: Bell,
      title: "Medication Reminders",
      description: "Never miss a dose with smart medication reminders.",
    },
    {
      icon: BarChart3,
      title: "Health Insights",
      description: "Visualize your health trends with intuitive charts and analytics.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage your health journey in one secure platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex items-center gap-x-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </CardHeader>
              <CardBody>
                <p className="text-gray-600">{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
