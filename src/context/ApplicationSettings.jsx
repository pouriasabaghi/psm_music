import { createContext, useContext, useState, useMemo } from "react";

const ApplicationSettings = createContext();

function ApplicationSettingsProvider({ children }) {
  const [mode, setMode] = useState("online"); // online, offline, persist-offline

  const value = useMemo(
    () => ({
      mode,
      setMode,
    }),
    [mode, setMode],
  );

  return (
    <ApplicationSettings.Provider value={value}>
      {children}
    </ApplicationSettings.Provider>
  );
}

function useApplicationSettings() {
  const context = useContext(ApplicationSettings);
  if (context === undefined) {
    throw new Error(
      "ApplicationSettings was used outside of ApplicationSettingsProvider",
    );
  }

  return context;
}

export { ApplicationSettingsProvider, useApplicationSettings };
