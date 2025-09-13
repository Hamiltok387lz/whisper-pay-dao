import { Shield, Lock } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

const PayrollHeader = () => {
  const { isConnected, address, connect, disconnect } = useWallet();

  const handleWalletClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      // 模拟连接钱包地址
      const mockAddresses = [
        "0x742d35Cc6634C0532925a3b8D84C5f4c8F12",
        "0x8ba1f109551bD432803012645Hac136c82F",
        "0x9a7def123098abc789def456ghi789jkl012"
      ];
      const randomAddress = mockAddresses[Math.floor(Math.random() * mockAddresses.length)];
      connect(randomAddress);
    }
  };

  return (
    <header className="bg-payroll-header border-b border-border/50 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-privacy-secure" />
            <h1 className="text-lg font-semibold text-foreground">FHE Payroll Privacy</h1>
          </div>
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-privacy-secure/10 rounded-md">
            <Lock className="h-3 w-3 text-privacy-secure" />
            <span className="text-xs font-medium text-privacy-secure">Fully Homomorphic Encrypted</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Total Contributors</div>
            <div className="font-semibold text-foreground">127</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">This Month</div>
            <div className="font-semibold text-payroll-success">$2.4M</div>
          </div>
          <button 
            onClick={handleWalletClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isConnected 
                ? "bg-payroll-success text-white hover:bg-payroll-success/90" 
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41c2.93 1.18 5 4.05 5 7.41 0 2.08-.8 3.97-2.1 5.39M11 19.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1a2 2 0 0 0 2 2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"/>
            </svg>
            {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "Connect Wallet"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default PayrollHeader;