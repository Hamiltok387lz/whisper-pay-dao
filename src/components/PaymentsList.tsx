import PaymentCard from "./PaymentCard";
import { useWallet } from "@/hooks/useWallet";

const PaymentsList = () => {
  const { isConnected, address } = useWallet();
  const allPayments = [
    {
      contributor: "Alex Chen",
      amount: "$12,500",
      status: "completed" as const,
      date: "2 hours ago",
      category: "Smart Contract Development",
      walletAddress: "0x742d35Cc6634C0532925a3b8D84C5f4c8F12"
    },
    {
      contributor: "Sarah Johnson",
      amount: "$8,750",
      status: "pending" as const,
      date: "4 hours ago",
      category: "Security Audit",
      walletAddress: "0x8ba1f109551bD432803012645Hac136c82F"
    },
    {
      contributor: "Marcus Rodriguez",
      amount: "$15,200",
      status: "processing" as const,
      date: "6 hours ago",
      category: "Frontend Development",
      walletAddress: "0x9a7def123098abc789def456ghi789jkl012"
    },
    {
      contributor: "Emily Zhang",
      amount: "$9,300",
      status: "completed" as const,
      date: "1 day ago",
      category: "Protocol Research",
      walletAddress: "0x742d35Cc6634C0532925a3b8D84C5f4c8F12"
    },
    {
      contributor: "David Kim",
      amount: "$11,800",
      status: "completed" as const,
      date: "1 day ago",
      category: "Documentation",
      walletAddress: "0x8ba1f109551bD432803012645Hac136c82F"
    },
    {
      contributor: "Lisa Wang",
      amount: "$13,400",
      status: "pending" as const,
      date: "2 days ago",
      category: "Testing & QA",
      walletAddress: "0x9a7def123098abc789def456ghi789jkl012"
    }
  ];

  // 只显示当前连接钱包的支付记录
  const payments = isConnected && address 
    ? allPayments.filter(payment => payment.walletAddress === address)
    : [];

  if (!isConnected) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Payments</h2>
        <div className="text-center py-12 text-muted-foreground">
          <p>Please connect your wallet to view your payments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground mb-4">My Payments</h2>
        <span className="text-sm text-muted-foreground">
          Wallet: {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      </div>
      <div className="grid gap-4">
        {payments.length > 0 ? (
          payments.map((payment, index) => (
            <PaymentCard key={index} {...payment} />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No payments found for this wallet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsList;