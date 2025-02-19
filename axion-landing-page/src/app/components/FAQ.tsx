'use client'
import { useState } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
      {
        question: "How secure is my data?",
        answer:
          "Your data is protected by enterprise-grade security measures including end-to-end encryption, HIPAA compliance, and multi-factor authentication. We follow strict protocols to ensure your medical information remains private and secure.",
      },
      {
        question: "Can I access my records offline?",
        answer:
          "Yes, you can download your records for offline access. The mobile app also maintains a cached version of your recent records, which you can access without an internet connection.",
      },
      {
        question: "How do I share my records with my doctor?",
        answer:
          "You can easily share your records with healthcare providers through our secure sharing feature. Simply enter your doctor's email or NIC ID, set permissions, and they'll receive secure access to your shared records.",
      },
      {
        question: "What types of medical records can I store?",
        answer:
          "AxionHealth supports all common medical record formats including lab results, imaging reports, prescriptions, clinical notes, vaccination records, and more. You can upload documents in PDF, JPEG, and other standard formats.",
      },
      {
        question: "Is there a limit to how much I can store?",
        answer:
          "Free accounts include 1GB of storage. Premium accounts have unlimited storage, perfect for storing comprehensive medical histories including high-resolution imaging files.",
      },
    ];

    const toggleAccordion = (index: number) => {
      setOpenIndex(openIndex === index ? null : index); // Toggle open/close
    };

    return (
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about HealthVault
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="w-full">
              {faqs.map((faq, index) => (
                <div key={index} className="mb-4">
                  <button
                    className="w-full text-left py-3 px-4 bg-gray-100 rounded-md"
                    onClick={() => toggleAccordion(index)}
                  >
                    {faq.question}
                  </button>
                  {openIndex === index && (
                    <div className="mt-2 p-4 bg-gray-50 rounded-md">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
};
export {FAQ};