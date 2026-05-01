// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { Link } from "react-router";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");

//   const loadProducts = async () => {
//     const res = await api.get(
//       `/products?search=${search}&category=${category}`
//     );
//     setProducts(res.data);
//   };

//   useEffect(() => {
//     loadProducts();
//   }, [search, category]);

//   const addToCart = async (productId) => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       alert("Please log in to add items to your cart.");
//       return;
//     }

//     const res = await api.post(`/cart/add`, { userId, productId });

//     const total = res.data.cart.items.reduce(
//       (sum, item) => sum + item.productId.price * item.quantity,
//       0
//     );

//     localStorage.setItem("cartCount", total);
//     window.dispatchEvent(new Event("cartUpdated"));
//   };
//   return (
//     <div className="p-6 bg-gray-400 min-h-screen">
//       {/* Search */}
//       <div className="mb-6 flex flex-col md:flex-row gap-8 items-center justify-around bg-white p-4 rounded-lg shadow-sm">
//         {/* Search Input */}
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full md:w-1/2 border border-gray-900 px-4 py-2 rounded-md 
//                focus:outline-none focus:ring-2 focus:ring-blue-700"
//         />

//         {/* Category Filter */}
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="w-full md:w-1/4 border border-gray-300 px-4 py-2 rounded-md 
//                focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">All Categories</option>
//           <option value="Laptops">Laptops</option>
//           <option value="Mobiles">Mobiles</option>
//           <option value="Tablets">Tablets</option>
//         </select>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-5 ">
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className=" p-3 rounded shadow-blue-100 bg-white hover:shadow-md transition"
//           >
//             <Link to={`/product/${product._id}`}>
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="w-full h-40 object-contain bg-white rounded"
//               />
//               <h2 className="mt-2 font-semibold text-lg">{product.title}</h2>
//             </Link>

//             {/* Price + Add to Cart (same line) */}
//             <div className="mt-2 flex items-center justify-between">
//               <p className="text-gray-700 font-semibold">${product.price}</p>

//               <button
//                 onClick={() => addToCart(product._id)}
//                 className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





// import { useEffect, useState, useCallback } from "react";
// import api from "../api/axios";
// import { Link, useNavigate } from "react-router"; // Added useNavigate import

// // Assuming you have Heroicons installed; if not, replace with emojis or remove
// import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

// Custom debounce hook (replaces lodash.debounce)

// import Footer from "../components/Footer";
// function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [showToast, setShowToast] = useState(false); // State for toast notification
//   const [toastMessage, setToastMessage] = useState(""); // State for toast message
//   const navigate = useNavigate(); // Hook for navigation

//   // Debounce the search input
//   const debouncedSearch = useDebounce(search, 300);

//   const loadProducts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await api.get(`/products?search=${debouncedSearch}&category=${category}`);
//       setProducts(res.data);
//     } catch (error) {
//       console.error("Failed to load products:", error);
//       alert("Error loading products. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [debouncedSearch, category]);

//   useEffect(() => {
//     loadProducts();
//   }, [loadProducts]);

//   const addToCart = async (productId) => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       alert("Please log in to add items to your cart.");
//       return;
//     }
//     try {
//       const res = await api.post(`/cart/add`, { userId, productId });
//       const itemCount = res.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
//       localStorage.setItem("cartCount", itemCount);
//       window.dispatchEvent(new Event("cartUpdated"));
//       // Show toast instead of alert
//       setToastMessage("Item added to cart");
//       setShowToast(true);
//       setTimeout(() => setShowToast(false), 3000); // Auto-hide after 3 seconds
//     } catch (error) {
//       console.error("Failed to add to cart:", error);
//       alert("Error adding item to cart. Please try again.");
//     }
//   };

//   const buyNow = async (productId) => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       alert("Please log in to add items to your cart.");
//       return;
//     }
//     try {
//       const res = await api.post(`/cart/add`, { userId, productId });
//       const itemCount = res.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
//       localStorage.setItem("cartCount", itemCount);
//       window.dispatchEvent(new Event("cartUpdated"));
//       // Redirect to cart
//       navigate("/cart");
//     } catch (error) {
//       console.error("Failed to add to cart:", error);
//       alert("Error adding item to cart. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Hero Header */}
//       <div className="bg-gradient-to-r from-emerald-500 to-emerald-900 text-white py-12 px-6 text-center">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Products</h1>
//         <p className="text-lg md:text-xl opacity-90">Search, filter, and shop your favorites!</p>
//       </div>

//       {/* Search and Filter Section */}
//       <div className="p-6">
//         <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
//           <div className="flex flex-col md:flex-row gap-50 items-center">
//             {/* Search Input */}
//             <div className="relative w-full md:w-1/2">
//               <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                 aria-label="Search products"
//               />
//             </div>

