import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

interface SuccessChartProps {
    data: any[];
}

const SuccessChart: React.FC<SuccessChartProps> = ({ data }) => {
    return (
        <div className="h-[300px] md:h-[400px] w-full bg-black/60 border border-green-500/30 rounded-sm p-4 backdrop-blur-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-green-500 font-mono text-sm tracking-widest flex items-center shadow-green-500/20 drop-shadow-md">
                    <Activity className="w-4 h-4 mr-2" />
                    SYSTEM_PERFORMANCE_METRICS
                </h3>
                <div className="flex space-x-4 text-xs font-mono">
                    <div className="flex items-center text-green-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        SUCCESS_RATE
                    </div>
                    <div className="flex items-center text-blue-400">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        ACTIVE_DEALS
                    </div>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorDeals" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#14532d" opacity={0.3} />
                    <XAxis
                        dataKey="timestamp"
                        stroke="#4ade80"
                        tick={{ fontSize: 10, fontFamily: 'monospace' }}
                        tickLine={false}
                    />
                    <YAxis
                        stroke="#4ade80"
                        tick={{ fontSize: 10, fontFamily: 'monospace' }}
                        tickLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#000',
                            borderColor: '#22c55e',
                            fontFamily: 'monospace',
                            fontSize: '12px'
                        }}
                        itemStyle={{ color: '#4ade80' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="success"
                        stroke="#22c55e"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorSuccess)"
                        isAnimationActive={true}
                    />
                    <Area
                        type="monotone"
                        dataKey="deals"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorDeals)"
                        isAnimationActive={true}
                    />
                </AreaChart>
            </ResponsiveContainer>

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
        </div>
    );
};

export default SuccessChart;
