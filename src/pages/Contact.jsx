import { ArrowLeft, Mail, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Contact() {
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
          <h1 className="text-4xl font-bold text-gradient mb-4">Contact Us</h1>
          <p className="text-zinc-400">Get in touch with the Foodly team</p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Primary Contact */}
          <div className="glass rounded-3xl p-8 border border-zinc-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-green to-brand-mint rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-brand-dark" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-100">David Martin</h2>
                <p className="text-zinc-400">Founder & Developer</p>
              </div>
            </div>
            <p className="text-zinc-300 mb-4">
              Questions about Foodly? Feature requests? Bug reports? I'd love to hear from you!
            </p>
            <a
              href="mailto:djmartindev@gmail.com"
              className="inline-flex items-center gap-2 text-brand-green hover:text-brand-mint transition-colors font-semibold"
            >
              <Mail className="w-4 h-4" />
              djmartindev@gmail.com
            </a>
          </div>

          {/* General Info */}
          <div className="glass rounded-3xl p-8 border border-zinc-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-green to-brand-mint rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-brand-dark" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-100">Foodly</h2>
                <p className="text-zinc-400">Community Platform</p>
              </div>
            </div>
            <p className="text-zinc-300 mb-4">
              A community-driven platform for discovering local food gems and sharing taste experiences.
            </p>
            <div className="space-y-2 text-sm text-zinc-400">
              <p>📍 Global Community</p>
              <p>🍜 Restaurant Discovery</p>
              <p>👥 Taste Sharing</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass rounded-3xl p-8 border border-zinc-800 mb-12">
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-green transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-green transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-zinc-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-green transition-colors"
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-green transition-colors resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-green to-brand-mint text-brand-dark font-bold py-3 px-6 rounded-lg hover:shadow-[0_0_15px_#24C38C66] transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="glass rounded-3xl p-8 border border-zinc-800">
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">How do I report a bug?</h3>
              <p className="text-zinc-300">
                Send an email to djmartindev@gmail.com with "Bug Report" in the subject line. 
                Include details about what happened and steps to reproduce the issue.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">Can I suggest new features?</h3>
              <p className="text-zinc-300">
                Absolutely! We love hearing your ideas. Email us with "Feature Request" in the subject 
                and describe how it would improve your Foodly experience.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">How quickly do you respond?</h3>
              <p className="text-zinc-300">
                We typically respond within 24-48 hours during business days. For urgent issues, 
                please mark your email as "URGENT" in the subject line.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">Is my data safe?</h3>
              <p className="text-zinc-300">
                Yes! We take privacy seriously. Check out our Privacy Policy for details on how 
                we protect and use your information.
              </p>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-zinc-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">We typically respond within 24-48 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
