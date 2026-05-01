// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router";

// export default function Cart() {
//     const userId = localStorage.getItem("userId");
//     const [cart, setCart] = useState(null);
//     const navigate = useNavigate();

//     //Load cart data
//     const loadCart = async () => {
//         if (!userId) return;
//         const res = await api.get(`/cart/${userId}`);
//         setCart(res.data);
//     };

//     useEffect(() => {
//         loadCart();
//     }, []);

//     const removeItem = async (productId) => {
//         await api.post(`/cart/remove`, { userId, productId });
//         loadCart();
//         window.dispatchEvent(new Event("cartUpdated"));
//     };

//     //Update item quantity
//     const updateQty = async (productId, quantity) => {
//         if (quantity === 0) {
//             await removeItem(productId);
//             return;
//         }

//         await api.post(`/cart/update`, { userId, productId, quantity });
//         loadCart();
//         window.dispatchEvent(new Event("cartUpdated"));
//     };

//     if (!cart) {
//         return <div>Loading...</div>;
//     }

//     const total = cart.items.reduce(
//         (sum, item) => sum + item.productId.price * item.quantity,
//         0
//     );

//     return (
//         <div className="max-w-4xl mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//             {cart.items.length === 0 ? (
//                 <div>Your cart is empty.</div>
//             ) : (
//                 <div className="space-y-4">
//                     {cart.items.map((item) => (
//                         <div
//                             key={item.productId._id}
//                             className="flex items-center justify-between p-4 border rounded"
//                         >
//                             <div className="flex items-center gap-4">
//                                 <img
//                                     src={item.productId.image}
//                                     alt={item.productId.title}
//                                     className="w-16 h-16 object-cover rounded"
//                                 />
//                                 <div>
//                                     <h2 className="text-lg font-semibold">
//                                         {item.productId.title}
//                                     </h2>
//                                     <p className="text-gray-600">
//                                         ${item.productId.price.toFixed(2)}
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center gap-2">
//                                 <button
//                                     onClick={() =>
//                                         updateQty(item.productId._id, item.quantity - 1)
//                                     }
//                                     className="px-2 py-1 bg-gray-200 rounded"
//                                 >
//                                     -
//                                 </button>
//                                 <span>{item.quantity}</span>
//                                 <button
//                                     onClick={() =>
//                                         updateQty(item.productId._id, item.quantity + 1)
//                                     }
//                                     className="px-2 py-1 bg-gray-200 rounded"
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                             <div>
//                                 <p className="font-semibold">
//                                     ${(item.productId.price * item.quantity).toFixed(2)}
//                                 </p>
//                             </div>
//                             <button
//                                 onClick={() => removeItem(item.productId._id)}
//                                 className="text-red-500"
//                             >
//                                 Remove
//                             </button>
//                         </div>
//                     ))}

//                     <div className="text-right mt-4">
//                         <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
//                     </div>
//                     <button onClick={() => navigate("/checkout-address")} className="w-full bg-blue-500 text-white p-2 rounded">
//                         Proceed to Checkout
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }





// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router";

// export default function Cart() {
//     const userId = localStorage.getItem("userId");
//     const [cart, setCart] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     // Load cart data
//     const loadCart = async () => {
//         if (!userId) {
//             setLoading(false);
//             return;
//         }
//         setLoading(true);
//         try {
//             const res = await api.get(`/cart/${userId}`);
//             setCart(res.data);
//         } catch (error) {
//             console.error("Failed to load cart:", error);
//             alert("Error loading cart. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         loadCart();
//     }, []);

//     const removeItem = async (productId) => {
//         try {
//             await api.post(`/cart/remove`, { userId, productId });
//             loadCart();
//             window.dispatchEvent(new Event("cartUpdated"));
//         } catch (error) {
//             console.error("Failed to remove item:", error);
//             alert("Error removing item. Please try again.");
//         }
//     };

//     // Update item quantity
//     const updateQty = async (productId, quantity) => {
//         if (quantity === 0) {
//             await removeItem(productId);
//             return;
//         }

