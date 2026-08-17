import { useState } from "react";
import config from "../data/config";

function Checkout({ cart, onClose, onOrderComplete }) {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderItems = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} x${item.quantity} - Rs ${
            item.price * item.quantity
          }`
      )
      .join("\n");

    const message = `
Hello HappyBites! 👋

I would like to place an order.

Customer Details:
Name: ${customer.name}
Phone: ${customer.phone}
Address: ${customer.address}

Order:
${orderItems}

Total: Rs ${total}

Payment Method: Cash on Delivery
    `.trim();

    const whatsappUrl = `https://wa.me/${
      config.whatsappNumber
    }?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
    onOrderComplete();
  };

  return (
    <section className="py-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onClose}
            className="text-sm text-orange-500 hover:text-orange-400 transition-colors"
          >
            ← Back to Cart
          </button>

          <h2 className="mt-3 text-3xl font-bold text-slate-800 dark:text-white">
            Checkout
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Enter your details to place your order.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Customer Details */}
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 transition-colors duration-300"
          >
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">
              Customer Details
            </h3>

            <div className="space-y-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  required
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900/50 focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      phone: e.target.value,
                    })
                  }
                  placeholder="03XX XXXXXXX"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900/50 focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Delivery Address
                </label>

                <textarea
                  required
                  rows="4"
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      address: e.target.value,
                    })
                  }
                  placeholder="Enter your complete address"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-gray-200 dark:border-slate-700 rounded-lg outline-none resize-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900/50 focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Payment */}
              <div className="bg-orange-50 dark:bg-orange-950/30 rounded-lg p-4">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Payment Method
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Cash on Delivery
                </p>
              </div>

              {/* Place Order */}
              <button
                type="submit"
                className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                Place Order
              </button>

            </div>
          </form>

          {/* Order Summary */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 h-fit transition-colors duration-300">

            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">
              Order Summary
            </h3>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />

                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">
                        {item.name}
                      </p>

                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Qty: {item.quantity}
                      </p>
                    </div>

                  </div>

                  <p className="font-semibold text-slate-800 dark:text-white">
                    Rs {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 dark:border-slate-700 mt-6 pt-5">
              <div className="flex items-center justify-between">

                <span className="text-slate-600 dark:text-slate-400">
                  Total
                </span>

                <span className="text-xl font-bold text-slate-800 dark:text-white">
                  Rs {total}
                </span>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Checkout;