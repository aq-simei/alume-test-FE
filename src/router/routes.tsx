import { AppLayout } from "@/pages/App/_layout";
import { Home } from "@/pages/App/Home/Home";
import {
  Confirmation,
} from "@/pages/App/Confirmation/Confirmation";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/success/:flightId",
        element: <Confirmation />,
      },
    ],
  },
]);
