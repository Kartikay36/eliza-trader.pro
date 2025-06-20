
import SocialLinks from './SocialLinks';

interface ContactSectionProps {
  title?: string;
  message?: string;
  showPricing?: boolean;
}

const ContactSection = ({ title = "Connect With Us", message, showPricing = false }: ContactSectionProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center">
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      
      {showPricing && (
        <div className="mb-6">
          <p className="text-lg text-blue-200 mb-2">Interested in our premium services?</p>
          <p className="text-blue-300 font-medium">Contact us for pricing and custom packages</p>
        </div>
      )}
      
      {message && (
        <p className="text-gray-300 mb-6">{message}</p>
      )}
      
      <SocialLinks />
    </div>
  );
};

export default ContactSection;
