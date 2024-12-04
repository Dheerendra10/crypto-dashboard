import React, { useState ,useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCoinList } from '../api/coinGeckoAPI';
import { useDarkMode } from '../context/DarkModeContext'; // Import useDarkMode
import './DashboardView.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Filters from "./Filters";
const DashboardView = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data, isLoading, isError } = useQuery({
    queryKey: ['coins', page],
    queryFn: () => fetchCoinList(page, 10),
  });
  const { darkMode, toggleDarkMode } = useDarkMode(); // Access dark mode context
  const [filters, setFilters] = useState({ priceChange: "all" });
  const handleFilterChange = (newFilters: { priceChange: string }) => {
    setFilters(newFilters);
  };

  const filteredData = useMemo(() => {
    console.log(data);
    if (!data) return [];
    return data
      .filter((coin: any) => {
        // Search by name or symbol
        if (
          !coin.name.toLowerCase().includes(search.toLowerCase()) &&
          !coin.symbol.toLowerCase().includes(search.toLowerCase())
        ) {
          return false;
        }
        // Filter by Price Change Percentage
        if (filters.priceChange === "positive" && coin.price_change_percentage_24h < 0)
          return false;
        if (filters.priceChange === "negative" && coin.price_change_percentage_24h >= 0)
          return false;

        return true;
      });
  }, [data, filters, search]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;


  return (
    <div className={`container mx-auto p-4 ${darkMode ? "dark-mode" : "ligt-mode"}`}>
      <h1 className="text">Cryptocurrency Market </h1>
      <div className="filter">
        <div>
        <button
        onClick={toggleDarkMode}
        className="mb-4 px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300"
      >
       {darkMode ? "Light" : "Dark"} Mode
      </button>
        </div>
        <div> <SearchBar  value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <div> <Filters onFilterChange={handleFilterChange} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData?.map((coin: any) => (
          <Link to={`/coin/${coin.id}`} key={coin.id}>
          <div
            key={coin.id}
            className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer card"
          > 
          <div className="main-content">
            <div>
              <img src={coin.image} alt="Coin Image" width="50" height="50"/>
            </div>
            <div>
            <h2 >{coin.name}</h2>
            <p id="text-2">{coin.symbol.toUpperCase()}</p>
            </div>
          </div>
            <p > ${coin.current_price}</p>
            <p> {coin.price_change_percentage_24h}%</p>
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
