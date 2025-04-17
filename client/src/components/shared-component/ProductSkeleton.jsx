const ProductSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl bg-gray-100 p-4 space-y-3">
      <div className="h-32 bg-gray-300 rounded-md" />
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
    </div>
  );
};

export default ProductSkeleton;
