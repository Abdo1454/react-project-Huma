import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/Products.api";

function ProductDetails() {
  const { id } = useParams();

  const productId = Number(id);

  const { data: product, isPending, isError } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !Number.isNaN(productId),
  });

  if (isPending) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <p className="text-center text-lg text-gray-600">
          Loading products...
        </p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <p className="text-center text-lg text-red-600">
          Failed to load products.
        </p>
      </main>
    );
  }

  

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-6 shadow-sm">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-full max-h-96 w-full rounded-lg object-cover"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-blue-600">
              {product.category}
            </p>

            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <p className="mb-6 text-gray-600">
              {product.description}
            </p>

            <p className="mb-3 text-2xl font-bold text-blue-600">
              ${product.price}
            </p>

            <p className="mb-2 text-gray-700">
              ⭐ {product.rating}
            </p>

            <p className="text-gray-700">
              Stock: {product.stock}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails
