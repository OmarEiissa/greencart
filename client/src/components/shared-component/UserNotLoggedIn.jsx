import { useAppContext } from "../../context/AppContext";

const UserNotLoggedIn = () => {
  const { navigate, setShowUserLogin } = useAppContext();

  return (
    <div className="flex justify-center items-center h-[75vh]">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Your not logged in</h2>
        <p className="text-gray-600">
          Please login to your account to place order
        </p>
        <button
          className="mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dull transition cursor-pointer"
          onClick={() => {
            navigate("/");
            setShowUserLogin(true);
          }}
        >
          Login Now
        </button>
      </div>
    </div>
  );
};

export default UserNotLoggedIn;
