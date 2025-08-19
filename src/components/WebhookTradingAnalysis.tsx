import { TrendingUp, TrendingDown, Target, AlertTriangle, DollarSign, Activity, BarChart3, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WebhookData {
  output: {
    ShortTerm: {
      Action: string;
      EntryPrice: string;
      StopLoss: string;
      TakeProfit: string;
      Rationale: string;
      PrimarySignals: string;
      LaggingIndicators: string;
      SentimentAnalysis: string;
    };
    LeveragedRecommendations: {
      ShortTerm: {
        Position: string;
        Leverage: string;
        EntryPrice: string;
        StopLoss: string;
        TakeProfit: string;
        Rationale: {
          PrimaryPriceActionSignals: string;
          LaggingIndicatorConfirmation: string;
          SentimentAndMacroAnalysis: string;
        };
      };
      LongTerm: {
        Position: string;
        Leverage: string;
        EntryPrice: string;
        StopLoss: string;
        TakeProfit: string;
        Rationale: {
          PrimaryPriceActionSignals: string;
          LaggingIndicatorConfirmation: string;
          SentimentAndMacroAnalysis: string;
        };
      };
    };
  };
}

interface WebhookTradingAnalysisProps {
  coin: string;
  data: WebhookData[];
}

export const WebhookTradingAnalysis = ({ coin, data }: WebhookTradingAnalysisProps) => {
  if (!data || data.length === 0 || !data[0]?.output) {
    return null;
  }

  const analysis = data[0].output;

  const getActionGradient = (action: string) => {
    const lowerAction = action.toLowerCase();
    if (lowerAction.includes('buy') || lowerAction.includes('long')) return 'gradient-success';
    if (lowerAction.includes('sell') || lowerAction.includes('short')) return 'gradient-warning';
    return 'gradient-primary';
  };

  const getActionColor = (action: string) => {
    const lowerAction = action.toLowerCase();
    if (lowerAction.includes('buy') || lowerAction.includes('long')) return 'default';
    if (lowerAction.includes('sell') || lowerAction.includes('short')) return 'destructive';
    return 'secondary';
  };

  const getActionIcon = (action: string) => {
    const lowerAction = action.toLowerCase();
    if (lowerAction.includes('buy') || lowerAction.includes('long')) return <TrendingUp className="h-5 w-5" />;
    if (lowerAction.includes('sell') || lowerAction.includes('short')) return <TrendingDown className="h-5 w-5" />;
    return <Target className="h-5 w-5" />;
  };

  const formatPrice = (price: string) => {
    return `$${parseFloat(price).toLocaleString()}`;
  };

  const cleanHtmlContent = (content: string) => {
    return content.replace(/<b>/g, '').replace(/<\/b>/g, '');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground">
          Advanced Trading Analysis for {coin}
        </h3>
        <p className="text-muted-foreground">
          Comprehensive market analysis with leveraged recommendations
        </p>
      </div>

      <Tabs defaultValue="analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-secondary/50 border-border/50">
          <TabsTrigger value="analysis" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Market Analysis
          </TabsTrigger>
          <TabsTrigger value="leveraged" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Leveraged Trading
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-6">
          <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full bg-${getActionGradient(analysis.ShortTerm.Action)} shadow-glow`}>
                    {getActionIcon(analysis.ShortTerm.Action)}
                  </div>
                  <div>
                    <CardTitle className="text-xl">Short-Term Signal</CardTitle>
                    <CardDescription>Immediate trading opportunity</CardDescription>
                  </div>
                </div>
                <Badge variant={getActionColor(analysis.ShortTerm.Action)} className="text-lg px-4 py-2">
                  {analysis.ShortTerm.Action.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium text-muted-foreground">Entry Price</p>
                  </div>
                  <p className="text-xl font-bold text-foreground">{formatPrice(analysis.ShortTerm.EntryPrice)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-success" />
                    <p className="text-sm font-medium text-muted-foreground">Take Profit</p>
                  </div>
                  <p className="text-xl font-bold text-success">{formatPrice(analysis.ShortTerm.TakeProfit)}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <p className="text-sm font-medium text-muted-foreground">Stop Loss</p>
                  </div>
                  <p className="text-xl font-bold text-destructive">{formatPrice(analysis.ShortTerm.StopLoss)}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-accent" />
                    <h4 className="font-semibold text-foreground">Primary Signals</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{analysis.ShortTerm.PrimarySignals}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-accent" />
                    <h4 className="font-semibold text-foreground">Technical Indicators</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{analysis.ShortTerm.LaggingIndicators}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-accent" />
                    <h4 className="font-semibold text-foreground">Market Sentiment</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{analysis.ShortTerm.SentimentAnalysis}</p>
                </div>
              </div>

              <Button 
                className={`w-full bg-${getActionGradient(analysis.ShortTerm.Action)} hover:shadow-glow transition-all duration-300`}
                size="lg"
              >
                Execute {analysis.ShortTerm.Action.toUpperCase()} Order
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leveraged" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Short-Term Leveraged */}
            <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-${getActionGradient(analysis.LeveragedRecommendations.ShortTerm.Position)} shadow-glow`}>
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Short-Term Leveraged</CardTitle>
                      <CardDescription>High-frequency trading</CardDescription>
                    </div>
                  </div>
                  <Badge variant={getActionColor(analysis.LeveragedRecommendations.ShortTerm.Position)} className="px-3 py-1">
                    {analysis.LeveragedRecommendations.ShortTerm.Position} {analysis.LeveragedRecommendations.ShortTerm.Leverage}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Entry</p>
                    <p className="font-semibold">{formatPrice(analysis.LeveragedRecommendations.ShortTerm.EntryPrice)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Target</p>
                    <p className="font-semibold text-success">{formatPrice(analysis.LeveragedRecommendations.ShortTerm.TakeProfit)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Stop</p>
                    <p className="font-semibold text-destructive">{formatPrice(analysis.LeveragedRecommendations.ShortTerm.StopLoss)}</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">Price Action:</p>
                    <p className="text-muted-foreground leading-relaxed">
                      {cleanHtmlContent(analysis.LeveragedRecommendations.ShortTerm.Rationale.PrimaryPriceActionSignals).substring(0, 150)}...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Long-Term Leveraged */}
            <Card className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-${getActionGradient(analysis.LeveragedRecommendations.LongTerm.Position)} shadow-glow`}>
                      <BarChart3 className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Long-Term Leveraged</CardTitle>
                      <CardDescription>Strategic positioning</CardDescription>
                    </div>
                  </div>
                  <Badge variant={getActionColor(analysis.LeveragedRecommendations.LongTerm.Position)} className="px-3 py-1">
                    {analysis.LeveragedRecommendations.LongTerm.Position} {analysis.LeveragedRecommendations.LongTerm.Leverage}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Entry</p>
                    <p className="font-semibold">{formatPrice(analysis.LeveragedRecommendations.LongTerm.EntryPrice)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Target</p>
                    <p className="font-semibold text-success">{formatPrice(analysis.LeveragedRecommendations.LongTerm.TakeProfit)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Stop</p>
                    <p className="font-semibold text-destructive">{formatPrice(analysis.LeveragedRecommendations.LongTerm.StopLoss)}</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">Price Action:</p>
                    <p className="text-muted-foreground leading-relaxed">
                      {cleanHtmlContent(analysis.LeveragedRecommendations.LongTerm.Rationale.PrimaryPriceActionSignals).substring(0, 150)}...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Button 
              className={`bg-${getActionGradient(analysis.LeveragedRecommendations.ShortTerm.Position)} hover:shadow-glow transition-all duration-300`}
              size="lg"
            >
              Execute Short-Term {analysis.LeveragedRecommendations.ShortTerm.Position.toUpperCase()}
            </Button>
            <Button 
              className={`bg-${getActionGradient(analysis.LeveragedRecommendations.LongTerm.Position)} hover:shadow-glow transition-all duration-300`}
              size="lg"
            >
              Execute Long-Term {analysis.LeveragedRecommendations.LongTerm.Position.toUpperCase()}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};