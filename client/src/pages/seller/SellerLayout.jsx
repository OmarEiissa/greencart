import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { setIsSeller, axios, navigate } = useAppContext();

  const sidebarLinks = [
    {
      name: "Add Product",
      path: "/seller",
      icon: assets.add_icon,
    },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    {
      name: "Orders",
      path: "/seller/orders",
      icon: assets.order_icon,
    },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/seller/logout");

      if (data.success) {
        data.message && toast.success(data.message);
        navigate("/");
        setIsSeller(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/">
          <img
            src={assets.logo}
            alt="logo"
            className="cursor-pointer w-34 md:w-38"
          />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          {/* // TODO: Add profile picture OR name only */}
          <p>Hi! Admin</p>
          <button
            className="border rounded-full text-sm px-4 py-1 cursor-pointer hover:bg-gray-200 transition-all duration-300"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex max-h-[calc(100vh-59.5px)]">
        <div className="md:w-64 w-16 border-r   text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
          {sidebarLinks.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                    : "hover:bg-gray-100/90 border-white"
                }`
              }
            >
              <img src={item.icon} alt={item.name} className="size-7" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default SellerLayout;
