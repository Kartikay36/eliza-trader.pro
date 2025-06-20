
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Lock, Shield, Eye, Database, UserCheck } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navigation />
      
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30 mb-6">
              <Lock className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-sm font-medium text-green-300">Privacy Protected</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information.
            </p>
          </div>

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-8 space-y-8">
            
            {/* Introduction */}
            <div className="bg-green-500/10 backdrop-blur-sm rounded-lg p-6 border border-green-500/20">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-green-300 mb-3">Our Commitment to Privacy</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Elizabeth Trader is committed to protecting your privacy and personal information. This Privacy Policy 
                    explains how we collect, use, disclose, and safeguard your information when you visit our platform or 
                    use our services. By using our platform, you consent to the data practices described in this policy.
                  </p>
                </div>
              </div>
            </div>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Database className="w-6 h-6 text-blue-400 mr-3" />
                Information We Collect
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-3">Personal Information</h3>
                  <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-4 border border-blue-500/20">
                    <p className="text-gray-300 mb-3">We may collect the following personal information:</p>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Name and contact information (email address, phone number)</li>
                      <li>• Account credentials (username, encrypted password)</li>
                      <li>• Profile information and preferences</li>
                      <li>• Payment and billing information (processed securely through third-party providers)</li>
                      <li>• Communication history and support interactions</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-3">Automatically Collected Information</h3>
                  <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-4 border border-blue-500/20">
                    <p className="text-gray-300 mb-3">We automatically collect certain information when you use our platform:</p>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Device information (IP address, browser type, operating system)</li>
                      <li>• Usage data (pages visited, time spent, click patterns)</li>
                      <li>• Cookies and similar tracking technologies</li>
                      <li>• Location data (general geographic location based on IP address)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <UserCheck className="w-6 h-6 text-purple-400 mr-3" />
                How We Use Your Information
              </h2>
              <div className="bg-purple-500/10 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
                <p className="text-gray-300 mb-4">We use your information for the following purposes:</p>
                <ul className="text-gray-300 space-y-2">
                  <li>• Providing and maintaining our educational services</li>
                  <li>• Processing transactions and managing your account</li>
                  <li>• Personalizing your experience and content recommendations</li>
                  <li>• Communicating with you about updates, promotions, and educational content</li>
                  <li>• Improving our platform and developing new features</li>
                  <li>• Ensuring security and preventing fraud</li>
                  <li>• Complying with legal obligations and protecting our rights</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information Sharing and Disclosure</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the 
                following circumstances:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-gray-200 mb-2">Service Providers</h4>
                  <p className="text-gray-300 text-sm">
                    Trusted third-party companies that assist us in operating our platform and providing services.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-gray-200 mb-2">Legal Requirements</h4>
                  <p className="text-gray-300 text-sm">
                    When required by law, court order, or legal process, or to protect our rights and safety.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-gray-200 mb-2">Business Transfers</h4>
                  <p className="text-gray-300 text-sm">
                    In connection with a merger, acquisition, or sale of assets, with appropriate notice.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-gray-200 mb-2">With Your Consent</h4>
                  <p className="text-gray-300 text-sm">
                    When you explicitly consent to sharing your information for specific purposes.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-6 border border-red-500/20">
                <p className="text-gray-300 leading-relaxed mb-4">
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• SSL encryption for data transmission</li>
                  <li>• Secure servers and databases with access controls</li>
                  <li>• Regular security audits and vulnerability assessments</li>
                  <li>• Employee training on data protection practices</li>
                  <li>• Multi-factor authentication for admin accounts</li>
                </ul>
                <p className="text-gray-300 mt-4 text-sm italic">
                  However, no method of transmission over the internet or electronic storage is 100% secure. 
                  While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use cookies and similar technologies to enhance your experience on our platform. Cookies are small 
                data files stored on your device that help us:
              </p>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li>• Remember your preferences and settings</li>
                <li>• Analyze site usage and improve performance</li>
                <li>• Provide personalized content and recommendations</li>
                <li>• Ensure security and prevent fraud</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                You can control cookie settings through your browser preferences. However, disabling cookies may 
                affect the functionality of our platform.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Eye className="w-6 h-6 text-yellow-400 mr-3" />
                Your Privacy Rights
              </h2>
              <div className="bg-yellow-500/10 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/20">
                <p className="text-gray-300 mb-4">You have the following rights regarding your personal information:</p>
                <ul className="text-gray-300 space-y-2">
                  <li>• <strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li>• <strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li>• <strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                  <li>• <strong>Portability:</strong> Request transfer of your data in a machine-readable format</li>
                  <li>• <strong>Restriction:</strong> Request limitation on how we process your information</li>
                  <li>• <strong>Objection:</strong> Object to certain types of processing</li>
                </ul>
                <p className="text-gray-300 mt-4">
                  To exercise these rights, please contact us at{' '}
                  <a href="mailto:privacy@elizabethtrader.com" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                    privacy@elizabethtrader.com
                  </a>
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                Our platform is not intended for children under 18 years of age. We do not knowingly collect personal 
                information from children under 18. If you are a parent or guardian and believe your child has provided 
                us with personal information, please contact us immediately so we can delete such information.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. 
                We will notify you of any material changes by:
              </p>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li>• Posting the updated policy on our platform</li>
                <li>• Sending email notifications for significant changes</li>
                <li>• Displaying prominent notices on our platform</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                Your continued use of our platform after changes become effective constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact Information */}
            <div className="bg-purple-500/10 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-purple-300 mb-3">Contact Us</h3>
              <p className="text-gray-300 leading-relaxed mb-3">
                If you have questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-300">
                <p>Email: <a href="mailto:privacy@elizabethtrader.com" className="text-purple-400 hover:text-purple-300 transition-colors">privacy@elizabethtrader.com</a></p>
                <p>Subject Line: Privacy Policy Inquiry</p>
                <p>Response Time: Within 30 days</p>
              </div>
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

export default Privacy;
