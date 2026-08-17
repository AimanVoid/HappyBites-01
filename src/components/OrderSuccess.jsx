function OrderSuccess({ onContinueShopping }) {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20 px-4 transition-colors duration-300">

      <div className="max-w-md w-full text-center bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 transition-colors duration-300">

        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-4xl text-green-600 dark:text-green-400">
          ✓
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-3xl font-bold text-slate-800 dark:text-white">
          Order Confirmed!
        </h2>

        <p className="mt-3 text-slate-500 dark:text-slate-400 leading-relaxed">
          Your order details have been opened in WhatsApp.
          Please send the message to confirm your order.
        </p>

        {/* Payment */}
        <div className="mt-6 bg-orange-50 dark:bg-orange-950/30 rounded-xl p-4 text-left">

          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Payment Method
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Cash on Delivery
          </p>

        </div>

        {/* Continue Shopping */}
        <button
          onClick={onContinueShopping}
          className="mt-6 w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
        >
          Continue Shopping
        </button>

      </div>
    </section>
  );
}

export default OrderSuccess;