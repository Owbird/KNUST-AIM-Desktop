import NavBar from "@/components/NavBar";
import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <NavBar>
      <SnackbarProvider />
      <Outlet />
    </NavBar>
  );
};

export default AppLayout;
