import { Outlet } from "react-router-dom";
import AppContainer from "./AppContainer";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

function AppLayout() {
  return (
    <>
      <AppContainer>
        <div className="bg-dark">
          <Outlet />
        </div>
      </AppContainer>
      <AppFooter />
    </>
  );
}

export default AppLayout;
