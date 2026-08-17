import {
  FaShoppingCart,
  FaTimes,
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowRight,
} from "react-icons/fa";

function CartSidebar({
  isOpen,
  close,
  cart,
  increase,
  decrease,
  remove,
  clear,
  checkout,
}) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`absolute top-0 right-0 h-full w-full sm:max-w-md
        bg-white dark:bg-slate-950
        shadow-2xl
        transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="h-full flex flex-col">

          {/* Header */}
          <div className="px-5 sm:px-6 py-5 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  <FaShoppingCart />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                    Your Cart
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {cart.length === 0
                      ? "No items yet"
                      : `${totalItems} item${
                          totalItems > 1 ? "s" : ""
                        } in your cart`}
                  </p>
                </div>
              </div>

              <button
                onClick={close}
                className="w-10 h-10 rounded-xl flex items-center justify-center
                text-slate-500 dark:text-slate-400
                hover:bg-gray-100 dark:hover:bg-slate-800
                hover:text-slate-800 dark:hover:text-white
                transition-colors"
                aria-label="Close cart"
              >
                <FaTimes />
              </button>

            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">

            {cart.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center">
                <div className="max-w-xs">

                  <div className="w-20 h-20 mx-auto rounded-full bg-orange-50 dark:bg-slate-900 flex items-center justify-center text-orange-400 text-3xl">
                    <FaShoppingCart />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-700 dark:text-white">
                    Your cart is empty
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    Looks like you haven't added anything yet.
                    Explore our products and find something delicious.
                  </p>

                  <button
                    onClick={close}
                    className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Start Shopping
                    <FaArrowRight className="text-xs" />
                  </button>

                </div>
              </div>
            ) : (
              <div className="space-y-4">

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="group p-3 rounded-2xl
                    bg-slate-50 dark:bg-slate-900
                    border border-gray-100 dark:border-slate-800
                    hover:border-orange-200 dark:hover:border-slate-700
                    transition-all duration-300"
                  >
                    <div className="flex gap-3">

                      {/* Image */}
                      <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-orange-50 dark:bg-slate-800">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            🍽️
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">

                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-slate-800 dark:text-white truncate">
                              {item.name}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                              Rs {item.price} each
                            </p>
                          </div>

                          <button
                            onClick={() => remove(item.id)}
                            className="w-8 h-8 shrink-0 rounded-lg flex items-center justify-center
                            text-slate-400 hover:text-red-500
                            hover:bg-red-50 dark:hover:bg-red-500/10
                            transition-colors"
                            aria-label={`Remove ${item.name}`}
                            title="Remove item"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">

                          {/* Quantity */}
                          <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-950">

                            <button
                              onClick={() => decrease(item.id)}
                              className="w-8 h-8 flex items-center justify-center
                              text-slate-600 dark:text-slate-300
                              hover:bg-gray-100 dark:hover:bg-slate-800
                              transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <FaMinus className="text-[9px]" />
                            </button>

                            <span className="w-9 text-center text-sm font-semibold text-slate-800 dark:text-white">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => increase(item.id)}
                              className="w-8 h-8 flex items-center justify-center
                              text-slate-600 dark:text-slate-300
                              hover:bg-gray-100 dark:hover:bg-slate-800
                              transition-colors"
                              aria-label="Increase quantity"
                            >
                              <FaPlus className="text-[9px]" />
                            </button>

                          </div>

                          {/* Subtotal */}
                          <p className="font-bold text-slate-800 dark:text-white">
                            Rs {item.price * item.quantity}
                          </p>

                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-5 sm:px-6 py-5">

              {/* Total */}
              <div className="flex items-end justify-between mb-5">

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Cart Total
                  </p>

                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    {totalItems} item{totalItems > 1 ? "s" : ""}
                  </p>
                </div>

                <span className="text-2xl font-bold text-slate-800 dark:text-white">
                  Rs {total}
                </span>

              </div>

              {/* Checkout */}
              <button
                onClick={checkout}
                className="w-full flex items-center justify-center gap-2 py-3.5
                bg-orange-500 text-white font-semibold rounded-xl
                hover:bg-orange-600
                shadow-sm hover:shadow-md
                transition-all duration-300"
              >
                Continue to Checkout
                <FaArrowRight className="text-xs" />
              </button>

              {/* Clear */}
              <button
                onClick={clear}
                className="w-full mt-2 py-2.5
                text-sm font-medium
                text-red-500
                hover:bg-red-50 dark:hover:bg-red-500/10
                rounded-lg
                transition-colors"
              >
                Clear Cart
              </button>

            </div>
          )}

        </div>
      </aside>
    </div>
  );
}

export default CartSidebar;