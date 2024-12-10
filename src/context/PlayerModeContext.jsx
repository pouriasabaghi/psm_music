import { createContext, useContext, useMemo, useState } from "react";

const PlayerModeContext = createContext(null);

function PlayerModeContextProvider({ children }) {
  const [mode, setMode] = useState(0);

  const value = useMemo(
    () => ({
      mode,
      setMode,
    }),
    [mode],
  );

  return (
    <PlayerModeContext.Provider value={value}>
      {children}
    </PlayerModeContext.Provider>
  );
}

function usePlayerMode() {
  const context = useContext(PlayerModeContext);
  if (context === undefined)
    throw new Error("PlayerModeContext was used outside of PlayerModeContext");
  return context;
}

export { usePlayerMode, PlayerModeContextProvider };
