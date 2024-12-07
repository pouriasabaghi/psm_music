import { Outlet } from "react-router-dom";
import AppContainer from "./AppContainer";
import AppFooter from "./AppFooter";
import { useNetworkStatus } from "@/context/NetworkStatusContext";
import OfflineStatus from "@/ui/OfflineStatus";

function AppLayout() {
  const isOffline= useNetworkStatus();
  return (
    <>
      <AppContainer>
        <OfflineStatus isOffline={isOffline} />
        <div className="bg-dark">
          <Outlet />
        </div>
      </AppContainer>
      <AppFooter />
    </>
  );
}

export default AppLayout;
