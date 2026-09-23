import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await axios.get(
        `${API_URL}/api/contact`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load messages."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Update message status
  const handleStatusChange = async (message, status) => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.put(
        `${API_URL}/api/contact/${message._id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchMessages();

      // Update modal if open
      if (selectedMessage?._id === message._id) {
        setSelectedMessage({
          ...selectedMessage,
          status,
        });
      }
    } catch (error) {
      console.error("Failed to update message:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update message status."
      );
    }
  };

  // Delete message
  const handleDelete = async (messageId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(
        `${API_URL}/api/contact/${messageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedMessage(null);
      await fetchMessages();
    } catch (error) {
      console.error("Failed to delete message:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete message."
      );
    }
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "new":
        return "bg-orange-100 text-orange-700";

      case "read":
        return "bg-blue-100 text-blue-700";

      case "replied":
        return "bg-green-100 text-green-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Messages
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage messages received from your customers.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <p className="text-slate-500">
            Loading messages...
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

      {/* Messages */}
      {!loading && !error && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

          {/* Summary */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Messages
              </p>

              <p className="text-2xl font-bold text-slate-800 mt-1">
                {messages.length}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-500">
                New
              </p>

              <p className="text-2xl font-bold text-orange-500 mt-1">
                {
                  messages.filter(
                    (message) => message.status === "new"
                  ).length
                }
              </p>
            </div>
          </div>

          {/* Empty */}
          {messages.length === 0 ? (
            <div className="p-10 text-center">
              <div className="text-4xl">📩</div>

              <h3 className="mt-3 text-lg font-semibold text-slate-800">
                No Messages Yet
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Customer messages will appear here.
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
                      Subject
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Message
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Status
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Date
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-slate-600">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {messages.map((message) => (
                    <tr
                      key={message._id}
                      className="hover:bg-slate-50 transition-colors"
                    >

                      {/* Customer */}
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-800">
                          {message.name}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {message.email}
                        </p>
                      </td>

                      {/* Subject */}
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-700 max-w-[180px] truncate">
                          {message.subject || "No subject"}
                        </p>
                      </td>

                      {/* Message */}
                      <td className="px-6 py-4">
                        <p className="text-slate-500 max-w-[250px] truncate">
                          {message.message}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <select
                          value={message.status}
                          onChange={(e) =>
                            handleStatusChange(
                              message,
                              e.target.value
                            )
                          }
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border-0 outline-none cursor-pointer ${getStatusStyle(
                            message.status
                          )}`}
                        >
                          <option value="new">
                            New
                          </option>

                          <option value="read">
                            Read
                          </option>

                          <option value="replied">
                            Replied
                          </option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-slate-500">
                        {formatDate(message.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">

                          <button
                            onClick={() =>
                              setSelectedMessage(message)
                            }
                            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-medium"
                          >
                            View
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(message._id)
                            }
                            className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-medium"
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
      )}

      {/* VIEW MESSAGE MODAL */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b">

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Message Details
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  {formatDate(selectedMessage.createdAt)}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedMessage(null)
                }
                className="text-slate-400 hover:text-slate-700 text-xl"
              >
                ✕
              </button>

            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">

              {/* Name */}
              <div>
                <p className="text-xs text-slate-400">
                  Name
                </p>

                <p className="font-medium text-slate-800 mt-1">
                  {selectedMessage.name}
                </p>
              </div>

              {/* Email */}
              <div>
                <p className="text-xs text-slate-400">
                  Email
                </p>

                <p className="text-slate-700 mt-1">
                  {selectedMessage.email}
                </p>
              </div>

              {/* Phone */}
              <div>
                <p className="text-xs text-slate-400">
                  Phone
                </p>

                <p className="text-slate-700 mt-1">
                  {selectedMessage.phone || "—"}
                </p>
              </div>

              {/* Subject */}
              <div>
                <p className="text-xs text-slate-400">
                  Subject
                </p>

                <p className="font-medium text-slate-800 mt-1">
                  {selectedMessage.subject || "No subject"}
                </p>
              </div>

              {/* Message */}
              <div>
                <p className="text-xs text-slate-400">
                  Message
                </p>

                <div className="mt-2 bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div>
                <p className="text-xs text-slate-400 mb-2">
                  Status
                </p>

                <select
                  value={selectedMessage.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedMessage,
                      e.target.value
                    )
                  }
                  className={`px-3 py-2 rounded-lg text-sm font-medium border-0 outline-none cursor-pointer ${getStatusStyle(
                    selectedMessage.status
                  )}`}
                >
                  <option value="new">
                    New
                  </option>

                  <option value="read">
                    Read
                  </option>

                  <option value="replied">
                    Replied
                  </option>
                </select>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t flex justify-between">

              <button
                onClick={() =>
                  handleDelete(selectedMessage._id)
                }
                className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
              >
                Delete
              </button>

              <button
                onClick={() =>
                  setSelectedMessage(null)
                }
                className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Messages;