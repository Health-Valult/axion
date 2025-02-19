"use client"

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { MessageSquareQuote } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "HealthVault has revolutionized how I manage my patients' records. The interface is intuitive and the security features are top-notch.",
      author: "Dr. Sarah Johnson",
      role: "Cardiologist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80",
    },
    {
      quote: "Since using HealthVault, managing my chronic condition has never been easier. I love having all my medical records in one secure place.",
      author: "Michael Chen",
      role: "Patient",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    },
    {
      quote: "The medication reminders and health insights have helped me stay on top of my treatment plan. Highly recommended!",
      author: "Emily Rodriguez",
      role: "Patient",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by healthcare professionals and patients alike
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 p-4">
            <CardHeader className="pb-2"> {/* Reduced padding at bottom */}
              <div className="flex items-center gap-3"> {/* Reduced gap */}
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-2"> {/* Reduced top padding */}
              <div className="relative flex items-start">
                <MessageSquareQuote className="h-5 w-5 text-primary/20 absolute left-0 top-1" />
                <p className="text-gray-600 pl-8">{testimonial.quote}</p> {/* Adjusted padding */}
              </div>
            </CardBody>
          </Card>
          
          ))}
        </div>
      </div>
    </section>
  );
};