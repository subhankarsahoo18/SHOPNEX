import React, { useState } from "react";
import { motion } from "framer-motion";
import mail from "../assets/email-black-envelope-shape.png";
import phone from "../assets/phone.png";
import play from "../assets/play.png";
import appstore from "../assets/appstore.png";
import call from "../assets/phone.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => { setSubscribed(false); setEmail(""); }, 3000);
    }
  };

  const containerVariants = {
    hidden:   { opacity: 0 },
    visible:  { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden:   { opacity: 0, y: 20 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const socialLinks = [
    {
      label: "Facebook",
      hover: "hover:bg-blue-600",
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
    {
      label: "Instagram",
      hover: "hover:bg-pink-600",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    },
    {
      label: "Twitter",
      hover: "hover:bg-sky-500",
      path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
    },
    {
      label: "YouTube",
      hover: "hover:bg-red-600",
      path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
  ];

  return (
    <footer className="mt-20 bg-white">

      {/* ── Newsletter + App + Contact ──────────────────── */}
      <div className="bg-[#4a1080] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className="w-full h-full"
            style={{ backgroundImage: "radial-gradient(circle, #FBBF24 1px, transparent 1px)", backgroundSize: "50px 50px" }}
          />
        </div>

        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <img src={mail} alt="mail" className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold">Stay Updated!</h3>
                  <p className="text-sm text-yellow-200">Get exclusive deals & updates</p>
                </div>
              </div>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="absolute right-1 top-1 bg-yellow-400 text-purple-900 px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition-all"
                >
                  {subscribed ? "✓ Subscribed!" : "Subscribe"}
                </motion.button>
              </form>
            </motion.div>

            {/* Download App */}
            <motion.div
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Download Our App</h3>
              <p className="text-sm text-yellow-200 mb-4">Shop on the go with exclusive app-only offers</p>
              <div className="flex gap-3 justify-center">
                {[
                  { img: play, alt: "Play Store", top: "GET IT ON", name: "Google Play" },
                  { img: appstore, alt: "App Store", top: "Download on", name: "App Store" },
                ].map((app) => (
                  <motion.a
                    key={app.name}
                    whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}
                    href="#"
                    className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-white/30 transition-all"
                  >
                    <img src={app.img} alt={app.alt} className="w-8 h-8" />
                    <div className="text-left">
                      <p className="text-xs">{app.top}</p>
                      <p className="font-bold">{app.name}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
              <div className="space-y-3">
                {[
                  { img: call, alt: "phone", label: "Call us at", value: "1800-123-4567", href: "tel:1800-123-4567" },
                  { img: mail, alt: "email", label: "Email us at", value: "support@shopnex.com", href: "mailto:support@shopnex.com" },
                ].map((contact) => (
                  <motion.a
                    key={contact.value}
                    whileHover={{ x: 5 }} href={contact.href}
                    className="flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 hover:bg-white/30 transition-all"
                  >
                    <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                      <img src={contact.img} alt={contact.alt} className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-purple-100">{contact.label}</p>
                      <p className="font-bold">{contact.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Links Section ──────────────────────────────── */}
      <motion.div
        variants={containerVariants} initial="hidden"
        whileInView="visible" viewport={{ once: true }}
        className="bg-[#2d005a] text-white py-16 px-6"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Company */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold mb-6 relative inline-block">
                <span className="text-white font-extrabold">SHOP<span className="text-yellow-300 font-light">NEX</span></span>
                <motion.div
                  initial={{ width: 0 }} whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full"
                />
              </h2>
              <ul className="space-y-2">
                {["Who are we?","Careers","Authenticity","Press","Testimonials","Shopnex CSR","Sustainability","Responsible Disclosure","Investor Relations"].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 5, color: "#c084fc" }}
                    className="text-gray-300 hover:text-yellow-300 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <motion.span initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="text-yellow-400">→</motion.span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Help */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 text-yellow-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" /> Help
              </h3>
              <ul className="space-y-2">
                {["Contact Us","FAQs","Store Locator","Cancellation & Returns","Shipping & Delivery","Sell on Shopnex"].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 5, color: "#c084fc" }}
                    className="text-gray-400 hover:text-purple-400 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <motion.span initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="text-yellow-400">→</motion.span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Inspire Me */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 text-yellow-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" /> Inspire Me
              </h3>
              <ul className="space-y-2">
                {["Beauty Book","Games Board","Buying Guides"].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 5, color: "#c084fc" }}
                    className="text-gray-400 hover:text-purple-400 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <motion.span initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="text-yellow-400">→</motion.span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 text-yellow-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" /> Quick Links
              </h3>
              <ul className="space-y-2">
                {["Offer Zone","New Launches","Shopnex Man","Shopnex Fashion","Shopnex Pro","Sitemap"].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 5, color: "#c084fc" }}
                    className="text-gray-400 hover:text-purple-400 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <motion.span initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="text-yellow-400">→</motion.span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social + Payments */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 text-yellow-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" /> Follow Us
              </h3>
              <p className="text-gray-400 text-sm mb-4">Stay connected on social media</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((s, i) => (
                  <motion.a
                    key={i} href="#" whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center ${s.hover} transition-colors group`}
                  >
                    <svg className="w-5 h-5 fill-current text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                      <path d={s.path} />
                    </svg>
                  </motion.a>
                ))}
              </div>
              <div className="mt-8">
                <h4 className="text-sm font-semibold mb-3 text-gray-300">We Accept</h4>
                <div className="flex flex-wrap gap-2">
                  {["VISA","MC","AMEX","PayPal"].map((p, i) => (
                    <motion.div key={i} whileHover={{ y: -2 }}
                      className="bg-white/10 border border-yellow-400/20 px-3 py-1 rounded text-xs font-bold text-gray-300"
                    >{p}</motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent mb-8"
          />

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          >
            {[
              { icon: "🚚", title: "Free Shipping",   desc: "On orders over ₹500" },
              { icon: "🔄", title: "Easy Returns",    desc: "30-day return policy" },
              { icon: "🔒", title: "Secure Payment",  desc: "100% protected" },
              { icon: "💯", title: "Authentic",       desc: "100% genuine products" },
            ].map((badge, i) => (
              <motion.div key={i} whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-sm border border-yellow-400/20 rounded-xl p-4 text-center"
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h4 className="font-bold text-white mb-1">{badge.title}</h4>
                <p className="text-xs text-gray-400">{badge.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom Bar ─────────────────────────────────── */}
      <div className="bg-[#3b0068] relative overflow-hidden">
        {/* Animated gold shimmer top border */}
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            backgroundImage: "linear-gradient(90deg, transparent 0%, #FBBF24 30%, #F59E0B 50%, #FBBF24 70%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
        />

        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">

            {/* Logo */}
            <motion.div whileHover={{ scale: 1.04 }} className="flex items-center gap-2 cursor-default">
              <motion.svg
                viewBox="0 0 24 24" fill="none" stroke="#FBBF24"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="w-6 h-6"
                animate={{ rotate: [0, 15, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </motion.svg>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                SHOP<span className="font-light text-yellow-300">NEX</span>
              </span>
            </motion.div>

            {/* Quick links */}
            <div className="flex items-center gap-1">
              {["About","Help","Contact","Privacy"].map((label, i) => (
                <div key={label} className="flex items-center">
                  <motion.a
                    href="#"
                    whileHover={{ y: -2 }}
                    className="px-3 py-1 text-sm font-medium text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                  >
                    {label}
                  </motion.a>
                  {i < 3 && <span className="text-white/20 text-xs select-none">|</span>}
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href="#" aria-label={s.label}
                  whileHover={{ scale: 1.2, rotate: 6 }} whileTap={{ scale: 0.9 }}
                  className={`w-8 h-8 bg-white/10 rounded-full flex items-center justify-center ${s.hover} transition-colors duration-200`}
                >
                  <svg className="w-4 h-4 fill-current text-gray-300" viewBox="0 0 24 24">
                    <path d={s.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-5 pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-gray-500">
              © 2025{" "}
              <span className="text-yellow-400/80 font-semibold">Shopnex E-RETAIL LIMITED</span>
              . All Rights Reserved. Made with{" "}
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="inline-block text-pink-400"
              >
                ❤️
              </motion.span>{" "}
              for shopping lovers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
