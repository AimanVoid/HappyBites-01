import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

function Settings() {
  const [settings, setSettings] = useState({
    businessName: "",
    whatsappNumber: "",
    phone: "",
    email: "",
    address: "",
    deliveryCharges: 0,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/api/settings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSettings(response.data);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
        setError(
          error.response?.data?.message ||
            "Failed to load settings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await axios.put(
        `${API_URL}/api/settings`,
        {
          ...settings,
          deliveryCharges: Number(settings.deliveryCharges),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSettings(response.data);
      setMessage("Settings updated successfully! ✅");
    } catch (error) {
      console.error("Failed to update settings:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update settings."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Settings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your HappyBites business information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Business Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Name
            </label>

            <input
              type="text"
              name="businessName"
              value={settings.businessName}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="HappyBites"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp Number
            </label>

            <input
              type="text"
              name="whatsappNumber"
              value={settings.whatsappNumber}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="923001234567"
            />

            <p className="text-xs text-gray-400 mt-1">
              Use international format without + or spaces.
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="03001234567"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="hello@happybites.com"
            />
          </div>

          {/* Delivery Charges */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Charges (Rs)
            </label>

            <input
              type="number"
              name="deliveryCharges"
              value={settings.deliveryCharges}
              onChange={handleChange}
              min="0"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="150"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Address
            </label>

            <textarea
              name="address"
              value={settings.address}
              onChange={handleChange}
              rows="3"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              placeholder="Karachi, Pakistan"
            />
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="mt-6 rounded-xl bg-green-50 border border-green-200 text-green-700 px-4 py-3">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3">
            {error}
          </div>
        )}

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;