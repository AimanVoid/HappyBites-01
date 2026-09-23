import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
  `${API_URL}/api/products`
);

      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load inventory."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Stock status
  const getStockStatus = (stock) => {
    if (stock === 0) {
      return {
        label: "Out of Stock",
        className: "bg-red-100 text-red-700",
      };
    }

    if (stock <= 5) {
      return {
        label: "Low Stock",
        className: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      label: "In Stock",
      className: "bg-green-100 text-green-700",
    };
  };

  // Open update modal
  const handleOpenStockModal = (product) => {
    setSelectedProduct(product);
    setNewStock(product.stock);
  };

  // Update stock
  const handleUpdateStock = async (e) => {
    e.preventDefault();

    const stockValue = Number(newStock);

    if (!Number.isInteger(stockValue) || stockValue < 0) {
      alert("Stock must be a whole number greater than or equal to 0.");
      return;
    }

    try {
      setUpdating(true);

      const token = localStorage.getItem("adminToken");

      await axios.patch(
        `${API_URL}/api/products/${selectedProduct._id}/stock`,
        {
          stock: stockValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedProduct(null);
      await fetchProducts();
    } catch (error) {
      console.error("Failed to update stock:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update stock."
      );
    } finally {
      setUpdating(false);
    }
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const stock = Number(product.stock || 0);

    let matchesFilter = true;

    if (filter === "in-stock") {
      matchesFilter = stock > 5;
    }

    if (filter === "low-stock") {
      matchesFilter = stock > 0 && stock <= 5;
    }

    if (filter === "out-of-stock") {
      matchesFilter = stock === 0;
    }

    return matchesSearch && matchesFilter;
  });

  // Counts
  const totalProducts = products.length;

  const inStockCount = products.filter(
    (product) => Number(product.stock || 0) > 5
  ).length;

  const lowStockCount = products.filter(
    (product) =>
      Number(product.stock || 0) > 0 &&
      Number(product.stock || 0) <= 5
  ).length;

  const outOfStockCount = products.filter(
    (product) => Number(product.stock || 0) === 0
  ).length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Inventory
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor and manage your product stock.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">
            Total Products
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-800">
            {totalProducts}
          </p>
        </div>

        {/* In Stock */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">
            In Stock
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {inStockCount}
          </p>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">
            Low Stock
          </p>

          <p className="mt-2 text-2xl font-bold text-yellow-600">
            {lowStockCount}
          </p>
        </div>

        {/* Out of Stock */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">
            Out of Stock
          </p>

          <p className="mt-2 text-2xl font-bold text-red-600">
            {outOfStockCount}
          </p>
        </div>

      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

        {/* Toolbar */}
        <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between">

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:max-w-sm px-4 py-2.5 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">
              All Products
            </option>

            <option value="in-stock">
              In Stock
            </option>

            <option value="low-stock">
              Low Stock
            </option>

            <option value="out-of-stock">
              Out of Stock
            </option>
          </select>

        </div>

        {/* Loading */}
        {loading && (
          <div className="p-10 text-center">
            <p className="text-slate-500">
              Loading inventory...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="p-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
              <p className="text-sm text-red-600">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          filteredProducts.length === 0 && (
            <div className="p-10 text-center">

              <div className="text-4xl">
                📦
              </div>

              <h3 className="mt-3 text-lg font-semibold text-slate-800">
                No Products Found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter.
              </p>

            </div>
          )}

        {/* Table */}
        {!loading &&
          !error &&
          filteredProducts.length > 0 && (
            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-slate-50 border-b border-slate-200">

                  <tr>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Product
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Category
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Price
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Stock
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredProducts.map((product) => {

                    const stock = Number(
                      product.stock || 0
                    );

                    const status =
                      getStockStatus(stock);

                    return (
                      <tr
                        key={product._id}
                        className="hover:bg-slate-50 transition-colors"
                      >

                        {/* Product */}
                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                                📦
                              </div>
                            )}

                            <div>
                              <p className="font-medium text-slate-800">
                                {product.name}
                              </p>

                              {!product.isActive && (
                                <p className="text-xs text-red-500 mt-1">
                                  Inactive
                                </p>
                              )}
                            </div>

                          </div>

                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 text-slate-600">
                          {product.category}
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4 text-slate-600">
                          Rs {product.price}
                        </td>

                        {/* Stock */}
                        <td className="px-6 py-4">

                          <span className="font-semibold text-slate-800">
                            {stock}
                          </span>

                          <span className="text-xs text-slate-400 ml-1">
                            units
                          </span>

                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">

                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${status.className}`}
                          >
                            {status.label}
                          </span>

                        </td>

                        {/* Action */}
                        <td className="px-6 py-4">

                          <button
                            onClick={() =>
                              handleOpenStockModal(
                                product
                              )
                            }
                            className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-medium"
                          >
                            Update Stock
                          </button>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          )}

      </div>

      {/* UPDATE STOCK MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b">

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Update Stock
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  {selectedProduct.name}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedProduct(null)
                }
                className="text-slate-400 hover:text-slate-700 text-xl"
              >
                ✕
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleUpdateStock}
              className="p-6 space-y-5"
            >

              <div className="bg-slate-50 rounded-xl p-4">

                <p className="text-sm text-slate-500">
                  Current Stock
                </p>

                <p className="text-2xl font-bold text-slate-800 mt-1">
                  {selectedProduct.stock}
                </p>

              </div>

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Stock Quantity
                </label>

                <input
                  type="number"
                  min="0"
                  step="1"
                  value={newStock}
                  onChange={(e) =>
                    setNewStock(e.target.value)
                  }
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedProduct(null)
                  }
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updating}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-50"
                >
                  {updating
                    ? "Updating..."
                    : "Update Stock"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Inventory;