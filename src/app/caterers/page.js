"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CatererCard from "../components/CatererCard";

export default function CaterersPage() {
  const [caterers, setCaterers] = useState([]);
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    fetchCaterers();
  }, []);

  const fetchCaterers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/caterers`
      );

      setCaterers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCaterers = caterers.filter((caterer) => {
    const matchesSearch = caterer.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPrice =
      priceFilter === ""
        ? true
        : caterer.pricePerPlate <= Number(priceFilter);

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Caterers
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search caterer..."
          className="border p-3 rounded-lg flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-3 rounded-lg"
          value={priceFilter}
          onChange={(e) =>
            setPriceFilter(e.target.value)
          }
        >
          <option value="">All Prices</option>
          <option value="500">Below ₹500</option>
          <option value="700">Below ₹700</option>
          <option value="1000">Below ₹1000</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCaterers.map((caterer) => (
          <CatererCard
            key={caterer.id}
            caterer={caterer}
          />
        ))}
      </div>
    </div>
  );
}