import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-mint/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 text-brand-green hover:text-brand-mint transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">
            Privacy Policy
          </h1>
          <p className="text-zinc-400">Last updated: October 2025</p>
        </div>

        {/* Content */}
        <div className="glass rounded-3xl p-8 border border-zinc-800">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-zinc-100 mb-4">
              Our Commitment to Privacy
            </h2>
            <p className="text-zinc-300 mb-6">
              At Foodly, we believe in transparency and protecting your privacy.
              This policy explains how we collect, use, and safeguard your
              information when you use our service.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">
              Information We Collect
            </h2>
            <h3 className="text-xl font-semibold text-zinc-200 mb-3">
              Personal Information
            </h3>
            <p className="text-zinc-300 mb-4">
              When you create an account, we collect:
            </p>
            <ul className="text-zinc-300 mb-6 list-disc list-inside space-y-2">
              <li>Name (first and last)</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Password (encrypted)</li>
            </ul>

            <h3 className="text-xl font-semibold text-zinc-200 mb-3">
              Location Data
            </h3>
            <p className="text-zinc-300 mb-6">
              We collect location information when you:
            </p>
            <ul className="text-zinc-300 mb-6 list-disc list-inside space-y-2">
              <li>Pin restaurant locations</li>
              <li>Allow location access for nearby recommendations</li>
              <li>Share your general area for local food trends</li>
            </ul>

            <h3 className="text-xl font-semibold text-zinc-200 mb-3">
              Usage Information
            </h3>
            <p className="text-zinc-300 mb-6">
              We automatically collect information about how you use Foodly,
              including:
            </p>
            <ul className="text-zinc-300 mb-6 list-disc list-inside space-y-2">
              <li>Restaurant recommendations you make</li>
              <li>Reviews and ratings you provide</li>
              <li>App usage patterns and preferences</li>
              <li>Device information and IP address</li>
            </ul>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-zinc-300 mb-4">We use your information to:</p>
            <ul className="text-zinc-300 mb-6 list-disc list-inside space-y-2">
              <li>Provide personalized restaurant recommendations</li>
              <li>Show you relevant local food trends</li>
              <li>Connect you with other food enthusiasts in your area</li>
              <li>Improve our service and develop new features</li>
              <li>Send you important updates about your account</li>
              <li>Prevent fraud and ensure platform safety</li>
            </ul>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">
              Data Sharing and Disclosure
            </h2>
            <p className="text-zinc-300 mb-4">
              <strong className="text-brand-green">
                We don't sell your personal information.
              </strong>{" "}
              We may share aggregated, anonymized data for research and trend
              analysis, but never your individual data.
            </p>
            <p className="text-zinc-300 mb-6">
              We may share your information only in these limited circumstances:
            </p>
            <ul className="text-zinc-300 mb-6 list-disc list-inside space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>In case of a business transfer (with notice)</li>
            </ul>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">
              Data Security
            </h2>
            <p className="text-zinc-300 mb-6">
              We implement industry-standard security measures to protect your
              information, including encryption, secure servers, and regular
              security audits. However, no method of transmission over the
              internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">
              Your Rights and Choices
            </h2>
            <p className="text-zinc-300 mb-4">You have the right to:</p>
            <ul className="text-zinc-300 mb-6 list-disc list-inside space-y-2">
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Opt out of non-essential communications</li>
              <li>Request a copy of your data</li>
              <li>Correct inaccurate information</li>
            </ul>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-zinc-300 mb-6">
              We use cookies and similar technologies to enhance your
              experience, remember your preferences, and analyze usage patterns.
              You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">
              Third-Party Services
            </h2>
            <p className="text-zinc-300 mb-6">
              We use trusted third-party services (like Supabase for data
              storage and Mapbox for maps) that have their own privacy policies.
              We ensure these services meet our privacy standards.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">
              Children's Privacy
            </h2>
            <p className="text-zinc-300 mb-6">
              Foodly is not intended for children under 13. We do not knowingly
              collect personal information from children under 13. If we learn
              we have collected such information, we will delete it promptly.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-zinc-300 mb-6">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">
              Contact Us
            </h2>
            <p className="text-zinc-300 mb-6">
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:djmartindev@gmail.com"
                className="text-brand-green hover:text-brand-mint transition-colors"
              >
                djmartindev@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
