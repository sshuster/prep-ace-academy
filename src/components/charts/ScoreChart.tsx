
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface ScoreData {
  testName: string;
  score: number;
  maxScore: number;
}

interface ScoreChartProps {
  data: ScoreData[];
}

const ScoreChart: React.FC<ScoreChartProps> = ({ data }) => {
  const maxScore = data.length > 0 ? data[0].maxScore : 1600; // Default to 1600 for SAT
  
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Test Score Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="testName" />
              <YAxis domain={[0, maxScore]} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.375rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              />
              {/* Reference line for average score if useful */}
              <ReferenceLine
                y={maxScore * 0.7}
                label={{ value: '70th Percentile', position: 'right' }}
                stroke="#F97316"
                strokeDasharray="3 3"
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#7E69AB"
                strokeWidth={2}
                dot={{ r: 6, fill: "#7E69AB", stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 8, fill: "#7E69AB", stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreChart;
