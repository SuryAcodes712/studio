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

const weatherData = {
  location: "Bhopal, MP",
  temperature: "32°C",
  condition: "Sunny",
  icon: <Sun className="h-10 w-10 text-accent" />,
  forecast: [
    { day: "Tue", icon: <Sun className="h-6 w-6 text-muted-foreground" /> },
    { day: "Wed", icon: <Cloudy className="h-6 w-6 text-muted-foreground" /> },
    { day: "Thu", icon: <CloudRain className="h-6 w-6 text-muted-foreground" /> },
  ],
};

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Weather</span>
            {weatherData.icon}
          </CardTitle>
          <CardDescription>{weatherData.location}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
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
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with our AI tools</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Button
            asChild
            variant="outline"
            className="h-24 justify-start p-4 text-left"
          >
            <Link href="/diagnose">
              <div className="flex items-center gap-4">
                <ImageUp className="h-10 w-10 text-primary" />
                <div>
                  <p className="font-semibold">Diagnose Plant</p>
                  <p className="text-sm text-muted-foreground">Upload an image to check health</p>
                </div>
              </div>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-24 justify-start p-4 text-left"
          >
            <Link href="/advice">
              <div className="flex items-center gap-4">
                <BotMessageSquare className="h-10 w-10 text-primary" />
                <div>
                  <p className="font-semibold">Get Advice</p>
                  <p className="text-sm text-muted-foreground">Ask our AI for farming tips</p>
                </div>
              </div>
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-6 w-6" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            A look at your recent queries and advisories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {advisoryHistory.slice(0, 2).map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 rounded-lg border p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <MessageSquare className="h-8 w-8 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold truncate">
                    {item.query.content}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {item.response}
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
