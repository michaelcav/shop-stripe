import { createContext, ReactNode } from "react";
import useLocalStorageState from "use-local-storage-state";

type Product = {
  id: string;
  name: string;
  price: number;
  prev: string[];
};

type ProductsContextType = {
  selectedProducts: Product[];
  setSelectedProducts: (products: Product[]) => void;
};

export const ProductsContext = createContext<ProductsContextType>({
  selectedProducts: [],
  setSelectedProducts: () => {},
});

interface ProductsContextProviderProps {
  children: ReactNode;
}

export function ProductsContextProvider({
  children,
}: ProductsContextProviderProps) {
  const [selectedProducts, setSelectedProducts] = useLocalStorageState<
    Product[]
  >('cart', {defaultValue:[]});

  return (
    <ProductsContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}
