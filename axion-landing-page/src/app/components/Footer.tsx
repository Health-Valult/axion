"use client";
import React from 'react';
import { Instagram, Linkedin, Github, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AxionHealth</h3>
            <p className="text-gray-600">
              Transforming healthcare management through innovative technology solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-3">
              <a href="tel:+1234567890" className="flex items-center text-gray-600 hover:text-primary transition-colors no-underline">
                <Phone size={20} className="mr-2" />
                +94 76 567-890
              </a>
              <a href="mailto:contact@healthconnect.com" className="flex items-center text-gray-600 hover:text-primary transition-colors no-underline">
                <Mail size={20} className="mr-2" />
                axionhealth@gmail.com
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors no-underline">
                <Instagram size={20} className="text-gray-600" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors no-underline">
                <Linkedin size={20} className="text-gray-600" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors no-underline">
                <Github size={20} className="text-gray-600" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors no-underline">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors no-underline">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} AxionHealth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
