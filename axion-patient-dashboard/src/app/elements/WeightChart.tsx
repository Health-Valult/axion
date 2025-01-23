"use client"

import { useEffect } from "react";
import ApexCharts from 'apexcharts';

interface ChartProps {
    series: any[];
    categories: string[];
  }



  const WeightChart: React.FC<ChartProps> = ({ series, categories }) => {
    useEffect(() => {
      const options = {
        colors: ["#1A56DB"],
        series: series,
        chart: {
          type: "bar",
          height: "320px",
          fontFamily: "Inter, sans-serif",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "70%",
            borderRadiusApplication: "end",
            borderRadius: 8,
          },
        },
        tooltip: {
          shared: true,
          intersect: false,
          style: {
            fontFamily: "Inter, sans-serif",
          },
        },
        states: {
          hover: {
            filter: {
              type: "darken",
              value: 1,
            },
          },
        },
        stroke: {
          show: true,
          width: 0,
          colors: ["transparent"],
        },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: -14,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: categories,
          labels: {
            show: true,
            style: {
              fontFamily: "Inter, sans-serif",
              cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
        fill: {
          opacity: 1,
        },
      };
  
      const chartElement = document.getElementById("column-chart");
      if (chartElement) {
        const chart = new ApexCharts(chartElement, options);
        chart.render();
  
        return () => {
          chart.destroy();
        };
      }
    }, [series, categories]);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow p-4 md:p-6">
      <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 ">
        <div className="flex items-center">
          <div>
            <h5 className="leading-none text-2xl font-bold text-gray-900 pb-1">100kg</h5>
            <p className="text-sm font-normal text-gray-500 ">Weight</p>
          </div>
        </div>
        <div>
          <span className="bg-red-100 text-red-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md ">
            <svg
              className="w-2.5 h-2.5 me-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13V1m0 0L1 5m4-4 4 4"
              />
            </svg>
            42.5%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <dl className="flex items-center">
          <dt className="text-gray-500  text-sm font-normal me-1">Weight difference:</dt>
          <dd className="text-gray-900 text-sm  font-semibold">10kg</dd>
        </dl>
      </div>

      <div id="column-chart"></div>

      <div className="grid grid-cols-1 items-center border-gray-200 border-t  justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="lastDaysdropdown"
            data-dropdown-placement="bottom"
            className="text-sm font-medium text-gray-500  hover:text-gray-900 text-center inline-flex items-center "
            type="button"
          >
            Last 7 days
            <svg
              className="w-2.5 m-2.5 ms-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700  hover:bg-gray-100  px-3 py-2"
          >
            BMI Report
            <svg
              className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WeightChart;
