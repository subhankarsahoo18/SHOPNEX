// import React from "react";
// import mail from "../assets/email-black-envelope-shape.png";
// import phone from "../assets/phone.png"
// import play from "../assets/play.png";
// import appstore from "../assets/appstore.png";
// import call from "../assets/phone.png";
// const Footer = () => {
//   return (
//     <div className="mt-10">
//       <div className="bg-gray-800 text-gray-100 h-50 flex items-center justify-center gap-10">
//         <div>
//           <div className="flex gap-2 items-center">
//             <img src={mail} alt="Email" className="h-9 w-9 text-gray-100" />
//             <h1 className="text-gray-100">
//               Get special discounts on your inbox
//             </h1>
//           </div>
//           <div className="mt-4 flex">
//             <input
//               type="text"
//               placeholder=" your email"
//               className="p-2 border-gray-100 border-b-2"
//             />
//             <button className="border text-white p-2 ml-2 px-4">Send</button>
//           </div>
//         </div>
//         <div className="ml-20 flex flex-col items-center">
//           <div className="flex gap-2 items-center">
//             <img src={phone} alt="Phone" className="h-9 w-9 text-gray-100" />
//             <h1 className="text-gray-100">EXPRIENCE THE Shopnex MOBILE APP</h1>
//           </div>
//           <div className="mt-4 flex">
//             <img
//               src={play}
//               alt="Play Store"
//               className="h-10 w-32 cursor-pointer"
//             />
//             <img
//               src={appstore}
//               alt="App Store"
//               className="h-10 w-32 cursor-pointer ml-2"
//             />
//           </div>
//         </div>
//         <div className="flex  ml-20 flex-col items-center justify-center">
//           <div className="flex">
//             <img src={call} alt="Call" className="h-9 w-9 text-gray-100" />
//             <h1 className="ml-2">
//               FOR ANY HELP,YOU MAY CALL US AT <br /> 1800-267-4444
//             </h1>
//           </div>

//           <h1 className="mt-2">(All days, 8 AM to 10 PM)</h1>
//         </div>
//       </div>
//       <div className="flex justify-center items-center gap-20 text-white h-90 bg-black">
//         <div>
//           <h1 className="text-4xl mb-5">SHOPNEX</h1>
//           <ul>
//             <li>Who are we?</li>
//             <li>Careers</li>
//             <li>Authenticity</li>
//             <li>Press</li>
//             <li>Testimonials</li>
//             <li>Shopnex CSR</li>
//             <li>Sustainability</li>
//             <li>Responsible Disclosure</li>
//             <li>Investor Relations</li>
//             <li>Link to Smart ODR</li>
//           </ul>
//         </div>
//         <div>
//           <h1 className="font-bold">Help</h1>
//           <ul>
//             <li>Contact Us</li>
//             <li>FAQs</li>
//             <li>Store Locator</li>
//             <li>Cancellation&returns</li>
//             <li>Shipping & Delivery</li>
//             <li>Sell on Shopnex</li>
//           </ul>
//         </div>
//         <div className="mb-20">
//           <h1 className="font-bold">Inspire me</h1>
//           <ul>
//             <li>Beauty Book</li>
//             <li>Games Board</li>
//             <li>Buying Guides</li>
//           </ul>
//         </div>
//         <div>
//           <h1 className="font-bold">Quick Links</h1>
//           <ul>
//             <li>Offer Zone</li>
//             <li>New Launches</li>
//             <li>Shopnex Man</li>
//             <li>Shopnex Fashion</li>
//             <li>Shopnex Pro</li>
//             <li>Sitemap</li>
//           </ul>
//         </div>
//         </div>
//       <div className="bg-green-600 text-white h-25 flex flex-col items-center justify-center gap-4">
//         <div className="flex gap-3 ">
//           <h1>Terms & Condition</h1>
//           <h1>Shopping Policyes</h1>
//           <h1>Cancellation Policy</h1>
//           <h1>Privacy Policy</h1>
//         </div>
//         <h1>© 2025 Shopnex E-RETAIL LIMITED All Rights Reserved.</h1>
//       </div>
//     </div>
//   );
// };

// export default Footer;




// import React from "react";
// import mail from "../assets/email-black-envelope-shape.png";
// import phone from "../assets/phone.png";
// import play from "../assets/play.png";
// import appstore from "../assets/appstore.png";
// import call from "../assets/phone.png";

// const Footer = () => {
//   return (
//     <div className="mt-10 animate-fadeIn">
//       {/* Top Section: Newsletter, App, Contact */}
      

