import { useState } from "react";
import { MessageSquare, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../AuthImagePattern";
import toast from "react-hot-toast";
import useAuthStore from "../../store/useAuthStore";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { signup } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password) return toast.error("Password is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return toast.error("Invalid email format");
    }

    if (formData.password.length < 6)
      return toast.error("Password length must be at least 6 characters!");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSigningUp(true); // Indicate signing-up state

    try {
      await signup(formData);
      toast.success("Signed up successfully!");
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-white ">
      <div className="card w-full max-w-md  shadow-xl p-6 bg-gradient-to-br from-blue-200 to-purple-300">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2 text-black">
              Create Account
            </h1>
            <p className="text-black">Get started with your free account</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 ">
          {/* Full Name */}
          <div className="form-control ">
            <label className="label">
              <span className="label-text font-medium ">Full Name</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-color-black " />
              <input
                type="text"
                className="input input-bordered w-full pl-10 bg-white"
                placeholder="Aarya Admane"
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-color-black " />
              <input
                type="email"
                className="input input-bordered w-full pl-10  bg-white"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-black-500">
                Password
              </span>
            </label>
            <div className="relative  text-black ">
              <Lock className="absolute left-3 top-3  " />
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 pr-10  bg-white"
                placeholder="••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-color-black "
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-500"
            disabled={isSigningUp} // diabsled while signing up
          >
            {isSigningUp ? "Signing Up..." : "Create Account"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-blue-600">
            Already have an Account?
            <Link to="/login" className="link text-blue-800">
              Log In
            </Link>
          </p>
        </div>
      </div>

      {/*  right side  */}

      <AuthImagePattern
        title="Join Our Community"
        subtitle="Connnect with friends,share moments,and stay in touch with your loved ones"
      />
    </div>
  );
}
