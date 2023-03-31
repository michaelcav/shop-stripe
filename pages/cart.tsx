import Layout from "./components/Layout";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "./components/ProductsContext";
import { ProductsInfo } from "./interfaces/productsInfo";
import Link from "next/link";
// import * as Yup from "yup";

export default function CheckoutPage(): JSX.Element {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);

  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [productCart, setProductCart] = useState<ProductsInfo[]>([]);

  // const checkoutSchema = Yup.object().shape({
  //   address: Yup.string(),
  //   city: Yup.string(),
  //   name: Yup.string(),
  //   email: Yup.string().email().required(),
  // });

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   try {
  //     await checkoutSchema.validate(
  //       { address, city, name, email },

  //     );

  //     // Envie os dados do formulário para o servidor aqui
  //   } catch (err) {
  //     // Handle errors de validação aqui
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    const uniqIds = [...new Set(selectedProducts)];
    fetch("/api/products?ids=" + uniqIds.join(","))
      .then((response) => response.json())
      .then((json) => setProductCart(json));
  }, [selectedProducts]);

  function moreOfThisProduct(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }

  function lessOfThisProduct(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  }

  let deliveryPrice = 5;
  let subtotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price = productCart.find((p) => p._id === id)?.price;
      subtotal += price || 0;
    }
  }
  const total = subtotal + deliveryPrice;

  console.log(selectedProducts);
  console.log(productCart.length);
  return selectedProducts.length !== 0 ? (
    <Layout>
      {productCart.length !== 0 &&
        productCart.map((productCart: ProductsInfo) => {
          const amount = selectedProducts.filter(
            (id) => id === productCart._id
          ).length;
          if (amount === 0) return;
          return (
            <div className="flex justify-center mb-5" key={productCart._id}>
              <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                <img className="w-24" src={productCart.picture} alt="Picture" />
              </div>
              <div className="pl-4">
                <h3 className="font-bold  text-base">{productCart.name}</h3>
                <p className="text-sm leading-4 text-gray-700 mt-1">
                  {productCart.description}
                </p>
                <div className="flex  mt-2">
                  <div className="grow font-semibold ">
                    ${productCart.price}
                  </div>
                  <div>
                    <button
                      onClick={() => lessOfThisProduct(productCart._id)}
                      className="border border-emerald-500 px-2 rounded-xl"
                    >
                      -
                    </button>
                    <span className="px-2 font-semibold">
                      {
                        selectedProducts.filter((id) => id === productCart._id)
                          .length
                      }
                    </span>
                    <button
                      onClick={() => moreOfThisProduct(productCart._id)}
                      className="border bg-emerald-500 text-white px-2 rounded-full"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <div className="flex flex-col w-6/12 m-auto">
        <form action="/api/checkout" method="POST">
          <div>
            <div>
              <input
                name="address"
                className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 "
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address, number"
              />
              <input
                name="city"
                className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 "
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City and postal code"
              />
              <input
                name="name"
                className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 "
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
              <input
                name="email"
                className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2 "
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex my-1">
              <h3 className="grow font-semibold">Subtotal:</h3>
              <h3 className=" font-semibold">${subtotal}</h3>
            </div>
            <div className="flex my-1">
              <h3 className="grow font-semibold">Delivery:</h3>
              <h3 className=" font-semibold">${deliveryPrice}</h3>
            </div>
            <div className="flex my-4 border-2 p-2 border-emerald-500">
              <h3 className="grow font-semibold">Total:</h3>
              <h3 className=" font-bold">${total}</h3>
            </div>
            <div className="item-end flex justify-between items-end">
              <Link href={"/"}>
                <button
                  type="submit"
                  className="font-semibold text-emerald-600 hover:text-emerald-700 duration-100"
                >
                  Continuar comprando
                </button>
              </Link>

              <input
                type="hidden"
                name="products"
                value={selectedProducts.join(",")}
              />
              <button
                type="submit"
                className="bg-emerald-500 p-3 hover:bg-emerald-600 text-white font-bold shadow-emerald-300 shadow-lg rounded-md w-2/5 duration-200"
              >
                Buy
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  ) : (
    <Layout>
      <div className="mb-5 flex-col  items-center justify-center">
        <div className="text-center p-5">
          <h1 className="font-semibold mb-3">
            Your Cart is empity, please add your products
          </h1>
          <Link href={"/"}>
            <button className="bg-emerald-500 p-3 hover:bg-emerald-600 text-white font-bold shadow-emerald-300 shadow-lg rounded-md w-2/5 duration-200">
              Go to add products
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}