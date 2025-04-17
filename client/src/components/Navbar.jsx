import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);

  const location = useLocation();

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/logout");

      if (data.success) {
        data.message && toast.success(data.message);
        setUser(null);
        navigate("/");
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setOpenProfileMenu(false);
        // TODO: Add event close profile menu with mouse
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setTimeout(() => {
          setOpenProfileMenu(false);
        }, 100);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all z-40">
      <Link to={"/"} onClick={() => setOpen(false)}>
        <img className="h-9 sm:h-7" src={assets.logo} alt="logo" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-7">
        <NavLink
          to={"/seller"}
          className={
            "hover:text-primary-dull transition-colors border border-gray-300 px-3 py-1 rounded-full text-xs cursor-pointer opacity-80"
          }
        >
          Seller Dashboard
        </NavLink>

        <NavLink
          to={"/"}
          className={"hover:text-primary-dull transition-colors"}
        >
          Home
        </NavLink>
        <NavLink
          to={"/products"}
          className={"hover:text-primary-dull transition-colors"}
          end={true}
        >
          All Products
        </NavLink>

        {location.pathname === "/products" ? (
          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img src={assets.search_icon} alt="search" className="size-5" />
          </div>
        ) : (
          <img
            src={assets.search_icon}
            alt="search"
            className="size-5 hidden lg:flex cursor-pointer"
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
          />
        )}

        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-5 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
            onClick={() => setShowUserLogin(true)}
          >
            Login
          </button>
        ) : (
          <div
            className="relative"
            onClick={() => setOpenProfileMenu(!openProfileMenu)}
            ref={menuRef}
          >
            <img
              src={user.pic || assets.profile_icon}
              alt="profile"
              className="w-10 cursor-pointer active:scale-95 transition duration-200"
            />
            <ul
              className={`absolute top-10 right-0 bg-white shadow border border-gray-200 p-1.5 w-30 rounded-md text-sm z-40 flex flex-col items-center ${
                openProfileMenu ? "opacity-100 scale-100" : "opacity-0 scale-0"
              } origin-top-right transition duration-200`}
            >
              <li>
                <p className="font-medium">
                  Hello,{" "}
                  <span className="text-primary font-semibold">
                    {user.name
                      .split("")[0]
                      .toUpperCase()
                      .concat(user.name.slice(1))}
                  </span>
                </p>
              </li>
              <span className="w-full h-0.5 bg-primary mt-0.5 mb-1.5" />
              <li className="py-1.5 rounded-lg hover:bg-primary/10 transition-colors w-full text-center cursor-pointer">
                <NavLink
                  to="/my-orders"
                  onClick={() => setOpenProfileMenu(false)}
                >
                  My Orders
                </NavLink>
              </li>
              <button
                className="py-1.5 rounded-lg hover:bg-primary/10 transition-colors w-full text-center cursor-pointer disabled:bg-inherit disabled:cursor-not-allowed flex items-center justify-center"
                onClick={logout}
                disabled={loading}
              >
                {loading ? (
                  <Loader className="animate-spin size-5" />
                ) : (
                  "Logout"
                )}
              </button>
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 sm:hidden">
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-5 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className="cursor-pointer"
        >
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="menu" className="w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "opacity-100 scale-100" : "opacity-0 scale-0"
        } origin-top transition duration-200 h-screen absolute top-[70px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-center gap-2 px-5 text-sm sm:hidden z-9999`}
      >
        <NavLink
          to={"/"}
          onClick={() => setOpen(false)}
          className={
            "w-full text-center mb-2 font-semibold bg-primary/10 py-2 rounded-full text-primary active:scale-95 active:bg-primary active:text-white! transition duration-200"
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/products"}
          onClick={() => setOpen(false)}
          className={
            "w-full text-center mb-2 font-semibold bg-primary/10 py-2 rounded-full text-primary active:scale-95 active:bg-primary active:text-white! transition duration-200"
          }
        >
          All Products
        </NavLink>
        {user && (
          <NavLink
            to={"/my-orders"}
            onClick={() => setOpen(false)}
            className={
              "w-full text-center mb-2 font-semibold bg-primary/10 py-2 rounded-full text-primary active:scale-95 active:bg-primary active:text-white! transition duration-200"
            }
          >
            My Orders
          </NavLink>
        )}

        {!user ? (
          <button
            className="w-full cursor-pointer px-6 py-2 mt-6 bg-primary hover:bg-primary-dull transition text-white rounded-full text-lg font-semibold"
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
          >
            Login
          </button>
        ) : (
          <button
            className="w-full cursor-pointer px-6 py-2 mt-6 bg-primary hover:bg-primary-dull transition text-white rounded-full text-lg font-semibold"
            onClick={logout}
          >
            Logout
          </button>
        )}

        <NavLink
          to={"/seller"}
          onClick={() => setOpen(false)}
          className={
            "w-full text-center mb-2 font-semibold bg-gray-100 py-2 mt-4 rounded-full text-black active:scale-95 active:bg-primary active:text-white! transition duration-200"
          }
        >
          Seller Dashboard
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
