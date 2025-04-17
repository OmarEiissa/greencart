import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/shared-component/ProductCard";
import TitleForPage from "../components/shared-component/TitleForPage";
import ProductSkeleton from "../components/shared-component/ProductSkeleton";

const AllProducts = () => {
  const { products, initialLoading, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col">
      <TitleForPage title="All Products" />

      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6 ${
          !initialLoading && filteredProducts.length === 0
            ? "min-h-100 !flex items-center justify-center"
            : ""
        }`}
      >
        {initialLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : !initialLoading && products.length === 0 ? (
          <p className="text-2xl font-medium text-gray-400">
            No products found
            {console.log(filteredProducts.length)}
          </p>
        ) : !initialLoading && searchQuery && filteredProducts.length === 0 ? (
          <p className="text-2xl font-medium text-gray-400">
            No products found
          </p>
        ) : (
          filteredProducts
            .filter((product) => product.inStock)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
        )}
      </div>
    </div>
  );
};

export default AllProducts;
