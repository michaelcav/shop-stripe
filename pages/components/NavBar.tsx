import Product from "@/models/product";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ProductsContext } from "./ProductsContext";
import Search from "./Search";

export default function NavBar() {
  const router = useRouter();
  const path = router.pathname;
  const { selectedProducts } = useContext(ProductsContext);
  return (
    <header className="w-full bg-emerald-500 h-14 flex">
      <nav className=" w-6/12 flex text-white font-lg m-auto justify-between items-center">
        <Link href={"/"}>
          <span className="font-bold text-xl">Giro</span>
        </Link>
       <Link href={'/cart'}>
       <ul className="">
          <li className="flex items-center text-lg">
            <AiOutlineShoppingCart />  
            <span className="font-semibold mr-2">{selectedProducts.length}</span>
            <span className=" hover:underline hover:underline-offset-2">Cart </span>
          </li>
        </ul>
       </Link>
      </nav>
    </header>
  );
}
