"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface SearchProps {
  onSearchChange?: (value: string) => void;

}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <div className="py-1 rounded-xl px-4 bg-gray-100 flex flex-row gap-2 items-center md:p-2">
   
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M9.80541 17.296C13.9423 17.296 17.2959 13.9424 17.2959 9.8055C17.2959 5.66863 13.9423 2.31503 9.80541 2.31503C5.66854 2.31503 2.31494 5.66863 2.31494 9.8055C2.31494 13.9424 5.66854 17.296 9.80541 17.296Z"
          stroke="#B8B8B8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.4"
          d="M15.0151 15.4043L17.9518 18.3333"
          stroke="#B8B8B8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

  
      <input
        type="text"
        value={searchTerm}
        placeholder={t("Search Products")}
        className="p-1 bg-transparent outline-none md:p-2 w-full"
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
