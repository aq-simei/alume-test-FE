import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router";
import { router } from "./router/routes";

const App = () => {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Space Dash"/>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
};

export default App;
