import { Navbar } from "@/components/NavigationBar/Navbar"
import { Rocket } from "lucide-react"
import { Outlet } from "react-router"
import { cn } from "@/lib/utils"

export const AppLayout = () => {
  return (
    <>
      <div className="w-screen min-h-screen flex flex-col bg-background relative">
        {/* Background Stars */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" data-testid="background-stars">
          {/* Small stars */}
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className={cn("absolute w-1 h-1 bg-primary/80 rounded-full", "motion-preset-blink")}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                opacity: Math.random() * 0.7 + 0.3,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
              }}
            />
          ))}

          {/* Medium stars */}
          {[...Array(30)].map((_, i) => (
            <div
              key={`medium-star-${i}`}
              className={cn("absolute w-2 h-2 bg-primary/60 rounded-full", "motion-preset-blink")}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
                boxShadow: "0 0 8px rgba(255, 255, 255, 0.6)",
              }}
            />
          ))}
        </div>

        <div className="flex-grow flex-shrink-0 mt-4 relative z-10">
          <Navbar />
          <Outlet />
        </div>

        <footer className="border-t border-gray-800 py-8 relative z-10" data-testid="app-footer">
          <div className="w-full px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <Rocket className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Space Dash</span>
              </div>
              <div className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Space Dash. All rights reserved. In partnership with SpaceX.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
