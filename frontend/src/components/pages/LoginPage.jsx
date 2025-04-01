import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Mail, Lock, Eye, EyeOff } from "lucide-react";
import  useAuthStore  from "../../store/useAuthStore.js";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Ensure login is extracted properly
  const login = useAuthStore((state) => state.login);
  const isLoggingIn = useAuthStore((state) => state.isLoggingIn);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!login) {
      console.error("Login function is not available!");
      return;
    }
    await login(formData); // Calls the login function
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white">
      <div className="card w-full max-w-md shadow-xl p-6 bg-gradient-to-br from-blue-200 to-purple-300">
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl- text-black font-bold mt-2">
              Login to Your Account
            </h1>
            <p className="text-black">Enter your credentials to continue</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-black" />
              <input
                type="email"
                className="input input-bordered w-full pl-10 bg-white"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-black" />
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 pr-10 bg-white"
                placeholder="••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-500"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging In..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-black">
            Don't have an account?{" "}
            <Link to="/signup" className="link text-blue-800">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
