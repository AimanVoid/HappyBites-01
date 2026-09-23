import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import API_URL from "../config";

function Products({ onAdd, selectedCategory, onCategorySelect }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${API_URL}/api/products`)

        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);

        setError("Unable to load products right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <section id="shop" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-orange-500 uppercase tracking-wide">
            Our Shop
          </p>

          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
            Explore Our Products
          </h2>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Browse food options for pets and people.
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing products for
            </p>

            <h3 className="mt-1 text-xl font-semibold text-slate-800 dark:text-white capitalize">
              {selectedCategory === "all"
                ? "All Products"
                : selectedCategory.replace("-", " ")}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => onCategorySelect("all")}
            className="text-sm text-orange-500 hover:text-orange-400"
          >
            Clear Filter
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-4xl">⏳</div>

            <h3 className="mt-4 text-xl font-semibold text-slate-800 dark:text-white">
              Loading Products...
            </h3>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Please wait a moment.
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-12">
            <div className="text-4xl">⚠️</div>

            <h3 className="mt-4 text-xl font-semibold text-slate-800 dark:text-white">
              Something went wrong
            </h3>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {error}
            </p>
          </div>
        )}

        {/* Products */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-5xl">🛒</div>

                <h3 className="mt-4 text-xl font-semibold text-slate-800 dark:text-white">
                  No Products Available
                </h3>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  Products in this category will be available soon.
                </p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAdd={onAdd}
                />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;