//             {/* Category Filter */}
//             <div className="relative w-full md:w-1/4">
//               <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
//                 aria-label="Filter by category"
//               >
//                 <option value="">All Categories</option>
//                 <option value="Laptops">Laptops</option>
//                 <option value="Mobiles">Mobiles</option>
//                 <option value="Tablets">Tablets</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div className="px-6 pb-12">
//         <div className="max-w-7xl mx-auto">
//           {loading ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//               {Array.from({ length: 8 }).map((_, i) => (
//                 <div key={i} className="bg-white p-4 rounded-lg shadow-md animate-pulse min-h-[400px] flex flex-col">
//                   <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
//                   <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                 </div>
//               ))}
//             </div>
//           ) : products.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-2xl text-gray-500 mb-4">😔 No products found.</p>
//               <p className="text-gray-400">Try adjusting your search or category!</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//               {products.map((product, index) => (
//                 <div
//                   key={product._id}
//                   className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 transform min-h-[400px] flex flex-col"
//                 >
//                   <Link to={`/product/${product._id}`} className="block flex-shrink-0">
//                     <img
//                       src={product.image}
//                       alt={product.title}
//                       className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
//                     />
//                     <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
//                       {product.title}
//                     </h2>
//                   </Link>
//                   <div className="mt-4 flex flex-col gap-2 mt-auto">
//                     <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => addToCart(product._id)}
//                         className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transform hover:scale-110 transition-all duration-200 flex-1"
//                         aria-label={`Add ${product.title} to cart`}
//                       >
//                         Add to Cart
//                       </button>
//                       <button
//                         onClick={() => buyNow(product._id)}
//                         className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-teal-600 transform hover:scale-110 transition-all duration-200 flex-1"
//                         aria-label={`Buy ${product.title} now`}
//                       >
//                         Buy Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Toast Notification */}
//       {showToast && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
//           {toastMessage}
//         </div>
//       )}
//       <Footer/>
//     </div>
//   );
// }



import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router";
import { MagnifyingGlassIcon, FunnelIcon, SparklesIcon, ShoppingCartIcon, BoltIcon } from "@heroicons/react/24/outline";
import Footer from "../components/Footer";

// Custom debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(search, 300);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products?search=${debouncedSearch}&category=${category}`);
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to load products:", error);
      alert("Error loading products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }
    try {
      const res = await api.post(`/cart/add`, { userId, productId });
      const itemCount = res.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem("cartCount", itemCount);
      window.dispatchEvent(new Event("cartUpdated"));
      setToastMessage("Item added to cart successfully! 🎉");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Error adding item to cart. Please try again.");
    }
  };

  const buyNow = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }
    try {
      const res = await api.post(`/cart/add`, { userId, productId });
      const itemCount = res.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem("cartCount", itemCount);
      window.dispatchEvent(new Event("cartUpdated"));
      navigate("/cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Error adding item to cart. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Header with Animation */}
      <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white py-16 px-6 text-center overflow-hidden">
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="relative z-10 animate-fade-in-down">
          <div className="flex justify-center mb-4">
            <SparklesIcon className="h-16 w-16 animate-spin-slow" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 animate-gradient">
            Discover Amazing Products
          </h1>
          <p className="text-xl md:text-2xl opacity-90 font-light tracking-wide">
            Search, filter, and shop your favorites with style! ✨
          </p>
        </div>
      </div>

      {/* Search and Filter Section with Enhanced Design */}
      <div className="p-6 -mt-8 relative z-20">
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input with Glow Effect */}
            <div className="relative w-full md:w-2/3 group">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-purple-500 group-focus-within:text-purple-600 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search for amazing products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 text-gray-700 placeholder-gray-400 bg-gray-50 hover:bg-white"
                aria-label="Search products"
              />
            </div>

            {/* Category Filter with Icon */}
            <div className="relative w-full md:w-1/3 group">
              <FunnelIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-indigo-500 group-focus-within:text-indigo-600 transition-colors duration-300" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300 text-gray-700 bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                aria-label="Filter by category"
              >
                <option value="">All Categories</option>
                <option value="Laptops">💻 Laptops</option>
                <option value="Mobiles">📱 Mobiles</option>
                <option value="Tablets">📲 Tablets</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid with Staggered Animation */}
      <div className="px-6 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i} 
                  className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg animate-pulse min-h-[450px] flex flex-col"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-3"></div>
                  <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 mb-4"></div>
                  <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mt-auto"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="text-8xl mb-6 animate-bounce">😔</div>
              <p className="text-3xl text-gray-700 font-bold mb-4">No products found</p>
              <p className="text-xl text-gray-500">Try adjusting your search or category!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div
                  key={product._id}
                  className="group bg-white/80 backdrop-blur p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 min-h-[450px] flex flex-col border border-transparent hover:border-purple-200 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link to={`/product/${product._id}`} className="block flex-shrink-0">
                    <div className="relative overflow-hidden rounded-xl mb-4 bg-gradient-to-br from-gray-50 to-gray-100">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-contain transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h2 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2 min-h-[56px]">
                      {product.title}
                    </h2>
                  </Link>
                  
                  <div className="mt-4 flex flex-col gap-3 mt-auto">
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        ₹{product.price}
                      </p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product._id)}
                        className="relative bg-gradient-to-r bg-green-600 text-white px-4 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 flex-1 overflow-hidden group/btn shadow-lg hover:shadow-xl"
                        aria-label={`Add ${product.title} to cart`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <ShoppingCartIcon className="h-5 w-5" />
                          Add
                        </span>
                        <div className="absolute inset-0  opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      </button>
                      
                      <button
                        onClick={() => buyNow(product._id)}
                        className="relative bg-red-500 text-white px-4 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 flex-1 overflow-hidden group/btn shadow-lg hover:shadow-xl"
                        aria-label={`Buy ${product.title} now`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <BoltIcon className="h-5 w-5" />
                          Buy
                        </span>
                        <div className="absolute inset-0  opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up-bounce">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white/20">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center animate-bounce">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-semibold text-lg">{toastMessage}</span>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}