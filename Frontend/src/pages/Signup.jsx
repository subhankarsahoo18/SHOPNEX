import { useState } from "react";
import { useNavigate, Link } from "react-router";
import api from "../api/axios";

const STARS = [
  { top: "8%",  left: "8%",  size: 20, opacity: 0.55, delay: "0.2s" },
  { top: "75%", left: "5%",  size: 13, opacity: 0.40, delay: "0.7s" },
  { top: "30%", left: "91%", size: 17, opacity: 0.50, delay: "0.4s" },
  { top: "85%", left: "86%", size: 11, opacity: 0.35, delay: "1.2s" },
  { top: "15%", left: "78%", size: 9,  opacity: 0.35, delay: "0.9s" },
  { top: "60%", left: "7%",  size: 8,  opacity: 0.28, delay: "1.5s" },
  { top: "50%", left: "93%", size: 10, opacity: 0.30, delay: "0.1s" },
];

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [msg, setMsg]       = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");
    try {
      const response = await api.post("/auth/signup", form);
      setMsg(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMsg(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const isSuccess = msg && (msg.toLowerCase().includes("success") || msg.toLowerCase().includes("created") || msg.toLowerCase().includes("registered"));

  const fields = [
    {
      name: "name", label: "Full Name", type: "text",
      placeholder: "John Doe", required: true,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      ),
    },
    {
      name: "email", label: "Email", type: "email",
      placeholder: "you@example.com", required: true,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      ),
    },
    {
      name: "phone", label: "Phone (Optional)", type: "tel",
      placeholder: "+91 98765 43210", required: false,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      ),
    },
    {
      name: "password", label: "Password", type: "password",
      placeholder: "••••••••", required: true,
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      ),
    },
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#4a1080] px-4 py-10 overflow-hidden">

      {/* ── Floating stars ─────────────────────────────── */}
      {STARS.map((s, i) => (
        <svg
          key={i} viewBox="0 0 24 24" fill="none"
          stroke="#FBBF24" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round"
          className="absolute pointer-events-none select-none"
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

      {/* ── Radial glow ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(251,191,36,0.07) 0%, transparent 65%)" }}
      />

      {/* ── Card ────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-7">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"
            style={{ animation: "float 3s ease-in-out 0s infinite" }}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="font-extrabold text-2xl tracking-tight text-white">
            SHOP<span className="font-light text-yellow-300">NEX</span>
          </span>
        </div>

        <div
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl transition-all duration-500"
          style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(251,191,36,0.1)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(251,191,36,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(251,191,36,0.1)";
          }}
        >
          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-3xl font-extrabold text-white mb-1 tracking-tight">
              Create Account ✨
            </h1>
            <p className="text-purple-200 text-sm">
              Join <span className="text-yellow-300 font-semibold">ShopNex</span> and start shopping today
            </p>
          </div>

          {/* Message */}
          {msg && (
            <div className={`mb-5 text-center text-sm font-semibold px-4 py-3 rounded-xl border ${
              isSuccess
                ? "bg-green-500/20 text-green-200 border-green-400/30"
                : "bg-red-500/20 text-red-200 border-red-400/30"
            }`}>
              {msg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="group">
                <label
                  htmlFor={`signup-${field.name}`}
                  className="block text-xs font-bold text-purple-200 mb-1.5 ml-1 uppercase tracking-wider
                             group-focus-within:text-yellow-300 transition-colors"
                >
                  {field.label}
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-3.5 top-3.5 h-5 w-5 text-purple-300 group-focus-within:text-yellow-400 transition-colors pointer-events-none"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    {field.icon}
                  </svg>
                  <input
                    id={`signup-${field.name}`}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl
                               text-white placeholder-purple-300
                               focus:outline-none focus:border-yellow-400/70 focus:bg-white/15 focus:ring-2 focus:ring-yellow-400/20
                               transition-all duration-200 text-sm"
                  />
                </div>
              </div>
            ))}

            {/* Submit */}
            <button
              id="signup-submit"
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 mt-2
                ${isLoading
                  ? "bg-white/20 text-white/50 cursor-not-allowed"
                  : "bg-yellow-400 text-purple-900 hover:bg-yellow-300 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_8px_20px_rgba(251,191,36,0.35)] hover:shadow-[0_12px_28px_rgba(251,191,36,0.45)]"
                }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </>
              ) : "Create My Account →"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/15" />
            <span className="text-purple-300 text-xs font-medium">or</span>
            <div className="flex-1 h-px bg-white/15" />
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-purple-200">
            Already have an account?{" "}
            <Link to="/login"
              className="text-yellow-300 font-bold hover:text-yellow-200 hover:underline transition-colors"
            >
              Sign in →
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <p className="text-center mt-5">
          <Link to="/" className="text-purple-300 text-xs hover:text-yellow-300 transition-colors">
            ← Back to ShopNex
          </Link>
        </p>
      </div>
    </div>
  );
}