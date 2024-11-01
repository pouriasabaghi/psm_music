import { Outlet } from "react-router-dom";
import AppContainer from "./AppContainer";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

function AppLayout() {
  return (
    <AppContainer>
      <div className="bg-dark px-5 pt-5">
        <AppHeader />
        <div className="h-[calc(100vh-138px)] overflow-auto pb-16 lg:pb-0">
          <Outlet />
        </div>
      </div>
      <AppFooter />
    </AppContainer>
  );
}

export default AppLayout;
