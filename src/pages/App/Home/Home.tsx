import { Rocket } from "lucide-react";
import { Helmet } from "react-helmet-async";

export const Home = () => {
  return (
    <div className="w-full">
      <Helmet title="Home" />
      <div className="w-screen h-screen flex justify-center items-center space-x-2">
        <h1 className="text-3xl font-bold text-foreground">Hello world !</h1>
        <>
          <Rocket size={30} className="text-zinc-700" />
        </>
      </div>
    </div>
  );
};
