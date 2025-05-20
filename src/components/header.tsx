import React, { useContext } from 'react';
import WalletContext from '../contexts/walletContex';

const Header: React.FC = () => {
  const { address, connect, disconnect } = useContext(WalletContext);

  return (
    <header className="bg-gray-900 text-gray-100 py-4 shadow-lg border-b border-gray-800">
      <div className="container mx-auto max-w-7xl px-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Massa Blog
          </span>
        </h1>
        
        <div className="flex items-center space-x-4">
          {address ? (
            <>
              <div className="hidden sm:flex items-center space-x-2 bg-gray-800 px-3 py-1.5 rounded-lg">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium">
                  {address.substring(0, 6)}...{address.substring(address.length - 4)}
                </span>
              </div>
              <button
                onClick={disconnect}
                className="bg-red-800/30 hover:bg-red-800/40 text-red-400 px-4 py-2 rounded-md transition-all duration-200 
                         border border-red-800/50 hover:border-red-800/70 text-sm font-medium"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={connect}
              className="bg-red-600 hover:bg-red-700 px-6 py-2.5 rounded-md transition-all duration-200 
                       text-sm font-semibold shadow-lg hover:shadow-red-900/20"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;