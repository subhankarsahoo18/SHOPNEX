// import { Link, useNavigate } from "react-router";
// import { useState, useEffect } from "react";
// import api from "../api/axios";

// export default function Navbar() {
//     const navigate = useNavigate();
//     const [cartCount, setCartCount] = useState(0);
//     const userId = localStorage.getItem("userId");

//     useEffect(() => {
//         const loadCart = async () => {
//             if (!userId) return setCartCount(0);

//             const res = await api.get(`/cart/${userId}`);
//             const total = res.data.items.reduce(
//                 (sum, item) => sum + item.quantity, 0
//             );
//             setCartCount(total);
//         }
//         loadCart();
//         window.addEventListener("cartUpdated", loadCart);

//         return () => {
//             window.removeEventListener("cartUpdated", loadCart);
//         }
//     }, [userId]);

//     const logout = () => {
//         localStorage.clear();
//         setCartCount(0);
//         navigate("/login");
//     }

//     return (
//         <nav className="flex justify-between p-4 shadow bg-green-600 text-white">
//             <Link to="/" className="font-bold text-xl">SHOPNEX</Link>

//             <div className="flex gap-4 items-center">
//                 <Link to="/cart" className="relative text-xl">
//                     🛒
//                     {
//                         cartCount > 0 && (
//                             <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded">
//                                 {cartCount}
//                             </span>
//                         )
//                     }
//                 </Link>

//                 {
//                     !userId ? (
//                         <>
//                             <Link to="/login" className="text-lg">Login</Link>
//                             <Link to="/signup" className="text-lg">Signup</Link>
//                         </>
//                     ) : (
//                         <button onClick={logout} className="text-lg">Logout</button>
//                     )
//                 }
//             </div>
//         </nav>
//     )
// }




// import { Link, useNavigate } from "react-router";
// import { useState, useEffect } from "react";
// import api from "../api/axios";

// export default function Navbar() {
//     const navigate = useNavigate();
//     const [cartCount, setCartCount] = useState(0);
//     const userId = localStorage.getItem("userId");

//     useEffect(() => {
//         const loadCart = async () => {
//             if (!userId) return setCartCount(0);

//             try {
//                 const res = await api.get(`/cart/${userId}`);
//                 const total = res.data.items.reduce(
//                     (sum, item) => sum + item.quantity, 0
//                 );
//                 setCartCount(total);
//             } catch (error) {
//                 console.error("Failed to load cart:", error);
//                 setCartCount(0);
//             }
//         };
//         loadCart();
//         window.addEventListener("cartUpdated", loadCart);

//         return () => {
//             window.removeEventListener("cartUpdated", loadCart);
//         };
//     }, [userId]);

//     const logout = () => {
//         localStorage.clear();
//         setCartCount(0);
//         navigate("/login");
//     };

//     return (
//         <nav className="flex justify-between items-center p-4 shadow-lg bg-green-500 text-white animate-slideIn">
//             <Link 
//                 to="/" 
//                 className="font-bold text-2xl hover:text-yellow-200 transition-colors duration-300 transform hover:scale-105"
//             >
//                 SHOPNEX
//             </Link>

//             <div className="flex gap-6 items-center">
//                 <Link 
//                     to="/cart" 
//                     className="relative text-2xl hover:text-yellow-200 transition-all duration-300 transform hover:scale-110"
//                 >
//                     🛒
//                     {cartCount > 0 && (
//                         <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full animate-bounce font-bold">
//                             {cartCount}
//                         </span>
//                     )}
//                 </Link>

//                 {!userId ? (
//                     <>
//                         <Link 
//                             to="/login" 
//                             className="text-lg hover:text-yellow-200 transition-all duration-300 transform hover:scale-105"
//                         >
//                             Login
//                         </Link>
//                         <Link 
//                             to="/signup" 
//                             className="text-lg hover:text-yellow-200 transition-all duration-300 transform hover:scale-105"
//                         >
//                             Signup
//                         </Link>
//                     </>
//                 ) : (
//                     <button 
//                         onClick={logout} 
//                         className="text-lg hover:text-yellow-200 transition-all duration-300 transform hover:scale-105 bg-transparent border-none cursor-pointer"
//                     >
//                         Logout
//                     </button>
//                 )}
//             </div>
//         </nav>
//     );
// }




