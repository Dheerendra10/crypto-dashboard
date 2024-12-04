import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import './CoinDetailView.css';
import { useDarkMode } from '../context/DarkModeContext'; // Import useDarkMode
import { fetchCoinDetails, fetchCoinMarketChart } from '../api/coinGeckoAPI';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CoinDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const [timeframe, setTimeframe] = useState('7');
  const { darkMode, toggleDarkMode } = useDarkMode(); // Access dark mode context

  const { data: coin } = useQuery({queryKey: ['coinDetails', id], queryFn: () => fetchCoinDetails(id!) });
  const { data: chartData } = useQuery({queryKey: ['coinChart', id, timeframe], queryFn:() =>
    fetchCoinMarketChart(id!, timeframe) } 
  );
  console.log(coin);

  if (!coin) return <div>Loading...</div>;

  const chartFormattedData = chartData?.prices.map(([time, price]: [number, number]) => ({
    time: new Date(time).toLocaleDateString(),
    price,
  }));

  return (
    <div  className={`container mx-auto p-4 ${darkMode ? "dark-mode" : "ligt-mode"}`}>
      <button
        onClick={toggleDarkMode}
        className="mb-4 px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300"
      >
       {darkMode ? "Light" : "Dark"} Mode
      </button>
      <div className='container-second'>
      <div className='content-main'>
        
        <div className='first-part'>
        <span>
              <img src={coin.image.small} alt="Coin Image" width="50" height="50"/>
            </span>
            <span>
            <h2 >{coin.name}</h2>
            <p className="text-2">{coin.symbol.toUpperCase()}</p>
            </span>
           
        </div>
        <div className='second-part'>
        <div className="mt-4">
        <label className="block mb "> <b>Price History</b></label>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="p-2 mt-16 mb-20 border rounded"
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
      </div>
      <h1>About {coin.name}</h1>
      <p>{coin.description?.en || 'No description available.'}</p>
      </div>
    </div>
  );
};

export default CoinDetailView;
