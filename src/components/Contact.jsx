import {
  FaWhatsapp,
  FaArrowRight,
  FaPaw,
  FaBoxOpen,
} from "react-icons/fa";

const WHATSAPP_NUMBERS = [
  {
    number: "923703148097",
    display: "+92 370 3148097",
  },
  {
    number: "923323486324",
    display: "+92 332 3486324",
  },
];

const message = encodeURIComponent(
  "Hello HappyBites! I have a question about your products."
);

function Contact() {
  return (
    <section
      id="contact"
      className="py-24 bg-slate-100 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-orange-500 uppercase tracking-[0.2em]">
            Get in Touch
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
            Let's Talk
          </h2>

          <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed">
            Whether you have a question about our products, need help with an
            order, or simply want to know what's available, we're here to help.
          </p>
        </div>

        {/* Main Contact Card */}
        <div className="max-w-6xl mx-auto overflow-hidden rounded-3xl bg-slate-900 shadow-xl">

          <div className="grid lg:grid-cols-2">

            {/* Left Side */}
            <div className="relative p-8 sm:p-10 lg:p-12 overflow-hidden">

              {/* Decorative circles */}
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-orange-500/10" />
              <div className="absolute -bottom-24 -left-20 w-56 h-56 rounded-full bg-orange-500/5" />

              <div className="relative z-10">

                {/* Brand */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-orange-300 text-sm font-medium">
                  <FaPaw />
                  HappyBites
                </div>

                <h3 className="mt-8 text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Food for every
                  <span className="block text-orange-400">
                    HappyBites.
                  </span>
                </h3>

                <p className="mt-5 text-slate-300 leading-relaxed max-w-md">
                  We're making it easier to find food for the people and pets
                  you care about. Have a question? Just reach out to us.
                </p>

                {/* Quick Info */}
                <div className="mt-8 space-y-4">

                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-orange-400">
                      <FaBoxOpen />
                    </div>

                    <div>
                      <p className="text-white font-medium">
                        Product & Order Questions
                      </p>

                      <p className="text-sm text-slate-400">
                        Ask us about products and availability.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-orange-400">
                      <FaPaw />
                    </div>

                    <div>
                      <p className="text-white font-medium">
                        Pet & Human Food
                      </p>

                      <p className="text-sm text-slate-400">
                        Something for every member of the family.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="bg-slate-50 dark:bg-slate-900 p-8 sm:p-10 lg:p-12 transition-colors duration-300">

              <div>
                <p className="text-sm font-semibold text-orange-500 uppercase tracking-wide">
                  WhatsApp
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-800 dark:text-white">
                  Chat with us
                </h3>

                <p className="mt-3 text-slate-500 dark:text-slate-400">
                  Send us a message on WhatsApp and we'll be happy to assist
                  you.
                </p>
              </div>

              {/* WhatsApp Numbers */}
              <div className="mt-8 space-y-4">

                {WHATSAPP_NUMBERS.map((contact, index) => (
                  <div
                    key={contact.number}
                    className="group bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-green-100 dark:hover:border-green-900 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-4">

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 shrink-0 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500 text-xl">
                          <FaWhatsapp />
                        </div>

                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            WhatsApp {index + 1}
                          </p>

                          <p className="mt-1 font-semibold text-slate-800 dark:text-white">
                            {contact.display}
                          </p>
                        </div>

                      </div>

                      <a
                        href={`https://wa.me/${contact.number}?text=${message}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Chat on WhatsApp ${contact.display}`}
                        className="w-11 h-11 shrink-0 rounded-xl bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                      >
                        <FaArrowRight />
                      </a>

                    </div>
                  </div>
                ))}

              </div>

              {/* Bottom Note */}
              <div className="mt-6 flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400">
                <FaWhatsapp className="mt-1 text-green-500 shrink-0" />

                <p>
                  You can also confirm your orders through WhatsApp during
                  checkout.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;