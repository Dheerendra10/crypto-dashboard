import React, { useState } from "react";


type FilterProps = {
  onFilterChange: (filters: { priceChange: string }) => void;
};

const Filters: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [priceChange, setPriceChange] = useState<string>("all");

  const handlePriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceChange(event.target.value);
    onFilterChange({ priceChange: event.target.value });
  };

  return (
    <div className=" extra-add filters-container mb-4 flex flex-wrap gap-4 ">
      {/* Price Change Filter */}
      <div className="filter-group">
        <label className="mr-2 font-semibold">Price Change (24h):</label>
        <select
          value={priceChange}
          onChange={handlePriceChange}
          className="px-3 py-2 border rounded"
        >
          <option value="all">All</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
