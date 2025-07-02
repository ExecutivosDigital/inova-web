"use client";
import { DatePicker } from "@/components/date-picker";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function DashboardGraphs() {
  const [isFiltersOpen1, setIsFiltersOpen1] = useState(false);
  const [isFiltersOpen2, setIsFiltersOpen2] = useState(false);

  const series1 = [
    {
      name: " ",
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
    },
  ];

  const series2 = [
    {
      name: " ",
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
    },
  ];

  const options1: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#ed6842a0"],
    tooltip: {
      theme: "light",
    },
    xaxis: {
      categories: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Maio",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "50%",
            },
          },
        },
      },
    ],
  };

  const options2: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#ed6842a0"],
    tooltip: {
      theme: "light",
    },
    xaxis: {
      categories: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Maio",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "50%",
            },
          },
        },
      },
    ],
  };

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 xl:flex-row">
      <div className="border-primary bg-primary/20 flex w-full flex-col rounded-md border-2 xl:w-1/2">
        <div className="flex w-full items-center justify-between p-2">
          <span className="text-primary font-semibold">Material Consumido</span>
          <DatePicker
            isFiltersOpen={isFiltersOpen1}
            setIsFiltersOpen={setIsFiltersOpen1}
          />
        </div>
        <div className="h-60 w-full xl:h-96">
          <Chart
            options={options1}
            series={series1}
            type="bar"
            height={"100%"}
            width={"100%"}
          />
        </div>
      </div>
      <div className="border-primary bg-primary/20 flex w-full flex-col rounded-md border-2 xl:w-1/2">
        <div className="flex w-full items-center justify-between p-2">
          <span className="text-primary font-semibold">OS/Colaborador</span>
          <DatePicker
            isFiltersOpen={isFiltersOpen2}
            setIsFiltersOpen={setIsFiltersOpen2}
          />
        </div>
        <div className="h-60 w-full xl:h-96">
          <Chart
            options={options2}
            series={series2}
            type="bar"
            height={"100%"}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
}
