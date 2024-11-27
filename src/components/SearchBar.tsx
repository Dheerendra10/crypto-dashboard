import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4 text-end">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by name or symbol"
        className="w-full p-2 border rounded shadow-sm"
      />
    </div>
  );
};

export default SearchBar;
