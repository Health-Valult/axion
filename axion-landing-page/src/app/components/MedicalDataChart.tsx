"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, Tabs, Tab } from "@nextui-org/react";

const patientData = [
  { category: "Reassurance", value: 68 },
  { category: "Motivation to follow medical recommendations", value: 80 },
  { category: "Reduced anxiety", value: 98 },
];

const medicalStaffData = [
  { category: "Improved preparation prior to consultations", value: 48.3 },
  { category: "Ability to detect inaccuracies in medical notes", value: 79 },
  { category: "Growth in clinician-patient trust", value: 82.8 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">Value: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const MedicalDataChart = () => {
  const [activeTab, setActiveTab] = useState<string>("patient");

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader className="text-2xl font-semibold text-black">
          Medical Records Access Impact Analysis
        </CardHeader>

        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key.toString())}
          className="ml-5"
        >
          <Tab key="patient" title="Patient Data">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={patientData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="category"
                    angle={0} // ✅ Set to 0 for straight labels
                    textAnchor="middle"
                    height={50} // ✅ Increased height to avoid overlap
                    dy={10} // ✅ Moves labels slightly down
                  />
                  <YAxis
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Tab>

          <Tab key="medicalStaff" title="Medical Staff Data">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={medicalStaffData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="category"
                    angle={0} // ✅ Set to 0 for straight labels
                    textAnchor="middle"
                    height={50} // ✅ Increased height to avoid overlap
                    dy={10} // ✅ Moves labels slightly down
                  />
                  <YAxis
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
};

export default MedicalDataChart;
