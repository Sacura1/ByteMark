import { useContext } from 'react';
import WalletContext from '../contexts/walletContex';

const WalletConnectButton = () => {
  const { address, connect, disconnect, isConnecting, isInstalled } = useContext(WalletContext);

  const handleWalletAction = async () => {
    if (address) {
      disconnect();
    } else {
      await connect();
    }
  };

  // Format address for display (first 6 and last 4 characters)
  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
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
        <span className="flex items-center gap-2">
          {!isInstalled ? 'Install Wallet' : 'Connect Wallet'}
        </span>
      )}
    </button>
  );
};

export default WalletConnectButton;