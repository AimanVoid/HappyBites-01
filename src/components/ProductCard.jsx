function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="relative h-52 bg-orange-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-center">
            <div className="text-5xl">🍽️</div>

            <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">
              Product image
            </p>
          </div>
        )}

        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700 dark:text-slate-200 capitalize">
          {product.category.replace("-", " ")}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-slate-800 dark:text-white">{product.name}</h3>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-bold text-slate-800 dark:text-white">
            {product.price > 0 ? `Rs ${product.price}` : "Price TBA"}
          </span>

          <button
            type="button"
            disabled={product.price <= 0}
            onClick={() => onAdd(product)}
            className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
