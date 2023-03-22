import React, { useState } from "react";
import { ProductsInfo } from "../interfaces/productsInfo";
import Products from "../components/Products";
import { initMongoose } from "@/lib/mongoose";
import { findAllProducts } from "../api/products";

interface SearchProps {
  products: ProductsInfo[];
}

export default function Search({ products }: SearchProps) {
  // const [productsInfo, setProductsInfo] = useState<productsInfo[]>([]);

  // const categoriesNames = [...new Set(products.map((p) => p.category))];

  const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     getMovies(APIURL);
//   }, []);

//   const getMovies = async (API) => {
//     const response = await axios.get(API);
//     setMovies(response.data.results);
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();

//     if (searchTerm) {
//       getMovies(SEARCHAPI + searchTerm);

//       setSearchTerm("");
//     }
//   };

//   const handleOnchange = (e) => {
//     setSearchTerm(e.target.value);
//   };

  if (searchTerm) {
    products = products.filter((p) => p.name.toLowerCase().includes(searchTerm));
  }
  return (
    <div className="w-full p-2">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search for products..."
        className="bg-gray-100 w-full py-2 px-4 rounded-xl"
      />
    </div>
  );
}
