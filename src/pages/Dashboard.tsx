import PayrollHeader from "@/components/PayrollHeader";
import StatsOverview from "@/components/StatsOverview";
import PaymentsList from "@/components/PaymentsList";
import { useAuth } from "@/hooks/useAuth";
import { useWallet } from "@/hooks/useWallet";
import { useWhisperPayContract } from "@/hooks/useContract";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { isConnected } = useWallet();
  const { globalAnalytics, analyticsLoading } = useWhisperPayContract();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!isConnected) {
      // Show wallet connection prompt
      console.log('Wallet not connected');
    }
  }, [isConnected]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <PayrollHeader />
      <main className="container mx-auto px-6 py-6">
        <StatsOverview />
        <PaymentsList />
      </main>
    </div>
  );
};

export default Dashboard;