import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Sparkles, Mail, Lock, User, Phone, AlertCircle } from "lucide-react";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const validateForm = () => {
    if (isSignUp) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password ||
        !formData.phone
      ) {
        setError("All fields are required");
        return false;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return false;
      }
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        setError("Please enter a valid email");
        return false;
      }
      if (!/^\d{10,}$/.test(formData.phone.replace(/[-\s()]/g, ""))) {
        setError("Please enter a valid phone number");
        return false;
      }
    } else {
      if (!formData.email || !formData.password) {
        setError("Email and password are required");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    if (isSignUp) {
      const { data, error } = await signUp(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(
          "Account created! Please check your email to verify your account."
        );
        // Clear form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
        });
      }
    } else {
      const { data, error } = await signIn(formData.email, formData.password);

      if (error) {
        setError(error.message);
      } else {
        navigate("/app");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-6 py-12">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-mint/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to home link */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 text-brand-green hover:text-brand-mint transition-colors flex items-center gap-2"
        >
          ← Back to home
        </button>

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-brand-green via-brand-mint to-emerald-400 bg-clip-text text-transparent">
              Foodly
            </span>
          </h1>
          <p className="text-zinc-400">
            {isSignUp ? "Join the taste revolution" : "Welcome back"}
          </p>
        </div>

        {/* Auth Form */}
        <div className="glass rounded-3xl p-8 border border-zinc-800">
          {/* Toggle */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => {
                setIsSignUp(true);
                setError("");
                setSuccess("");
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                isSignUp
                  ? "bg-brand-green text-brand-dark shadow-glow-green"
                  : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                setIsSignUp(false);
                setError("");
                setSuccess("");
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                !isSignUp
                  ? "bg-brand-green text-brand-dark shadow-glow-green"
                  : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Login
            </button>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-brand-green/10 border border-brand-green/30 rounded-xl flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
              <p className="text-brand-green text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <>
                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-green transition-colors"
                      placeholder="John"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-green transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-green transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-green transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isSignUp && (
              <>
                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-green transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-green text-brand-dark font-bold text-lg uppercase tracking-wide rounded-xl shadow-glow-green hover:shadow-glow-green-lg hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <Sparkles className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Additional Info */}
          {isSignUp && (
            <p className="mt-6 text-xs text-zinc-500 text-center">
              By signing up, you agree to our Terms of Service and Privacy
              Policy
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
