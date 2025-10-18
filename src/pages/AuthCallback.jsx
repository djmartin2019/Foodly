import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Sparkles, CheckCircle, XCircle } from "lucide-react";

function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Handle the OAuth/email confirmation callback
    const handleCallback = async () => {
      try {
        // Get the hash fragment from the URL
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const accessToken = hashParams.get("access_token");
        const type = hashParams.get("type");

        if (type === "signup") {
          setStatus("success");
          setMessage("Email confirmed! Redirecting to login...");

          // Wait 2 seconds then redirect to login
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else if (accessToken) {
          // User is already logged in via the token
          setStatus("success");
          setMessage("Email confirmed! Redirecting to app...");

          setTimeout(() => {
            navigate("/app");
          }, 2000);
        } else {
          throw new Error("No confirmation token found");
        }
      } catch (error) {
        console.error("Confirmation error:", error);
        setStatus("error");
        setMessage(
          "There was an issue confirming your email. Please try again or contact support."
        );
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-6">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-mint/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-brand-green via-brand-mint to-emerald-400 bg-clip-text text-transparent">
              Foodly
            </span>
          </h1>
        </div>

        {/* Status Card */}
        <div className="glass rounded-3xl p-12 border border-zinc-800 text-center">
          {status === "loading" && (
            <>
              <div className="w-16 h-16 border-4 border-brand-green border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-zinc-100 mb-2">
                Confirming Email...
              </h2>
              <p className="text-zinc-400">Please wait a moment</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-16 h-16 text-brand-green mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-zinc-100 mb-2">
                Success!
              </h2>
              <p className="text-zinc-400">{message}</p>
              <div className="mt-6 flex items-center justify-center gap-2 text-brand-mint">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span className="text-sm">Your taste graph awaits...</span>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-zinc-100 mb-2">Oops!</h2>
              <p className="text-zinc-400 mb-6">{message}</p>
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-3 bg-brand-green text-brand-dark font-semibold rounded-xl hover:bg-brand-mint transition-colors"
              >
                Back to Signup
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthCallback;
