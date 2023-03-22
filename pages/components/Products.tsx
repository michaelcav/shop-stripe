import Link from "next/link";
import { ProductsInfo } from "../interfaces/productsInfo";
import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";

// interface ProductsProps extends productsInfo {}

const Products: React.FC<ProductsInfo> = ({
  _id,
  name,
  price,
  description,
  picture,
}) => {
  const { setSelectedProducts } = useContext(ProductsContext);

  function addProduct() {
    setSelectedProducts( prev => [...prev, _id]);
  }

  return (
    
    <div className="w-64">
      <Link href={'/pageProducts'}>
      <div className="bg-blue-100 p-5  rounded-xl">
        <img src={picture} alt={name} />
      </div>
      </Link>
      <div className="mt-2">
        <h3 className="font-bold text-lg">{name}</h3>
      </div>
      <p className="text-sm mt-1 leading-4 text-gray-500 mb-3">{description}</p>
      <div className="flex  mt-1">
        <div className="text-2xl  font-semibold justify-between flex grow items-center">
          ${price}
          <button
            onClick={addProduct}
            className="bg-emerald-500 text-white py-1 rounded-md px-3 text-xl hover:bg-emerald-600 duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    
    
  );
};

export default Products;
