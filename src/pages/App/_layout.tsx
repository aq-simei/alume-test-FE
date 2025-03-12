import { Outlet } from "react-router";

export const AppLayout = () => {
  return (
    <div>
      <h1>On app layout</h1>
      <Outlet />
    </div>
  );
};
