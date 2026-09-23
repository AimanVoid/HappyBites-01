import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.get(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.put(
        `${API_URL}/api/orders/${selectedOrder._id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSelectedOrder(response.data);
      await fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update order status.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "processing":
        return "bg-purple-100 text-purple-700";

      case "shipped":
        return "bg-indigo-100 text-indigo-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Orders</h1>

        <p className="text-slate-500 mt-1">View and manage customer orders.</p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-4">🛒</div>

            <h2 className="text-lg font-semibold text-slate-700">
              No orders yet
            </h2>

            <p className="text-slate-500 mt-1">
              Customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Customer
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Items
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Total
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Date
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-800">
                        {order.customer?.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {order.customer?.phone}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {order.items?.length || 0}
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-800">
                      Rs. {order.totalAmount}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusClass(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedOrder && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
                <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">
                        Order Details
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        Order ID: {selectedOrder._id}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-slate-500 hover:text-red-500 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  {/* Customer */}
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-800 mb-4">
                      Customer Information
                    </h3>

                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {selectedOrder.customer?.name}
                      </p>

                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {selectedOrder.customer?.phone}
                      </p>

                      <p>
                        <span className="font-medium">Address:</span>{" "}
                        {selectedOrder.customer?.address}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-800 mb-4">
                      Ordered Items
                    </h3>

                    <div className="space-y-3">
                      {selectedOrder.items?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-slate-50 rounded-xl p-4"
                        >
                          <div>
                            <p className="font-medium text-slate-800">
                              {item.name}
                            </p>

                            <p className="text-sm text-slate-500">
                              Rs. {item.price} × {item.quantity}
                            </p>
                          </div>

                          <p className="font-semibold text-slate-800">
                            Rs. {item.subtotal}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="p-6">
                    <div className="flex justify-between mb-3">
                      <span className="text-slate-500">Payment Method</span>

                      <span className="font-medium text-slate-800">
                        {selectedOrder.paymentMethod}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-500">Status</span>

                      <select
                        value={selectedOrder.status}
                        onChange={(e) => handleStatusUpdate(e.target.value)}
                        className="px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-400 bg-white capitalize"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-slate-200">
                      <span className="text-lg font-semibold text-slate-800">
                        Total
                      </span>

                      <span className="text-lg font-bold text-orange-500">
                        Rs. {selectedOrder.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
