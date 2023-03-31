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

  const categoriesNames = [...new Set(products.map((p) => p.category))];

  if (phrase) {
    products = products.filter((p) => p.name.toLowerCase().includes(phrase));
  }
  // } else {
  //   products = products;
  // }

  return (
    <Layout>
      <div className="w-[1000] m-auto flex flex-col items-center">
        <input
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          type="text"
          placeholder="Search for products..."
          className="bg-gray-100 w-6/12 py-2 px-4 rounded-xl"
        />
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
