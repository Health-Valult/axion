"use client"

import React from 'react'
import {
    Link,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
  } from "@nextui-org/react";

  export const AxionLogo = ({width, height}: {width: number, height: number}) => {
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


  export default function NavBar() {
    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                <div className="flex items-center justify-start rtl:justify-end">
                    <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                        <span className="sr-only">Open sidebar</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>
                    <Link href="/dashboard" className="flex ms-2 md:me-24">
                    <AxionLogo width={32} height={32}  />
                    <span className="self-center ml-2 text-xl font-semibold sm:text-2xl whitespace-nowrap ">axion</span>
                    </Link>
                </div>
                <div>
                    <form className="flex items-center max-w-64 mx-auto">   
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-heart" viewBox="0 0 16 16">
                                <path d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z"/>
                            </svg>
                            </div>
                            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 " placeholder="Search Patient ID." required />
                        </div>
                        <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </form>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center ms-3">
                        <div className="flex items-center gap-4">
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
                                />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">Dr. Steven James</p>
                                </DropdownItem>
                                <DropdownItem key="settings">My Settings</DropdownItem>
                                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                                <DropdownItem key="analytics">Analytics</DropdownItem>
                                <DropdownItem key="system">System</DropdownItem>
                                <DropdownItem key="configurations">Configurations</DropdownItem>
                                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </nav>
    );
  }
