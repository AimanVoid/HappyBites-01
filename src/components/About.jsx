function About() {
  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-3xl bg-orange-50 dark:bg-slate-900 border border-orange-100 dark:border-slate-800 overflow-hidden">
              <div className="min-h-[360px] flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="text-7xl">
                    🐾 🍽️
                  </div>

                  <p className="mt-5 text-slate-500 dark:text-slate-400">
                    Our food collection
                  </p>

                  <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">
                    Product imagery will be added once provided by the client.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold text-orange-500 uppercase tracking-wide">
              About HappyBites
            </p>

            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
              Food for People & Their Pets
            </h2>

            <p className="mt-5 text-slate-600 dark:text-slate-300 leading-relaxed">
              HappyBites brings pet food and human food together in one
              convenient place. Our goal is to make it easier for customers
              to explore food options for both their families and their pets.
            </p>

            <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              From food for dogs, cats, birds and other pets to everyday food
              options for people, our collection is designed to offer
              something for different needs and preferences.
            </p>

            {/* Highlights */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">

              <div className="p-4 rounded-xl bg-orange-50 dark:bg-slate-900 border border-transparent dark:border-slate-800">
                <div className="text-2xl">🐶</div>

                <h3 className="mt-2 font-semibold text-slate-800 dark:text-white">
                  Pet Food
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Options for different types of pets.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-orange-50 dark:bg-slate-900 border border-transparent dark:border-slate-800">
                <div className="text-2xl">🍴</div>

                <h3 className="mt-2 font-semibold text-slate-800 dark:text-white">
                  Human Food
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Food options for everyday needs.
                </p>
              </div>

            </div>

            <a
              href="#shop"
              className="inline-block mt-8 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Explore Our Shop
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;