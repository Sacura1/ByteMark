import { createContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

interface WalletProviderProps {
  children: ReactNode;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  connect: async () => {},
  disconnect: () => {},
});

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [address, setAddress] = useState<string | null>(null);

  const connect = async () => {
    try {
      if (!window.massa) {
        alert('Please install a Massa wallet extension like Bearby.');
        return;
      }

      const userAddress = await window.massa.getAccount();
      setAddress(userAddress);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnect = () => {
    setAddress(null);
  };

  useEffect(() => () => disconnect(), []);

  return (
    <WalletContext.Provider value={{ address, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};


export default WalletContext;