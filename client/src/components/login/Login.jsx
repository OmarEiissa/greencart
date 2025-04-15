import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { showUserLogin, setShowUserLogin, setUser, axios, navigate } =
    useAppContext();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inpRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowUserLogin(false);
        setState("login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowUserLogin]);

  useEffect(() => {
    if (showUserLogin) {
      inpRef.current.focus();
    }
  }, [state, showUserLogin]);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        navigate("/");
        scrollTo(0, 0);
        setUser(data.user);
        setShowUserLogin(false);
        data.message && toast.success(data.message);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center text-sm text-gray-600 bg-black/50 ${
        showUserLogin ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-all duration-200 ease-in-out`}
      onClick={() => {
        setShowUserLogin(false);
        setState("login");
      }}
    >
      <form
        className={`flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white ${
          showUserLogin ? "scale-100" : "scale-0"
        } transition-all duration-200 ease-in-out`}
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmitHandler}
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
              ref={state === "register" ? inpRef : null}
            />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
            ref={state === "login" ? inpRef : null}
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
        <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
