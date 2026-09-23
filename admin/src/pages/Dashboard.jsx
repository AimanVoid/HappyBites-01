import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await axios.get(
          `${API_URL}/api/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Here's what's happening with your store.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Products */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Products
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {stats.products}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
              📦
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Orders
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {stats.orders}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
              🛒
            </div>
          </div>
        </div>

        {/* Customers */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Customers
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {stats.customers}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
              👥
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                New Messages
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {stats.newMessages}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
              💬
            </div>
          </div>
        </div>

      </div>

      {/* Pending Orders */}
      <div className="mt-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Pending Orders
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Orders waiting for confirmation
            </p>
          </div>

          <span className="text-3xl font-bold text-orange-500">
            {stats.pendingOrders}
          </span>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            Recent Orders
          </h2>
        </div>

        {stats.recentOrders.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No orders yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Customer
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Amount
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t border-slate-100"
                  >
                    <td className="px-6 py-4">
                      {order.customer.name}
                    </td>

                    <td className="px-6 py-4">
                      Rs. {order.totalAmount}
                    </td>

                    <td className="px-6 py-4 capitalize">
                      {order.status}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
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

export default Dashboard;