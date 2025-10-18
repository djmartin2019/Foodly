import {
  ArrowLeft,
  MapPin,
  Heart,
  TrendingUp,
  Users,
  Shield,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-mint/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 text-brand-green hover:text-brand-mint transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gradient mb-6">
            About Foodly
          </h1>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
            A community-driven platform for discovering local food gems and
            sharing authentic taste experiences.
          </p>
        </div>

        {/* Vision Section */}
        <div className="glass rounded-3xl p-8 border border-zinc-800 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-zinc-100 mb-4">
              Our Vision
            </h2>
            <p className="text-lg text-zinc-300 max-w-4xl mx-auto">
              We believe the best food discoveries happen through authentic
              community connections, not algorithms. Foodly empowers locals to
              share hidden gems and helps food lovers find experiences that
              truly resonate with their taste.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-green to-brand-mint rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-brand-dark" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">
                Community First
              </h3>
              <p className="text-zinc-400">
                Real people sharing real experiences, not paid promotions or
                fake reviews.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-green to-brand-mint rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-brand-dark" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">
                Local Discovery
              </h3>
              <p className="text-zinc-400">
                Find hidden gems in your neighborhood that tourists and chains
                can't replicate.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-green to-brand-mint rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-brand-dark" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-2">
                Privacy Focused
              </h3>
              <p className="text-zinc-400">
                Your data stays yours. We aggregate insights, not individual
                profiles.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="glass rounded-3xl p-8 border border-zinc-800 mb-12">
          <h2 className="text-3xl font-bold text-zinc-100 mb-8 text-center">
            How Foodly Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-green to-brand-mint rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-10 h-10 text-brand-dark" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-3">
                Pin Spots
              </h3>
              <p className="text-zinc-300">
                Share your favorite local restaurants, food trucks, and hidden
                gems. Add photos, notes, and what makes each place special.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-green to-brand-mint rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-10 h-10 text-brand-dark" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-3">
                Vouch Favorites
              </h3>
              <p className="text-zinc-300">
                Validate great recommendations by vouching for spots you've
                tried. Build trust through authentic community validation.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-green to-brand-mint rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="w-10 h-10 text-brand-dark" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-3">
                Discover Trends
              </h3>
              <p className="text-zinc-300">
                See what's trending in your area, find new spots based on your
                taste profile, and discover the pulse of your local food scene.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="glass rounded-3xl p-8 border border-zinc-800 mb-12">
          <h2 className="text-3xl font-bold text-zinc-100 mb-8 text-center">
            What Makes Foodly Different
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                    No Ads, No Promotions
                  </h3>
                  <p className="text-zinc-300">
                    We don't sell ad space or promote restaurants for money.
                    Every recommendation comes from genuine community members.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                    Hyperlocal Focus
                  </h3>
                  <p className="text-zinc-300">
                    Discover spots within walking distance, neighborhood gems,
                    and local favorites that big platforms miss.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                    Community Validation
                  </h3>
                  <p className="text-zinc-300">
                    Multiple vouches from different community members ensure
                    quality recommendations you can trust.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                    Privacy First
                  </h3>
                  <p className="text-zinc-300">
                    We don't sell your data or track you across the web. Your
                    taste preferences stay private and secure.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                    Taste-Based Matching
                  </h3>
                  <p className="text-zinc-300">
                    Find recommendations based on your actual taste preferences,
                    not just location or popularity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                    Real-Time Trends
                  </h3>
                  <p className="text-zinc-300">
                    See what's actually trending in your area right now, not
                    what was popular months ago.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future Vision */}
        <div className="glass rounded-3xl p-8 border border-zinc-800 mb-12">
          <h2 className="text-3xl font-bold text-zinc-100 mb-6 text-center">
            The Future of Food Discovery
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-zinc-300 mb-6 text-center">
              We're building more than just another food app. We're creating a
              movement toward authentic, community-driven discovery that puts
              local businesses and real experiences first.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-zinc-100 mb-3">
                  For Food Lovers
                </h3>
                <p className="text-zinc-300">
                  Discover hidden gems, find spots that match your taste, and
                  connect with like-minded food enthusiasts in your area.
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-zinc-100 mb-3">
                  For Local Businesses
                </h3>
                <p className="text-zinc-300">
                  Get discovered by people who genuinely appreciate your food,
                  not through expensive ads or fake reviews.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">
            Ready to Join the Community?
          </h2>
          <p className="text-zinc-300 mb-8">
            Be among the first to discover and share amazing local food
            experiences.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-gradient-to-r from-brand-green to-brand-mint text-brand-dark font-bold py-3 px-8 rounded-lg hover:shadow-[0_0_15px_#24C38C66] transition-all duration-300"
          >
            Join the Beta
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
