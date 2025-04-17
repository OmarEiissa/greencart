import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { categories } from "../assets/assets";
import TitleForPage from "../components/shared-component/TitleForPage";
import ProductCard from "../components/shared-component/ProductCard";
import ProductSkeleton from "../components/shared-component/ProductSkeleton";

const ProductCategory = () => {
  const { products, initialLoading } = useAppContext();
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category
  );

  return (
    <div className="mt-16">
      {searchCategory && <TitleForPage title={searchCategory.text} />}

      {searchCategory ? (
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
            filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[67vh]">
          <p className="text-2xl font-medium text-gray-400">
            Category not found
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
// filteredProducts.length > 0 ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
//             {filteredProducts.map((product, index) => (
//               <ProductCard key={index} product={product} />
//             ))}
//           </div>
//         ) : (
//           <div className="flex items-center justify-center h-[62vh]">
//             <p className="text-2xl font-medium text-primary">
//               No products found in this category.
//             </p>
//           </div>
//         )
