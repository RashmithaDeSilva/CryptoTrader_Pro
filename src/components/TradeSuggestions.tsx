import { TrendingUp, TrendingDown, Target, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TradeSuggestion {
  type: 'buy' | 'sell' | 'hold';
  confidence: number;
  price: string;
  target: string;
  stopLoss: string;
  reason: string;
  timeframe: string;
}

interface TradeSuggestionsProps {
  coin: string;
  suggestions: TradeSuggestion[];
}

export const TradeSuggestions = ({ coin, suggestions }: TradeSuggestionsProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'buy': return 'bg-gradient-success';
      case 'sell': return 'bg-gradient-warning';
      case 'hold': return 'bg-gradient-primary';
      default: return 'bg-gradient-primary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'buy': return <TrendingUp className="h-5 w-5" />;
      case 'sell': return <TrendingDown className="h-5 w-5" />;
      case 'hold': return <Target className="h-5 w-5" />;
      default: return <Target className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground">
          Trade Suggestions for {coin}
        </h3>
        <p className="text-muted-foreground">
          AI-powered analysis based on current market conditions
        </p>
      </div>

      <div className="grid gap-4">
        {suggestions.map((suggestion, index) => (
          <Card key={index} className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 shadow-card hover:shadow-glow transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full ${getTypeColor(suggestion.type)} shadow-${suggestion.type === 'buy' ? 'success' : suggestion.type === 'sell' ? 'warning' : 'glow'}`}>
                    {getTypeIcon(suggestion.type)}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-foreground capitalize">
                      {suggestion.type} Signal
                    </h4>
                    <p className="text-muted-foreground">{suggestion.timeframe}</p>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={`${suggestion.confidence >= 80 ? 'border-success text-success' : 
                              suggestion.confidence >= 60 ? 'border-warning text-warning' : 
                              'border-destructive text-destructive'} bg-transparent`}
                >
                  {suggestion.confidence}% Confidence
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Entry Price</p>
                  <p className="text-lg font-semibold text-foreground">{suggestion.price}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Target</p>
                  <p className="text-lg font-semibold text-success">{suggestion.target}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Stop Loss</p>
                  <p className="text-lg font-semibold text-destructive">{suggestion.stopLoss}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-accent" />
                  <p className="text-sm font-medium text-foreground">Analysis</p>
                </div>
                <p className="text-muted-foreground">{suggestion.reason}</p>
              </div>

              <Button 
                className={`w-full ${getTypeColor(suggestion.type)} hover:shadow-${suggestion.type === 'buy' ? 'success' : suggestion.type === 'sell' ? 'warning' : 'glow'} transition-all duration-300`}
              >
                Execute {suggestion.type.toUpperCase()} Order
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};