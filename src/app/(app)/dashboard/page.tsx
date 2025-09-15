"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sun,
  Cloudy,
  CloudRain,
  Wind,
  Zap,
  BotMessageSquare,
  ImageUp,
  History,
  MessageSquare,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { advisoryHistory } from "@/lib/data";
import { useLanguage } from "@/context/language-context";
import { getDashboardData, type DashboardState } from "@/app/actions";
import { Badge } from "@/components/ui/badge";

const weatherIcons = {
  Sunny: <Sun className="h-10 w-10 text-accent" />,
  Cloudy: <Cloudy className="h-10 w-10 text-muted-foreground" />,
  Rainy: <CloudRain className="h-10 w-10 text-blue-400" />,
  Windy: <Wind className="h-10 w-10 text-gray-500" />,
  Stormy: <Zap className="h-10 w-10 text-yellow-400" />,
};

const forecastIcons = {
  Sunny: <Sun className="h-8 w-8 text-muted-foreground" />,
  Cloudy: <Cloudy className="h-8 w-8 text-muted-foreground" />,
  Rainy: <CloudRain className="h-8 w-8 text-muted-foreground" />,
  Windy: <Wind className="h-8 w-8 text-muted-foreground" />,
  Stormy: <Zap className="h-8 w-8 text-muted-foreground" />,
};

type WeatherCondition = keyof typeof weatherIcons;


export default function DashboardPage() {
  const { t } = useLanguage();
  const [state, setState] = useState<DashboardState>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const result = await getDashboardData({});
      setState(result);
      setLoading(false);
    }
    loadData();
  }, []);

  const renderPriceChange = (change: string) => {
    const isPositive = change.startsWith('+');
    const Icon = isPositive ? ArrowUp : ArrowDown;
    const color = isPositive ? 'text-green-500' : 'text-red-500';
    return (
      <span className={`flex items-center gap-1 ${color}`}>
        <Icon className="h-4 w-4" />
        {change.substring(1)}
      </span>
    );
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              Error Loading Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">There was an error fetching dashboard data. Please try again later.</p>
            <p className="mt-2 text-xs text-destructive bg-destructive/10 p-2 rounded-md">{state.error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>{t('dashboard.quickActions.title')}</CardTitle>
          <CardDescription>{t('dashboard.quickActions.description')}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Button
            asChild
            variant="outline"
            className="h-28 justify-start p-4 text-left"
          >
            <Link href="/diagnose">
              <div className="flex items-center gap-4">
                <ImageUp className="h-12 w-12 text-primary" />
                <div>
                  <p className="font-semibold">{t('dashboard.quickActions.diagnose.title')}</p>
                  <p className="text-sm text-muted-foreground">{t('dashboard.quickActions.diagnose.description')}</p>
                </div>
              </div>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-28 justify-start p-4 text-left"
          >
            <Link href="/chat">
              <div className="flex items-center gap-4">
                <BotMessageSquare className="h-12 w-12 text-primary" />
                <div>
                  <p className="font-semibold">{t('dashboard.quickActions.advice.title')}</p>
                  <p className="text-sm text-muted-foreground">{t('dashboard.quickActions.advice.description')}</p>
                </div>
              </div>
            </Link>
          </Button>
        </CardContent>
      </Card>
      
      {state.data?.weather && (
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t('dashboard.weather.title')}</span>
              {weatherIcons[state.data.weather.condition as WeatherCondition]}
            </CardTitle>
            <CardDescription>{state.data.weather.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-4xl font-bold">{state.data.weather.temperature}</p>
              <div className="flex gap-4">
                {state.data.weather.forecast.map((f: any) => (
                  <div key={f.day} className="flex flex-col items-center gap-1">
                    <span className="text-sm text-muted-foreground">{f.day}</span>
                    {forecastIcons[f.condition as WeatherCondition]}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {state.data?.marketPrices && (
         <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-8 w-8" />
                    Market Prices
                </CardTitle>
                 <CardDescription>
                    Live market rates from your nearby Mandis.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Crop</TableHead>
                            <TableHead>Market</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                             <TableHead className="text-right">Change</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {state.data.marketPrices.prices.map((item: any) => (
                            <TableRow key={item.crop}>
                                <TableCell className="font-medium">{item.crop}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{item.location}</Badge>
                                </TableCell>
                                <TableCell className="text-right font-mono">{item.price}</TableCell>
                                <TableCell className="text-right">{renderPriceChange(item.change)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      )}
      
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-8 w-8" />
            {t('dashboard.recentActivity.title')}
          </CardTitle>
          <CardDescription>
            {t('dashboard.recentActivity.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {advisoryHistory.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start gap-4 rounded-lg border p-4"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary shrink-0">
                  <MessageSquare className="h-10 w-10 text-secondary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {t(item.query.content as any)}
                  </p>
                  <p className="text-sm text-muted-foreground truncate whitespace-normal">
                    {t(item.response as any)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