//       {/* Middle Section: Links */}
//       <div className="bg-gray-900 text-white py-12 px-6 flex flex-col md:flex-row justify-center gap-10 md:gap-16">
//         <div>
//           <h1 className="text-3xl font-bold mb-5 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-purple-400 hover:to-blue-400 transition-all duration-300">
//             SHOPNEX
//           </h1>
//           <ul className="space-y-2">
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Who are we?</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Careers</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Authenticity</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Press</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Testimonials</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Shopnex CSR</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Sustainability</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Responsible Disclosure</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Investor Relations</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Link to Smart ODR</li>
//           </ul>
//         </div>
//         <div>
//           <h1 className="text-xl font-bold mb-4 text-purple-300">Help</h1>
//           <ul className="space-y-2">
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Contact Us</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">FAQs</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Store Locator</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Cancellation & Returns</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Shipping & Delivery</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Sell on Shopnex</li>
//           </ul>
//         </div>
//         <div>
//           <h1 className="text-xl font-bold mb-4 text-purple-300">Inspire Me</h1>
//           <ul className="space-y-2">
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Beauty Book</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Games Board</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Buying Guides</li>
//           </ul>
//         </div>
//         <div>
//           <h1 className="text-xl font-bold mb-4 text-purple-300">Quick Links</h1>
//           <ul className="space-y-2">
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Offer Zone</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">New Launches</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Shopnex Man</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Shopnex Fashion</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Shopnex Pro</li>
//             <li className="hover:text-purple-300 transition-colors duration-300 cursor-pointer transform hover:translate-x-1">Sitemap</li>
//           </ul>
//         </div>
//       </div>

//       {/* Bottom Section: Policies */}
//       <div className="bg-green-500 text-white py-6 px-6 flex flex-col items-center justify-center gap-4 shadow-inner">
//         <div className="flex flex-wrap gap-6 text-center">
//           <h1 className="hover:text-indigo-200 transition-colors duration-300 cursor-pointer font-medium">Terms & Conditions</h1>
//           <h1 className="hover:text-indigo-200 transition-colors duration-300 cursor-pointer font-medium">Shopping Policies</h1>
//           <h1 className="hover:text-indigo-200 transition-colors duration-300 cursor-pointer font-medium">Cancellation Policy</h1>
//           <h1 className="hover:text-indigo-200 transition-colors duration-300 cursor-pointer font-medium">Privacy Policy</h1>
//         </div>
//         <h1 className="text-sm opacity-90">© 2025 Shopnex E-RETAIL LIMITED. All Rights Reserved. | Made with ❤️ for shopping lovers.</h1>
//       </div>
//     </div>
//   );
// };

