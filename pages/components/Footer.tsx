import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AiFillHome, AiOutlineShoppingCart } from "react-icons/ai";
import { ProductsContext } from "./ProductsContext";

export default function Footer(): JSX.Element {
  const router = useRouter();
  const path = router.pathname;
  const {selectedProducts} = useContext(ProductsContext);

  const cartQuantity = selectedProducts.length;

  return (
    <footer className="sticky bottom-0 w-full bg-white p-5 flex m-auto border-t border-gray-200 space-x-12 justify-center">
      <Link
        href={"/"}
        className={
          (path === "/" ? "text-emerald-500" : " text-gray-500") +
          "  flex justify-center items-center flex-col"
        }
      >
        <AiFillHome />
        <span>Home</span>
      </Link>
    {cartQuantity > 0 ?   <Link href={"/cart"} className={
            (path === "/cart" ? "text-emerald-500" : " text-gray-500") +
            "  flex justify-center items-center flex-col"
        }>
          <AiOutlineShoppingCart />
          <span>Cart {selectedProducts.length}</span>
      </Link> : <Link href={"/cart"} className={
            (path === "/cart" ? "text-emerald-500" : " text-gray-500") +
            "  flex justify-center items-center flex-col"
        }>
          <AiOutlineShoppingCart />
          <span>Cart</span>
      </Link> }
    </footer>
  );
}
