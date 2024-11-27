import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCoinList } from '../api/coinGeckoAPI';
import './DashboardView.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
const DashboardView = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data, isLoading, isError } = useQuery({
    queryKey: ['coins', page],
    queryFn: () => fetchCoinList(page, 10),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const filteredData = data?.filter(
    (coin: any) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl  font-bold mb-4">List of Cryptocurrencies</h1>
      <SearchBar  value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData?.map((coin: any) => (
          <Link to={`/coin/${coin.id}`} key={coin.id}>
          <div
            key={coin.id}
            className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer card"
          >
            <h2 className="text-lg font-semibold">{coin.name}</h2>
            <p>Symbol: {coin.symbol.toUpperCase()}</p>
            <p>Current Price: ${coin.current_price}</p>
            <p>24h Change: {coin.price_change_percentage_24h}%</p>
            <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
          </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
  <button
    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    disabled={page === 1}
  >
    Previous
  </button>
  <span>Page {page}</span>
  <button onClick={() => setPage((prev) => prev + 1)}>
    Next
  </button>
</div>
    </div>
  );
};

export default DashboardView;
