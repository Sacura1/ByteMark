import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { MassaStationWallet } from '@massalabs/wallet-provider';

interface WalletContextType {
  address: string | null;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  isInstalled: boolean;
}

interface WalletProviderProps {
  children: ReactNode;
}

// Create context with default values
const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnecting: false,
  connect: async () => {},
  disconnect: () => {},
  isInstalled: false,
});

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [address, setAddress] = useState<string | null>(null);
  const [wallet, setWallet] = useState<MassaStationWallet | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  // Check if MassaStation is installed
  useEffect(() => {
    const checkWalletInstalled = async () => {
      try {
        // Check if window.massa is defined, which indicates MassaStation is installed
        const isAvailable = typeof window !== 'undefined' && 'massa' in window;
        setIsInstalled(isAvailable);
        
        // If wallet is already connected (e.g., page refresh), restore the connection
        if (isAvailable && localStorage.getItem('walletConnected') === 'true') {
          connect();
        }
      } catch (error) {
        console.error('Error checking wallet installation:', error);
        setIsInstalled(false);
      }
    };

    checkWalletInstalled();
  }, []);

  const connect = useCallback(async () => {
    if (!isInstalled) {
      alert('Massa Station wallet is not installed. Please install it first.');
      // Optionally redirect to wallet installation page
      window.open('https://station.massa.net', '_blank');
      return;
    }

    try {
      setIsConnecting(true);
      
      const stationWallet = new MassaStationWallet();
      const accounts = await stationWallet.accounts();

      if (!accounts || !accounts.length) {
        alert('No accounts found in Massa Station wallet');
        setIsConnecting(false);
        return;
      }

      setWallet(stationWallet);
      setAddress(accounts[0].address);
      localStorage.setItem('walletConnected', 'true');
      
      console.log('Wallet connected successfully:', accounts[0].address);
      
      // Subscribe to account changes if needed
      // This would need implementation in a production version
      
    } catch (error) {
      console.error('Failed to connect to Massa Station:', error);
      alert('Failed to connect to wallet. Please make sure Massa Station is unlocked and try again.');
    } finally {
      setIsConnecting(false);
    }
  }, [isInstalled]);

  const disconnect = useCallback(() => {
    setAddress(null);
    setWallet(null);
    localStorage.removeItem('walletConnected');
    console.log('Wallet disconnected');
  }, []);

  // Prevent circular dependency issue with useEffect
  const connectWallet = useCallback(async () => {
    await connect();
  }, [connect]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Any cleanup needed, such as removing event listeners
    };
  }, []);

  return (
    <WalletContext.Provider 
      value={{ 
        address, 
        connect, 
        disconnect, 
        isConnecting,
        isInstalled 
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;