import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const Loading = () => {
  const { navigate } = useAppContext();
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 5000);
    }
  }, [nextUrl, navigate]);

  return (
    <div className="flex items-center justify-center h-[75vh]">
      <div className="animate-spin rounded-full size-24 border-4 border-gray-300 border-t-primary" />
    </div>
  );
};

export default Loading;
