import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCoinDetails, fetchCoinMarketChart } from '../api/coinGeckoAPI';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CoinDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const [timeframe, setTimeframe] = useState('7');

  const { data: coin } = useQuery({queryKey: ['coinDetails', id], queryFn: () => fetchCoinDetails(id!) });
  const { data: chartData } = useQuery({queryKey: ['coinChart', id, timeframe], queryFn:() =>
    fetchCoinMarketChart(id!, timeframe) } 
  );

  if (!coin) return <div>Loading...</div>;

  const chartFormattedData = chartData?.prices.map(([time, price]: [number, number]) => ({
    time: new Date(time).toLocaleDateString(),
    price,
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{coin.name}</h1>
      <p>{coin.description?.en || 'No description available.'}</p>
      <div className="mt-4">
        <label className="block mb-2">Price History</label>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="1">1 Day</option>
          <option value="7">7 Days</option>
          <option value="30">1 Month</option>
          <option value="90">3 Months</option>
          <option value="365">1 Year</option>
        </select>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartFormattedData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CoinDetailView;
