import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    isActive: true,
  });

  const [saving, setSaving] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await axios.get(
        `${API_URL}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCustomers(response.data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load customers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Open edit modal
  const handleEdit = (customer) => {
    setEditingCustomer(customer);

    setForm({
      name: customer.name || "",
      phone: customer.phone || "",
      email: customer.email || "",
      address: customer.address || "",
      isActive: customer.isActive,
    });
  };

  // Save edited customer
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("adminToken");

      await axios.put(
        `${API_URL}/api/users/${editingCustomer._id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditingCustomer(null);
      await fetchCustomers();
    } catch (error) {
      console.error("Failed to update customer:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update customer."
      );
    } finally {
      setSaving(false);
    }
  };

  // Toggle active/inactive
  const handleToggleStatus = async (customer) => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.put(
        `${API_URL}/api/users/${customer._id}`,
        {
          isActive: !customer.isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchCustomers();
    } catch (error) {
      console.error("Failed to update customer status:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update customer status."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Customers
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your HappyBites customers.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <p className="text-slate-500">
            Loading customers...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* Customers */}
      {!loading && !error && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {/* Count */}
          <div className="px-6 py-4 border-b border-slate-200">
            <p className="text-sm text-slate-500">
              Total Customers
            </p>

            <p className="text-2xl font-bold text-slate-800 mt-1">
              {customers.length}
            </p>
          </div>

          {/* Empty */}
          {customers.length === 0 ? (
            <div className="p-10 text-center">
              <div className="text-4xl">👥</div>

              <h3 className="mt-3 text-lg font-semibold text-slate-800">
                No Customers Yet
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Customers will appear here after placing an order.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Customer
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Phone
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {customers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      {/* Customer */}
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-800">
                          {customer.name}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {customer.address || "No address"}
                        </p>
                      </td>

                      {/* Phone */}
                      <td className="px-6 py-4 text-slate-600">
                        {customer.phone}
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-slate-600">
                        {customer.email || "—"}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            customer.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {customer.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setSelectedCustomer(customer)
                            }
                            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-medium"
                          >
                            View
                          </button>

                          <button
                            onClick={() =>
                              handleEdit(customer)
                            }
                            className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-medium"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleToggleStatus(customer)
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                              customer.isActive
                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                : "bg-green-50 text-green-600 hover:bg-green-100"
                            }`}
                          >
                            {customer.isActive
                              ? "Deactivate"
                              : "Activate"}
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
      )}

      {/* VIEW MODAL */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <h2 className="text-lg font-bold text-slate-800">
                Customer Details
              </h2>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-slate-400 hover:text-slate-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs text-slate-400">
                  Name
                </p>
                <p className="font-medium text-slate-800">
                  {selectedCustomer.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Phone
                </p>
                <p className="text-slate-700">
                  {selectedCustomer.phone}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Email
                </p>
                <p className="text-slate-700">
                  {selectedCustomer.email || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Address
                </p>
                <p className="text-slate-700">
                  {selectedCustomer.address || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Status
                </p>

                <span
                  className={`inline-flex mt-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                    selectedCustomer.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedCustomer.isActive
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>
            </div>

            <div className="px-6 py-4 border-t flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingCustomer && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between px-6 py-5 border-b">
              <h2 className="text-lg font-bold text-slate-800">
                Edit Customer
              </h2>

              <button
                onClick={() => setEditingCustomer(null)}
                className="text-slate-400 hover:text-slate-700 text-xl"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSave}
              className="p-6 space-y-4"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone
                </label>

                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Address
                </label>

                <textarea
                  value={form.address}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      address: e.target.value,
                    })
                  }
                  rows="3"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isActive: e.target.checked,
                    })
                  }
                  className="w-4 h-4"
                />

                <span className="text-sm text-slate-700">
                  Active Customer
                </span>
              </label>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() =>
                    setEditingCustomer(null)
                  }
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;