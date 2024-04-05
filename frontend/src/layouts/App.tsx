import NavBar from "@/components/NavBar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <NavBar>
      <Outlet />
    </NavBar>
  );
};

export default AppLayout;
