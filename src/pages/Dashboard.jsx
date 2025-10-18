import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, User } from "lucide-react";

function Dashboard() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <header className="border-b border-zinc-900 glass">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gradient">Foodly</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-brand-green transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="glass rounded-3xl p-8 border border-zinc-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-green to-brand-mint rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-brand-dark" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-100">
                Welcome, {profile?.first_name || "Food Explorer"}!
              </h2>
              <p className="text-zinc-400">{profile?.email || user?.email}</p>
            </div>
          </div>

          {profile && (
            <div className="mt-8 space-y-3">
              <div className="flex justify-between py-3 border-b border-zinc-800">
                <span className="text-zinc-400">Name:</span>
                <span className="text-zinc-100 font-medium">
                  {profile.first_name} {profile.last_name}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-zinc-800">
                <span className="text-zinc-400">Email:</span>
                <span className="text-zinc-100 font-medium">
                  {profile.email}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-zinc-800">
                <span className="text-zinc-400">Phone:</span>
                <span className="text-zinc-100 font-medium">
                  {profile.phone}
                </span>
              </div>
            </div>
          )}

          <div className="mt-12 p-6 bg-brand-green/10 border border-brand-green/30 rounded-2xl">
            <h3 className="text-xl font-bold text-brand-green mb-2">
              Coming Soon!
            </h3>
            <p className="text-zinc-400">
              We're building something amazing. Soon you'll be able to pin
              spots, vouch for favorites, and discover what your city's really
              eating.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
