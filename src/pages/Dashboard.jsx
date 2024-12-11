import { motion } from "framer-motion";

import SongList from "../features/songs/SongList";

import AppContentBox from "@/layouts/AppContentBox";
import AppHeader from "@/layouts/AppHeader";
import { usePlayer } from "@/context/PlayerContext";
import { useEffect } from "react";
import AppHeaderFull from "@/layouts/AppHeaderFull";
import SongListOffline from "@/features/songs/SongListOffline";
import { useApplicationSettings } from "@/context/ApplicationSettings";

function Dashboard() {
  const { mode } = useApplicationSettings();

  const { dispatch } = usePlayer();
  useEffect(() => {
    dispatch({ type: "song/list", payload: "songs" });
  }, [dispatch]);

  if (mode !== "online") {
    return (
      <div>
        <AppHeaderFull>Offline mode</AppHeaderFull>
        <AppContentBox>
          <SongListOffline />
        </AppContentBox>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ x: "-20%" }}
      animate={{ x: 0 }}
      exit={{ x: "-20%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <AppHeader />
      <AppContentBox>
        <SongList />
      </AppContentBox>
    </motion.div>
  );
}

export default Dashboard;
