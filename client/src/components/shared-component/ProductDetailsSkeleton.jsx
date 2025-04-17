const ProductDetailsSkeleton = () => {
  return (
    <div className="mt-12 animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-6" />

      <div className="flex flex-col md:flex-row gap-16">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {Array(4)
              .fill("")
              .map((_, i) => (
                <div key={i} className="w-24 h-24 bg-gray-300 rounded" />
              ))}
          </div>

          <div className="w-64 h-64 bg-gray-300 rounded" />
        </div>

        <div className="text-sm w-full md:w-1/2 space-y-4">
          <div className="h-6 bg-gray-300 rounded w-2/3" />

          <div className="flex gap-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-300 rounded" />
              ))}
          </div>

          <div className="space-y-2">
            <div className="h-4 w-1/4 bg-gray-300 rounded" />
            <div className="h-6 w-1/3 bg-gray-300 rounded" />
            <div className="h-4 w-1/4 bg-gray-200 rounded" />
          </div>

          <div className="space-y-2 mt-4">
            <div className="h-4 w-32 bg-gray-300 rounded" />
            {Array(3)
              .fill("")
              .map((_, i) => (
                <div key={i} className="h-3 w-full bg-gray-200 rounded" />
              ))}
          </div>

          <div className="flex gap-4 mt-6">
            <div className="h-10 bg-gray-300 rounded w-full" />
            <div className="h-10 bg-gray-300 rounded w-full" />
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="h-6 bg-gray-300 rounded w-48 mb-4 mx-auto" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-6">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded" />
            ))}
        </div>

        <div className="mx-auto w-32 h-10 mt-10 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
