import { useState } from "react";
import { FaShoppingCart, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import categories from "../data/categories";

function Navbar({ cartCount = 0, openCart, darkMode, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Shop", href: "#shop" },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
    setCategoriesOpen(false);
    setMobileCategoriesOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full backdrop-blur-md shadow-sm z-50 transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950/95 border-b border-slate-800"
          : "bg-white/95 border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className={`text-2xl font-bold transition-colors ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
            onClick={handleLinkClick}
          >
            Happy<span className="text-orange-500">Bites</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className={`px-3 py-2 text-sm transition-colors ${
                  darkMode
                    ? "text-slate-300 hover:text-orange-400"
                    : "text-slate-700 hover:text-orange-500"
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCategoriesOpen((prev) => !prev)}
                className={`flex items-center gap-1 px-3 py-2 text-sm transition-colors ${
                  darkMode
                    ? "text-slate-300 hover:text-orange-400"
                    : "text-slate-700 hover:text-orange-500"
                }`}
              >
                Categories
                <FaChevronDown
                  size={11}
                  className={`transition-transform ${
                    categoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {categoriesOpen && (
                <div
                  className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg border py-2 transition-colors ${
                    darkMode
                      ? "bg-slate-900 border-slate-700"
                      : "bg-white border-gray-100"
                  }`}
                >
                  {categories.map((category) => (
                    <a
                      key={category.label}
                      href={category.href}
                      onClick={handleLinkClick}
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        darkMode
                          ? "text-slate-300 hover:bg-slate-800 hover:text-orange-400"
                          : "text-slate-700 hover:bg-orange-50 hover:text-orange-500"
                      }`}
                    >
                      {category.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Contact */}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className={`px-3 py-3 rounded-md transition-colors ${
                darkMode
                  ? "text-slate-300 hover:bg-slate-800 hover:text-orange-400"
                  : "text-slate-700 hover:bg-orange-50 hover:text-orange-500"
              }`}
            >
              Contact
            </a>
          </div>

          {/* Cart + Mobile Button */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                darkMode
                  ? "bg-slate-800 text-yellow-300 hover:bg-slate-700"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              aria-label="Toggle theme"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <FaShoppingCart />
              <span>Cart</span>

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden p-2 text-slate-700 hover:text-orange-500"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div
            className={`md:hidden border-t py-3 ${
              darkMode
                ? "border-slate-800 bg-slate-950"
                : "border-gray-100 bg-white"
            }`}
          >
            <div className="flex flex-col">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`px-3 py-3 rounded-md transition-colors ${
                    darkMode
                      ? "text-slate-300 hover:bg-slate-800 hover:text-orange-400"
                      : "text-slate-700 hover:bg-orange-50 hover:text-orange-500"
                  }`}
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Categories */}
              <button
                type="button"
                onClick={() => setMobileCategoriesOpen((prev) => !prev)}
                className={`flex items-center justify-between px-3 py-3 rounded-md transition-colors ${
                  darkMode
                    ? "text-slate-300 hover:bg-slate-800 hover:text-orange-400"
                    : "text-slate-700 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                <span>Categories</span>

                <FaChevronDown
                  size={12}
                  className={`transition-transform ${
                    mobileCategoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileCategoriesOpen && (
                <div className="ml-4 flex flex-col border-l-2 border-orange-100">
                  {categories.map((category) => (
                    <a
                      key={category.label}
                      href={category.href}
                      onClick={handleLinkClick}
                      className={`px-4 py-2.5 text-sm transition-colors ${
                        darkMode
                          ? "text-slate-400 hover:text-orange-400"
                          : "text-slate-600 hover:text-orange-500"
                      }`}
                    >
                      {category.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Contact */}
              <a
                href="#contact"
                onClick={handleLinkClick}
                className={`px-3 py-3 rounded-md transition-colors ${
                  darkMode
                    ? "text-slate-300 hover:bg-slate-800 hover:text-orange-400"
                    : "text-slate-700 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
