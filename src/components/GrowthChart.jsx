import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card } from "react-daisyui"; // Added Card import

const data = [
  { week: "Week 1", value: 10 },
  { week: "Week 2", value: 30 },
  { week: "Week 3", value: 60 },
  { week: "Week 4", value: 100 }
];

const GrowthChart = () => {
  return (
    <Card className="shadow-lg">
      <Card.Body>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Growth Rate</h2>
            <select className="select select-bordered select-sm w-24">
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data}>
              <XAxis dataKey="week" />
              <YAxis hide />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GrowthChart;
