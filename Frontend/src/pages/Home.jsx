import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { Link, useNavigate, useSearchParams } from "react-router";
import { ShoppingCartIcon, BoltIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import Footer from "../components/Footer";

export default function Home() {
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(false);
  const [wishlist, setWishlist]     = useState([]);
  const [showToast, setShowToast]   = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  // ── Read search & category from URL (set by Navbar) ───────
  const [searchParams] = useSearchParams();
  const search   = searchParams.get("search")   || "";
  const category = searchParams.get("category") || "";

  // ── Load products whenever search or category changes ─────
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`);
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  const loadWishlist = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    try {
      const res = await api.get(`/user/profile/${userId}`);
      setWishlist(res.data.user.wishlist || []);
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }, []);

  useEffect(() => {
    loadProducts();
    loadWishlist();
  }, [loadProducts, loadWishlist]);

  // ── Wishlist toggle ───────────────────────────────────────
  const toggleWishlist = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) { alert("Please log in to add items to your wishlist."); return; }
    try {
      const res = await api.post(`/user/wishlist/${userId}`, { productId });
      setWishlist(res.data.wishlist);
      const isAdded = res.data.wishlist.some(w => (w._id || w) === productId);
      setToastMessage(isAdded ? "Added to wishlist ❤️" : "Removed from wishlist 💔");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Failed to toggle wishlist:", error);
    }
  };

  // ── Add to cart ───────────────────────────────────────────
  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) { alert("Please log in to add items to your cart."); return; }
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

  // ── Buy now ───────────────────────────────────────────────
  const buyNow = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) { alert("Please log in to add items to your cart."); return; }
    try {
      const res = await api.post(`/cart/add`, { userId, productId });
      const itemCount = res.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem("cartCount", itemCount);
      window.dispatchEvent(new Event("cartUpdated"));
      navigate("/cart");
    } catch (error) {
      console.error("Failed to buy now:", error);
      alert("Error adding item to cart. Please try again.");
    }
  };

  // ── Sparkle decorations for hero ──────────────────────────
  const stars = [
    { top: "18%", left: "5%",  size: 26, opacity: 0.75, delay: "0s" },
    { top: "68%", left: "3%",  size: 18, opacity: 0.55, delay: "0.5s" },
    { top: "35%", left: "13%", size: 13, opacity: 0.45, delay: "1s" },
    { top: "52%", left: "88%", size: 22, opacity: 0.65, delay: "0.3s" },
    { top: "22%", left: "84%", size: 16, opacity: 0.50, delay: "0.8s" },
    { top: "78%", left: "79%", size: 11, opacity: 0.35, delay: "1.3s" },
    { top: "8%",  left: "50%", size: 14, opacity: 0.40, delay: "0.6s" },
    { top: "85%", left: "40%", size: 10, opacity: 0.30, delay: "1.5s" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="relative bg-[#4a1080] text-white py-16 px-6 text-center overflow-hidden select-none">
        {stars.map((s, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute pointer-events-none"
            style={{
              width: s.size, height: s.size,
              top: s.top, left: s.left,
              opacity: s.opacity,
              animation: `float 4s ease-in-out ${s.delay} infinite`,
            }}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
            Discover Amazing<br />Products
          </h1>
          <p className="text-base md:text-xl opacity-85 font-light">
            Search, filter, and shop your favorites with style! ✨
          </p>
        </div>
      </div>

      {/* ── Product Grid ─────────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Result count / active filters */}
          {!loading && (
            <p className="text-sm text-gray-500 mb-5">
              {search && (
                <>
                  Results for <span className="font-bold text-[#6b21a8]">"{search}"</span>
                  {" "}
                </>
              )}
              {category && (
                <>
                  in <span className="font-semibold text-gray-700">{category}</span>
                  {" "}
                </>
              )}
              <span className="text-gray-400">— {products.length} product{products.length !== 1 ? "s" : ""}</span>
            </p>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-sm animate-pulse flex flex-col overflow-hidden"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="w-full h-44 bg-gray-200" />
                  <div className="p-4 flex flex-col gap-3">
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => <div key={j} className="w-3.5 h-3.5 bg-gray-200 rounded-sm" />)}
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-9 bg-gray-200 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 animate-fade-in">
              <div className="text-7xl mb-5">🔍</div>
              <p className="text-2xl text-gray-700 font-bold mb-2">
                {search ? `No results for "${search}"` : "No products found"}
              </p>
              <p className="text-gray-500 mb-6">
                {search
                  ? "Try a different search term or browse all products."
                  : "Try adjusting your category filter!"}
              </p>
              {search && (
                <a
                  href="/"
                  className="inline-block px-6 py-2.5 rounded-full bg-[#6b21a8] text-white text-sm font-bold hover:bg-[#581c87] transition-colors"
                >
                  Browse All Products
                </a>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((product, index) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 hover:border-purple-200 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.06}s` }}
                >
                  {/* Image */}
                  <Link to={`/product/${product._id}`} className="relative block flex-shrink-0">
                    <div className="bg-gray-50 flex items-center justify-center h-44 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-44 object-contain p-3 group-hover:scale-105 transition-transform duration-400"
                      />
                    </div>
                    {/* Heart */}
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product._id); }}
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:scale-110 transition-transform z-10"
                      aria-label="Toggle Wishlist"
                    >
                      {wishlist.some(w => (w._id || w) === product._id)
                        ? <HeartSolid className="h-4 w-4 text-pink-500 animate-bounce-in" />
                        : <HeartOutline className="h-4 w-4 text-gray-400 hover:text-pink-500 transition-colors" />}
                    </button>
                  </Link>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-1">
                    <Link to={`/product/${product._id}`}>
                      <h2 className="text-sm font-semibold text-gray-800 hover:text-[#6b21a8] transition-colors line-clamp-2 mb-2 leading-snug min-h-[38px]">
                        {product.title}
                      </h2>
                    </Link>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>

                    {/* Price */}
                    <p className="text-base font-extrabold text-gray-900 mb-3">
                      ₹{product.price}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col gap-2 mt-auto">
                      <button
                        onClick={() => addToCart(product._id)}
                        className="w-full py-2.5 rounded-xl bg-[#6b21a8] hover:bg-[#581c87] text-white text-sm font-bold transition-all duration-200 hover:shadow-md flex items-center justify-center gap-1.5"
                        aria-label={`Add ${product.title} to cart`}
                      >
                        <ShoppingCartIcon className="h-4 w-4" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => buyNow(product._id)}
                        className="w-full py-2.5 rounded-xl border-2 border-[#6b21a8] text-[#6b21a8] hover:bg-[#6b21a8] hover:text-white text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5"
                        aria-label={`Buy ${product.title} now`}
                      >
                        <BoltIcon className="h-4 w-4" />
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Toast ────────────────────────────────────────── */}
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