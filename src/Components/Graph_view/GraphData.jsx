import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { iconUrlFromCode } from '../../Utiliies/Utility';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display:false 
       },
    title: {
      display: true,
    },
  },
};

export function GraphData(data) {
  const { hourlyData, weather } = data;
  const { details, icon, temp,name,country } = weather;
  const graphdatas = {
    labels: hourlyData.map((item) => {
      return item.title;
    }),
    datasets: [
      {
        label: temp,
        data: hourlyData.map((item) => {
          return +item.temp;
        }),
        borderColor: 'rgb(99, 112, 255)',
        backgroundColor: 'rgb(99, 112, 255)',
      },
    ],
  };
  return (
    <div>
      {data && (
        <div>
          <div className="flex flex-row items-center justify-between py-3">
            <img src={iconUrlFromCode(icon)} alt="" className="w-20" />
            <h1 className="text-5xl">{`${temp.toFixed()}° ${details}`}</h1>
            <p className="text">{`${name}° ${country}`}</p>
          </div>
          <Line options={options} data={graphdatas} />
        </div>
      )}
    </div>
  );
}
