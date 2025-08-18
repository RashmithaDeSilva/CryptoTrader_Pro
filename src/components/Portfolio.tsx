import { DollarSign, TrendingUp, TrendingDown, PieChart } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PortfolioProps {
  totalValue?: string;
  dayChange?: string;
  dayChangePercent?: string;
  isPositive?: boolean;
}

export const Portfolio = ({ 
  totalValue = "$0.00", 
  dayChange = "$0.00", 
  dayChangePercent = "0.00%",
  isPositive = true 
}: PortfolioProps) => {
  const mockHoldings = [
    { symbol: "BTC", name: "Bitcoin", amount: "0.5", value: "$21,500", change: "+5.2%" },
    { symbol: "ETH", name: "Ethereum", amount: "15.2", value: "$18,300", change: "+3.1%" },
    { symbol: "ADA", name: "Cardano", amount: "2,500", value: "$1,200", change: "-1.8%" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 shadow-card">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-full bg-gradient-primary shadow-glow">
              <DollarSign className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
              <p className="text-2xl font-bold text-foreground">{totalValue}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 shadow-card">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-full ${isPositive ? 'bg-gradient-success shadow-success' : 'bg-gradient-warning shadow-warning'}`}>
              {isPositive ? 
                <TrendingUp className="h-6 w-6 text-success-foreground" /> : 
                <TrendingDown className="h-6 w-6 text-warning-foreground" />
              }
            </div>
            <div>
              <p className="text-sm text-muted-foreground">24h Change</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-foreground">{dayChange}</p>
                <p className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                  {dayChangePercent}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 shadow-card">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-full bg-gradient-primary shadow-glow">
              <PieChart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Positions</p>
              <p className="text-2xl font-bold text-foreground">{mockHoldings.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 shadow-card">
        <h4 className="text-lg font-semibold text-foreground mb-4">Your Holdings</h4>
        <div className="space-y-3">
          {mockHoldings.map((holding) => (
            <div key={holding.symbol} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/30">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                  <span className="text-sm font-bold text-primary-foreground">{holding.symbol}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{holding.name}</p>
                  <p className="text-sm text-muted-foreground">{holding.amount} {holding.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{holding.value}</p>
                <p className={`text-sm ${holding.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                  {holding.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};