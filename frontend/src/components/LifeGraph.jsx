import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer
} from 'recharts';

const LifeAnalyser = () => {
  const personalData = [
    { aspect: 'Luck', You: 10, "Ideal": 90 },
    { aspect: 'Smartness', You: 50, "Ideal": 100 },
    { aspect: 'Handsome', You: 40, "Ideal": 95 },
    { aspect: 'Relationships', You: 20, "Ideal": 85 },
    { aspect: 'Humor', You: 30, "Ideal": 98 },
    { aspect: 'Confidence', You: 25, "Ideal": 90 },
    { aspect: 'Charisma', You: 35, "Ideal": 92 },
  ];

  const professionalData = [
    { aspect: 'Technical Skill', You: 70, "Ideal": 95 },
    { aspect: 'Luck', You: 5, "Ideal": 80 },
    { aspect: 'Connections', You: 15, "Ideal": 85 },
    { aspect: 'Extrovert', You: 20, "Ideal": 90 },
    { aspect: 'Conversational', You: 30, "Ideal": 88 },
    { aspect: 'Leadership', You: 25, "Ideal": 95 },
    { aspect: 'Work-Life Balance', You: 10, "Ideal": 85 },
  ];

  const ChartCard = ({ title, data, message, colors }) => (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/20">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-white flex items-center space-x-2">
          <div className="w-1 h-6 bg-emerald-500 rounded-full" />
          <span>{title}</span>
        </h2>
      </div>

      {/* Chart */}
      <div className="p-6">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid 
                stroke="#2d2d2d" 
                strokeDasharray="3 3"
              />
              <PolarAngleAxis 
                dataKey="aspect" 
                stroke="#666" 
                tick={{ fill: '#999', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                stroke="#2d2d2d" 
                tick={{ fill: '#666' }} 
                angle={30}
              />
              <Radar 
                name="You" 
                dataKey="You" 
                stroke={colors.you}
                fill={colors.you}
                fillOpacity={0.2}
              />
              <Radar 
                name="Ideal" 
                dataKey="Ideal" 
                stroke={colors.ideal}
                fill={colors.ideal}
                fillOpacity={0.2}
              />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '20px',
                  color: '#fff'
                }}
                formatter={(value) => (
                  <span className="text-gray-300">{value}</span>
                )}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-950/50 border-t border-gray-800">
        <p className="text-gray-400 text-sm text-center italic">{message}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Personal Life Analysis"
          data={personalData}
          message="Don't worry, even AI can't fix some of these."
          colors={{
            you: "#22c55e",    // Emerald
            ideal: "#94a3b8"   // Gray
          }}
        />
        
        <ChartCard
          title="Professional Life Analysis"
          data={professionalData}
          message="Maybe networking isn't your thing... or luck."
          colors={{
            you: "#22c55e",    // Emerald
            ideal: "#94a3b8"   // Gray
          }}
        />
      </div>
    </div>
  );
};

export default LifeAnalyser;