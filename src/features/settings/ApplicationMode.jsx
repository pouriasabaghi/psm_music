import { Button } from "@/ui/button";
import { motion } from "framer-motion";

import { useNetworkStatus } from "@/context/NetworkStatusContext";
import { useApplicationSettings } from "@/context/ApplicationSettings";
import { useNavigate } from "react-router-dom";

function ApplicationMode() {
  const navigate = useNavigate();

  const isOffline = useNetworkStatus();
  const { mode, setMode: onChangeMode } = useApplicationSettings();

  function handleOnChangeMode(mode) {
    onChangeMode(mode);
    if (mode === "offline") {
      navigate("/");
    }
  }

  if (isOffline && mode === "online") {
    return (
      <motion.div
        initial={{ y: "20%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute bottom-[117px] flex w-full flex-col gap-y-3 bg-dark-100 p-4"
      >
        <>
          <p className="font-bold">
            You have lost your connection. Switch to offline mode
          </p>
          <Button onClick={() => handleOnChangeMode("offline")}>
            Offline mode
          </Button>
        </>
      </motion.div>
    );
  }

  if (!isOffline && mode === "offline") {
    return (
      <motion.div
        initial={{ y: "20%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute bottom-[117px] flex w-full flex-col gap-y-3 bg-dark-100 p-4"
      >
        <p>
          Your internet connection is back. Would you like to switch to online
          mode?
        </p>
        <Button onClick={() => handleOnChangeMode("online")}>
          Online mode
        </Button>
        <Button
          variant="outline"
          onClick={() => handleOnChangeMode("persist-offline")}
        >
          No stay!
        </Button>
      </motion.div>
    );
  }
}

export default ApplicationMode;
