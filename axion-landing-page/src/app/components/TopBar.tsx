"use client"

import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import LanguageDropdown from "../elements/LanguageDropdown";
import { Menu, X } from "lucide-react";

const Logo = ({ width, height }: { width: number; height: number }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 340 341" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_653_1478)">
        <path d="M206.607 203.756C219.139 191.225 239.457 191.225 251.988 203.756L314.087 265.855C326.618 278.386 326.618 298.704 314.087 311.236C301.555 323.767 281.237 323.767 268.706 311.236L206.607 249.137C194.076 236.606 194.076 216.288 206.607 203.756Z" fill="url(#paint0_linear_653_1478)"/>
        <rect x="110.521" y="153.051" width="151.999" height="64.1782" rx="32.0891" transform="rotate(-135 110.521 153.051)" fill="url(#paint1_linear_653_1478)"/>
        <rect x="124.524" y="167.094" width="236.307" height="64.1782" rx="32.0891" transform="rotate(-45 124.524 167.094)" fill="url(#paint2_linear_653_1478)"/>
        <rect x="3" y="288.619" width="151.999" height="64.1782" rx="32.0891" transform="rotate(-45 3 288.619)" fill="url(#paint3_linear_653_1478)"/>
      </g>
      <defs>
        <filter id="filter0_d_653_1478" x="0.191992" y="1.19199" width="339.616" height="339.616" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="8.05"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_653_1478"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_653_1478" result="shape"/>
        </filter>
        <linearGradient id="paint0_linear_653_1478" x1="283.037" y1="234.806" x2="237.657" y2="280.186" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D74B76"/>
          <stop offset="1" stopColor="#C81A55"/>
        </linearGradient>
        <linearGradient id="paint1_linear_653_1478" x1="186.253" y1="217.23" x2="186.789" y2="153.051" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EE6158"/>
          <stop offset="1" stopColor="#C44545"/>
        </linearGradient>
        <linearGradient id="paint2_linear_653_1478" x1="124.524" y1="199.183" x2="360.831" y2="199.183" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CC1A3E"/>
          <stop offset="1" stopColor="#F7B251"/>
        </linearGradient>
        <linearGradient id="paint3_linear_653_1478" x1="154.999" y1="320.321" x2="3" y2="321.095" gradientUnits="userSpaceOnUse">
          <stop stopColor="#552265"/>
          <stop offset="1" stopColor="#400C4C"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Logo width={32} height={32} />
            <span className="text-1xl font-bold text-primary text-black">AXION</span>
          </div>

          {/* Desktop Navigation */}
          <Navbar className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</Link>
            <Link href="#stakeholders" className="text-gray-600 hover:text-primary transition-colors">Stakeholders</Link>
            <Link href="#contact" className="text-gray-600 hover:text-primary transition-colors">Contact</Link>
            <NavbarContent className="hidden sm:flex gap-4" justify="end">
              <NavbarItem isActive>
                <LanguageDropdown />
              </NavbarItem>
            </NavbarContent>
          </Navbar>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link href="#features" className="block text-gray-600 hover:text-primary transition-colors">Features</Link>
            <Link href="#stakeholders" className="block text-gray-600 hover:text-primary transition-colors">Stakeholders</Link>
            <Link href="#contact" className="block text-gray-600 hover:text-primary transition-colors">Contact</Link>
            <NavbarContent className="flex gap-4" justify="start">
              <NavbarItem isActive>
                <LanguageDropdown />
              </NavbarItem>
            </NavbarContent>
          </div>
        </div>
      )}
    </header>
  );
};

export {TopBar};
export default Logo;

      /**<NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarItem isActive>
        <LanguageDropdown />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}**/
