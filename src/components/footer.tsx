const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-red-500 text-lg font-semibold mb-4">Massa Blog</h3>
            <p className="text-sm leading-6">
              Decentralized publishing platform powered by Massa blockchain.
            </p>
          </div>
          
          <div>
            <h4 className="text-gray-300 text-sm font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              {['Latest Posts', 'Trending', 'Authors', 'Categories'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-red-500 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-300 text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-red-500 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-300 text-sm font-semibold mb-4">Social</h4>
            <div className="flex space-x-4">
              {['twitter', 'discord', 'github'].map((platform) => (
                <a key={platform} href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ByteMark. All rights reserved.</p>
          <p className="mt-1 opacity-75">Decentralized publishing powered by Massa</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;