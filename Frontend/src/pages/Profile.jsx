import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import api from "../api/axios";

export default function Profile() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [activeTab, setActiveTab] = useState("details"); // details, wishlist, orders
  
  // Data States
  const [user, setUser] = useState({});
  const [address, setAddress] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // Form State for editing details
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    adressLine: "",
    city: "",
    state: "",
    pincode: ""
  });

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    fetchProfileData();
    fetchOrders();
  }, [userId]);

  const fetchProfileData = async () => {
    try {
      const res = await api.get(`/user/profile/${userId}`);
      setUser(res.data.user);
      setWishlist(res.data.user.wishlist || []);
      setAddress(res.data.address || {});
      setForm({
        name: res.data.user.name || "",
        phone: res.data.user.phone || "",
        adressLine: res.data.address?.adressLine || "",
        city: res.data.address?.city || "",
        state: res.data.address?.state || "",
        pincode: res.data.address?.pincode || ""
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get(`/user/orders/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/user/profile/${userId}`, form);
      setMsg(res.data.message);
      setEditMode(false);
      fetchProfileData(); // refresh
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setMsg("Failed to update profile");
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl font-bold text-indigo-600">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in pt-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-8 mb-8 text-center transform transition-all duration-500 hover:-translate-y-2">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-4xl text-white font-bold mx-auto mb-4 shadow-lg shadow-purple-500/30">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            {user.name}
          </h1>
          <p className="text-gray-500 mt-1">{user.email}</p>
        </div>

        {msg && (
          <div className="mb-6 bg-green-100 text-green-700 p-4 rounded-xl text-center font-bold shadow-md animate-slide-down">
            {msg}
          </div>
        )}

        {/* Custom Tabs Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          {["details", "wishlist", "orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:-translate-y-1 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/40"
                  : "bg-white/70 text-gray-600 hover:bg-white hover:text-purple-600 shadow-md border border-white/30"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-10 animate-slide-up" style={{ perspective: '1000px' }}>
          
          {/* PROFILE DETAILS TAB */}
          {activeTab === "details" && (
            <div className="animate-fade-in-up">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800">Personal & Contact Info</h2>
                {!editMode && (
                  <button onClick={() => setEditMode(true)} className="text-indigo-600 font-bold hover:text-purple-600 hover:underline transition-colors">
                    Edit Details
                  </button>
                )}
              </div>

              {!editMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
                  <div className="space-y-4">
                    <p><span className="font-bold text-indigo-500">Full Name:</span> {user.name}</p>
                    <p><span className="font-bold text-indigo-500">Email:</span> {user.email}</p>
                    <p><span className="font-bold text-indigo-500">Phone:</span> {user.phone || <span className="text-gray-400 italic">Not added</span>}</p>
                  </div>
                  <div className="space-y-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                    <p className="font-bold text-indigo-500 mb-2 border-b border-gray-200 pb-1">Saved Address</p>
                    <p>{address?.adressLine || <span className="text-gray-400 italic">No address line</span>}</p>
                    <p>{address?.city ? `${address.city}, ${address.state}` : <span className="text-gray-400 italic">City, State</span>}</p>
                    <p>{address?.pincode || <span className="text-gray-400 italic">Pincode</span>}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                      <input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-1">Address Line</label>
                      <input name="adressLine" value={form.adressLine} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">City</label>
                      <input name="city" value={form.city} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">State</label>
                      <input name="state" value={form.state} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Pincode</label>
                      <input name="pincode" value={form.pincode} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none" />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:-translate-y-1 transition-transform">
                      Save Changes
                    </button>
                    <button type="button" onClick={() => setEditMode(false)} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* WISHLIST TAB */}
          {activeTab === "wishlist" && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">My Wishlist</h2>
              {wishlist.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-6xl mb-4 animate-pulse">💔</div>
                  <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
                  <button onClick={() => navigate("/")} className="mt-4 text-indigo-600 font-bold hover:underline">Go shopping!</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {wishlist.map(product => (
                    <div key={product._id} className="group bg-white/60 backdrop-blur-lg border border-white/40 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none transition-transform group-hover:scale-150 duration-700"></div>
                      <div className="relative overflow-hidden rounded-2xl mb-4 bg-gradient-to-b from-gray-50 to-white">
                        <img src={product.image} alt={product.title} className="w-full h-48 object-contain transform group-hover:scale-110 transition-transform duration-500 p-2" />
                      </div>
                      <h3 className="font-bold text-gray-800 line-clamp-2 min-h-[48px] group-hover:text-purple-600 transition-colors">{product.title}</h3>
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <p className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">₹{product.price}</p>
                      </div>
                      <button 
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-bold shadow-md shadow-purple-500/30 hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Product
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">My Orders</h2>
              {orders.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-6xl mb-4 animate-bounce">📦</div>
                  <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order._id} className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4 border-b pb-4">
                        <div>
                          <p className="text-sm text-gray-500">Order ID</p>
                          <p className="font-mono font-bold text-gray-800">{order._id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-bold text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Status</p>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === 'Placed' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="font-bold text-gray-700 mb-2">Items:</p>
                        <ul className="space-y-2">
                          {order.items.map(item => (
                            <li key={item._id} className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">{item.productId?.title || 'Product'} <span className="font-bold">x{item.quantity}</span></span>
                              <span className="font-bold text-gray-800">₹{item.price * item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-dashed">
                        <p className="text-gray-500 font-bold">Payment: {order.paymentMethod}</p>
                        <p className="text-xl font-extrabold text-green-600">Total: ₹{order.totalAmount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
