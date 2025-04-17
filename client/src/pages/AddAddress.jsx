import { useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { Loader } from "lucide-react";
import UserNotLoggedIn from "../components/shared-component/UserNotLoggedIn";

// Input Field Component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
  const { axios, navigate, user } = useAppContext();
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/address/add", { address });

      if (data.success) {
        data.message && toast.success(data.message);
        navigate("/cart");
        scrollTo(0, 0);
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

  if (!user) {
    return <UserNotLoggedIn />;
  }

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-10 gap-10">
        <div className="flex-1 min-w-[340px] lg:max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              type="email"
              placeholder="Email Address"
            />

            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="Street Address"
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="State"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="zipcode"
                type="number"
                placeholder="Zip Code"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Country"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="number"
              placeholder="Phone Number"
            />

            <button
              type="submit"
              className={`w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center`}
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin size-5" />
              ) : (
                "Save Address"
              )}
            </button>
          </form>
        </div>
        <img
          src={assets.add_address_image}
          alt="Add Address"
          className="lg:mb-16 lg:mr-16 mt-10 lg:mt-0 w-full md:w-1/2"
        />
      </div>
    </div>
  );
};

export default AddAddress;
