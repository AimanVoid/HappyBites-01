function Hero({ darkMode }) {
  return (
    <section
      id="home"
      className={`pt-28 pb-16 sm:pt-32 sm:pb-20 bg-gradient-to-br transition-colors duration-300 ${
        darkMode
          ? "from-slate-950 via-slate-900 to-slate-950"
          : "from-orange-50 via-white to-amber-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                darkMode
                  ? "bg-orange-500/10 text-orange-400"
                  : "bg-orange-100 text-orange-600"
              }`}
            >
              🐾 Food for every table
            </span>

            <h1
              className={`mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight ${
                darkMode ? "text-white" : "text-slate-800"
              }`}
            >
              Good Food for
              <span className="block text-orange-500">
                Every Kind of Appetite
              </span>
            </h1>

            <p
              className={`mt-6 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed ${
                darkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Discover delicious food options for your pets and your family, all
              in one place. From everyday pet essentials to tasty food choices
              for people, HappyBites brings them together.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#shop"
                className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-center shadow-sm"
              >
                Shop Now
              </a>

              <a
                href="#categories"
                className={`px-6 py-3 border font-semibold rounded-lg transition-colors text-center ${
                  darkMode
                    ? "border-slate-700 text-slate-200 hover:border-orange-400 hover:text-orange-400"
                    : "border-slate-300 text-slate-700 hover:border-orange-400 hover:text-orange-500"
                }`}
              >
                Explore Categories
              </a>
            </div>

            {/* Small Trust Points */}
            <div
              className={`mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              <span>✓ Pet Food</span>
              <span>✓ Human Food</span>
              <span>✓ Easy Ordering</span>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div
              className={`relative rounded-3xl shadow-lg border overflow-hidden ${
                darkMode
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-orange-100"
              }`}
            >
              {/* Temporary visual area */}
              <div
                className={`h-72 sm:h-96 bg-gradient-to-br flex items-center justify-center ${
                  darkMode
                    ? "from-slate-800 via-slate-900 to-slate-800"
                    : "from-orange-100 via-amber-50 to-white"
                }`}
              >
                <div className="text-center px-6">
                  <div className="text-7xl sm:text-8xl">🐶 🐱</div>

                  <div className="mt-4 text-5xl">🍽️</div>

                  <p
                    className={`mt-4 text-sm sm:text-base ${
                      darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Product imagery will be added once provided by the client.
                  </p>
                </div>
              </div>

              {/* Floating Card */}
              <div
                className={`absolute bottom-5 left-5 right-5 sm:left-6 sm:right-auto backdrop-blur-sm rounded-xl shadow-md px-4 py-3 ${
                  darkMode ? "bg-slate-900/95" : "bg-white/95"
                }`}
              >
                <p
                  className={`text-xs ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  HappyBites
                </p>

                <p
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  Pet & Human Food
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