//         try {
//             await api.post(`/cart/update`, { userId, productId, quantity });
//             loadCart();
//             window.dispatchEvent(new Event("cartUpdated"));
//         } catch (error) {
//             console.error("Failed to update quantity:", error);
//             alert("Error updating quantity. Please try again.");
//         }
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6 animate-fadeIn">
//                 <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 animate-pulse">
//                     <div className="h-8 bg-gray-200 rounded mb-6"></div>
//                     <div className="space-y-4">
//                         {Array.from({ length: 3 }).map((_, i) => (
//                             <div key={i} className="flex items-center justify-between p-4 border rounded bg-gray-50">
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-16 h-16 bg-gray-200 rounded"></div>
//                                     <div>
//                                         <div className="h-4 bg-gray-200 rounded mb-2 w-32"></div>
//                                         <div className="h-4 bg-gray-200 rounded w-20"></div>
//                                     </div>
//                                 </div>
//                                 <div className="h-8 bg-gray-200 rounded w-24"></div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (!cart || cart.items.length === 0) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6 animate-fadeIn">
//                 <div className="text-center max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8">
//                     <div className="text-6xl mb-4">🛒</div>
//                     <h1 className="text-2xl font-bold text-gray-600 mb-2">Your cart is empty.</h1>
//                     <p className="text-gray-500 mb-6">Add some products to get started!</p>
//                     <button
//                         onClick={() => navigate("/")}
//                         className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
//                     >
//                         Start Shopping
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const total = cart.items.reduce(
//         (sum, item) => sum + item.productId.price * item.quantity,
//         0
//     );

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 animate-fadeIn">
//             <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
//                 <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-8 text-center animate-fadeIn delay-200">
//                     🛒 Your Cart
//                 </h1>

//                 <div className="space-y-6">
//                     {cart.items.map((item, index) => (
//                         <div
//                             key={item.productId._id}
//                             className="flex flex-col md:flex-row items-center justify-between p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-fadeIn"
//                             style={{ animationDelay: `${index * 0.1}s` }}
//                         >
//                             <div className="flex items-center gap-4 mb-4 md:mb-0">
//                                 <img
//                                     src={item.productId.image}
//                                     alt={item.productId.title}
//                                     className="w-20 h-20 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
//                                 />
//                                 <div>
//                                     <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
//                                         {item.productId.title}
//                                     </h2>
//                                     <p className="text-gray-600">
//                                         ₹{item.productId.price.toFixed(2)} each
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4">
//                                 <div className="flex items-center gap-2">
//                                     <button
//                                         onClick={() =>
//                                             updateQty(item.productId._id, item.quantity - 1)
//                                         }
//                                         className="w-8 h-8 bg-gray-200 hover:bg-red-200 text-gray-700 hover:text-red-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
//                                     >
//                                         -
//                                     </button>
//                                     <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
//                                     <button
//                                         onClick={() =>
//                                             updateQty(item.productId._id, item.quantity + 1)
//                                         }
//                                         className="w-8 h-8 bg-gray-200 hover:bg-green-200 text-gray-700 hover:text-green-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
//                                     >
//                                         +
//                                     </button>
//                                 </div>

//                                 <div className="text-right">
//                                     <p className="text-xl font-bold text-green-600">
//                                         ₹{(item.productId.price * item.quantity).toFixed(2)}
//                                     </p>
//                                 </div>

//                                 <button
//                                     onClick={() => removeItem(item.productId._id)}
//                                     className="text-red-500 hover:text-red-700 font-semibold transition-colors duration-300 transform hover:scale-105"
//                                 >
//                                     🗑️ Remove
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="mt-8 p-6 bg-gray-50 rounded-xl shadow-inner animate-fadeIn delay-500">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-2xl font-bold text-gray-800">Total:</h2>
//                         <h2 className="text-3xl font-extrabold text-green-600">₹{total.toFixed(2)}</h2>
//                     </div>
//                     <button
//                         onClick={() => navigate("/checkout")}
//                         className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 animate-fadeIn delay-700"
//                     >
//                         🚀 Proceed to Checkout
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }




import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import { 
    ShoppingCartIcon, 
    TrashIcon, 
    PlusIcon, 
    MinusIcon,
    ArrowRightIcon,
    SparklesIcon,
    TagIcon
} from "@heroicons/react/24/outline";

