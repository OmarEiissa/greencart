const OrdersSkeleton = () => {
  return (
    <div className="animate-pulse">
      {Array(2)
        .fill("")
        .map((_, orderIndex) => (
          <div
            key={orderIndex}
            className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
          >
            <div className="flex justify-between md:items-center text-gray-300 md:font-medium max-md:flex-col gap-2">
              <div className="h-4 bg-gray-300 rounded w-1/2" />
              <div className="h-4 bg-gray-300 rounded w-1/4" />
              <div className="h-4 bg-gray-300 rounded w-1/3" />
            </div>

            {Array(2)
              .fill("")
              .map((_, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`relative bg-white border-gray-300 flex flex-col md:flex-row justify-between p-4 py-5 md:gap-16 w-full max-w-4xl ${
                    itemIndex !== 1 && "border-b"
                  }`}
                >
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="bg-gray-300 rounded-lg p-4">
                      <div className="size-16 bg-gray-200 rounded" />
                    </div>
                    <div className="ml-4 space-y-2">
                      <div className="h-5 w-32 bg-gray-300 rounded" />
                      <div className="h-3 w-24 bg-gray-200 rounded" />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0 space-y-2">
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                    <div className="h-3 w-28 bg-gray-200 rounded" />
                  </div>

                  <div className="h-5 w-24 bg-gray-300 rounded self-center" />
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default OrdersSkeleton;
