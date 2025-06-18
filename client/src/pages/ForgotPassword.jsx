import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';


export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email:data.email}),
        credentials: 'include'
      });

      if(res.status == 200){
          setLoading(false);
      }
      if (!res.ok) {
        toast.error(res.message || "Something went wrong!");
        return;
      }
      const result = await res.json();
      toast.success("Recovery email sent successfully!");
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
        setLoading(false);
        toast.error(`Something went wrong. Try again. ${err}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f5f0] flex items-center justify-center px-4">
      <ToastContainer position="top-right" />
      <motion.form
        onSubmit={handleSubmit(submitHandler)}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-md w-full bg-white shadow-xl rounded-3xl p-8 sm:p-10 space-y-6 border border-[#e9dccf]"
      >
        <h2 className="text-3xl font-bold text-center text-[#264653]">Forgot password ?</h2>
        <p className="flex text-sm text-[#5C4033]">
          Don&#39;t worry it happens all the time. Write your email
             below and we will send you a recovery email.
        </p>
        <p className="text-xs mt-1 text-[#7a5c42]">(Note: Check your spam/junk folder too)</p>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#4b3f35]">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            autoFocus
            {...register('email',{
                required: 'Please enter a valid email',
                pattern: {
                    value:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'Please use a valid email format ',
                },
            })}
            className={`w-full px-4 py-2 rounded-lg border ${
                errors.email ? "border-red-500" : "border-[#ddd]"
              } focus:ring-2 focus:ring-[#f4a261] outline-none bg-[#fdfaf6] text-[#2d3142]`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#8B4513] hover:bg-[#A0522D]"
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Recovery Email"}
        </button>

        {/* Switch to Signup */}
        <p className="text-center text-sm text-[#5C4033] dark:text-[#C7B299]">
          <Link to="/signup" className="text-[#A0522D] hover:underline dark:text-[#E6B07E]">
            Don't have an account?
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
