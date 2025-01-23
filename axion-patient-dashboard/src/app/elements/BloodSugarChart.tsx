"use client"

import React from 'react';
import ApexCharts from 'apexcharts';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

export const BloodSugarChart = ({ data, bloodGlucose, risk, categories }: { data: any, bloodGlucose: any, risk: any, categories: any }) => {
  React.useEffect(() => {
    const options = {
      series: [
        {
          name: "Normal",
          color: "#31C48D",
          data: data.normal,
        },
        {
          name: "Actual",
          data: data.actual,
          color: "#F05252",
        }
      ],
      chart: {
        sparkline: {
          enabled: false,
        },
        type: "bar",
        width: "100%",
        height: 400,
        toolbar: {
          show: false,
        },
      },
      fill: {
        opacity: 1,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "100%",
          borderRadiusApplication: "end",
          borderRadius: 6,
          dataLabels: {
            position: "top",
          },
        },
      },
      legend: {
        show: true,
        position: "bottom",
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
        formatter: function (value: any) {
          return value;
        },
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
          },
          formatter: function (value: any) {
            return value;
          },
        },
        categories: categories,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
          },
        },
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -20,
        },
      },
    };

    if (document.getElementById("bar-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("bar-chart"), options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [data, categories]);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-between border-gray-200 border-b  pb-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 pb-1">Blood Glucose</dt>
          <dd className="leading-none text-3xl font-bold text-gray-900">{bloodGlucose} mg/dL</dd>
        </dl>
        <div>
          <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md ">
            <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
            </svg>
            Risk {risk}%
          </span>
        </div>
      </div>

  

      <div id="bar-chart"></div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t  justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="lastDaysdropdown"
            data-dropdown-placement="bottom"
            className="text-sm font-medium text-gray-500  hover:text-gray-900 text-center inline-flex items-center "
            type="button">
            Last 6 months
            <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          
          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700  hover:bg-gray-100  px-3 py-2">
            Full Blood Report
            <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

