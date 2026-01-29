import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ThreatData } from '../types';

interface ThreatChartProps {
  data: ThreatData[];
}

const ThreatChart: React.FC<ThreatChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64 bg-black/40 border border-green-900/30 p-4 rounded-sm backdrop-blur-sm">
      <h3 className="text-green-400 font-mono mb-4 text-sm uppercase tracking-widest border-b border-green-900/30 pb-2">
        Real-time Threat Mitigation
      </h3>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ff41" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00ff41" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorAttacks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
          <XAxis dataKey="timestamp" stroke="#333" tick={{fill: '#666', fontSize: 10}} />
          <YAxis stroke="#333" tick={{fill: '#666', fontSize: 10}} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#000', border: '1px solid #00ff41', borderRadius: '4px' }}
            itemStyle={{ color: '#00ff41', fontFamily: 'monospace' }}
            labelStyle={{ color: '#666' }}
          />
          <Area 
            type="monotone" 
            dataKey="blocked" 
            stroke="#00ff41" 
            fillOpacity={1} 
            fill="url(#colorBlocked)" 
            name="Threats Neutralized"
          />
          <Area 
            type="monotone" 
            dataKey="attacks" 
            stroke="#ef4444" 
            fillOpacity={1} 
            fill="url(#colorAttacks)" 
            name="Detected Probes"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ThreatChart;