export default function Cart() {
    const userId = localStorage.getItem("userId");
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [removingItems, setRemovingItems] = useState(new Set());
    const [updatingItems, setUpdatingItems] = useState(new Set());
    const navigate = useNavigate();

    // Load cart data
    const loadCart = async () => {
        if (!userId) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const res = await api.get(`/cart/${userId}`);
            setCart(res.data);
        } catch (error) {
            console.error("Failed to load cart:", error);
            alert("Error loading cart. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const removeItem = async (productId) => {
        setRemovingItems(prev => new Set([...prev, productId]));
        try {
            await api.post(`/cart/remove`, { userId, productId });
            await loadCart();
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Failed to remove item:", error);
            alert("Error removing item. Please try again.");
        } finally {
            setRemovingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
        }
    };

    // Update item quantity
    const updateQty = async (productId, quantity) => {
        if (quantity === 0) {
            await removeItem(productId);
            return;
        }

        setUpdatingItems(prev => new Set([...prev, productId]));
        try {
            await api.post(`/cart/update`, { userId, productId, quantity });
            await loadCart();
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Failed to update quantity:", error);
            alert("Error updating quantity. Please try again.");
        } finally {
            setUpdatingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(productId);
                return newSet;
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6 relative overflow-hidden">
                {/* Animated Background Blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-4xl w-full mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <ShoppingCartIcon className="h-10 w-10 text-purple-600 animate-pulse" />
                        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 animate-pulse"></div>
                    </div>
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div 
                                key={i} 
                                className="flex items-center justify-between p-6 border-2 border-gray-100 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 animate-pulse"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl"></div>
                                    <div className="space-y-3">
                                        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-40"></div>
                                        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-24"></div>
                                    </div>
                                </div>
                                <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-32"></div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="text-center max-w-md mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 relative z-10 animate-scale-in">
                    <div className="relative inline-block mb-6">
                        <ShoppingCartIcon className="h-32 w-32 text-gray-300 mx-auto animate-swing" />
                        <div className="absolute -top-2 -right-2 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold animate-bounce">
                            0
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Your cart is empty
                    </h1>
                    <p className="text-gray-600 text-lg mb-8">Add some amazing products to get started!</p>
                    <button
                        onClick={() => navigate("/")}
                        className="group relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <SparklesIcon className="h-6 w-6" />
                            Start Shopping
                            <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>
            </div>
        );
    }

    const total = cart.items.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    );

    const savings = cart.items.reduce((sum, item) => {
        const originalPrice = item.productId.price * 1.2; // Simulated original price
        return sum + (originalPrice - item.productId.price) * item.quantity;
    }, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-6 animate-fade-in-down">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <ShoppingCartIcon className="h-12 w-12 text-purple-600" />
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse">
                                    {cart.items.length}
                                </div>
                            </div>
                            <div>
                                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                    Shopping Cart
                                </h1>
                                <p className="text-gray-600 mt-1">{cart.items.length} items in your cart</p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate("/")}
                            className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.items.map((item, index) => (
                            <div
                                key={item.productId._id}
                                className={`group bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border-2 border-transparent hover:border-purple-200 animate-slide-in-right ${
                                    removingItems.has(item.productId._id) ? 'animate-slide-out-right opacity-50' : ''
                                }`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Product Image */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
                                            <img
                                                src={item.productId.image}
                                                alt={item.productId.title}
                                                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                            20% OFF
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-grow">
                                        <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                                            {item.productId.title}
                                        </h2>
                                        <div className="flex items-center gap-3 mb-4">
                                            <p className="text-2xl font-bold text-green-600">
                                                ₹{item.productId.price.toFixed(2)}
                                            </p>
                                            <p className="text-lg text-gray-400 line-through">
                                                ₹{(item.productId.price * 1.2).toFixed(2)}
                                            </p>
                                            <TagIcon className="h-5 w-5 text-green-600" />
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-2">
                                                <button
                                                    onClick={() => updateQty(item.productId._id, item.quantity - 1)}
                                                    disabled={updatingItems.has(item.productId._id)}
                                                    className="w-10 h-10 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <MinusIcon className="h-5 w-5" />
                                                </button>
                                                <span className="text-xl font-bold w-12 text-center">
                                                    {updatingItems.has(item.productId._id) ? (
                                                        <div className="animate-spin h-5 w-5 border-2 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
                                                    ) : (
                                                        item.quantity
                                                    )}
                                                </span>
                                                <button
                                                    onClick={() => updateQty(item.productId._id, item.quantity + 1)}
                                                    disabled={updatingItems.has(item.productId._id)}
                                                    className="w-10 h-10 bg-white hover:bg-green-50 text-gray-700 hover:text-green-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <PlusIcon className="h-5 w-5" />
                                                </button>
                                            </div>

                                            <div className="flex-grow text-right">
                                                <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                                                <p className="text-2xl font-bold text-purple-600">
                                                    ₹{(item.productId.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.productId._id)}
                                                disabled={removingItems.has(item.productId._id)}
                                                className="group/btn p-3 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 rounded-lg transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {removingItems.has(item.productId._id) ? (
                                                    <div className="animate-spin h-5 w-5 border-2 border-red-500 border-t-transparent rounded-full"></div>
                                                ) : (
                                                    <TrashIcon className="h-6 w-6 group-hover/btn:animate-shake" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-2 border-purple-100 animate-fade-in-left">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <SparklesIcon className="h-6 w-6 text-purple-600" />
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Subtotal ({cart.items.length} items)</span>
                                    <span className="font-semibold text-gray-800">₹{(total + savings).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-green-600">
                                    <span className="flex items-center gap-1">
                                        <TagIcon className="h-5 w-5" />
                                        Savings
                                    </span>
                                    <span className="font-semibold">-₹{savings.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold text-green-600">FREE</span>
                                </div>
                                <div className="border-t-2 border-dashed border-gray-200 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-gray-800">Total</span>
                                        <span className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                            ₹{total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate("/checkout")}
                                className="group w-full relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Proceed to Checkout
                                    <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            <p className="text-center text-sm text-gray-500 mt-4">
                                🔒 Secure checkout guaranteed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
}