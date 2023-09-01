// components/PriceRangeFilter.tsx
import React, { useState } from 'react';

interface PriceRangeFilterProps {
  minPrice: number;
  maxPrice: number;
  onChangePriceRange: (min: number, max: number) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ minPrice, maxPrice, onChangePriceRange }) => {
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseFloat(e.target.value);
    if (!isNaN(newMin) && newMin >= minPrice && newMin <= max) {
      setMin(newMin);
      onChangePriceRange(newMin, max);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseFloat(e.target.value);
    if (!isNaN(newMax) && newMax >= min && newMax <= maxPrice) {
      setMax(newMax);
      onChangePriceRange(min, newMax);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Price Range</h3>
      <div>
        <label htmlFor="minPrice">Min:</label>
        <input
          type="number"
          id="minPrice"
          value={min}
          onChange={handleMinChange}
          className="w-16 border rounded py-1 px-2"
        />
      </div>
      <div>
        <label htmlFor="maxPrice">Max:</label>
        <input
          type="number"
          id="maxPrice"
          value={max}
          onChange={handleMaxChange}
          className="w-16 border rounded py-1 px-2"
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
