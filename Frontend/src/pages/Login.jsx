import { useState } from "react";
import { useNavigate, Link } from "react-router";
import api from "../api/axios";

// Floating star positions (matches hero section pattern)
const STARS = [
  { top: "10%", left: "6%",  size: 22, opacity: 0.6,  delay: "0s" },
  { top: "70%", left: "4%",  size: 14, opacity: 0.45, delay: "0.6s" },
  { top: "40%", left: "90%", size: 18, opacity: 0.55, delay: "0.3s" },
  { top: "80%", left: "88%", size: 12, opacity: 0.35, delay: "1.1s" },
  { top: "20%", left: "82%", size: 10, opacity: 0.4,  delay: "0.8s" },
  { top: "55%", left: "8%",  size: 9,  opacity: 0.3,  delay: "1.4s" },
];

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg]     = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      setMsg("Login Successful");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#4a1080] px-4 overflow-hidden">

      {/* ── Floating star decorations (matches home hero) ── */}
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
        style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(251,191,36,0.08) 0%, transparent 70%)" }}
      />

      {/* ── Card ────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-md">

        {/* Logo above card */}
        <div className="flex items-center justify-center gap-2 mb-8">
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
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl
                     transition-all duration-500"
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
              Welcome Back! 👋
            </h1>
            <p className="text-purple-200 text-sm">
              Sign in to your <span className="text-yellow-300 font-semibold">ShopNex</span> account
            </p>
          </div>

          {/* Message */}
          {msg && (
            <div className={`mb-5 text-center text-sm font-semibold px-4 py-3 rounded-xl border ${
              msg === "Login Successful"
                ? "bg-green-500/20 text-green-200 border-green-400/30"
                : "bg-red-500/20 text-red-200 border-red-400/30"
            }`}>
              {msg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="group">
              <label className="block text-xs font-bold text-purple-200 mb-1.5 ml-1 uppercase tracking-wider
                               group-focus-within:text-yellow-300 transition-colors">
                Email
              </label>
              <div className="relative">
                <svg className="absolute left-3.5 top-3.5 h-5 w-5 text-purple-300 group-focus-within:text-yellow-400 transition-colors pointer-events-none"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  id="login-email"
                  name="email" type="email"
                  placeholder="you@example.com"
                  value={form.email} onChange={handleChange} required
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl
                             text-white placeholder-purple-300
                             focus:outline-none focus:border-yellow-400/70 focus:bg-white/15 focus:ring-2 focus:ring-yellow-400/20
                             transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-xs font-bold text-purple-200 mb-1.5 ml-1 uppercase tracking-wider
                               group-focus-within:text-yellow-300 transition-colors">
                Password
              </label>
              <div className="relative">
                <svg className="absolute left-3.5 top-3.5 h-5 w-5 text-purple-300 group-focus-within:text-yellow-400 transition-colors pointer-events-none"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  id="login-password"
                  name="password" type="password"
                  placeholder="••••••••"
                  value={form.password} onChange={handleChange} required
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl
                             text-white placeholder-purple-300
                             focus:outline-none focus:border-yellow-400/70 focus:bg-white/15 focus:ring-2 focus:ring-yellow-400/20
                             transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
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
                  Signing in...
                </>
              ) : "Sign In →"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/15" />
            <span className="text-purple-300 text-xs font-medium">or</span>
            <div className="flex-1 h-px bg-white/15" />
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-purple-200">
            Don't have an account?{" "}
            <Link to="/signup"
              className="text-yellow-300 font-bold hover:text-yellow-200 hover:underline transition-colors"
            >
              Create one →
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