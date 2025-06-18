import { Lightbulb, Sparkles } from "lucide-react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiMenu, FiX, FiBook, FiMessageSquare, FiAward, FiBarChart2 } from 'react-icons/fi'

const Navbar = ({isAuthenticated,setIsAuthenticated}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('quizState');
    setIsAuthenticated(false);
    // setMobileMenuOpen(false);
    navigate('/'); 
  };
  return (
    <nav className="sticky top-0 z-50 bg-[#f1faee] shadow-md py-2 px-8 flex justify-between items-center border-b border-gray-200">

    <div className="flex items-center space-x-2 text-[#264653] font-bold text-2xl">
      <Link to="/" className="flex items-center space-x-2 hover:text-[#f4a261] transition-colors duration-200">
        <Sparkles className="text-[#f4a261]" size={24} />
        <span>AutoResearcher</span>
      </Link>
    </div>

    <nav className="space-x-6 hidden md:flex text-[#2d3142] font-medium">
      <a href="#features" className="hover:text-[#f4a261] transition-colors duration-200">
        Features
      </a>
      <a href="#testimonials" className="hover:text-[#f4a261] transition-colors duration-200">
        Testimonials
      </a>
      <a href="#faq" className="hover:text-[#f4a261] transition-colors duration-200">
        FAQ
      </a>
      <a href="#contact" className="hover:text-[#f4a261] transition-colors duration-200">
        Contact
      </a>
      <a href="/research" className="hover:text-[#f4a261] transition-colors duration-200">
        Research
      </a>
    </nav>

    <div className="hidden md:block text-[#e76f51] font-semibold text-sm tracking-wide">
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl"
          title="Log out"
        >
          <FiLogOut />
          <span>Sign Out</span>
        </button>
      ) : (
        <button
          onClick={() => navigate('/signup')}
          className="px-6 py-3 rounded-lg bg-[#f4a261] text-white hover:bg-[#e76f51] font-semibold shadow-lg hover:shadow-xl"
        >
            Get Started
        </button>
      )}
    </div>
  </nav>
  )
};

export default Navbar;
