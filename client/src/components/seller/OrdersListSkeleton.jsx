const OrdersListSkeleton = () => {
  return (
    <div className="no-scrollbar flex-1 overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4 animate-pulse">
        <h2 className="text-lg font-medium bg-gray-200 h-5 w-32 rounded" />

        {Array(8)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="flex flex-col md:items-center md:flex-row justify-between gap-5 p-5 max-w-4xl rounded-md border border-gray-300"
            >
              <div className="flex gap-5 max-w-80 w-full">
                <div className="w-12 h-12 bg-gray-200 rounded object-cover" />

                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-4 w-40 bg-gray-200 rounded" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
              </div>

              <div className="flex flex-col text-sm md:text-base text-black/60 gap-1">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-48 bg-gray-200 rounded" />
                <div className="h-4 w-36 bg-gray-200 rounded" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>

              <div className="my-auto">
                <div className="h-6 w-20 bg-gray-200 rounded" />
              </div>

              <div className="flex flex-col text-sm md:text-base text-black/60 gap-1">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-4 w-40 bg-gray-200 rounded" />
                <div className="h-4 w-28 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrdersListSkeleton;
