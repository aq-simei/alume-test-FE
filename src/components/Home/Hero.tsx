import { Rocket, Star } from "lucide-react";

export const HomeHero = () => {
  return (
    <div
      className="container mx-auto px-4 py-12 relative z-10"
      data-testid="home-hero"
    >
      <div className="flex flex-col justify-center items-center text-center mb-16">
        <div className="relative mb-6">
          <Star
            className="absolute -top-8 -left-8 w-6 h-6 text-primary/60 motion-preset-pulse-md"
            data-testid={"lucide-start"}
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent mb-4 motion-preset-expand">
            Buckle Up For Your Next Space Adventure
          </h1>
          <Star className="absolute -bottom-8 -right-8 w-6 h-6 text-primary/60" />
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 motion-preset-expand">
          Experience the thrill of space travel with our exclusive SpaceX
          partnership. Select your destination and embark on the journey of a
          lifetime.
        </p>
        <Rocket className="w-12 h-12 text-primary motion-opacity-in-0 motion-delay-500" />
      </div>
    </div>
  );
};
