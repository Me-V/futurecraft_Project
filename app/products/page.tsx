// app/products/page.tsx
import { Suspense } from "react";
import LoadMore from "../components/LoadMore";
import Link from "next/link";
import Image from "next/image";
import { fetchProducts, fetchCategories } from "@/utils/fetchProducts";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const initialProducts = await fetchProducts();
  const categories = await fetchCategories();

  // Get current filter values from URL search params
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : 0;
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : 1000;
  const selectedCategory = searchParams.category
    ? Array.isArray(searchParams.category)
      ? searchParams.category
      : [searchParams.category]
    : [];
  const minRating = searchParams.rating ? Number(searchParams.rating) : 0;
  const searchQuery = searchParams.search ? String(searchParams.search) : "";

  // Filter products based on search params
  const filteredProducts = initialProducts.filter((product) => {
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesCategory =
      selectedCategory.length === 0 ||
      selectedCategory.includes(product.category);
    const matchesRating = product.rating.rate >= minRating;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesPrice && matchesCategory && matchesRating && matchesSearch;
  });

  const areFiltersApplied =
    minPrice !== 0 ||
    maxPrice !== 1000 ||
    selectedCategory.length > 0 ||
    minRating !== 0 ||
    searchQuery !== "";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Search Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <form action="/products" method="get">
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Product name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </form>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range: ${minPrice} - ${maxPrice}
            </label>
            <form action="/products" method="get" className="space-y-2">
              <div className="flex space-x-4">
                <input
                  type="number"
                  name="minPrice"
                  min="0"
                  max={maxPrice}
                  defaultValue={minPrice}
                  placeholder="Min"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="number"
                  name="maxPrice"
                  min={minPrice}
                  max="1000"
                  defaultValue={maxPrice}
                  placeholder="Max"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Apply
              </button>
            </form>
          </div>

          {/* Category Filter */}
          <form action="/products" method="get" className="space-y-2">
            <div className="flex flex-col space-y-2 max-h-40 overflow-y-auto">
              {/* All Categories option */}
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  value=""
                  defaultChecked={selectedCategory.length === 0}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span>All Categories</span>
              </label>

              {/* Dynamic Category options */}
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    defaultChecked={selectedCategory.includes(category)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Apply
            </button>
          </form>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Rating
            </label>
            <form action="/products" method="get" className="flex items-center">
              <div className="flex items-center mr-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="submit"
                    name="rating"
                    value={rating}
                    className={`text-2xl ${
                      rating <= minRating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              {minRating > 0 && (
                <button
                  type="submit"
                  name="rating"
                  value="0"
                  className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">
            No products found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                    {product.title}
                  </h2>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 capitalize">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(product.rating.rate)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.rating.rate} ({product.rating.count})
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {!areFiltersApplied && (
            <Suspense fallback={<p>Loading more...</p>}>
              <LoadMore />
            </Suspense>
          )}
        </div>
      )}
    </div>
  );
}
