import { Rocket } from "lucide-react";
import { ThemeProvider } from "./components/theme/provider";
import { ModeToggle } from "./components/theme/toggler";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-screen h-screen flex justify-center items-center space-x-2">
        <h1 className="text-3xl font-bold text-foreground">Hello world</h1>
        <>
          <Rocket size={30} className="text-zinc-700"/>
        </>
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
