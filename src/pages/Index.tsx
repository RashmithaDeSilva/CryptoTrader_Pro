import { useState } from "react";
import { CoinInput } from "@/components/CoinInput";
import { TradeSuggestions } from "@/components/TradeSuggestions";
import { WebhookTradingAnalysis } from "@/components/WebhookTradingAnalysis";
import { Portfolio } from "@/components/Portfolio";
import { WebhookResponse } from "@/components/WebhookResponse";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

// Mock data - replace with your n8n backend integration
const mockSuggestions = [
  {
    type: 'buy' as const,
    confidence: 85,
    price: '$43,250',
    target: '$48,000',
    stopLoss: '$40,500',
    reason: 'Strong bullish momentum with RSI oversold conditions. Breaking above key resistance level with high volume. Technical indicators suggest continued upward movement.',
    timeframe: 'Short-term (1-3 days)'
  },
  {
    type: 'hold' as const,
    confidence: 72,
    price: '$43,250',
    target: '$45,500',
    stopLoss: '$41,000',
    reason: 'Market consolidation phase. Wait for clearer directional signals. Support level holding strong but lacking volume for significant breakout.',
    timeframe: 'Medium-term (1-2 weeks)'
  }
];

const Index = () => {
  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [webhookAnalysis, setWebhookAnalysis] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [webhookData, setWebhookData] = useState<{
    status: 'success' | 'error' | 'pending';
    responseTime?: number;
    timestamp?: string;
    rawData?: any;
    error?: string;
  } | null>(null);

  const handleCoinSearch = async (coin: string) => {
    setIsLoading(true);
    setSelectedCoin(coin);
    const startTime = Date.now();
    
    setWebhookData({
      status: 'pending',
      timestamp: new Date().toISOString(),
    });
    
    try {
      const webhookUrl = "";
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tradingPair: coin,
          timestamp: new Date().toISOString(),
          source: "CryptoTrader Pro"
        }),
      });

      const responseTime = Date.now() - startTime;

      if (response.ok) {
        const data = await response.json();
        
        // Check if the response has the new webhook format
        if (Array.isArray(data) && data[0]?.output?.ShortTerm) {
          setWebhookAnalysis(data);
          setSuggestions([]);
        } else {
          setSuggestions(data.suggestions || mockSuggestions);
          setWebhookAnalysis([]);
        }
        
        setWebhookData({
          status: 'success',
          responseTime,
          timestamp: new Date().toISOString(),
          rawData: data,
        });
        
        toast({
          title: "Analysis Complete",
          description: `Found trade suggestions for ${coin}`,
        });
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      console.error("Error fetching trade suggestions:", error);
      
      // Fallback to mock data if webhook fails
      setSuggestions(mockSuggestions);
      setWebhookAnalysis([]);
      
      setWebhookData({
        status: 'error',
        responseTime,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        rawData: { suggestions: mockSuggestions, fallback: true },
      });
      
      toast({
        title: "Using Mock Data",
        description: "Connected to n8n webhook but using fallback data for demo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient effect */}
      <div className="fixed inset-0 bg-gradient-bg opacity-50 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary shadow-glow flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-foreground">CT</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">CryptoTrader Pro</h1>
                  <p className="text-sm text-muted-foreground">AI-Powered Trading Platform</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="trading" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mx-auto bg-secondary/50 border-border/50">
              <TabsTrigger value="trading" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Trading Assistant
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Portfolio
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trading" className="space-y-8">
              <div className="max-w-2xl mx-auto">
                <CoinInput onSearch={handleCoinSearch} isLoading={isLoading} />
              </div>
              
              {webhookData && selectedCoin && (
                <div className="max-w-4xl mx-auto">
                  <WebhookResponse webhookData={webhookData} tradingPair={selectedCoin} />
                </div>
              )}
              
              {webhookAnalysis.length > 0 && selectedCoin && (
                <div className="max-w-6xl mx-auto">
                  <WebhookTradingAnalysis coin={selectedCoin} data={webhookAnalysis} />
                </div>
              )}
              
              {suggestions.length > 0 && selectedCoin && webhookAnalysis.length === 0 && (
                <div className="max-w-4xl mx-auto">
                  <TradeSuggestions coin={selectedCoin} suggestions={suggestions} />
                </div>
              )}
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-8">
              <div className="max-w-6xl mx-auto">
                <Portfolio 
                  totalValue="$41,000.00"
                  dayChange="+$2,150.00"
                  dayChangePercent="+5.5%"
                  isPositive={true}
                />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;