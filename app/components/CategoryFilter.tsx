// components/CategoryFilter.tsx
import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onChangeCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onChangeCategory }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Category</h3>
      <select
        value={selectedCategory}
        onChange={(e) => onChangeCategory(e.target.value)}
        className="w-full border rounded py-1 px-2"
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
