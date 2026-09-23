import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaDog,
  FaCat,
  FaDove,
  FaFish,
  FaUtensils,
} from "react-icons/fa";
import API_URL from "../config";

function Categories({ selectedCategory, onCategorySelect, darkMode }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryMeta = {
    dogs: {
      description: "Food and essentials for dogs",
      icon: <FaDog />,
    },
    cats: {
      description: "Food and essentials for cats",
      icon: <FaCat />,
    },
    birds: {
      description: "Food and essentials for birds",
      icon: <FaDove />,
    },
    fish: {
      description: "Food and essentials for fish",
      icon: <FaFish />,
    },
    "human-food": {
      description: "Food items for everyone",
      icon: <FaUtensils />,
    },
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${API_URL}/api/categories`)

        const activeCategories = response.data.filter(
          (category) => category.isActive
        );

        setCategories(activeCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);

        setError("Unable to load categories right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const allCategories = [
    {
      id: "all",
      title: "All Products",
      description: "Browse everything",
      icon: <FaUtensils />,
    },
    ...categories.map((category) => ({
      id: category.slug,
      title: category.name,
      description:
        categoryMeta[category.slug]?.description ||
        "Explore products in this category",
      icon:
        categoryMeta[category.slug]?.icon || <FaUtensils />,
    })),
  ];

  return (
    <section
      id="categories"
      className={`py-20 transition-colors duration-300 ${
        darkMode ? "bg-slate-900" : "bg-slate-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-orange-500 uppercase tracking-wide">
            Browse Categories
          </p>

          <h2
            className={`mt-2 text-3xl sm:text-4xl font-bold ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            Find What You Need
          </h2>

          <p
            className={`mt-3 ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Explore our food categories for pets and people.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-10">
            <div className="text-3xl">⏳</div>

            <p
              className={`mt-3 ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Loading categories...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-10">
            <div className="text-3xl">⚠️</div>

            <p className="mt-3 text-red-500">{error}</p>
          </div>
        )}

        {/* Categories */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {allCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  onCategorySelect(category.id);

                  document.getElementById("shop")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className={`group rounded-2xl border p-6 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${
                  darkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-gray-100"
                } ${
                  selectedCategory === category.id
                    ? darkMode
                      ? "border-orange-500 ring-2 ring-orange-500/20"
                      : "border-orange-500 ring-2 ring-orange-100"
                    : darkMode
                      ? "border-slate-800"
                      : "border-gray-100"
                }`}
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl transition-colors duration-300 ${
                    darkMode
                      ? "bg-orange-500/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-white"
                      : "bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white"
                  }`}
                >
                  {category.icon}
                </div>

                <h3
                  className={`mt-5 font-semibold ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {category.title}
                </h3>

                <p
                  className={`mt-2 text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {category.description}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Categories;