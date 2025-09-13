import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-background");

  return (
    <div className="relative min-h-screen w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center">
        <main className="container mx-auto flex flex-col items-center justify-center gap-6 px-4 py-16">
          <h1 className="text-5xl font-bold tracking-tight text-primary md:text-7xl lg:text-8xl font-headline">
            {siteConfig.name}
          </h1>
          <p className="max-w-2xl text-lg text-foreground/80 md:text-xl">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/dashboard">{siteConfig.cta.home}</Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
