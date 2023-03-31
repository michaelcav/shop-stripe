import Link from "next/link";
import React, { useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ProductsContext } from "./ProductsContext";

export default function NavBar() {
  const { selectedProducts } = useContext(ProductsContext);
  return (
    <header className="bg-emerald-500 h-14 flex">
      <nav className=" w-6/12 flex text-white font-lg m-auto justify-between items-center">
        <Link href={"/"}>
          <span className="font-bold text-xl">Giro</span>
        </Link>
        <div>
          <Link href={'/cart'}>
            <div className=" flex items-center text-lg">
              <AiOutlineShoppingCart size={28} />
              <span className=" font-semibold hover:underline">Cart</span>
              <span className="relative inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-yellow-500 border[1px] border-white rounded-full -top-3 right-12 dark:border-gray-900">{selectedProducts.length}</span>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}
