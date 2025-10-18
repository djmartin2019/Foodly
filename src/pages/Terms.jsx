import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Terms() {
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
          <h1 className="text-4xl font-bold text-gradient mb-4">Terms of Service</h1>
          <p className="text-zinc-400">Last updated: January 2025</p>
        </div>

        {/* Content */}
        <div className="glass rounded-3xl p-8 border border-zinc-800">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-zinc-100 mb-4">1. Acceptance of Terms</h2>
            <p className="text-zinc-300 mb-6">
              By accessing and using Foodly, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">2. Use License</h2>
            <p className="text-zinc-300 mb-4">
              Permission is granted to temporarily use Foodly for personal, non-commercial transitory viewing only. 
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="text-zinc-300 mb-6 list-disc list-inside space-y-2">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display</li>
              <li>attempt to reverse engineer any software contained on the website</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">3. User Content</h2>
            <p className="text-zinc-300 mb-6">
              You are responsible for any content you post, including restaurant recommendations, reviews, and location data. 
              You grant Foodly a non-exclusive, royalty-free license to use, modify, and display your content in connection with the service.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">4. Privacy</h2>
            <p className="text-zinc-300 mb-6">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, 
              to understand our practices.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">5. Prohibited Uses</h2>
            <p className="text-zinc-300 mb-4">You may not use our service:</p>
            <ul className="text-zinc-300 mb-6 list-disc list-inside space-y-2">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
            </ul>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">6. Disclaimer</h2>
            <p className="text-zinc-300 mb-6">
              The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
              Foodly excludes all representations, warranties, conditions and terms relating to our website and the use of this website.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">7. Limitations</h2>
            <p className="text-zinc-300 mb-6">
              In no event shall Foodly or its suppliers be liable for any damages (including, without limitation, damages for loss of data 
              or profit, or due to business interruption) arising out of the use or inability to use the materials on Foodly's website.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">8. Accuracy of Materials</h2>
            <p className="text-zinc-300 mb-6">
              The materials appearing on Foodly's website could include technical, typographical, or photographic errors. 
              Foodly does not warrant that any of the materials on its website are accurate, complete, or current.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">9. Changes</h2>
            <p className="text-zinc-300 mb-6">
              Foodly may revise these terms of service for its website at any time without notice. By using this website, 
              you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <h2 className="text-2xl font-bold text-zinc-100 mb-4">10. Contact Information</h2>
            <p className="text-zinc-300 mb-6">
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:djmartindev@gmail.com" className="text-brand-green hover:text-brand-mint transition-colors">
                djmartindev@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
