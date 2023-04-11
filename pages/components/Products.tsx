import Link from "next/link";
import { ProductsInfo } from "../interfaces/productsInfo";
import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";
import Image from 'next/image'
import Stars from "./Stars";

interface ProductsProps extends ProductsInfo { }

const Products: React.FC<ProductsProps> = ({
  _id,
  name,
  price,
  description,
  picture,
}) => {
  const { setSelectedProducts } = useContext(ProductsContext);

  const addProduct = () => {
    setSelectedProducts((prevState: string[]) => [...prevState, _id]);
  }

  return (
    <div className="w-64 mb-10">
      <Link href="/pageProducts">
        <div className="bg-blue-100 p-5 rounded-xl cursor-pointer">
          <Image src={picture} alt={name} width={400} height={300} />
        </div>
      </Link>
      <div className="mt-2">
        <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white cursor-pointer">{name}</h3>
      </div>
      <Stars />
      <p className="text-sm leading-4 text-gray-600 mb-5">{description}</p>
      <div className="flex mt-1">
        <div className="text-3xl font-bold text-gray-900 dark:text-white justify-between flex flex-grow items-center">
          ${price}
          <button
            onClick={addProduct}
            className="bg-emerald-500 text-white rounded-lg text-sm px-5 py-2.5 text-center hover:bg-emerald-600 duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;