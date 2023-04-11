import React, { useState, useEffect } from "react";
import Products from "./components/Products";
import { ProductsInfo } from "./interfaces/productsInfo";
import { initMongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "./components/Layout";

interface HomeProps {
  products: ProductsInfo[];
}

export default function Home({ products }: HomeProps) {
  // const [productsInfo, setProductsInfo] = useState<productsInfo[]>([]);
  const [phrase, setPhrase] = useState("");

  // useEffect(() => {
  //   fetch("/api/products")
  //     .then((response) => response.json())
  //     .then((json) => setProductsInfo(json));
  // }, []);

  // const categoriesNames = [...new Set(products.map((p) => p.category))];
  const categoriesNames = Array.from(new Set(products.map((p) => p.category)));

  if (phrase) {
    products = products.filter((p) => p.name.toLowerCase().includes(phrase));
  }
  // } else {
  //   products = products;
  // }

  return (
    <Layout>
      <div className="w-[1000] m-auto flex flex-col items-center">
        <form className="max-w-[850px] w-full">
        <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          type="text"
          placeholder="Search for products"
          className="block w-full p-3 pl-10 text-sm text-gray-800 border-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-emerald-500"
        />
        </div>
        </form>
        <div>
          {categoriesNames.map((categoryName) => (
            <div key={categoryName}>
              {products.find((p) => p.category === categoryName) && (
                <div>
                  <h2 className="text-2xl py-5 relative capitalize flex ml-5 lg:justify-center md:justify-center">{categoryName}</h2>
                  <div className="flex flex-wrap items-center justify-center">
                    {products
                      .filter((p) => p.category === categoryName)
                      .map((productsInfo) => (
                        <div
                          key={productsInfo._id}
                          className="px-5 snap-start "
                        >
                          <Products {...productsInfo} />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
