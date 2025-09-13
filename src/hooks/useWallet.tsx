import { useAccount, useDisconnect } from 'wagmi';

export const useWallet = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();

  return {
    isConnected,
    address,
    isConnecting,
    disconnect,
  };
};