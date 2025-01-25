"use client"

import React from 'react'
import {Calendar} from "@heroui/react";
import {today, getLocalTimeZone} from "@internationalized/date";
import WeightChart from '../elements/WeightChart';
import BloodPressureChart from '../elements/BloodPressureChart';
import { CholesterolChart } from '../elements/LipidProfileChart';
import { BloodSugarChart } from '../elements/BloodSugarChart';
import Summary from '../elements/Summary';

const dashboard: React.FC = () => {
    const sampleProps = {
        data: {
          normal: [1420, 1620, 1820, 1420, 1650, 2120], 
          actual: [788, 810, 866, 788, 1100, 1200],    
        },
        bloodGlucose: 5405, 
        risk: 23.5, 
        categories: ["Hemoglobin A1c", "Insulin", "C-Peptide", "Ketones", "Creatinine", "Beta-Hydroxybutyrate"], // X-axis labels
      };
  return (
    <div>

      

        <div className="p-4 sm:ml-64">
            <div className="p-4 border-neutral-50 rounded-lg mt-14">
            
                <div className="grid grid-cols-3 gap-4">
                    
                    <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-4 rounded bg-white p-4">
                    
                        <div className="flex items-center justify-center rounded bg-white p-2">
                            <WeightChart
                                series={[
                                    {
                                        name: "Weight",
                                        data: [231, 122, 63, 421, 122, 323, 111], // Data values
                                    },
                                ]}
                                categories={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                            />
                        </div>

                    
                        <div className="flex items-center justify-center rounded bg-white p-2">
                            <BloodPressureChart />
                        </div>

                
                        <div className="flex items-center justify-center rounded bg-white p-2">
                            <BloodSugarChart {...sampleProps} />
                        </div>

                    
                        <div className="flex items-center justify-center rounded bg-white p-2">
                            <CholesterolChart
                                data={{
                                    categories: [
                                        "01 Feb",
                                        "02 Feb",
                                        "03 Feb",
                                        "04 Feb",
                                        "05 Feb",
                                        "06 Feb",
                                        "07 Feb",
                                    ],
                                    series: [
                                        { name: "Total Cholesterol", data: [6500, 6418, 6456, 6526, 6356, 6456], color: "#1A56DB" },
                                        { name: "HDL Cholesterol", data: [6456, 6356, 6526, 6332, 6418, 6500], color: "#7E3AF2" },
                                        { name: "ApoB or Lp(a)", data: [6356, 6236, 6396, 6300, 6425, 6550], color: "#FF5733" },
                                        { name: "Triglycerides", data: [6520, 6480, 6435, 6375, 6420, 6450], color: "#FFC300" },
                                        { name: "LDL Cholesterol", data: [6390, 6350, 6380, 6400, 6420, 6440], color: "#DAF7A6" },
                                        { name: "VLDL and Non-HDL", data: [6450, 6420, 6400, 6390, 6410, 6445], color: "#900C3F" },
                                    ],
                                }}
                            />
                            
                        </div>
                    </div>

    
                    <div className="col-span-1 flex flex-col gap-4">
                        <div className="rounded bg-white p-4">
                            <Calendar isReadOnly aria-label="Date (Read Only)" value={today(getLocalTimeZone())} />
                        </div>
                        <div className="rounded bg-white p-4">
                            <Summary />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default dashboard;
