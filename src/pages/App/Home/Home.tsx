import { HomeHero } from "@/components/Home/Hero";
import { BookingForm } from "@/components/Home/BookingForm";
import { FeaturesSection } from "@/components/Home/FeaturesSection";
import {
  BookFlightFormValues,
} from "@/schemas/BookFlightSchema";
import { useBookingContext } from "@/hooks/useBookingContext";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const Home = () => {
  const onSubmit = (data: BookFlightFormValues) => {
    toast.info("Form Submitted Successfully", { position: "top-center" });
    updateFlightNumber(data.flightId);
    updateHealthComplications(data.healthIssues);
    updateUserAge(data.age);
    updateUserName(data.name);
    navigate(`/success/${data.flightId}`);
  };

  const navigate = useNavigate();
  const {
    updateFlightNumber,
    updateHealthComplications,
    updateUserAge,
    updateUserName,
  } = useBookingContext();
  return (
    <>
      <title>Home | Space Dash</title>
      <meta
        name="description"
        content="Experience the thrill of space travel with our exclusive SpaceX partnership. Select your destination and embark on the journey of a lifetime."
      />
      <meta
        name="keywords"
        content="space travel, SpaceX, space adventure, space tourism"
      />
      <meta property="og:title" content="Home - Space Board" />
      <meta
        property="og:description"
        content="Experience the thrill of space travel with our exclusive SpaceX partnership. Select your destination and embark on the journey of a lifetime."
      />
      <meta property="og:image" content="URL_to_image" />
      <meta property="og:url" content="URL_to_your_site" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Home - Space Board" />
      <meta
        name="twitter:description"
        content="Experience the thrill of space travel with our exclusive SpaceX partnership. Select your destination and embark on the journey of a lifetime."
      />
      <meta name="twitter:image" content="URL_to_image" />
      <main className="w-full min-h-screen relative">
        <HomeHero />
        <BookingForm handleSubmitForm={onSubmit} />
        <FeaturesSection />
      </main>
    </>
  );
};
