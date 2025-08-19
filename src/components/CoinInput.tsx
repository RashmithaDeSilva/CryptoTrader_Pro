import { useState } from "react";
import { Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CoinInputProps {
  onSearch: (coin: string) => void;
  isLoading?: boolean;
}

export const CoinInput = ({ onSearch, isLoading }: CoinInputProps) => {
  const [coinQuery, setCoinQuery] = useState("");
  const [suggestions] = useState([
    "BTCUSDT",
    "ETHUSDT", 
    "ADAUSDT",
    "SOLUSDT",
    "DOTUSDT"
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = coinQuery.trim().toUpperCase();
    if (query && isValidTradingPair(query)) {
      onSearch(query);
    }
  };

  const isValidTradingPair = (query: string) => {
    // Check if it contains USDT, BUSD, USDC, or other common quote currencies
    const validQuotes = ['USDT', 'BUSD', 'USDC', 'BTC', 'ETH'];
    return validQuotes.some(quote => query.endsWith(quote));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCoinQuery(suggestion);
    onSearch(suggestion);
  };

  return (
    <Card className="p-8 bg-gradient-card backdrop-blur-sm border-border/50 shadow-card">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-primary shadow-glow">
              <TrendingUp className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            AI Trading Assistant
          </h2>
          <p className="text-muted-foreground">
            Enter a trading pair (e.g., BTCUSDT) to get intelligent trade suggestions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="e.g., BTCUSDT, ETHUSDT, ADAUSDT..."
              value={coinQuery}
              onChange={(e) => setCoinQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-secondary/50 border-border/50 focus:border-primary focus:shadow-glow transition-all duration-300"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-14 text-lg bg-gradient-primary hover:shadow-glow transition-all duration-300 disabled:opacity-50"
            disabled={isLoading || !coinQuery.trim() || !isValidTradingPair(coinQuery.trim().toUpperCase())}
          >
            {isLoading ? "Analyzing... (2-3 minutes)" : "Get Trade Suggestions"}
          </Button>
          
          {isLoading && (
            <p className="text-sm text-muted-foreground text-center animate-pulse">
              Please wait, our AI is performing deep market analysis. This typically takes 2-3 minutes.
            </p>
          )}
        </form>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center">Popular trading pairs:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-secondary/30 border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
