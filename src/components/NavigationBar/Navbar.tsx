import { Home } from "lucide-react";
import { ModeToggle } from "../theme/toggler";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";

const paths = [
  {
    name: "Home",
    icon: Home,
    path: "/",
  },
];

export const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="flex flex-row w-full px-4" data-testid="navbar">
      <div className="flex flex-row  min-h-10 w-full justify-evenly">
        <ul className="flex items-center w-full justify-start space-x-2">
          {paths.map(({ name, path, icon: Icon }) => (
            <li key={name}>
              <Link to={path}>
                <Button
                  variant={"link"}
                  className={twMerge(
                    "hover:cursor-pointer font-bold hover:bg-purple-400/50 transition-all duration-500"
                  )}
                >
                  <Icon
                    size={18}
                    stroke={
                      path === location.pathname ? "currentColor" : "none"
                    }
                  />
                  {name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center" data-testid="navbar-theme-toggle">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
