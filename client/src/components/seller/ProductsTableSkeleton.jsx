const ProductsTableSkeleton = () => {
  return (
    <div className="no-scrollbar flex-1 overflow-y-scroll flex flex-col justify-between">
      <div className="w-full md:p-10 p-4 animate-pulse">
        <h2 className="pb-4 mb-4 text-lg font-medium bg-gray-200 w-32 h-5 rounded" />

        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-300">
          <table className="table-fixed w-full overflow-hidden">
            <thead className="text-sm text-left text-gray-500">
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
              {Array(10)
                .fill("")
                .map((_, index) => (
                  <tr key={index} className="border-t border-gray-300">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                      <div className="border border-gray-300 rounded p-1">
                        <div className="w-16 sm:w-20 h-14 bg-gray-200 rounded" />
                      </div>
                      <span className="bg-gray-200 rounded h-4 w-24 sm:w-36" />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="h-4 bg-gray-200 rounded w-20 mx-auto" />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="h-4 bg-gray-200 rounded w-16 mx-auto" />
                    </td>
                    <td className="px-4 py-3 text-end">
                      <div className="h-6 w-10 bg-gray-200 rounded-full ml-auto" />
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

export default ProductsTableSkeleton;
