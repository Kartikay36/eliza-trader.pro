
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { AlertTriangle, Shield, Info } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navigation />
      
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30 mb-6">
              <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
              <span className="text-sm font-medium text-red-300">Important Legal Notice</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Disclaimer
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Important information regarding the use of Elizabeth Trader's services and platform.
            </p>
          </div>

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-8 space-y-8">
            
            {/* Risk Warning */}
            <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-6 border border-red-500/20">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-red-300 mb-3">High Risk Investment Warning</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Trading in cryptocurrencies and binary options carries a high level of risk and may not be suitable for all investors. 
                    Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. 
                    The possibility exists that you could sustain a loss of some or all of your initial investment and therefore you should 
                    not invest money that you cannot afford to lose.
                  </p>
                </div>
              </div>
            </div>

            {/* Educational Purpose */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Info className="w-6 h-6 text-blue-400 mr-3" />
                Educational Purpose Only
              </h2>
              <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20">
                <p className="text-gray-300 leading-relaxed mb-4">
                  All content provided on this platform, including but not limited to market analysis, trading strategies, 
                  educational materials, and commentary, is for educational and informational purposes only. This information 
                  should not be construed as professional financial advice, investment recommendations, or an offer to buy or sell securities.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Elizabeth Trader is an educational platform and does not provide personalized investment advice. Users should 
                  always conduct their own research and consult with qualified financial advisors before making any investment decisions.
                </p>
              </div>
            </section>

            {/* No Guarantee */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">No Performance Guarantee</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Past performance is not indicative of future results. Any trading performance displayed on this platform 
                is hypothetical unless specifically stated otherwise. No representation is being made that any account will 
                or is likely to achieve profits or losses similar to those shown.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Market conditions, volatility, and other factors can significantly impact trading results. There are no 
                guarantees of profit, and all trading involves substantial risk of loss.
              </p>
            </section>

            {/* Third Party Content */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Content</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Our platform may contain links to third-party websites, services, or resources. Elizabeth Trader does not 
                endorse or assume responsibility for the content, privacy policies, or practices of these third-party sites.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Users access third-party content at their own risk. We recommend reviewing the terms and conditions of any 
                third-party services before use.
              </p>
            </section>

            {/* Accuracy of Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Accuracy of Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                While we strive to provide accurate and up-to-date information, Elizabeth Trader makes no warranties or 
                representations regarding the accuracy, completeness, or timeliness of any content on this platform.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Market data, prices, and other financial information may be delayed or inaccurate. Users should verify 
                all information independently before making trading decisions.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Elizabeth Trader, its affiliates, officers, employees, and agents shall not be liable for any direct, 
                indirect, incidental, special, or consequential damages arising from the use of this platform or reliance 
                on any information provided herein.
              </p>
              <p className="text-gray-300 leading-relaxed">
                This limitation applies to all claims, whether based on warranty, contract, tort, or any other legal theory, 
                even if Elizabeth Trader has been advised of the possibility of such damages.
              </p>
            </section>

            {/* Regulatory Compliance */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Regulatory Compliance</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Users are responsible for ensuring compliance with all applicable laws and regulations in their jurisdiction. 
                Trading restrictions may apply based on your location, and it is your responsibility to verify the legality 
                of trading activities in your area.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Elizabeth Trader does not provide services to residents of certain jurisdictions where such services would 
                be prohibited by local law.
              </p>
            </section>

            {/* Contact Information */}
            <div className="bg-purple-500/10 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-purple-300 mb-3">Questions About This Disclaimer?</h3>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about this disclaimer or need clarification on any points, please contact us at{' '}
                <a
  href="https://t.me/Maria_Olavide_Brejilla"
  target="_blank"
  rel="noopener noreferrer"
  className="text-purple-400 hover:text-purple-300 transition-colors"
>
  @Maria_Olavide_Brejilla
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

export default Disclaimer;
