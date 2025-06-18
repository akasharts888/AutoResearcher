import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function LoginPage({ setIsAuthenticated }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: 'include'
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }
      toast.success("Login successful!");
      setIsAuthenticated(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      toast.error(`Something went wrong. Try again.${err}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f5f0] flex items-center justify-center px-4">
      <ToastContainer position="top-right" />
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-md w-full bg-white shadow-xl rounded-3xl p-8 sm:p-10 space-y-6 border border-[#e9dccf]"
      >
        <h2 className="text-3xl font-bold text-center text-[#264653]">Log In</h2>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#4b3f35]">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full px-4 py-2 rounded-lg border border-[#ddd] focus:ring-2 focus:ring-[#f4a261] outline-none bg-[#fdfaf6] text-[#2d3142]"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-[#4b3f35]">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Your Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full px-4 py-2 pr-12 rounded-lg border border-[#ddd] focus:ring-2 focus:ring-[#f4a261] outline-none bg-[#fdfaf6] text-[#2d3142]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-[#8B5E3C] dark:text-[#D3BBA0]"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="text-right text-sm">
          <Link to="/forgot-password" className="text-[#A0522D] hover:underline dark:text-[#E6B07E]">
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[#8B4513] hover:bg-[#A0522D] text-white font-semibold transition"
        >
          Log In
        </button>

        {/* Switch to Signup */}
        <p className="text-center text-sm text-[#5C4033] dark:text-[#C7B299]">
          <Link to="/signup" className="text-[#A0522D] hover:underline dark:text-[#E6B07E]">
            Don’t have an account?
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
