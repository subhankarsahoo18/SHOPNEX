// import { useState } from "react";
// import { useNavigate } from "react-router";
// import api from "../api/axios";

// export default function Login() {
//   const [form,setForm]=useState({
//     email:"",
//     password:""
//   })
//   const [msg,setMsg]=useState("");
//   const navigate=useNavigate();

//   const handleChange=(e)=>{
//     setForm({
//       ...form,
//       [e.target.name]:e.target.value
//     });
//   }
  
//   const handleSubmit=async(e)=>{
//     e.preventDefault();

//     try{
//       const res = await api.post("/auth/login",form);
//       console.log(res,"data");
//       //Save Token to localStorage
//       localStorage.setItem("token",res.data.token);
//       localStorage.setItem("userId",res.data.user.id);

//       setMsg("Login Successful");
//       //Redirect to Home Page after 1 second
//       setTimeout(()=>{
//         navigate("/");
//       },1000);
//     } catch(err){
//       setMsg(err.response?.data?.message || "An error occurred" );
//     }
//   }

//   return(
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div  className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

//         {msg && (
//           <div className="mb-4 text-center text-sm text-red-600 font-medium">
//             {msg}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name='email'
//             type="email"
//             placeholder="Enter Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             name='password'
//             type="password"
//             placeholder="Enter Password"
//             value={form.password}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate, Link } from "react-router"; // Added Link import
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");

    try {
      const res = await api.post("/auth/login", form);
      console.log(res, "data");
      // Save Token to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);

      setMsg("Login Successful");
      // Redirect to Home Page after 1 second
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-violet-900 px-4 animate-fade-in" style={{ perspective: '1000px' }}>
      <div 
        className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 w-full max-w-md transition-all duration-500 animate-slide-up"
        style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-5deg) rotateY(5deg) scale(0.95)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
          e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(138,43,226,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'rotateX(-5deg) rotateY(5deg) scale(0.95)';
          e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.5)';
        }}
      >
        <div className="text-center mb-6" style={{ transform: 'translateZ(30px)' }}>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2 drop-shadow-sm">Welcome Back</h2>
          <p className="text-gray-600 font-medium">Login to your 3D workspace</p>
        </div>

        {msg && (
          <div className={`mb-4 text-center text-sm font-bold p-3 rounded-xl transition-all duration-300 shadow-inner ${
            msg === "Login Successful" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`} style={{ transform: 'translateZ(20px)' }}>
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" style={{ transform: 'translateZ(40px)' }}>
          <div className="relative group">
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1 group-focus-within:text-purple-600 transition-colors">Email</label>
            <div className="relative">
              <input
                name="email"
                type="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-12 bg-white/50 border-2 border-transparent rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] transition-all duration-300 font-medium"
                required
              />
              <svg className="absolute left-4 top-3.5 h-5 w-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>
          
          <div className="relative group">
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1 group-focus-within:text-purple-600 transition-colors">Password</label>
            <div className="relative">
              <input
                name="password"
                type="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-12 bg-white/50 border-2 border-transparent rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] transition-all duration-300 font-medium"
                required
              />
              <svg className="absolute left-4 top-3.5 h-5 w-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-lg text-white shadow-[0_10px_20px_rgba(109,40,217,0.4)] transition-all duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed shadow-none"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 transform hover:-translate-y-1 hover:shadow-[0_15px_25px_rgba(109,40,217,0.5)] active:translate-y-1"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center" style={{ transform: 'translateZ(20px)' }}>
          <p className="text-sm font-medium text-gray-600">
            Don't have an account? <Link to="/signup" className="text-indigo-600 hover:text-purple-600 font-bold hover:underline transition-colors">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}