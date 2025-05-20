import { useContext } from 'react';
import { Link } from 'react-router-dom';
import WalletContext from '../contexts/walletContex';

// You may have additional imports here

const Header = () => {
  const { address, connect, disconnect, isConnecting } = useContext(WalletContext);

  // Format address for display (first 6 and last 4 characters)
  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const handleWalletAction = async () => {
    if (address) {
      disconnect();
    } else {
      await connect();
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Your logo or site title */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          Your App Name
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/form" className="text-gray-700 hover:text-blue-600">
            Create Post
          </Link>
          {/* Add more navigation links as needed */}
        </nav>

        {/* Wallet connect button */}
        <button
          onClick={handleWalletAction}
          disabled={isConnecting}
          className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
        >
          {isConnecting ? (
            'Connecting...'
          ) : address ? (
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {formatAddress(address)}
            </span>
          ) : (
            'Connect Wallet'
          )}
        </button>

        {/* Mobile menu button if needed */}
        <button className="md:hidden">
          {/* Your menu icon here */}
        </button>
      </div>
    </header>
  );
};

export default Header;