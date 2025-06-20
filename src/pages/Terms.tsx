
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { FileText, Scale, UserCheck, AlertCircle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navigation />
      
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/30 mb-6">
              <FileText className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm font-medium text-blue-300">Legal Agreement</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Terms of Service
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Please read these terms carefully before using the Elizabeth Trader platform and services.
            </p>
          </div>

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-8 space-y-8">
            
            {/* Agreement */}
            <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20">
              <div className="flex items-start space-x-3">
                <Scale className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-3">Agreement to Terms</h3>
                  <p className="text-gray-300 leading-relaxed">
                    By accessing and using the Elizabeth Trader platform, you agree to be bound by these Terms of Service 
                    and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited 
                    from using or accessing this site. These terms constitute a legally binding agreement between you and Elizabeth Trader.
                  </p>
                </div>
              </div>
            </div>

            {/* Platform Description */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Platform Description</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Elizabeth Trader is an educational platform that provides information, analysis, and educational content 
                related to cryptocurrency and binary options trading. Our services include:
              </p>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li>• Market analysis and educational content</li>
                <li>• Trading strategies and methodologies</li>
                <li>• Risk management education</li>
                <li>• Community discussions and insights</li>
                <li>• News and market updates</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                Our platform is for educational purposes only and does not constitute financial advice, investment 
                recommendations, or an offer to buy or sell securities.
              </p>
            </section>

            {/* User Eligibility */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <UserCheck className="w-6 h-6 text-green-400 mr-3" />
                User Eligibility
              </h2>
              <div className="bg-green-500/10 backdrop-blur-sm rounded-lg p-6 border border-green-500/20">
                <h3 className="text-lg font-semibold text-green-300 mb-3">To use our platform, you must:</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• Be at least 18 years of age</li>
                  <li>• Have the legal capacity to enter into binding agreements</li>
                  <li>• Not be prohibited from using our services under applicable laws</li>
                  <li>• Provide accurate and complete registration information</li>
                  <li>• Comply with all applicable laws and regulations in your jurisdiction</li>
                </ul>
                <p className="text-gray-300 mt-4">
                  We reserve the right to verify your eligibility and may request additional documentation to confirm 
                  your identity and compliance with these requirements.
                </p>
              </div>
            </section>

            {/* Account Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Account Responsibilities</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-3">Account Security</h3>
                  <div className="bg-yellow-500/10 backdrop-blur-sm rounded-lg p-4 border border-yellow-500/20">
                    <p className="text-gray-300 mb-3">You are responsible for:</p>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Maintaining the confidentiality of your account credentials</li>
                      <li>• All activities that occur under your account</li>
                      <li>• Notifying us immediately of any unauthorized access</li>
                      <li>• Using strong passwords and enabling security features</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-3">Prohibited Activities</h3>
                  <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-4 border border-red-500/20">
                    <p className="text-gray-300 mb-3">You agree not to:</p>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Use the platform for any illegal or unauthorized purposes</li>
                      <li>• Attempt to gain unauthorized access to our systems</li>
                      <li>• Distribute malware, viruses, or harmful code</li>
                      <li>• Harass, abuse, or harm other users</li>
                      <li>• Violate any applicable laws or regulations</li>
                      <li>• Share your account with others or create multiple accounts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                All content on the Elizabeth Trader platform, including but not limited to text, graphics, logos, 
                images, videos, software, and other materials, is the property of Elizabeth Trader or its licensors 
                and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-gray-200 mb-2">Your License</h4>
                  <p className="text-gray-300 text-sm">
                    We grant you a limited, non-exclusive, non-transferable license to access and use our platform 
                    for personal, educational purposes only.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-gray-200 mb-2">Restrictions</h4>
                  <p className="text-gray-300 text-sm">
                    You may not reproduce, distribute, modify, or create derivative works from our content without 
                    explicit written permission.
                  </p>
                </div>
              </div>
            </section>

            {/* Educational Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 text-orange-400 mr-3" />
                Educational Nature of Content
              </h2>
              <div className="bg-orange-500/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/20">
                <p className="text-gray-300 leading-relaxed mb-4">
                  All content provided on our platform is for educational and informational purposes only. This includes:
                </p>
                <ul className="text-gray-300 space-y-2 mb-4">
                  <li>• Market analysis and commentary</li>
                  <li>• Trading strategies and methodologies</li>
                  <li>• Educational materials and courses</li>
                  <li>• Historical performance data</li>
                </ul>
                <p className="text-gray-300 leading-relaxed font-semibold">
                  This content does not constitute financial advice, investment recommendations, or an offer to buy or sell securities. 
                  Always consult with qualified financial professionals before making investment decisions.
                </p>
              </div>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Payment and Subscription Terms</h2>
              <div className="space-y-4">
                <div className="bg-purple-500/10 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
                  <h4 className="font-semibold text-purple-300 mb-2">Subscription Services</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    Certain features may require paid subscriptions. Subscription fees are charged in advance and are non-refundable 
                    except as required by law.
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Automatic renewal unless cancelled</li>
                    <li>• Price changes with 30 days notice</li>
                    <li>• Cancellation effective at end of billing period</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-6 border border-red-500/20">
                <p className="text-gray-300 leading-relaxed mb-4">
                  To the maximum extent permitted by law, Elizabeth Trader shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="text-gray-300 space-y-2 mb-4">
                  <li>• Loss of profits or revenue</li>
                  <li>• Loss of data or information</li>
                  <li>• Trading losses or investment losses</li>
                  <li>• Business interruption</li>
                  <li>• Any other commercial damages or losses</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Our total liability for any claims arising from or related to our services shall not exceed 
                  the amount you paid us in the 12 months preceding the claim.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may terminate or suspend your account and access to our platform at any time, with or without cause, 
                with or without notice. Grounds for termination include:
              </p>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li>• Violation of these Terms of Service</li>
                <li>• Fraudulent or illegal activities</li>
                <li>• Non-payment of fees (if applicable)</li>
                <li>• Harm to other users or our platform</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                Upon termination, your right to use our platform ceases immediately, and we may delete your account data.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Governing Law and Disputes</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                These Terms of Service shall be governed by and construed in accordance with the laws of [Jurisdiction], 
                without regard to its conflict of law principles.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Any disputes arising from these terms or your use of our platform shall be resolved through binding 
                arbitration, except for claims that may be brought in small claims court.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We reserve the right to modify these Terms of Service at any time. We will notify users of material 
                changes by:
              </p>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li>• Posting updated terms on our platform</li>
                <li>• Sending email notifications</li>
                <li>• Displaying prominent notices</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                Your continued use of our platform after changes become effective constitutes acceptance of the new terms.
              </p>
            </section>

            {/* Contact Information */}
            <div className="bg-purple-500/10 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-purple-300 mb-3">Questions About These Terms?</h3>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@elizabethtrader.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                  legal@elizabethtrader.com
                </a>
              </p>
            </div>

            {/* Last Updated */}
            <div className="text-center pt-8 border-t border-white/10">
              <p className="text-sm text-gray-400">
                Last updated: May 15, 2025
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
