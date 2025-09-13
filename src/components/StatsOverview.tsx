import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Shield } from "lucide-react";

const StatsOverview = () => {
  const stats = [
    {
      title: "Total Paid This Month",
      value: "$2,847,392",
      change: "+12.3%",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Active Contributors",
      value: "127",
      change: "+8",
      icon: Users,
      trend: "up"
    },
    {
      title: "Transactions",
      value: "1,847",
      change: "+23.1%",
      icon: TrendingUp,
      trend: "up"
    },
    {
      title: "Privacy Score",
      value: "100%",
      change: "Fully Encrypted",
      icon: Shield,
      trend: "secure"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-payroll-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className={`text-xs ${
              stat.trend === 'secure' ? 'text-privacy-secure' : 'text-payroll-success'
            }`}>
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;