import { FaInstagram, FaTelegramPlane } from 'react-icons/fa';

interface SocialLinksProps {
  supportOnly?: boolean;
}

const SocialLinks = ({ supportOnly = false }: SocialLinksProps) => {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/eliza_binarytrader',
      Icon: FaInstagram,  // Store component reference, not JSX element
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Telegram Channel',
      url: 'https://t.me/binsuccess',
      Icon: FaTelegramPlane,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Telegram Trader',
      url: 'https://t.me/elizabethtrader_young_money',
      Icon: FaTelegramPlane,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      name: 'Support',
      url: 'https://t.me/Maria_Olavide_Brejilla',
      Icon: FaTelegramPlane,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const linksToShow = supportOnly 
    ? socialLinks.filter(link => link.name === 'Support')
    : socialLinks;

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {linksToShow.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r ${link.color} shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200`}
        >
          <link.Icon className="w-5 h-5" /> {/* Render as component */}
          <span>{link.name}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;