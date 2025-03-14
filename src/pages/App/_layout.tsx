import { Navbar } from "@/components/NavigationBar/Navbar";
import { Rocket } from "lucide-react";
import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col bg-background">
        <div className="flex-grow flex-shrink-0 mt-4">
          <Navbar />
          <Outlet />
        </div>
        <footer className="border-t border-gray-800 py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <Rocket className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Space Dash</span>
              </div>
              <div className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} SpaceVoyager. All rights
                reserved. In partnership with SpaceX.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
