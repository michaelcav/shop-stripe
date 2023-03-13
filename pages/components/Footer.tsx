import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AiFillHome, AiOutlineShoppingCart } from "react-icons/ai";
import { ProductsContext } from "./ProductsContext";

export default function Footer(): JSX.Element {
  const router = useRouter();
  const path = router.pathname;
  const {selectedProducts} = useContext(ProductsContext);

  return (
    <footer className="sticky bottom-0 bg-white p-5 w-[1000px] flex m-auto border-t border-gray-200 space-x-12 justify-center">
      <Link
        href={"/"}
        className={
          (path === "/" ? "text-emerald-500" : " text-gray-700") +
          "  flex justify-center items-center flex-col"
        }
      >
        <AiFillHome />
        <span>Home</span>
      </Link>
      <Link legacyBehavior href={"/cart"}>
        <a
          className={
            (path === "/checkoutPage" ? "text-emerald-500" : " text-gray-700") +
            "  flex justify-center items-center flex-col"
          }
        >
          <AiOutlineShoppingCart />
          <span>Cart {selectedProducts.length}</span>
        </a>
      </Link>
    </footer>
  );
}
