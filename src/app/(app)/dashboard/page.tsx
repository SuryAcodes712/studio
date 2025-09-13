"use client";

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
  Sun,
  Cloudy,
  CloudRain,
  BotMessageSquare,
  ImageUp,
  History,
  MessageSquare,
} from "lucide-react";
import { advisoryHistory } from "@/lib/data";
import { useLanguage } from "@/context/language-context";

const weatherData = {
  location: "Bhopal, MP",
  temperature: "32°C",
  condition: "Sunny",
  icon: <Sun className="h-10 w-10 text-accent" />,
  forecast: [
    { day: "Tue", icon: <Sun className="h-8 w-8 text-muted-foreground" /> },
    { day: "Wed", icon: <Cloudy className="h-8 w-8 text-muted-foreground" /> },
    { day: "Thu", icon: <CloudRain className="h-8 w-8 text-muted-foreground" /> },
  ],
};

export default function DashboardPage() {
  const { t } = useLanguage();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t('dashboard.weather.title')}</span>
            {weatherData.icon}
          </CardTitle>
          <CardDescription>{weatherData.location}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-4xl font-bold">{weatherData.temperature}</p>
            <div className="flex gap-4">
              {weatherData.forecast.map((f) => (
                <div key={f.day} className="flex flex-col items-center gap-1">
                  <span className="text-sm text-muted-foreground">{f.day}</span>
                  {f.icon}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
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
            <Link href="/advice">
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

      <Card className="md:col-span-2 lg:col-span-3">
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
            {advisoryHistory.slice(0, 2).map((item) => (
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
