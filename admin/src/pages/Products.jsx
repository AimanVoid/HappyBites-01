import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    stock: "",
    isActive: true,
  });

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(`${API_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete product.");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description || "",
      image: product.image || "",
      stock: product.stock,
      isActive: product.isActive,
    });

    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setFormError("");

    try {
      const token = localStorage.getItem("adminToken");

      if (editingProduct) {
        await axios.put(
          `${API_URL}/api/products/${editingProduct._id}`,
          {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        await axios.post(
          `${API_URL}/api/products`,
          {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      setFormData({
        name: "",
        category: "",
        price: "",
        description: "",
        image: "",
        stock: "",
        isActive: true,
      });

      setEditingProduct(null);

      setShowForm(false);

      await fetchProducts();
    } catch (error) {
      setFormError(error.response?.data?.message || "Failed to add product.");
    } finally {
      setSaving(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);

      setProducts(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categories`);

      setCategories(response.data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Loading products...
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-50 text-red-600 p-4 rounded-xl">{error}</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Products</h1>

          <p className="text-slate-500 mt-1">
            Manage your HappyBites products.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          + Add Product
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Add a new product to your store.
              </p>
            </div>

            <button
              onClick={() => setShowForm(false)}
              className="text-slate-400 hover:text-red-500 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product name"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              <option value="">Select Category</option>

              {categories
                .filter((category) => category.isActive)
                .map((category) => (
                  <option key={category._id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
            </select>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              min="0"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              min="0"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-400 md:col-span-2"
            />

            <div className="md:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-4 h-4 accent-orange-500"
                />

                <span className="text-sm font-medium text-slate-700">
                  Product is active
                </span>
              </label>

              <p className="mt-1 text-xs text-slate-500">
                Inactive products will not appear on the customer website.
              </p>
            </div>

            <div className="md:col-span-2 flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-5 py-3 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              {formError && (
                <p className="md:col-span-2 text-sm text-red-500">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={saving}
                className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingProduct
                    ? "Update Product"
                    : "Save Product"}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No products found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Product
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Category
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Price
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Stock
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    {/* Product */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                            📦
                          </div>
                        )}

                        <div>
                          <p className="font-semibold text-slate-800">
                            {product.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            ID: {product._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 capitalize">{product.category}</td>

                    {/* Price */}
                    <td className="px-6 py-4 font-medium">
                      Rs. {product.price}
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4">{product.stock}</td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {product.isActive ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="px-3 py-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 text-sm font-medium"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
