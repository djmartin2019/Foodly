import { useEffect, useState, useRef } from "react";
import {
  MapPin,
  Heart,
  TrendingUp,
  Sparkles,
  Users,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Set Mapbox access token
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

if (!mapboxToken) {
  console.warn("⚠️ Mapbox token not found");
} else {
  mapboxgl.accessToken = mapboxToken;
  console.log("✅ Mapbox token loaded successfully");
}

function Landing() {
  const [isVisible, setIsVisible] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Initialize map for community section
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Check if token is available
    if (!mapboxgl.accessToken) {
      console.warn("Mapbox token not found. Map will not render.");
      return;
    }

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-95.3698, 29.7604], // Houston, TX
      zoom: 13,
      attributionControl: false,
    });

    // Wait for map to load
    map.current.on("load", () => {
      setMapLoaded(true);

      // Create custom marker element for Pho Spot
      const markerElement = document.createElement("div");
      markerElement.className = "custom-marker";
      markerElement.style.width = "32px";
      markerElement.style.height = "32px";
      markerElement.style.borderRadius = "50%";
      markerElement.style.backgroundColor = "#24C38C";
      markerElement.style.border = "3px solid #0B0F0E";
      markerElement.style.boxShadow = "0 0 20px rgba(36, 195, 140, 0.6)";
      markerElement.style.cursor = "pointer";
      markerElement.style.display = "flex";
      markerElement.style.alignItems = "center";
      markerElement.style.justifyContent = "center";
      markerElement.innerHTML = "📍";
      markerElement.style.fontSize = "16px";

      // Add main marker for "Pho Spot on 5th"
      const marker = new mapboxgl.Marker({
        element: markerElement,
        anchor: "bottom",
      })
        .setLngLat([-95.3698, 29.7604])
        .setPopup(
          new mapboxgl.Popup({ offset: 25, className: "map-popup" }).setHTML(
            `
            <div style="background: #18181B; color: #fff; padding: 12px; border-radius: 8px; border: 1px solid #24C38C44;">
              <h4 style="font-weight: bold; margin: 0 0 4px 0; color: #24C38C;">Pho Spot on 5th</h4>
              <p style="margin: 0; font-size: 12px; color: #A1A1AA;">Best banh mi in the neighborhood</p>
              <div style="margin-top: 8px; font-size: 11px; color: #71717A;">
                ❤️ 127 vouches • 📍 0.3 mi away
              </div>
            </div>
          `
          )
        )
        .addTo(map.current);

      // Add ambient markers for visual interest
      const ambientLocations = [
        { lng: -95.3798, lat: 29.7704, name: "Taco Haven" },
        { lng: -95.3598, lat: 29.7504, name: "Coffee Hideout" },
        { lng: -95.3898, lat: 29.7504, name: "Dim Sum Palace" },
      ];

      ambientLocations.forEach((location) => {
        const ambientMarker = document.createElement("div");
        ambientMarker.style.width = "12px";
        ambientMarker.style.height = "12px";
        ambientMarker.style.borderRadius = "50%";
        ambientMarker.style.backgroundColor = "#2EE59D";
        ambientMarker.style.border = "2px solid #0B0F0E";
        ambientMarker.style.boxShadow = "0 0 10px rgba(46, 229, 157, 0.4)";
        ambientMarker.style.opacity = "0.6";

        new mapboxgl.Marker({
          element: ambientMarker,
          anchor: "center",
        })
          .setLngLat([location.lng, location.lat])
          .addTo(map.current);
      });
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const handleCTAClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/app");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-mint/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>

          {/* Floating map pins */}
          <div className="absolute top-20 left-1/4 animate-float">
            <MapPin className="w-6 h-6 text-brand-green/40" />
          </div>
          <div className="absolute top-40 right-1/3 animate-float delay-500">
            <MapPin className="w-4 h-4 text-brand-mint/40" />
          </div>
          <div className="absolute bottom-32 left-1/3 animate-float delay-1000">
            <MapPin className="w-5 h-5 text-brand-green/30" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div
            className={`mb-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-7xl md:text-8xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-brand-green via-brand-mint to-emerald-400 bg-clip-text text-transparent">
                Foodly
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <div
            className={`mb-6 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-4xl md:text-5xl font-semibold text-zinc-100 mb-4">
              Find food that feels local.
            </p>
            <p className="text-xl md:text-2xl text-zinc-400 font-light">
              A map for taste, powered by you.
            </p>
          </div>

          {/* Micro-copy */}
          <div
            className={`mb-12 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-brand-mint flex items-center justify-center gap-2 text-lg">
              <Sparkles className="w-5 h-5" />
              Discover what your city's really eating.
            </p>
          </div>

          {/* CTA Button */}
          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <button
              onClick={handleCTAClick}
              className="inline-flex items-center gap-3 px-12 py-5 bg-brand-green text-brand-dark font-bold text-lg uppercase tracking-wide rounded-full shadow-glow-green hover:shadow-glow-green-lg hover:bg-gradient-to-r hover:from-emerald-400 hover:to-teal-300 transition-all duration-300 transform hover:scale-105"
            >
              Join the Beta
              <Sparkles className="w-5 h-5" />
            </button>
            <p className="mt-6 text-sm text-zinc-500">
              Your taste graph starts here.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-brand-green/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-2 bg-brand-green rounded-full"></div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 fade-on-scroll opacity-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-100">
              How It Works
            </h2>
            <p className="text-xl text-zinc-400">
              Three simple steps to unlock your city's taste map
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="fade-on-scroll opacity-0 group">
              <div className="glass rounded-3xl p-8 border border-zinc-800 hover:border-brand-green/50 transition-all duration-300 h-full hover:shadow-glow-green">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-green to-brand-mint rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-brand-dark" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-zinc-100">
                  📍 Pin spots
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Add hidden local gems to the map. Share your secret finds and
                  favorite haunts with the community.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="fade-on-scroll opacity-0 group">
              <div className="glass rounded-3xl p-8 border border-zinc-800 hover:border-brand-mint/50 transition-all duration-300 h-full hover:shadow-glow-green">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-mint to-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-brand-dark" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-zinc-100">
                  ❤️ Vouch favorites
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Validate great taste by vouching for spots you love. Build
                  your reputation as a trusted food guide.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="fade-on-scroll opacity-0 group">
              <div className="glass rounded-3xl p-8 border border-zinc-800 hover:border-brand-green/50 transition-all duration-300 h-full hover:shadow-glow-green">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-brand-dark" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-zinc-100">
                  📊 Discover trends
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  See what's hot nearby. Follow taste trends and discover places
                  recommended by people with similar preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="fade-on-scroll opacity-0">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-brand-green" />
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-100">
                  Real people.
                  <br />
                  Real taste data.
                </h2>
              </div>
              <p className="text-xl text-zinc-400 leading-relaxed mb-6">
                No algorithms, no ads, no influencer BS. Just authentic
                recommendations from your community's most trusted taste-makers.
              </p>
              <p className="text-lg text-brand-mint">
                Join a community that values quality over clout.
              </p>
            </div>

            {/* Mock Feed Card */}
            <div className="fade-on-scroll opacity-0">
              <div className="glass rounded-3xl p-6 border border-zinc-800 shadow-glow-green">
                {/* User Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-green to-brand-mint rounded-full flex items-center justify-center font-bold text-brand-dark">
                    JD
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-100">Jane Doe</p>
                    <p className="text-sm text-zinc-500">
                      2 blocks away · 5 vouches
                    </p>
                  </div>
                </div>

                {/* Interactive Map */}
                <div className="relative rounded-2xl overflow-hidden mb-4 border border-zinc-800/50">
                  <div
                    ref={mapContainer}
                    className="w-full h-[200px]"
                    style={{
                      background: mapLoaded ? "transparent" : "#18181B",
                    }}
                  >
                    {/* Loading state */}
                    {!mapLoaded && !mapboxgl.accessToken && (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900/50 backdrop-blur-sm">
                        <MapPin className="w-12 h-12 text-brand-green/30 mb-2" />
                        <p className="text-zinc-500 text-xs">
                          Map preview coming soon
                        </p>
                      </div>
                    )}
                    {!mapLoaded && mapboxgl.accessToken && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-brand-green border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>

                  {/* Map overlay */}
                  <div className="absolute top-2 right-2 glass rounded-lg px-2 py-1 border border-zinc-800">
                    <p className="text-xs text-zinc-400">
                      <span className="text-brand-green font-semibold">
                        Live
                      </span>
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h4 className="font-bold text-lg text-zinc-100 mb-2">
                    Hidden Gem Alert: Pho Spot on 5th
                  </h4>
                  <p className="text-zinc-400 text-sm">
                    Best bahn mi in the neighborhood. Family-owned, cash only.
                    The kind of place locals don't want to share... but should.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-zinc-800">
                  <button className="flex items-center gap-2 text-brand-green hover:text-brand-mint transition-colors">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm font-medium">Vouch</span>
                  </button>
                  <button className="flex items-center gap-2 text-zinc-400 hover:text-zinc-300 transition-colors">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm font-medium">Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Note Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center fade-on-scroll opacity-0">
          <div className="glass rounded-3xl p-12 border border-zinc-800">
            <Shield className="w-12 h-12 text-brand-green mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-zinc-100 mb-4">
              Your Data, Your Terms
            </h3>
            <p className="text-lg text-zinc-400 leading-relaxed mb-4">
              We don't sell individuals. Just insights.
            </p>
            <p className="text-sm text-zinc-500">
              Your pins stay yours. We aggregate taste trends for the community,
              not for advertisers. Privacy-first, always.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Logo and Copyright */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gradient mb-2">Foodly</h3>
              <p className="text-sm text-zinc-500">
                © Foodly 2025. All rights reserved.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-8 text-sm">
              <a
                href="/terms"
                className="text-zinc-400 hover:text-brand-green transition-colors"
              >
                Terms
              </a>
              <a
                href="/privacy"
                className="text-zinc-400 hover:text-brand-green transition-colors"
              >
                Privacy
              </a>
              <a
                href="/contact"
                className="text-zinc-400 hover:text-brand-green transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center mt-12">
            <p className="text-xs text-zinc-600 italic">
              Find food that feels local.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
