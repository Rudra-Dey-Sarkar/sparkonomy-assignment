"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

export default function Chart() {
  useEffect(() => {
    // Load Google Charts
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/charts/loader.js";
    script.onload = () => {
      window.google.charts.load("current", { packages: ["corechart"] });
      window.google.charts.setOnLoadCallback(drawChart);
    };
    document.body.appendChild(script);

    function drawChart() {
      const data = window.google.visualization.arrayToDataTable([
        ["Month", "income", "momGrowth"],
        ["Jan", 4000, 20],
        ["Feb", 5000, 40],
        ["Mar", 7000, 50],
        ["Apr", 3000, -40],
        ["May", 5000, 60],
        ["Jun", 0, -100],
      ]);

      const options = {
        chartArea: { width: "80%", height: "70%" },
        seriesType: "bars",
        series: {
          0: { targetAxisIndex: 0, color: "#a142f4" }, // purple
          1: { targetAxisIndex: 1, type: "line", color: "#6d1b1b" }, // brown
        },
        vAxes: {
          0: { format: "$#k", minValue: 0, maxValue: 8000 },
          1: { format: "#%", minValue: -100, maxValue: 100 },
        },
        legend: { position: "bottom" },
      };

      const chart = new window.google.visualization.ComboChart(
        document.getElementById("chart_div")
      );
      chart.draw(data, options);
    }
    window.addEventListener("resize", drawChart);
    return () => window.removeEventListener("resize", drawChart);
  }, []);

  return <div id="chart_div" className="w-full h-[200px] sm:h-[400px]" />;
}
