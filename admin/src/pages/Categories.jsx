import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "",
    isActive: true,
  });

  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/categories`
      );

      setCategories(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setFormError("");

    try {
      const token = localStorage.getItem("adminToken");

      if (editingCategory) {
        await axios.put(
          `${API_URL}/api/categories/${editingCategory._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${API_URL}/api/categories`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setEditingCategory(null);
      setShowForm(false);

      setFormData({
        name: "",
        slug: "",
        image: "",
        isActive: true,
      });

      await fetchCategories();
    } catch (error) {
      setFormError(
        error.response?.data?.message ||
          "Failed to save category."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);

    setFormData({
      name: category.name,
      slug: category.slug,
      image: category.image || "",
      isActive: category.isActive,
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(
        `${API_URL}/api/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchCategories();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete category."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-500">
          Loading categories...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Categories
          </h1>

          <p className="text-slate-500 mt-1">
            Manage your product categories.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCategory(null);

            setFormData({
              name: "",
              slug: "",
              image: "",
              isActive: true,
            });

            setFormError("");
            setShowForm(true);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-xl transition"
        >
          + Add Category
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">
            {editingCategory
              ? "Edit Category"
              : "Add New Category"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Dogs"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Slug
              </label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g. dogs"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-4 h-4 accent-orange-500"
              />

              <span className="text-sm font-medium text-slate-700">
                Active Category
              </span>
            </label>

            {formError && (
              <p className="text-red-500 text-sm">
                {formError}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-xl transition disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingCategory
                  ? "Update Category"
                  : "Save Category"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingCategory(null);
                  setFormError("");
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-3 rounded-xl transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No categories found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Category
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Slug
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
                {categories.map((category) => (
                  <tr
                    key={category._id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {category.name}
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {category.slug}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          category.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {category.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleEdit(category)
                          }
                          className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(category._id)
                          }
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

export default Categories;