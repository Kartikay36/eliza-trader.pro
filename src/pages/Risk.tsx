
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { AlertTriangle, TrendingDown, Shield, DollarSign, Clock } from 'lucide-react';

const Risk = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navigation />
      
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-red-500/20 backdrop-blur-sm rounded-full border border-red-500/30 mb-6">
              <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
              <span className="text-sm font-medium text-red-300">High Risk Warning</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Risk Disclosure
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Important information about the risks associated with cryptocurrency and binary options trading.
            </p>
          </div>

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-8 space-y-8">
            
            {/* High Risk Warning */}
            <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-6 border border-red-500/30">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-red-300 mb-4">EXTREMELY HIGH RISK WARNING</h3>
                  <p className="text-gray-200 leading-relaxed text-lg mb-4">
                    Trading in cryptocurrencies and binary options is extremely risky and can result in the total loss of your investment. 
                    These instruments are complex financial products with a high risk of losing money rapidly due to leverage and volatility.
                  </p>
                  <p className="text-red-300 font-semibold text-lg">
                    You should not invest money that you cannot afford to lose entirely.
                  </p>
                </div>
              </div>
            </div>

            {/* Cryptocurrency Risks */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <TrendingDown className="w-6 h-6 text-orange-400 mr-3" />
                Cryptocurrency Trading Risks
              </h2>
              
              <div className="space-y-6">
                <div className="bg-orange-500/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/20">
                  <h3 className="text-lg font-semibold text-orange-300 mb-3">Market Volatility</h3>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    Cryptocurrency markets are extremely volatile and can experience dramatic price swings within minutes or hours. 
                    Prices can fluctuate by 50% or more in a single day, potentially resulting in substantial losses.
                  </p>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Sudden market crashes can occur without warning</li>
                    <li>• Price manipulation by large holders ("whales")</li>
                    <li>• Susceptibility to market sentiment and social media influence</li>
                    <li>• Regulatory announcements can cause immediate price changes</li>
                  </ul>
                </div>

                <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-6 border border-red-500/20">
                  <h3 className="text-lg font-semibold text-red-300 mb-3">Regulatory Risks</h3>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    The regulatory landscape for cryptocurrencies is evolving and uncertain. Government actions can significantly 
                    impact cryptocurrency values and your ability to trade.
                  </p>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Potential government bans or restrictions</li>
                    <li>• Changing tax implications</li>
                    <li>• Exchange restrictions or closures</li>
                    <li>• KYC/AML compliance requirements</li>
                  </ul>
                </div>

                <div className="bg-purple-500/10 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
                  <h3 className="text-lg font-semibold text-purple-300 mb-3">Technical Risks</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Exchange hacks and security breaches</li>
                    <li>• Wallet vulnerabilities and lost private keys</li>
                    <li>• Network congestion and high transaction fees</li>
                    <li>• Smart contract bugs and exploits</li>
                    <li>• Fork events and blockchain splits</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Binary Options Risks */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Clock className="w-6 h-6 text-red-400 mr-3" />
                Binary Options Trading Risks
              </h2>
              
              <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-6 border border-red-500/30 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-300 mb-3">All-or-Nothing Nature</h3>
                    <p className="text-gray-200 leading-relaxed">
                      Binary options are "all-or-nothing" investments. You either receive a fixed payout or lose your entire investment. 
                      There is no middle ground or partial recovery of your investment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-yellow-500/10 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/20">
                  <h4 className="text-lg font-semibold text-yellow-300 mb-3">Time Sensitivity</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Options expire at specific times</li>
                    <li>• No ability to exit early in most cases</li>
                    <li>• Time decay works against you</li>
                    <li>• Market gaps can cause total loss</li>
                  </ul>
                </div>

                <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20">
                  <h4 className="text-lg font-semibold text-blue-300 mb-3">Limited Profit Potential</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Fixed payout regardless of how much the market moves</li>
                    <li>• Typical payouts are 70-85% of investment</li>
                    <li>• House edge favors the broker</li>
                    <li>• Difficult to achieve long-term profitability</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* General Trading Risks */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <DollarSign className="w-6 h-6 text-green-400 mr-3" />
                General Trading Risks
              </h2>
              
              <div className="space-y-4">
                <div className="bg-gray-500/10 backdrop-blur-sm rounded-lg p-6 border border-gray-500/20">
                  <h3 className="text-lg font-semibold text-gray-200 mb-3">Psychological Factors</h3>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    Trading can be emotionally challenging and may lead to poor decision-making:
                  </p>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Fear of missing out (FOMO) leading to impulsive trades</li>
                    <li>• Revenge trading after losses</li>
                    <li>• Overconfidence following winning streaks</li>
                    <li>• Analysis paralysis preventing action</li>
                    <li>• Addiction-like behavior patterns</li>
                  </ul>
                </div>

                <div className="bg-indigo-500/10 backdrop-blur-sm rounded-lg p-6 border border-indigo-500/20">
                  <h3 className="text-lg font-semibold text-indigo-300 mb-3">Leverage and Margin Risks</h3>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    Using leverage amplifies both potential profits and losses:
                  </p>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Small market movements can result in large losses</li>
                    <li>• Margin calls can force position closures at unfavorable prices</li>
                    <li>• Interest costs on borrowed funds</li>
                    <li>• Potential to lose more than your initial investment</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Risk Management */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 text-green-400 mr-3" />
                Risk Management Guidelines
              </h2>
              
              <div className="bg-green-500/10 backdrop-blur-sm rounded-lg p-6 border border-green-500/20">
                <p className="text-gray-300 leading-relaxed mb-4">
                  If you choose to trade despite these risks, consider the following risk management principles:
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• Never invest more than you can afford to lose completely</li>
                  <li>• Start with very small amounts to learn and gain experience</li>
                  <li>• Diversify your investments across different assets and strategies</li>
                  <li>• Set strict stop-loss levels and stick to them</li>
                  <li>• Keep detailed records of all trades and their outcomes</li>
                  <li>• Continuously educate yourself about markets and risk management</li>
                  <li>• Consider seeking advice from qualified financial professionals</li>
                  <li>• Never trade with borrowed money or emergency funds</li>
                </ul>
              </div>
            </section>

            {/* Statistics */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Industry Statistics</h2>
              <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-6 border border-red-500/20">
                <p className="text-gray-300 leading-relaxed mb-4">
                  Consider these sobering statistics about retail trading:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-300 mb-2">Cryptocurrency Trading</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• 80-90% of day traders lose money</li>
                      <li>• Average retail investor underperforms the market</li>
                      <li>• High frequency of total account wipeouts</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-300 mb-2">Binary Options</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• 70-80% of binary options expire worthless</li>
                      <li>• Very few traders are profitable long-term</li>
                      <li>• High rate of account depletion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Notice */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Legal and Regulatory Notice</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Binary options trading may be restricted or prohibited in your jurisdiction. Many countries have banned 
                or heavily regulated binary options due to their high-risk nature and potential for fraud.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Cryptocurrency trading regulations vary significantly by country and are subject to change. It is your 
                responsibility to ensure compliance with all applicable laws and regulations in your jurisdiction.
              </p>
            </section>

            {/* Final Warning */}
            <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-8 border border-red-500/30">
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-red-300 mb-4">Final Warning</h3>
                <p className="text-gray-200 leading-relaxed text-lg mb-4">
                  By acknowledging this risk disclosure, you confirm that you understand the extreme risks involved 
                  in cryptocurrency and binary options trading. You accept full responsibility for any losses that may occur.
                </p>
                <p className="text-red-300 font-bold text-xl">
                  Only risk capital that you can afford to lose entirely.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-purple-500/10 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-purple-300 mb-3">Questions About Risk Disclosure?</h3>
              <p className="text-gray-300 leading-relaxed">
                If you have questions about this risk disclosure or need additional information, please contact us at{' '}
                <a
  href="https://t.me/Maria_Olavide_Brejilla"
  className="text-purple-400 hover:text-purple-300 transition-colors"
  target="_blank"
  rel="noopener noreferrer"
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

export default Risk;
