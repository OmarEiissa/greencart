import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const inpRef = useRef(null);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });

      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  useEffect(() => {
    inpRef.current.focus();
  }, []);

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center text-sm text-gray-600"
      >
        <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">Seller</span> Login
          </p>

          <div className="w-full">
            <p>Email</p>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={inpRef}
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              required
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white w-full p-2 rounded-md cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin size-5" /> : "Login"}
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
