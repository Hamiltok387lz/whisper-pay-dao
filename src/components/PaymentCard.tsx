import { Eye, EyeOff, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface PaymentCardProps {
  contributor: string;
  amount: string;
  status: "completed" | "pending" | "processing";
  date: string;
  category: string;
  isPrivate?: boolean;
}

const PaymentCard = ({ contributor, amount, status, date, category, isPrivate = true }: PaymentCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-payroll-success" />;
      case "pending":
        return <Clock className="h-4 w-4 text-payroll-pending" />;
      case "processing":
        return <AlertCircle className="h-4 w-4 text-primary" />;
    }
  };

  const getStatusBadge = () => {
    const variants = {
      completed: "bg-payroll-success/10 text-payroll-success border-payroll-success/20",
      pending: "bg-payroll-pending/10 text-payroll-pending border-payroll-pending/20",
      processing: "bg-primary/10 text-primary border-primary/20"
    };

    return (
      <Badge variant="outline" className={variants[status]}>
        {getStatusIcon()}
        <span className="ml-1 capitalize">{status}</span>
      </Badge>
    );
  };

  const maskText = (text: string) => {
    if (!isPrivate || showDetails) return text;
    return "•".repeat(text.length);
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-payroll-green-light rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-payroll-green">
                {showDetails ? contributor.charAt(0) : "•"}
              </span>
            </div>
            <div>
              <div className="font-medium text-foreground">
                {maskText(contributor)}
              </div>
              <div className="text-sm text-muted-foreground">{category}</div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="p-1 h-auto"
          >
            {showDetails ? 
              <EyeOff className="h-4 w-4 text-muted-foreground" /> : 
              <Eye className="h-4 w-4 text-muted-foreground" />
            }
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-foreground">
            {showDetails ? amount : "••••••"}
          </div>
          {getStatusBadge()}
        </div>

        <div className="mt-2 text-sm text-muted-foreground">
          {date}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentCard;