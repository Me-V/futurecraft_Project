"use client";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";

async function fetchMoreProducts(page: number): Promise<Product[]> {
  const response = await fetch(
    `https://fakestoreapi.com/products?limit=10&page=${page}`
  );
  return response.json();
}

export default function LoadMore() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const loadMoreProducts = async () => {
    const nextPage = page + 1;
    const newProducts = await fetchMoreProducts(nextPage);

    if (newProducts.length === 0) {
      setHasMore(false);
      return;
    }

    setProducts((prev) => [...prev, ...newProducts]);
    setPage(nextPage);
  };

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreProducts();
    }
  }, [inView, hasMore]);

  return (
    <>
      {products.map((product) => (
        <Link 
          href={`/products/${product.id}`} 
          key={`product-${product.id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
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
                    key={`star-${product.id}-${i}`}
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
        </Link>
      ))}

      {hasMore && (
        <div ref={ref} className="col-span-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="bg-gray-200 h-48 animate-pulse"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}