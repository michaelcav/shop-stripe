import React, { ReactNode, useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { ProductsContext } from "./ProductsContext";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { setSelectedProducts } = useContext(ProductsContext);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("success")) {
      setSelectedProducts([]);
      setSuccess(true);
    }
  }, []);
  return success ? (
    <>
    <NavBar/>
    <div className="flex-col bg-emerald-50 w-1000 h-96 rounded-md m-auto items-center justify-center mt-44">
        <div className="text-center p-5">
          <h1 className="font-semibold mb-3">
            Success
          </h1>
          <Link href={"/cart"}>
            <button className="bg-emerald-500 p-3 hover:bg-emerald-600 text-white font-bold shadow-emerald-300 shadow-lg rounded-md w-2/5 duration-200">
              Go to products
            </button>
          </Link>
        </div>
      </div>
    </>
  ) : (
    <div>
      <NavBar/>
      <div className="main p-5">{children}</div>
      <Footer />
    </div>
  );
}
