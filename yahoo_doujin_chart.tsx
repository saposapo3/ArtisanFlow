import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { year: 2015, yahoo: 862, doujin: 78 },
  { year: 2016, yahoo: 888, doujin: 79 },
  { year: 2017, yahoo: 934, doujin: 80 },
  { year: 2018, yahoo: 901, doujin: 82 },
  { year: 2019, yahoo: 860, doujin: 85 },
  { year: 2020, yahoo: 831, doujin: 75 },
  { year: 2021, yahoo: 920, doujin: 81 },
  { year: 2022, yahoo: 1000, doujin: 93 },
  { year: 2023, yahoo: 979, doujin: 128 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-2xl">
        <p className="text-white font-semibold mb-2">{`${label}年`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()} 
            {entry.dataKey === 'yahoo' ? ' 億円' : ' 億円'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function YahooDoujinChart() {
  const [hoveredLine, setHoveredLine] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-2xl text-gray-800 font-semibold">
            Yahoo! オークション vs デジタル同人コンテンツ市場 (2015-2023)
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Chart Container */}
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-8 border border-gray-200 shadow-2xl">
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 80, left: 80, bottom: 60 }}
            >
              <defs>
                <linearGradient id="yahooGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="doujinGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(255,255,255,0.1)" 
                vertical={false}
              />
              
              <XAxis 
                dataKey="year" 
                tick={{ fill: '#E5E7EB', fontSize: 14, fontWeight: 500 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              
              <YAxis 
                yAxisId="yahoo"
                orientation="left"
                tick={{ fill: '#3B82F6', fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: 'rgba(59,130,246,0.3)' }}
                tickLine={{ stroke: 'rgba(59,130,246,0.3)' }}
                label={{ 
                  value: 'Yahoo! オークション GMV (億円)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: '#3B82F6', fontWeight: 600 }
                }}
              />
              
              <YAxis 
                yAxisId="doujin"
                orientation="right"
                tick={{ fill: '#EC4899', fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: 'rgba(236,72,153,0.3)' }}
                tickLine={{ stroke: 'rgba(236,72,153,0.3)' }}
                label={{ 
                  value: '同人コンテンツ市場 (億円)', 
                  angle: 90, 
                  position: 'insideRight',
                  style: { textAnchor: 'middle', fill: '#EC4899', fontWeight: 600 }
                }}
              />
              
              <Tooltip content={<CustomTooltip />} />
              
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '20px',
                  color: '#E5E7EB',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              />
              
              <Line 
                yAxisId="yahoo"
                type="monotone" 
                dataKey="yahoo" 
                stroke="#3B82F6"
                strokeWidth={hoveredLine === 'yahoo' ? 4 : 3}
                dot={{ 
                  fill: '#3B82F6', 
                  strokeWidth: 2, 
                  r: hoveredLine === 'yahoo' ? 8 : 6,
                  stroke: '#1E40AF'
                }}
                activeDot={{ 
                  r: 10, 
                  stroke: '#3B82F6', 
                  strokeWidth: 3,
                  fill: '#1E40AF'
                }}
                name="Yahoo! オークション (物理商品)"
                onMouseEnter={() => setHoveredLine('yahoo')}
                onMouseLeave={() => setHoveredLine(null)}
              />
              
              <Line 
                yAxisId="doujin"
                type="monotone" 
                dataKey="doujin" 
                stroke="#EC4899"
                strokeWidth={hoveredLine === 'doujin' ? 4 : 3}
                dot={{ 
                  fill: '#EC4899', 
                  strokeWidth: 2, 
                  r: hoveredLine === 'doujin' ? 8 : 6,
                  stroke: '#BE185D'
                }}
                activeDot={{ 
                  r: 10, 
                  stroke: '#EC4899', 
                  strokeWidth: 3,
                  fill: '#BE185D'
                }}
                name="デジタル同人コンテンツ"
                onMouseEnter={() => setHoveredLine('doujin')}
                onMouseLeave={() => setHoveredLine(null)}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
              <h3 className="text-xl font-semibold text-blue-400">Yahoo! オークション</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              物理商品を中心とした伝統的なオークション市場。2017年にピークを迎えた後、2020年に一時的な落ち込みを見せるも、2022年に過去最高値を記録。
            </p>
          </div>
          
          <div className="bg-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/20">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-pink-500 rounded-full mr-3"></div>
              <h3 className="text-xl font-semibold text-pink-400">デジタル同人コンテンツ</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              2020年から急激な成長を示し、2023年には128億円規模に拡大。デジタル化の波とコンテンツ需要の高まりを反映した急成長市場。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}