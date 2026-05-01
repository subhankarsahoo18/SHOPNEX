// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router";

// export default function Checkout() {
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("userId");

//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [cart, setCart] = useState(null);

//   // Load cart + addresses
//   useEffect(() => {
//     if (!userId) return;

//     api.get(`/cart/${userId}`).then((res) => setCart(res.data));
//     api.get(`/address/${userId}`).then((res) => {
//       setAddresses(res.data);
//       setSelectedAddress(res.data[0]); // default select
//     });
//   }, []);

//   if (!cart) return <div className="p-6">Loading...</div>;

//   const total = cart.items.reduce(
//     (sum, item) => sum + item.productId.price * item.quantity,
//     0
//   );

//   // ✅ PLACE ORDER + CLEAR CART
//   const placeOrder = async () => {
//     if (!selectedAddress) {
//       alert("Please select address");
//       return;
//     }

//     const res = await api.post("/order/place", {
//       userId,
//       address: selectedAddress,
//     });

//     navigate(`/order-success/${res.data.orderid}`);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>

//       {/* Address Selection */}
//       <h2 className="font-semibold mb-2">Select Delivery Address</h2>

//       <div className="space-y-3">
//         {addresses.map((addr) => (
//           <label
//             key={addr._id}
//             className="block border p-3 rounded cursor-pointer"
//           >
//             <input
//               type="radio"
//               name="address"
//               checked={selectedAddress?._id === addr._id}
//               onChange={() => setSelectedAddress(addr)}
//               className="mr-2"
//             />
//             <strong>{addr.fullName}</strong>
//             <p className="text-sm">
//               {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
//             </p>
//             <p className="text-sm">📞 {addr.phone}</p>
//           </label>
//         ))}
//       </div>

//       {/* Add New Address Button */}
//       <button
//         onClick={() => navigate("/checkout-address")}
//         className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//       >
//         Add New Address
//       </button>

//       {/* Order Summary */}
//       <h2 className="font-semibold mt-6 mb-2">Order Summary</h2>
//       <p className="text-lg font-bold">Total: ₹{total}</p>

//       <button
//         onClick={placeOrder}
//         className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//       >
//         Place Order (COD)
//       </button>
//     </div>
//   );
// }




import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

export default function Checkout() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Load cart + addresses
  useEffect(() => {
    if (!userId) return;

    api.get(`/cart/${userId}`).then((res) => setCart(res.data));
    api.get(`/address/${userId}`).then((res) => {
      setAddresses(res.data);
      setSelectedAddress(res.data[0]);
    });
  }, [userId]);

  if (!cart)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    setIsPlacingOrder(true);
    try {
      const res = await api.post("/order/place", {
        userId,
        address: selectedAddress,
      });
      navigate(`/order-success/${res.data.orderid}`);
    } catch (error) {
      alert("Failed to place order. Please try again.");
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Checkout
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Address Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Address Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
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
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Delivery Address
                  </h2>
                </div>
                <span className="text-sm text-gray-500">
                  {addresses.length} saved
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <AnimatePresence>
                  {addresses.map((addr, index) => (
                    <motion.label
                      key={addr._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`block border-2 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedAddress?._id === addr._id
                          ? "border-blue-600 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress?._id === addr._id}
                          onChange={() => setSelectedAddress(addr)}
                          className="mt-1 w-5 h-5 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <strong className="text-gray-800 text-lg">
                              {addr.fullName}
                            </strong>
                            {selectedAddress?._id === addr._id && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
                              >
                                Selected
                              </motion.span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {addr.addressLine}
                          </p>
                          <p className="text-sm text-gray-600">
                            {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                          <div className="flex items-center gap-1 mt-2 text-sm text-gray-700">
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
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            {addr.phone}
                          </div>
                        </div>
                      </div>
                    </motion.label>
                  ))}
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/checkout-address")}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add New Address
              </motion.button>
            </div>

            {/* Cart Items Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Order Items ({cart.items.length})
                </h2>
              </div>

              <div className="space-y-3">
                {cart.items.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-3 rounded-lg bg-gray-50"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                      {item.productId.image ? (
                        <img
                          src={item.productId.image}
                          alt={item.productId.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">
                        {item.productId.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ₹{(item.productId.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
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
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({cart.items.length})</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total</span>
                  <motion.span
                    key={total}
                    initial={{ scale: 1.2, color: "#2563eb" }}
                    animate={{ scale: 1, color: "#1f2937" }}
                    className="text-2xl"
                  >
                    ₹{total.toFixed(2)}
                  </motion.span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={placeOrder}
                disabled={isPlacingOrder}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
              >
                {isPlacingOrder ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Place Order (COD)
                  </>
                )}
              </motion.button>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-0.5"
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
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Cash on Delivery</p>
                    <p className="text-blue-600">
                      Pay when you receive your order
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}