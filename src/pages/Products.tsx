import { useState } from "react";
import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getProducts } from "../api/Products.api";
import useDebounce from "../hooks/useDebounce";

import Button from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/LegacyCard";

function Products() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const limit = 8;
  const skip = page * limit;

  const debouncedSearch = useDebounce(search, 500);

  const { data, isPending, isError } = useQuery({
    queryKey: ["products", debouncedSearch, page, limit],
    queryFn: () =>
      getProducts({
        search: debouncedSearch,
        limit,
        skip,
      }),
    placeholderData: keepPreviousData,
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

  if (!data?.products.length) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            Products
          </h1>

          <input
            type="search"
            value={search}
            placeholder="Search products..."
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(0);
            }}
            className="mb-8 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <p className="text-center text-lg text-gray-600">
            No products found.
          </p>
        </div>
      </main>
    );
  }

  const totalPages = Math.ceil(data.total / limit);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Title */}
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Products
        </h1>

        {/* Search */}
        <div className="mb-8">
          <input
            type="search"
            value={search}
            placeholder="Search products..."
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(0);
            }}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Product Image */}
              <CardHeader className="p-0">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-52 w-full object-cover"
                />
              </CardHeader>

              {/* Product Information */}
              <CardContent className="p-5">
                <h2 className="mb-2 line-clamp-1 text-lg font-semibold text-gray-900">
                  {product.title}
                </h2>

                <p className="mb-2 text-xl font-bold text-blue-600">
                  ${product.price}
                </p>

                <p className="text-sm text-gray-600">
                  ⭐ {product.rating}
                </p>
              </CardContent>

              {/* Actions */}
              <CardFooter className="flex items-center justify-between gap-3 p-5 pt-0">
                <Button
                  text="Add to Cart"
                  onClick={() => console.log("add to cart")}
                  variant="primary"
                />

                <Link to={`/products/${product.id}`}>
                  <Button
                    text="View Details"
                    onClick={() => console.log("view details")}
                    variant="secondary"
                  />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={page === 0}
            onClick={() =>
              setPage((currentPage) => currentPage - 1)
            }
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {page + 1} of {totalPages}
          </span>

          <button
            type="button"
            disabled={page >= totalPages - 1}
            onClick={() =>
              setPage((currentPage) => currentPage + 1)
            }
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

export default Products;