import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { 
  ShoppingCartIcon, 
  UserIcon, 
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function Navbar() {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showCartPulse, setShowCartPulse] = useState(false);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const loadCart = async () => {
            if (!userId) return setCartCount(0);

            try {
                const res = await api.get(`/cart/${userId}`);
                const total = res.data.items.reduce(
                    (sum, item) => sum + item.quantity, 0
                );
                const previousCount = cartCount;
                setCartCount(total);
                
                // Trigger pulse animation when cart count increases
                if (total > previousCount) {
                    setShowCartPulse(true);
                    setTimeout(() => setShowCartPulse(false), 600);
                }
            } catch (error) {
                console.error("Failed to load cart:", error);
                setCartCount(0);
            }
        };
        loadCart();
        window.addEventListener("cartUpdated", loadCart);

        return () => {
            window.removeEventListener("cartUpdated", loadCart);
        };
    }, [userId]);

    // Scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const logout = () => {
        localStorage.clear();
        setCartCount(0);
        navigate("/login");
    };

    return (
        <>
            <nav 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    isScrolled 
                        ? "bg-white/95 backdrop-blur-lg shadow-2xl py-3" 
                        : "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 py-4 shadow-lg"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo with Animation */}
                        <Link 
                            to="/" 
                            className="group flex items-center gap-2"
                        >
                            <div className="relative">
                                <SparklesIcon 
                                    className={`h-8 w-8 transition-all duration-300 ${
                                        isScrolled 
                                            ? "text-purple-600" 
                                            : "text-yellow-300 group-hover:text-yellow-400"
                                    } group-hover:rotate-180`}
                                />
                                <div className="absolute inset-0 bg-yellow-300 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                            </div>
                            <span 
                                className={`font-extrabold text-2xl sm:text-3xl tracking-tight transition-all duration-300 ${
                                    isScrolled 
                                        ? "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent" 
                                        : "text-white group-hover:text-yellow-300"
                                }`}
                            >
                                SHOP<span className="font-light">NEX</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex gap-6 items-center">
                            {/* Cart Button */}
                            <Link 
                                to="/cart" 
                                className={`relative group p-2 rounded-xl transition-all duration-300 ${
                                    isScrolled
                                        ? "hover:bg-purple-50"
                                        : "hover:bg-white/20"
                                }`}
                            >
                                <div className="relative">
                                    <ShoppingCartIcon 
                                        className={`h-7 w-7 transition-all duration-300 ${
                                            isScrolled 
                                                ? "text-gray-700 group-hover:text-purple-600" 
                                                : "text-white group-hover:text-yellow-300"
                                        } ${showCartPulse ? "animate-cart-shake" : ""}`}
                                    />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center shadow-lg animate-bounce-slow">
                                            {cartCount}
                                        </span>
                                    )}
                                    <div className="absolute inset-0 bg-purple-400 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
                                </div>
                            </Link>

                            {/* Profile Button (Authenticated Only) */}
                            {userId && (
                                <Link 
                                    to="/profile" 
                                    className={`relative group p-2 rounded-xl transition-all duration-300 ${
                                        isScrolled
                                            ? "hover:bg-purple-50"
                                            : "hover:bg-white/20"
                                    }`}
                                >
                                    <div className="relative">
                                        <UserIcon 
                                            className={`h-7 w-7 transition-all duration-300 ${
                                                isScrolled 
                                                    ? "text-gray-700 group-hover:text-purple-600" 
                                                    : "text-white group-hover:text-yellow-300"
                                            }`}
                                        />
                                        <div className="absolute inset-0 bg-purple-400 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
                                    </div>
                                </Link>
                            )}

                            {!userId ? (
                                <>
                                    {/* Login Button */}
                                    <Link 
                                        to="/login" 
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                                            isScrolled
                                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/50"
                                                : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                                        }`}
                                    >
                                        <UserIcon className="h-5 w-5" />
                                        <span>Login</span>
                                    </Link>

                                    {/* Signup Button */}
                                    <Link 
                                        to="/signup" 
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                                            isScrolled
                                                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/50"
                                                : "bg-yellow-400 text-purple-900 hover:bg-yellow-300"
                                        }`}
                                    >
                                        <SparklesIcon className="h-5 w-5" />
                                        <span>Sign Up</span>
                                    </Link>
                                </>
                            ) : (
                                <button 
                                    onClick={logout} 
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                                        isScrolled
                                            ? "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg hover:shadow-red-500/50"
                                            : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                                    }`}
                                >
                                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                    <span>Logout</span>
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                                isScrolled
                                    ? "text-gray-700 hover:bg-purple-50"
                                    : "text-white hover:bg-white/20"
                            }`}
                        >
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div 
                    className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                        isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className={`px-4 pt-4 pb-6 space-y-3 ${
                        isScrolled ? "bg-white/95" : "bg-white/10 backdrop-blur-md"
                    }`}>
                        {/* Mobile Cart */}
                        <Link 
                            to="/cart" 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                                isScrolled
                                    ? "bg-purple-50 text-gray-700 hover:bg-purple-100"
                                    : "bg-white/20 text-white hover:bg-white/30"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <ShoppingCartIcon className="h-6 w-6" />
                                <span className="font-semibold">Shopping Cart</span>
                            </div>
                            {cartCount > 0 && (
                                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Profile */}
                        {userId && (
                            <Link 
                                to="/profile" 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 p-3 rounded-xl font-semibold transition-all duration-300 ${
                                    isScrolled
                                        ? "bg-purple-50 text-gray-700 hover:bg-purple-100"
                                        : "bg-white/20 text-white hover:bg-white/30"
                                }`}
                            >
                                <UserIcon className="h-6 w-6" />
                                <span>My Profile</span>
                            </Link>
                        )}

                        {!userId ? (
                            <>
                                <Link 
                                    to="/login" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 p-3 rounded-xl font-semibold transition-all duration-300 ${
                                        isScrolled
                                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg"
                                            : "bg-white/20 text-white hover:bg-white/30"
                                    }`}
                                >
                                    <UserIcon className="h-6 w-6" />
                                    <span>Login</span>
                                </Link>

                                <Link 
                                    to="/signup" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 p-3 rounded-xl font-semibold transition-all duration-300 ${
                                        isScrolled
                                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg"
                                            : "bg-yellow-400 text-purple-900 hover:bg-yellow-300"
                                    }`}
                                >
                                    <SparklesIcon className="h-6 w-6" />
                                    <span>Sign Up</span>
                                </Link>
                            </>
                        ) : (
                            <button 
                                onClick={() => {
                                    logout();
                                    setIsMobileMenuOpen(false);
                                }} 
                                className={`w-full flex items-center gap-3 p-3 rounded-xl font-semibold transition-all duration-300 ${
                                    isScrolled
                                        ? "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg"
                                        : "bg-white/20 text-white hover:bg-white/30"
                                }`}
                            >
                                <ArrowRightOnRectangleIcon className="h-6 w-6" />
                                <span>Logout</span>
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Spacer to prevent content from going under fixed navbar */}
            <div className="h-16 md:h-20"></div>
        </>
    );
}