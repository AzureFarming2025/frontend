import React, { useRef, useEffect, useState } from 'react';
import { useThemeProvider } from '@utils/ThemeContext';

import { chartColors } from './ChartjsConfig';
import {
  Chart, LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';

// Import utilities
import { adjustColorOpacity, getCssVariable, formatValue } from '@utils/Utils';

Chart.register(LineController, LineElement, Filler, PointElement, LinearScale, TimeScale, Tooltip);

function RealtimeChart({
  data,
  width,
  height
}) {

  const [chart, setChart] = useState(null)
  const canvas = useRef(null);
  const chartValue = useRef(null);
  const chartDeviation = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === 'dark';  
  const { textColor, gridColor, tooltipTitleColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors;

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const newChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            border: {
              display: false,
            },
            suggestedMin: 30,
            suggestedMax: 80,
            ticks: {
              maxTicksLimit: 5,
              callback: (value) => formatValue(value),
              color: textColor,
            },
            grid: {
              color: gridColor,
            },
          },
          x: {
            type: 'time',
            time: {
              parser: 'hh:mm:ss',
              unit: 'second',
              tooltipFormat: 'MMM DD, H:mm:ss a',
              displayFormats: {
                second: 'H:mm:ss',
              },
            },
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              autoSkipPadding: 48,
              maxRotation: 0,
              color: textColor,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleFont: {
              weight: 600,
            },
            callbacks: {
              label: (context) => formatValue(context.parsed.y),
            },
            titleColor: tooltipTitleColor,
            bodyColor: tooltipBodyColor,
            backgroundColor: tooltipBgColor,
            borderColor: tooltipBorderColor,
          },
        },
        interaction: {
          intersect: false,
          mode: 'nearest',
        },
        animation: false,
        maintainAspectRatio: false,
      },
    });
    setChart(newChart);
    return () => newChart.destroy();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // Update header values
  useEffect(() => {
    const currentValue = data.datasets[0].data[data.datasets[0].data.length - 1];
    const previousValue = data.datasets[0].data[data.datasets[0].data.length - 2];
    const diff = ((currentValue - previousValue) / previousValue) * 100;
    chartValue.current.innerHTML = data.datasets[0].data[data.datasets[0].data.length - 1];
    if (diff < 0) {
      chartDeviation.current.style.backgroundColor = adjustColorOpacity(getCssVariable('--color-red-500'), 0.2);
      chartDeviation.current.style.color = getCssVariable('--color-red-700');
    } else {
      chartDeviation.current.style.backgroundColor = adjustColorOpacity(getCssVariable('--color-green-500'), 0.2);
      chartDeviation.current.style.color = getCssVariable('--color-green-700');
    }
    chartDeviation.current.innerHTML = `${diff > 0 ? '+' : ''}${diff.toFixed(2)}%`;
  }, [data]);

  useEffect(() => {
    if (!chart) return

    if (darkMode) {
      chart.options.scales.x.ticks.color = textColor.dark;
      chart.options.scales.y.ticks.color = textColor.dark;
      chart.options.scales.y.grid.color = gridColor.dark;
      chart.options.plugins.tooltip.titleColor = tooltipTitleColor.dark;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;      
    } else {
      chart.options.scales.x.ticks.color = textColor;
      chart.options.scales.y.ticks.color = textColor;
      chart.options.scales.y.grid.color = gridColor;
      chart.options.plugins.tooltip.titleColor = tooltipTitleColor;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor; 
    }
    chart.update('none')
  }, [currentTheme])    


  return (
    <React.Fragment>
      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800  mr-2 tabular-nums">$<span ref={chartValue}>57.81</span></div>
          <div ref={chartDeviation} className="text-sm font-medium px-1.5 rounded-full"></div>
        </div>
      </div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
}

export default RealtimeChart;