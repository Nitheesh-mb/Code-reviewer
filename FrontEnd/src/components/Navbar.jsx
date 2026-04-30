import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Code2, History, LogOut, LogIn, UserPlus, Cpu } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
              <Cpu className="text-white" size={20} />
            </div>
            <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
              CodeReview Pro
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-4">
            {token ? (
              <>
                <Link
                  to="/"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive("/") ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <Code2 size={18} />
                  <span className="hidden sm:block">Review</span>
                </Link>
                <Link
                  to="/history"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive("/history") ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <History size={18} />
                  <span className="hidden sm:block">History</span>
                </Link>
                <div className="h-6 w-[1px] bg-zinc-800 mx-2"></div>
                <div className="flex items-center gap-3 ml-2">
                  <span className="text-zinc-400 text-sm font-medium hidden lg:block">
                    {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut size={18} />
                    <span className="hidden sm:block">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white transition-all"
                >
                  <LogIn size={18} />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow-lg shadow-indigo-500/20 transition-all"
                >
                  <UserPlus size={18} />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
