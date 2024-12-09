import { createContext, useContext, useState, useEffect } from "react";

const NetworkStatusContext = createContext();

function NetworkStatusContextProvider({children}) {
  // State to track offline/online status
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Event listeners for online and offline
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const value = isOffline;
  return (
    <NetworkStatusContext.Provider value={value}>
      {children}
    </NetworkStatusContext.Provider>
  );
}

function useNetworkStatus() {
  const context = useContext(NetworkStatusContext);
  if (context === undefined) {
    throw new Error(
      "NetworkStatusContext was used outside of NetworkStatusContextProvider",
    );
  }

  return context;
}

export { NetworkStatusContextProvider, useNetworkStatus };
