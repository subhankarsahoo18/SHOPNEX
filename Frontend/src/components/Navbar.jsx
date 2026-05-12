import { Link, useNavigate, useLocation, useSearchParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import {
  ShoppingCartIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";

const CATEGORIES = [
  { label: "All Categories", value: "" },
  { label: "💻 Laptops",    value: "Laptops" },
  { label: "📱 Mobiles",    value: "Mobiles" },
  { label: "📲 Tablets",    value: "Tablets" },
];

export default function Navbar() {
  const navigate      = useNavigate();
  const location      = useLocation();
  const [searchParams] = useSearchParams();

  const [cartCount, setCartCount]           = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCatOpen, setIsCatOpen]           = useState(false);
  const [searchQuery, setSearchQuery]       = useState(searchParams.get("search") || "");
  const debounceRef = useRef(null);
  const catRef      = useRef(null);
  const userId      = localStorage.getItem("userId");

  // Current active category from URL
  const activeCategory = searchParams.get("category") || "";

  // ── Cart count ────────────────────────────────────────────
  useEffect(() => {
    const loadCart = async () => {
      if (!userId) return setCartCount(0);
      try {
        const res  = await api.get(`/cart/${userId}`);
        const total = res.data.items.reduce((s, i) => s + i.quantity, 0);
        setCartCount(total);
      } catch { setCartCount(0); }
    };
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, [userId]);

  // ── Sync search box when URL param changes ────────────────
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // ── Close category dropdown when clicking outside ─────────
  useEffect(() => {
    const handler = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) {
        setIsCatOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  // ── Live search (debounced 300 ms) ────────────────────────
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      value.trim() ? params.set("search", value.trim()) : params.delete("search");
      navigate(`/?${params.toString()}`, { replace: true });
    }, 300);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const params = new URLSearchParams(searchParams);
    searchQuery.trim() ? params.set("search", searchQuery.trim()) : params.delete("search");
    navigate(`/?${params.toString()}`);
  };

  // ── Category select from dropdown ─────────────────────────
  const selectCategory = (value) => {
    setIsCatOpen(false);
    const params = new URLSearchParams(searchParams);
    value ? params.set("category", value) : params.delete("category");
    navigate(`/?${params.toString()}`);
  };

  const isHome = location.pathname === "/";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#4a1080] shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">

            {/* ── Logo ──────────────────────────────────────── */}
            <Link to="/" className="flex items-center gap-1.5 flex-shrink-0 group">
              <SparklesIcon className="h-7 w-7 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-extrabold text-xl tracking-tight text-white">
                SHOP<span className="font-light text-yellow-300">NEX</span>
              </span>
            </Link>

            {/* ── Search Bar (Desktop) ───────────────────────── */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex flex-1 relative mx-2"
            >
              <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
              <input
                id="navbar-search"
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search products by name, keyword..."
                className="w-full pl-10 pr-9 py-2 text-sm rounded-full bg-white/10 border border-white/25 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/70 focus:bg-white/15 transition-all duration-200"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              )}
            </form>

            {/* ── Desktop Nav Links ─────────────────────────── */}
            <div className="hidden md:flex items-center gap-5 flex-shrink-0">

              {/* Home */}
              <Link
                to="/"
                className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                  isHome && !activeCategory
                    ? "text-yellow-400 border-b-2 border-yellow-400 pb-0.5"
                    : "text-gray-200 hover:text-yellow-300"
                }`}
              >
                Home
              </Link>

              {/* Categories dropdown */}
              <div ref={catRef} className="relative">
                <button
                  onClick={() => setIsCatOpen(!isCatOpen)}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeCategory
                      ? "text-yellow-400 border-b-2 border-yellow-400 pb-0.5"
                      : "text-gray-200 hover:text-yellow-300"
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={isCatOpen}
                >
                  Categories
                  <ChevronDownIcon
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${isCatOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown panel */}
                {isCatOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in z-50">
                    {/* Arrow */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45 z-10" />
                    <ul role="listbox" className="py-1.5 relative z-20">
                      {CATEGORIES.map((cat) => (
                        <li key={cat.value}>
                          <button
                            onClick={() => selectCategory(cat.value)}
                            className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors duration-150 ${
                              activeCategory === cat.value
                                ? "bg-purple-50 text-[#6b21a8] font-semibold"
                                : "text-gray-700 hover:bg-gray-50 hover:text-[#6b21a8]"
                            }`}
                          >
                            {activeCategory === cat.value && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#6b21a8] flex-shrink-0" />
                            )}
                            <span className={activeCategory === cat.value ? "" : "ml-3.5"}>
                              {cat.label}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* ── Right Actions ─────────────────────────────── */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-white hover:text-yellow-300 transition-colors duration-200"
                aria-label="Shopping Cart"
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-purple-900 text-[10px] font-extrabold min-w-[18px] h-[18px] flex items-center justify-center rounded-full leading-none shadow">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile */}
              {userId && (
                <Link
                  to="/profile"
                  className="p-2 text-white hover:text-yellow-300 transition-colors duration-200"
                  aria-label="My Profile"
                >
                  <UserIcon className="h-6 w-6" />
                </Link>
              )}

              {/* Auth */}
              {!userId ? (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/60 text-white text-sm font-semibold hover:bg-white/10 hover:border-white transition-all duration-200"
                  >
                    <UserIcon className="h-4 w-4" />
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-400 text-purple-900 text-sm font-bold hover:bg-yellow-300 transition-all duration-200 shadow-md"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/60 text-white text-sm font-semibold hover:bg-white/10 transition-all duration-200"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  Logout
                </button>
              )}
            </div>

            {/* ── Mobile Toggle ─────────────────────────────── */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden ml-auto p-2 text-white hover:text-yellow-300 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown ───────────────────────────────── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[#3b0d6e] px-4 pt-3 pb-6 space-y-3 border-t border-white/10">

            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search products by name..."
                className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 transition-all"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              )}
            </form>

            {/* Mobile Home */}
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-yellow-300 transition-all"
            >
              Home
            </Link>

            {/* Mobile Categories — inline chips */}
            <div className="px-3 py-2">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                <TagIcon className="h-3.5 w-3.5" /> Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => { selectCategory(cat.value); setIsMobileMenuOpen(false); }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeCategory === cat.value
                        ? "bg-yellow-400 text-purple-900"
                        : "bg-white/10 text-gray-200 hover:bg-white/20"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Cart */}
            <Link
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-200 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-3 text-sm font-medium">
                <ShoppingCartIcon className="h-5 w-5" />
                Cart
              </div>
              {cartCount > 0 && (
                <span className="bg-yellow-400 text-purple-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Profile */}
            {userId && (
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/10 transition-all"
              >
                <UserIcon className="h-5 w-5" />
                My Profile
              </Link>
            )}

            {/* Mobile Auth */}
            {!userId ? (
              <div className="flex gap-3 pt-1">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl border border-white/50 text-sm font-semibold text-white hover:bg-white/10 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl bg-yellow-400 text-purple-900 text-sm font-bold hover:bg-yellow-300 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <button
                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-all"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}