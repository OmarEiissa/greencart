import { useEffect, useState } from "react";
import TitleForPage from "../components/shared-component/TitleForPage";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import OrdersSkeleton from "../components/shared-component/OrdersSkeleton";
import UserNotLoggedIn from "../components/shared-component/UserNotLoggedIn";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, navigate, axios, user } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const { data } = await axios.get("/api/order/user");

        if (data.success) {
          setMyOrders([]);
          data.message && toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, axios]);

  if (!user) {
    return <UserNotLoggedIn />;
  }

  return (
    <div className="mt-16 pb-16">
      <TitleForPage title="My Orders" classNameForDiv="!mb-8" />

      {loading ? (
        <OrdersSkeleton />
      ) : !loading && myOrders.length > 0 ? (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
          >
            <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
              <span>Order Id: {order._id}</span>
              <span>Payment: {order.paymentType}</span>
              <span>
                Total Amount: {currency}
                {order.amount}
              </span>
            </p>

            {order.items.map((item, index) => (
              <div
                key={index}
                className={`relative bg-white text-gray-500/70 ${
                  order.items.length !== index + 1 && "border-b"
                } border-gray-300 flex flex-col md:flex-row justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <div
                    className="bg-primary/10 p-4 rounded-lg cursor-pointer"
                    onClick={() => {
                      navigate(
                        `/products/${item.product.category.toLowerCase()}/${
                          item.product._id
                        }`
                      );
                      scrollTo(0, 0);
                    }}
                  >
                    <img
                      src={item.product.image[0]}
                      alt={item.product.name}
                      className="size-16"
                    />
                  </div>

                  <div className="ml-4">
                    <h2 className="text-xl font-medium text-gray-800">
                      {item.product.name}
                    </h2>
                    <p>{item.product.category}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0">
                  <p>Quantity: {item.quantity || "1"}</p>
                  <p>Status: {order.status}</p>
                  <p>
                    Date:{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US")}
                  </p>
                </div>

                <p className="text-primary font-medium text-lg">
                  Amount: {currency}
                  {item.product.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center min-h-80">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">No orders found</h2>
            <p className="text-gray-600">You haven't made any orders yet.</p>
            <button
              className="mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dull transition cursor-pointer"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
