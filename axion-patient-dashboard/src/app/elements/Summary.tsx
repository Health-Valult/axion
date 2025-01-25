"use client"

import Link from 'next/link';
import React from 'react'

const Summary: React.FC = () => {
  return (
    <div>
        <ul className="w-80 text-md font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
            <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg ">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person mb-2" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
              </svg>
              <p className="mb-3 font-normal">Tom Parker</p>
              <p className="mb-3 font-normal">26</p>
              <p className="mb-3 font-normal">M</p>
            </li>

            <li className="w-full px-4 py-2 border-b border-gray-200">
              <h5>Chief Complaint</h5>
              <p className="mb-3 font-normal">Chest pain for 3 days</p>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              <h5>HPI</h5>
              <p className="mb-3 font-normal">Sudden onset, worsens with exertion, relieved with rest</p>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              <h5>PMH</h5>
              <p className="mb-3 font-normal">Hypertension, Type 2 Diabetes, Hyperlipidemia</p>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              <h5>PSH</h5>
              <p className="mb-3 font-normal">CABG (2018)</p>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              <h5>Medications</h5>
              <p className="mb-3 font-normal">Metformin 500mg BID, Lisinopril 10mg daily, Atorvastatin 40mg</p>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              <h5>Allergies</h5>
              <p className="mb-3 font-normal">Penicillin (rash)</p>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              <h5>FHx</h5>
              <p className="mb-3 font-normal"> Father had heart disease, Mother had Type 2 Diabetes</p>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              <h5>SHx</h5>
              <p className="mb-3 font-normal"> Smoker (1 pack/day), occasional alcohol, sedentary lifestyle</p>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              <h5>Vitals</h5>
              <p className="mb-3 font-normal">BP: 145/90, HR: 88, BMI: 28</p>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              <h5>Recent Labs</h5>
              <p className="mb-3 font-normal">HbA1c: 7.2%, LDL: 130 mg/dL</p>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              <h5>Immunizations</h5>
              <p className="mb-3 font-normal">Flu vaccine up to date, COVID-19 booster pending</p>
            </li>
            <li className="w-full px-4 py-2 border-b border-gray-200">
              <h5>ROS</h5>
              <p className="mb-3 font-normal">Reports mild dizziness, denies fever, cough, or swelling</p>
            </li>
        </ul>
    </div>
  )
}

export default Summary;