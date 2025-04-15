import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    addToCart,
    updateCartItem,
    removeProductFromCart,
    getCartCount,
    getCartAmount,
    navigate,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  useEffect(() => {
    const getCart = () => {
      let tempArray = [];
      for (const key in cartItems) {
        const product = products.find((item) => item._id === key);
        product.quantity = cartItems[key];
        tempArray.push(product);
      }
      setCartArray(tempArray);
    };
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  useEffect(() => {
    const getUserAddress = async () => {
      try {
        const { data } = await axios.get("/api/address/get");

        if (data.success) {
          setAddresses(data.addresses);
          data.message && toast.success(data.message);
          if (data.addresses.length > 0) {
            setSelectedAddress(data.addresses[0]);
          }
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };

    if (user) {
      getUserAddress();
    }
  }, [user, axios]);

  const placeOrder = async () => {
    try {
      if (cartArray.length < 1) {
        toast.error("Cart is Empty");
        return;
      }

      if (!selectedAddress) {
        toast.error("Please select an address");
        return;
      }

      // Place Order with COD
      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) {
          data.message && toast.success(data.message);
          setCartItems({});
          navigate(`/my-orders`);
          scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      } else {
        // Place Order with Online Stripe
        const { data } = await axios.post("/api/order/stripe", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) {
          window.location.replace(data.url);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return products.length > 0 && cartItems && cartArray.length > 0 ? (
    <div className="flex flex-col lg:flex-row mt-16">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                  );
                  scrollTo(0, 0);
                }}
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <p>Qty:</p>
                    <div className="flex items-center justify-center gap-0.5 px-1 h-[24px] bg-primary/25 rounded select-none">
                      <button
                        onClick={() => {
                          if (cartItems[product._id] > 1) {
                            updateCartItem(
                              product._id,
                              cartItems[product._id] - 1
                            );
                          }
                        }}
                        className="cursor-pointer text-md h-full font-medium text-sm"
                      >
                        -
                      </button>
                      <span className="w-5 text-center font-medium text-sm">
                        {cartItems[product._id]}
                      </span>
                      <button
                        onClick={() => {
                          if (cartItems[product._id] < 20) {
                            addToCart(product._id);
                          } else {
                            toast.error("Maximum Quantity Reached");
                          }
                        }}
                        className="cursor-pointer text-md h-full font-medium text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>
            <button
              className="cursor-pointer mx-auto"
              onClick={() => removeProductFromCart(product._id)}
            >
              <img
                src={assets.remove_icon}
                alt="remove"
                className="inline-block size-6"
              />
            </button>
          </div>
        ))}

        <button
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
        >
          <img
            src={assets.arrow_right_icon_colored}
            alt="arrow"
            className="group-hover:translate-x-1 transition"
          />
          Continue Shopping
        </button>
      </div>

      <div className="lg:max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70 max-h-max">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              className="text-primary hover:underline cursor-pointer"
              onClick={() => setShowAddress(!showAddress)}
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {`${address.street}, ${address.city}, ${address.state}, ${address.country}`}
                  </p>
                ))}
                <p
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                  onClick={() => {
                    navigate("/add-address");
                    // scrollTo(0, 0);
                    setShowAddress(false);
                  }}
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
            onChange={(e) => setPaymentOption(e.target.value)}
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 2) / 100}
            </span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>
              {currency}
              {getCartAmount() + (getCartAmount() * 2) / 100}
            </span>
          </p>
        </div>

        <button
          className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
          onClick={placeOrder}
        >
          {paymentOption === "COD" ? "Place Order" : "Process to Checkout"}
        </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-[75vh]">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">
          Start shopping to add items to your cart.
        </p>
        <button
          className="mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dull transition cursor-pointer"
          onClick={() => navigate("/products")}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
