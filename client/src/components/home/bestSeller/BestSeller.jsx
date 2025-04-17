import { useAppContext } from "../../../context/AppContext";
import ProductCard from "../../shared-component/ProductCard";
import ProductSkeleton from "../../shared-component/ProductSkeleton";

const BestSeller = () => {
  const { products, initialLoading } = useAppContext();

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>

      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6 ${
          !initialLoading && products.length === 0
            ? "min-h-70 !flex items-center justify-center"
            : ""
        }`}
      >
        {initialLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : !initialLoading && products.length === 0 ? (
          <p className="text-2xl font-medium text-gray-400">
            No products found
          </p>
        ) : (
          products
            .filter((product) => product.inStock)
            .slice(0, 5)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
        )}
      </div>
    </div>
  );
};

export default BestSeller;
