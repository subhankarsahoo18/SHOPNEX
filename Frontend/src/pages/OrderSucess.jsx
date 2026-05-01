// import { useParams } from "react-router";

// export default function OrderSuccess(){
//     const {id} = useParams();

//     const goHome = () => {
//         window.location.href = "/"
//     }

//     return(
//         <div className="max-w-xl mx-auto p-6 text-center">
//             <h1 className="text-3xl font-bold text-green-600"> Order Placed Sucessfully</h1>

//             <p className="mt-4">Your Order ID:
//             <span className="font-semibold">{id}</span>
//             </p>

//             <button
//                 onClick={goHome}
//                 className="inline-block mt-6 bg-blue-600 text-white px-6 py-2 rounded"
//                 >
//                     Continue Shopping
//                 </button>
//         </div>
//     )
// }



// import { useParams } from "react-router";
// import { useEffect, useState } from "react";

// export default function OrderSuccess() {
//     const { id } = useParams();
//     const [showContent, setShowContent] = useState(false);

//     useEffect(() => {
//         // Trigger animation after component mounts
//         setTimeout(() => setShowContent(true), 200);
//     }, []);

//     const goHome = () => {
//         window.location.href = "/";
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6 animate-fadeIn">
//             <div className={`max-w-lg mx-auto bg-white rounded-2xl shadow-2xl p-8 text-center transform transition-all duration-700 ${showContent ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
//                 {/* Success Icon */}
//                 <div className="mb-6">
//                     <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-bounce">
//                         <svg
//                             className="w-10 h-10 text-white"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M5 13l4 4L19 7"
//                             />
//                         </svg>
//                     </div>
//                 </div>

//                 {/* Title */}
//                 <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text mb-4 animate-pulse">
//                     Order Placed Successfully!
//                 </h1>

//                 {/* Order ID */}
//                 <p className="text-lg text-gray-700 mb-6">
//                     Your Order ID: 
//                     <span className="font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-lg ml-2 animate-fadeIn delay-300">
//                         {id}
//                     </span>
//                 </p>

//                 {/* Description */}
//                 <p className="text-gray-600 mb-8 animate-fadeIn delay-500">
//                     Thank you for shopping with us! Your order is being processed and will be delivered soon.
//                 </p>

//                 {/* Button */}
//                 <button
//                     onClick={goHome}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 animate-fadeIn delay-700"
//                 >
//                     Continue Shopping
//                 </button>

//                 {/* Additional Info */}
//                 <div className="mt-6 text-sm text-gray-500 animate-fadeIn delay-900">
//                     <p>Need help? Contact our support team.</p>
//                 </div>
//             </div>
//         </div>
//     );
// }



import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";

export default function OrderSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch order details to verify and get complete info
    const fetchOrderDetails = async () => {
      try {
        if (id) {
          const res = await api.get(`/order/${id}`);
          setOrderDetails(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const goHome = () => {
    navigate("/");
  };

  const viewOrders = () => {
    navigate("/vieworderdetail");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
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

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.8, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-10 left-10 w-64 h-64 bg-blue-300 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-purple-300 rounded-full blur-3xl"
        />
      </div>

      {/* Confetti Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
              rotate: 0,
            }}
            animate={{
              y: window.innerHeight + 20,
              rotate: 360,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
            className={`absolute w-2 h-2 ${
              ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"][
                Math.floor(Math.random() * 5)
              ]
            }`}
            style={{
              clipPath:
                Math.random() > 0.5
                  ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                  : "circle(50%)",
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl w-full mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 text-center relative z-10"
      >
        {/* Success Icon with Checkmark Animation */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="relative w-28 h-28 mx-auto"
          >
            {/* Outer Ring */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: 0.1,
              }}
              className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
            />

            {/* Pulsing Effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-green-400 rounded-full"
            />

            {/* Checkmark SVG */}
            <svg
              className="absolute inset-0 w-full h-full p-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
            >
              <motion.path
                variants={checkmarkVariants}
                initial="hidden"
                animate="visible"
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          <span className="text-transparent bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text">
            Order Placed Successfully!
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-600 mb-8"
        >
          🎉 Your order is confirmed and on its way!
        </motion.p>

        {/* Order ID Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border-2 border-blue-200"
        >
          <p className="text-sm text-gray-600 mb-2">Order ID</p>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: 0.5,
            }}
            className="bg-white rounded-xl p-4 shadow-md"
          >
            <p className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-mono tracking-wider">
              {id || "Processing..."}
            </p>
          </motion.div>

          {orderDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: 0.8 }}
              className="mt-4 pt-4 border-t border-blue-200"
            >
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Items</p>
                  <p className="font-semibold text-gray-800">
                    {orderDetails.items?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Total Amount</p>
                  <p className="font-semibold text-gray-800">
                    ₹{orderDetails.total?.toFixed(2) || "0.00"}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Info Message */}
        <motion.div
          variants={itemVariants}
          className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8"
        >
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-left">
              <p className="font-semibold text-green-800 mb-1">
                What happens next?
              </p>
              <ul className="text-sm text-green-700 space-y-1">
                <li>✓ Order confirmation email sent</li>
                <li>✓ Preparing your items for shipment</li>
                <li>✓ You'll receive tracking details soon</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={viewOrders}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            View Order Details
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goHome}
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-xl shadow-md border-2 border-gray-200 flex items-center justify-center gap-2 transition-all duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Continue Shopping
          </motion.button>
        </motion.div>

        {/* Support Section */}
        <motion.div
          variants={itemVariants}
          className="mt-8 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-3">
            Need help with your order?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href="/support"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Contact Support
            </a>
            <a
              href="/track"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Track Order
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}