import { Card, CardContent } from "@/components/ui/card";
import { Calendar, LucideProps, Rocket, Users } from "lucide-react";

type Feature = {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Rocket,
    title: "Cutting-Edge Technology",
    description:
      "Experience space travel with SpaceX's latest spacecraft technology and safety systems.",
  },
  {
    icon: Users,
    title: "Expert Crew",
    description:
      "Our missions are staffed by experienced astronauts and SpaceX engineers.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description:
      "Choose from multiple launch dates to fit your schedule and preferences.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 motion-preset-fade-lg motion-duration-1000 motion-delay-500" data-testid="features">
      <div className="text-center mb-16 motion-safe:animate-fade-in motion-delay-700">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
          Why Choose Space Dash?
        </h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We partner with SpaceX to provide the safest and most advanced space
          travel experience available to civilians.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-testid="feature-collection">
        {features.map((feature, index) => (
          <Card
            key={feature.title}
            className="border-primary/10 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 motion-safe:animate-fade-in motion-safe:animate-slide-in-bottom"
            style={{
              animationDelay: `${(index + 1) * 200}ms`,
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 motion-safe:animate-scale-in motion-delay-1000">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
