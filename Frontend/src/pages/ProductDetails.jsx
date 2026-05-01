// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useParams } from "react-router";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   const loadProduct = async () => {
//     const res = await api.get("/products/");
//     const p = res.data.find((item) => item._id === id);
//     setProduct(p);
//   };

//   useEffect(() => {
//     loadProduct();
//   }, []);

//   const addToCart = async () => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       alert("Please login first");
//       return;
//     }

//     const res = await api.post("/cart/add", {
//       userId,
//       productId: product._id,
//     });

//     const total = res.data.cart.items.reduce(
//       (sum, item) => sum + item.quantity,
//       0
//     );

//     localStorage.setItem("cartCount", total);
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="p-6 max-w-3xl flex flex-col justify-center items-center mx-auto">
//       <img
//         src={product.image}
//         alt={product.title}
//         className="w-full h-40 object-contain bg-white rounded"
//       />
//       <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
//       <p className="text-gray-700 mt-2">{product.description}</p>
//       <p className="text-xl font-semibold mt-4">${product.price}</p>

//       <button
//         onClick={addToCart}
//         className="mt-6 w-full md:w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const loadProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products/");
      const p = res.data.find((item) => item._id === id);
      setProduct(p);
    } catch (error) {
      console.error("Failed to load product:", error);
      alert("Error loading product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const addToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first");
      return;
    }

    try {
      const res = await api.post("/cart/add", {
        userId,
        productId: product._id,
      });

      const total = res.data.cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      localStorage.setItem("cartCount", total);
      window.dispatchEvent(new Event("cartUpdated"));
      setToastMessage("Item added to cart successfully! 🎉");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Error adding to cart. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6 animate-fadeIn">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 animate-pulse">
          <div className="w-full h-64 bg-gray-200 rounded-lg mb-6"></div>
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6 animate-fadeIn">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600">Product not found.</h1>
          <p className="text-gray-500 mt-2">Please check the product ID or try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6 animate-fadeIn">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Product Image */}
        <div className="flex-1 text-center">
          <img
            src={product.image}
            alt={product.title}
            className={`w-full max-w-sm h-64 object-contain bg-gray-50 rounded-lg shadow-md transition-all duration-500 transform hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-4 animate-fadeIn delay-200">
            {product.title}
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-6 animate-fadeIn delay-400">
            {product.description}
          </p>
          <p className="text-3xl font-bold text-green-600 mb-8 animate-fadeIn delay-600">
            ₹{product.price}
          </p>

          <button
            onClick={addToCart}
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 animate-fadeIn delay-800 animate-bounce-on-hover"
          >
            🛒 Add to Cart
          </button>
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

          {/* Additional Info */}
          <div className="mt-6 text-sm text-gray-500 animate-fadeIn delay-1000">
            <p>Free shipping on orders over ₹50. Secure checkout guaranteed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}