// export default Footer;




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
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const socialIcons = [
    {
      name: "Facebook",
      icon: (
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      ),
      color: "hover:text-blue-500",
    },
    {
      name: "Instagram",
      icon: (
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      ),
      color: "hover:text-pink-500",
    },
    {
      name: "Twitter",
      icon: (
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      ),
      color: "hover:text-blue-400",
    },
    {
      name: "YouTube",
      icon: (
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      ),
      color: "hover:text-red-500",
    },
    {
      name: "LinkedIn",
      icon: (
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      ),
      color: "hover:text-blue-600",
    },
  ];

  return (
    <footer className="mt-20 bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Newsletter & App Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
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
                  <p className="text-sm text-purple-100">
                    Get exclusive deals & updates
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="absolute right-1 top-1 bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-50 transition-all"
                >
                  {subscribed ? "✓ Subscribed!" : "Subscribe"}
                </motion.button>
              </form>
            </motion.div>

            {/* Download App */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Download Our App</h3>
              <p className="text-sm text-purple-100 mb-4">
                Shop on the go with exclusive app-only offers
              </p>
              <div className="flex gap-3 justify-center">
                <motion.a
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-white/30 transition-all"
                >
                  <img src={play} alt="Play Store" className="w-8 h-8" />
                  <div className="text-left">
                    <p className="text-xs">GET IT ON</p>
                    <p className="font-bold">Google Play</p>
                  </div>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-white/30 transition-all"
                >
                  <img src={appstore} alt="App Store" className="w-8 h-8" />
                  <div className="text-left">
                    <p className="text-xs">Download on</p>
                    <p className="font-bold">App Store</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
              <div className="space-y-3">
                <motion.a
                  whileHover={{ x: 5 }}
                  href="tel:1800-123-4567"
                  className="flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 hover:bg-white/30 transition-all"
                >
                  <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                    <img src={call} alt="phone" className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-100">Call us at</p>
                    <p className="font-bold">1800-123-4567</p>
                  </div>
                </motion.a>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="mailto:support@shopnex.com"
                  className="flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 hover:bg-white/30 transition-all"
                >
                  <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                    <img src={mail} alt="email" className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-100">Email us at</p>
                    <p className="font-bold">support@shopnex.com</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gray-900 text-white py-16 px-6"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Company */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold mb-6 relative inline-block">
                <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
                  SHOPNEX
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                />
              </h2>
              <ul className="space-y-2">
                {[
                  "Who are we?",
                  "Careers",
                  "Authenticity",
                  "Press",
                  "Testimonials",
                  "Shopnex CSR",
                  "Sustainability",
                  "Responsible Disclosure",
                  "Investor Relations",
                  "Link to Smart ODR",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5, color: "#c084fc" }}
                    className="text-gray-400 hover:text-purple-400 transition-all cursor-pointer flex items-center gap-2 group"
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="text-purple-400"
                    >
                      →
                    </motion.span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Help */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 text-purple-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                Help
              </h3>
              <ul className="space-y-2">
                {[
                  "Contact Us",
                  "FAQs",
                  "Store Locator",
                  "Cancellation & Returns",
                  "Shipping & Delivery",
                  "Sell on Shopnex",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5, color: "#c084fc" }}
                    className="text-gray-400 hover:text-purple-400 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="text-purple-400"
                    >
                      →
                    </motion.span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Inspire Me */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 text-purple-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                Inspire Me
              </h3>
              <ul className="space-y-2">
                {["Beauty Book", "Games Board", "Buying Guides"].map(
                  (item, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5, color: "#c084fc" }}
                      className="text-gray-400 hover:text-purple-400 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="text-purple-400"
                      >
                        →
                      </motion.span>
                      {item}
                    </motion.li>
                  )
                )}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 text-purple-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                Quick Links
              </h3>
              <ul className="space-y-2">
                {[
                  "Offer Zone",
                  "New Launches",
                  "Shopnex Man",
                  "Shopnex Fashion",
                  "Shopnex Pro",
                  "Sitemap",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5, color: "#c084fc" }}
                    className="text-gray-400 hover:text-purple-400 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="text-purple-400"
                    >
                      →
                    </motion.span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 text-purple-300 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                Follow Us
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Stay connected on social media
              </p>
              <div className="flex flex-wrap gap-3">
                {socialIcons.map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center ${social.color} transition-colors group`}
                  >
                    <svg
                      className="w-5 h-5 fill-current text-gray-400 group-hover:text-current transition-colors"
                      viewBox="0 0 24 24"
                    >
                      {social.icon}
                    </svg>
                  </motion.a>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold mb-3 text-gray-300">
                  We Accept
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["VISA", "MC", "AMEX", "PayPal"].map((payment, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -2 }}
                      className="bg-gray-800 px-3 py-1 rounded text-xs font-bold text-gray-400"
                    >
                      {payment}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-8"
          />

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          >
            {[
              {
                icon: "🚚",
                title: "Free Shipping",
                desc: "On orders over ₹500",
              },
              {
                icon: "🔄",
                title: "Easy Returns",
                desc: "30-day return policy",
              },
              {
                icon: "🔒",
                title: "Secure Payment",
                desc: "100% protected",
              },
              { icon: "💯", title: "Authentic", desc: "100% genuine products" },
            ].map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 text-center"
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h4 className="font-bold text-white mb-1">{badge.title}</h4>
                <p className="text-xs text-gray-400">{badge.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 relative overflow-hidden">
        {/* Animated Wave */}
        <motion.div
          animate={{
            x: [0, -100, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 50px, white 50px, white 100px)",
          }}
        />

        <div className="container mx-auto px-6 py-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex flex-wrap gap-6 text-sm justify-center"
            >
              {[
                "Terms & Conditions",
                "Shopping Policies",
                "Cancellation Policy",
                "Privacy Policy",
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -2, color: "#fff" }}
                  className="hover:text-white transition-all font-medium opacity-90 hover:opacity-100"
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-sm text-center md:text-right"
            >
              <p className="opacity-90">
                © 2025 Shopnex E-RETAIL LIMITED. All Rights Reserved.
              </p>
              <p className="text-xs mt-1 flex items-center justify-center md:justify-end gap-1">
                Made with{" "}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-red-400"
                >
                  ❤️
                </motion.span>{" "}
                for shopping lovers
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

