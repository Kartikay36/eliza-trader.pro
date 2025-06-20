
import { Link } from 'react-router-dom';
import { Shield, FileText, AlertTriangle, Lock } from 'lucide-react';
import { useState } from 'react';
import DynamicLogo from './DynamicLogo';
import ContactSection from './ContactSection';
import SocialLinks from './SocialLinks';

const Footer = () => {
  const [showContact, setShowContact] = useState(false);
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
        { label: "News & Updates", path: "/news" },
        { label: "Login", path: "/login" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Disclaimer", path: "/disclaimer", icon: AlertTriangle },
        { label: "Privacy Policy", path: "/privacy", icon: Lock },
        { label: "Terms of Service", path: "/terms", icon: FileText },
        { label: "Risk Disclosure", path: "/risk", icon: Shield }
      ]
    },
    {
      title: "Contact",
      links: [
        { label: "Trading Education", action: () => setShowContact(true) },
        { label: "Technical Support", action: () => setShowContact(true) },
        { label: "Business Inquiries", action: () => setShowContact(true) }
      ]
    }
  ];

  if (showContact) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <ContactSection />
          <div className="text-center mt-6">
            <button
              onClick={() => setShowContact(false)}
              className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <footer className="relative bg-black/20 backdrop-blur-sm border-t border-white/10">
      {/* Wave Design */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-12"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-blue-500/20"
          ></path>
        </svg>
      </div>

      <div className="relative pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <DynamicLogo />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Elizabeth Trader
                </span>
              </Link>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Your trusted partner in crypto and binary options trading education. Empowering traders worldwide with professional analysis and proven strategies.
              </p>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-2">Trusted by 3,300+ traders</p>
            </div>

            {/* Links */}
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-white mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.path ? (
                        <Link
                          to={link.path}
                          className="flex items-center space-x-2 text-gray-300 hover:text-blue-300 transition-colors duration-200 group"
                        >
                          {link.icon && <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />}
                          <span>{link.label}</span>
                        </Link>
                      ) : (
                        <button
                          onClick={link.action}
                          className="flex items-center space-x-2 text-gray-300 hover:text-blue-300 transition-colors duration-200 group"
                        >
                          <span>{link.label}</span>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Connect With Us Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">Connect With Us</h3>
              <SocialLinks />
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-6 border border-red-500/20 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-lg font-semibold text-red-300 mb-2">Important Risk Warning</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Trading in crypto and binary options involves substantial risk and may not be suitable for all investors. 
                  Past performance does not guarantee future results. Please read our Risk Disclosure statement and 
                  understand the risks involved before trading.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © {currentYear} Elizabeth Trader. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>Licensed Financial Education Provider</span>
                <span>•</span>
                <span>ISO 27001 Certified</span>
                <span>•</span>
                <span>SSL Secured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
