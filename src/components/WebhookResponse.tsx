import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Server } from "lucide-react";

interface WebhookData {
  status: 'success' | 'error' | 'pending';
  responseTime?: number;
  timestamp?: string;
  rawData?: any;
  error?: string;
}

interface WebhookResponseProps {
  webhookData: WebhookData | null;
  tradingPair: string;
}

export const WebhookResponse = ({ webhookData, tradingPair }: WebhookResponseProps) => {
  if (!webhookData) {
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />;
      default:
        return <Server className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'error':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="bg-secondary/30 border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Webhook Response</CardTitle>
          </div>
          <Badge variant="outline" className={getStatusColor(webhookData.status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(webhookData.status)}
              {webhookData.status.toUpperCase()}
            </div>
          </Badge>
        </div>
        <CardDescription>
          Data received for {tradingPair}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Response Time</p>
            <p className="text-lg font-semibold">
              {webhookData.responseTime ? `${webhookData.responseTime}ms` : 'N/A'}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
            <p className="text-lg font-semibold">
              {webhookData.timestamp 
                ? new Date(webhookData.timestamp).toLocaleTimeString()
                : 'N/A'
              }
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Data Points</p>
            <p className="text-lg font-semibold">
              {webhookData.rawData?.suggestions?.length || 0}
            </p>
          </div>
        </div>

        {webhookData.error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-sm text-red-400 font-medium">Error Details:</p>
            <p className="text-sm text-red-300 mt-1">{webhookData.error}</p>
          </div>
        )}

        {webhookData.rawData && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Raw Response Data:</p>
            <div className="p-3 rounded-lg bg-background/50 border border-border/50">
              <pre className="text-xs text-muted-foreground overflow-x-auto">
                {JSON.stringify(webhookData.rawData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};