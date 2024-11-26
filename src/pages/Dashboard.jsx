
import SongList from "../features/songs/SongList";

import AppContentBox from "@/layouts/AppContentBox";
import AppHeader from "@/layouts/AppHeader";
import { usePlayer } from "@/context/PlayerContext";
import { useEffect } from "react";


function Dashboard() {
  const { dispatch } = usePlayer();
  useEffect(() => {
    dispatch({ type: "song/list", payload: "songs" });
  }, [dispatch]);

  return (
    <div>
      <AppHeader />
      <AppContentBox>
        <SongList />
      </AppContentBox>
    </div>
  );
}

export default Dashboard;
