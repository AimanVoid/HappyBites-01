import { FaDog, FaCat, FaDove, FaFish, FaUtensils } from "react-icons/fa";

function Categories({ selectedCategory, onCategorySelect, darkMode }) {
  const categories = [
    {
      id: "all",
      title: "All Products",
      description: "Browse everything",
      icon: <FaUtensils />,
    },
    {
      id: "dogs",
      title: "Dog Food",
      description: "Food and essentials for dogs",
      icon: <FaDog />,
    },
    {
      id: "cats",
      title: "Cat Food",
      description: "Food and essentials for cats",
      icon: <FaCat />,
    },
    {
      id: "birds",
      title: "Bird Food",
      description: "Food and essentials for birds",
      icon: <FaDove />,
    },
    {
      id: "fish",
      title: "Fish Food",
      description: "Food and essentials for fish",
      icon: <FaFish />,
    },
    {
      id: "human-food",
      title: "Human Food",
      description: "Food items for everyone",
      icon: <FaUtensils />,
    },
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
            className={`mt-3 ${darkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            Explore our food categories for pets and people.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.map((category) => (
            <button
              onClick={() => {
                onCategorySelect(category.id);
                document.getElementById("shop")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              key={category.id}
              type="button"
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
      </div>
    </section>
  );
}

export default Categories;
