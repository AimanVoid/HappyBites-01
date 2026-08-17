import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaArrowRight,
  FaPaw,
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

const INSTAGRAM_URL = "https://www.instagram.com/_aimanmaroof/";
const EMAIL = "aiman.maroofofficial@gmail.com";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div>
            <a
              href="#home"
              className="inline-flex items-center gap-2 text-2xl font-bold text-white"
            >
              <span className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <FaPaw className="text-orange-400 text-lg" />
              </span>

              Happy<span className="text-orange-400">Bites</span>
            </a>

            <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-xs">
              Bringing food options for people and pets together in one place.
              Simple, convenient, and made for every member of the family.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow HappyBites on Instagram"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
              >
                <FaInstagram />
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBERS[0].number}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with HappyBites on WhatsApp"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-300"
              >
                <FaWhatsapp />
              </a>

              <a
                href={`mailto:${EMAIL}`}
                aria-label="Email HappyBites"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
              >
                <FaEnvelope />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["Home", "#home"],
                ["About", "#about"],
                ["Categories", "#categories"],
                ["Shop", "#shop"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    <span className="text-orange-400 opacity-0 -ml-4 group-hover:opacity-100">
                      →
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4">

              {/* Email */}
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-start gap-3 text-sm text-slate-400 hover:text-orange-400 transition-colors"
              >
                <FaEnvelope className="mt-1 text-orange-400 shrink-0" />

                <span className="break-all">
                  {EMAIL}
                </span>
              </a>

              {/* WhatsApp */}
              {WHATSAPP_NUMBERS.map((contact) => (
                <a
                  key={contact.number}
                  href={`https://wa.me/${contact.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-green-400 transition-colors"
                >
                  <FaWhatsapp className="text-green-500 shrink-0" />
                  {contact.display}
                </a>
              ))}

            </div>
          </div>

          {/* Help CTA */}
          <div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">

              <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                <FaWhatsapp className="text-xl" />
              </div>

              <h3 className="mt-4 text-white font-semibold text-lg">
                Need Help?
              </h3>

              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Have a question about a product or your order? Reach out to us
                directly on WhatsApp.
              </p>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBERS[0].number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-5 px-4 py-3 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp />
                Chat on WhatsApp
                <FaArrowRight className="text-xs" />
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-slate-700/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">

          <p className="text-slate-500">
            © {currentYear} HappyBites. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-slate-500">
            <span>Made for</span>
            <FaPaw className="text-orange-400" />
            <span>pets & people</span>
          </div>

          <a
            href="#home"
            className="text-slate-400 hover:text-orange-400 transition-colors"
          >
            Back to top ↑
          </a>

        </div>

      </div>
    </footer>
  );
}

export default Footer;