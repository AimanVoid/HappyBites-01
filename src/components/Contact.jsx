import { useState } from "react";
import axios from "axios";
import {
  FaWhatsapp,
  FaArrowRight,
  FaPaw,
  FaBoxOpen,
  FaPaperPlane,
} from "react-icons/fa";
import API_URL from "../config";

const message = encodeURIComponent(
  "Hello HappyBites! I have a question about your products.",
);

function Contact({ settings }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      setSuccess("");
      setError("");

      await axios.post(`${API_URL}/api/contact`, form);

      setSuccess(
        "Your message has been sent successfully! We'll get back to you soon.",
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send message:", error);

      setError(
        error.response?.data?.message ||
          "Failed to send your message. Please try again.",
      );
    } finally {
      setSending(false);
    }
  };

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
            {/* LEFT SIDE */}
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
                  <span className="block text-orange-400">HappyBites.</span>
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
                      <p className="text-white font-medium">Pet & Human Food</p>

                      <p className="text-sm text-slate-400">
                        Something for every member of the family.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="bg-slate-50 dark:bg-slate-900 p-8 sm:p-10 lg:p-12 transition-colors duration-300">
              {/* Contact Form */}
              <div>
                <p className="text-sm font-semibold text-orange-500 uppercase tracking-wide">
                  Contact Us
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-800 dark:text-white">
                  Send us a message
                </h3>

                <p className="mt-3 text-slate-500 dark:text-slate-400">
                  Have a question? Fill out the form and we'll get back to you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Name + Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-orange-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Phone
                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="03XX XXXXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-orange-400 transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-orange-400 transition"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What is your message about?"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-orange-400 transition"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    rows="4"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-orange-400 transition resize-none"
                  />
                </div>

                {/* Success */}
                {success && (
                  <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900">
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {success}
                    </p>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane />

                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>

              {/* WhatsApp */}
              <div className="mt-8 pt-7 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm font-semibold text-green-500 uppercase tracking-wide">
                  Prefer WhatsApp?
                </p>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  You can also reach us directly on WhatsApp.
                </p>

                <div className="mt-4">
                  {settings?.whatsappNumber ? (
                    <div className="group bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-green-100 dark:hover:border-green-900 transition-all duration-300">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 shrink-0 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500 text-lg">
                            <FaWhatsapp />
                          </div>

                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              WhatsApp
                            </p>

                            <p className="mt-1 font-semibold text-sm text-slate-800 dark:text-white">
                              +{settings.whatsappNumber}
                            </p>
                          </div>
                        </div>

                        <a
                          href={`https://wa.me/${settings.whatsappNumber}?text=${message}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Chat on WhatsApp +${settings.whatsappNumber}`}
                          className="w-10 h-10 shrink-0 rounded-xl bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                        >
                          <FaArrowRight />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">
                      WhatsApp contact is currently unavailable.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
