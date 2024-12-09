import { Outlet } from "react-router-dom";
import AppContainer from "./AppContainer";
import AppFooter from "./AppFooter";
import ApplicationMode from "@/features/settings/ApplicationMode";

function AppLayout() {
  return (
    <>
      <AppContainer>
        <div className="bg-dark">
          <Outlet />
        </div>
      </AppContainer>

      <ApplicationMode />

      <AppFooter />
    </>
  );
}

export default AppLayout;
