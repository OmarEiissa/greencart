import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const ProductList = () => {
  const { products, currency, fetchProducts, axios } = useAppContext();

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });

      if (data.success) {
        fetchProducts();
        data.message && toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="no-scrollbar flex-1   overflow-y-scroll flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate text-center">
                  Category
                </th>
                <th className="px-4 py-3 font-semibold truncate text-center">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-semibold truncate text-end">
                  In Stock
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded p-1">
                      <img
                        src={product.image[0]}
                        alt="Product"
                        className="w-16 sm:w-20"
                      />
                    </div>
                    <span className="truncate max-sm:hidden w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 truncate text-center">
                    {product.category}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {currency}
                    {product.offerPrice}
                  </td>
                  <td className="px-4 py-3 text-end">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        onChange={() =>
                          toggleStock(product._id, !product.inStock)
                        }
                        checked={product.inStock}
                      />
                      <div className="w-8 sm:w-10 h-5 sm:h-6 bg-slate-300 rounded-full peer peer-checked:bg-primary transition-colors duration-200" />
                      <span className="dot absolute left-1 top-1 w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-3 sm:peer-checked:translate-x-4" />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
