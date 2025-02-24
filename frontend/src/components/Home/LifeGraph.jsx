import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Text, Tooltip } from 'recharts';

const personalLifeData = [
  { subject: 'Strength', A: 100, comment: 'Carrying projects like a boss' },
  { subject: 'Learning', A: 95, comment: 'Absorbs info like RAM on Chrome' },
  { subject: 'Spirituality', A: 80, comment: 'Only prays when deploying to production' },
  { subject: 'Nutrition', A: 90, comment: 'Runs on caffeine and chaos' },
  { subject: 'Relationship', A: 10, comment: 'Commit history > human connection' },
];

const professionalLifeData = [
  { subject: 'Career', A: 80, comment: 'Imposter syndrome disagrees, but still crushing it' },
  { subject: 'Growth', A: 70, comment: 'Mistakes = growth. I make plenty' },
  { subject: 'Education', A: 85, comment: 'Educated but still Googling basic stuff' },
  { subject: 'Experience', A: 80, comment: 'Seen things... like rm -rf / in production' },
  { subject: 'Financial Stability', A: 30, comment: 'Premium dev tools > groceries' },
];

const getPolarPosition = (index, radius, totalPoints) => {
  const angle = (2 * Math.PI * index) / totalPoints - Math.PI / 2;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return { x, y };
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload[0]) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800">{payload[0].payload.subject}</p>
        <p className="text-gray-600">Score: {payload[0].value}</p>
        <p className="text-sm text-gray-500 mt-2">{payload[0].payload.comment}</p>
      </div>
    );
  }
  return null;
};

const RadarSection = ({ title, data, color }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-lg transition-transform duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 relative">
        {title}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </h2>
      <div className="relative">
        <RadarChart 
          outerRadius={110} 
          width={450} 
          height={450} 
          data={data}
          className="transition-all duration-300 ease-in-out"
        >
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ 
              fill: '#374151',
              fontSize: 14,
              fontWeight: 500
            }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
          <Tooltip content={<CustomTooltip />} />
          <Radar 
            name={title}
            dataKey="A" 
            stroke={color}
            fill={color}
            fillOpacity={0.6}
            className="transition-all duration-300 ease-in-out hover:fill-opacity-80"
          />
          
          {data.map((entry, index) => {
            const totalPoints = data.length;
            const radius = (entry.A / 100) * 110;
            const { x, y } = getPolarPosition(index, radius, totalPoints);
            const isHovered = hoveredIndex === index;
            
            return (
              <g key={`comment-group-${index}`}>
                <circle
                  cx={x + 225}
                  cy={y + 225}
                  r={6}
                  fill={color}
                  opacity={isHovered ? 0.8 : 0.4}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
                {isHovered && (
                  <Text
                    x={x + 225}
                    y={y + 225}
                    textAnchor="middle"
                    verticalAnchor="middle"
                    fontSize={12}
                    fill="#1f2937"
                    className="pointer-events-none"
                  >
                    {entry.comment}
                  </Text>
                )}
              </g>
            );
          })}
        </RadarChart>
      </div>
    </div>
  );
};

const LifeGraph = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-12 p-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <RadarSection 
        title="Personal Life" 
        data={personalLifeData} 
        color="#ff4d4f" 
      />
      <RadarSection 
        title="Professional Life" 
        data={professionalLifeData} 
        color="#4f8cff" 
      />
    </div>
  );
};

export default LifeGraph;