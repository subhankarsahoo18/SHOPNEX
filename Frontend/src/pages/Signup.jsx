// import { useState } from "react";
// import api from "../api/axios";

// export default function Signup() {
//   const [form,setForm]=useState({
//     name:"",
//     email:"",
//     password:""
//   })
//   const [msg,setMsg]=useState("");

//   const handleChange=(e)=>{
//     setForm({
//       ...form,
//       [e.target.name]:e.target.value
//     });
//   }

//   const handleSubmit=async(e)=>{
//     e.preventDefault();

//     try{
//       const response=await api.post("/auth/signup",form);
//       setMsg(response.data.message);
//     } catch(err){
//       setMsg(err.response?.data?.message || "An error occurred" );
//     }
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div  className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

//         {msg && (
//           <div className="mb-4 text-center text-sm text-blue-600 font-medium">
//             {msg}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name='name'
//             placeholder="Enter Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
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
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate, Link } from "react-router"; // Added for navigation
import api from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
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
      const response = await api.post("/auth/signup", form);
      setMsg(response.data.message);
      // Optionally redirect to login after successful signup
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMsg(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-500 px-4 animate-fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:scale-105 animate-slide-up">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-bounce-in">Create Your Account</h2>
          <p className="text-gray-600">Join us today</p>
        </div>

        {msg && (
          <div className={`mb-4 text-center text-sm font-medium p-3 rounded-lg transition-all duration-300 ${
            msg.includes("success") || msg.includes("Success") ? "bg-green-100 text-green-700 animate-slide-down" : "bg-red-100 text-red-700 animate-shake"
          }`}>
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <input
                name="name"
                placeholder="Enter Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-violet-300 focus:border-violet-500 transition-all duration-300"
                required
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <input
                name="email"
                type="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-violet-300 focus:border-violet-500 transition-all duration-300"
                required
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                name="password"
                type="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-violet-300 focus:border-violet-500 transition-all duration-300"
                required
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-indigo-600 hover:to-violet-500 hover:shadow-lg transform hover:-translate-y-1"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing up...
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-violet-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}