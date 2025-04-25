import { Product } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    notFound(); // This will show the 404 page
  }
  return res.json();
}

// Use the correct PageProps type from Next.js
type PageProps = {
  params: { id: number };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProduct(params.id);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <div className="relative h-96 bg-white rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
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
              <span className="text-gray-600">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-gray-500 uppercase bg-gray-100 px-2 py-1 rounded">
                {product.category}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
