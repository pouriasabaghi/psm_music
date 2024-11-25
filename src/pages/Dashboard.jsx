
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
        {/*  <div className="mb-5 grid grid-cols-12 gap-x-2">
          <div className="bg- col-span-4 rounded-lg bg-gradient-to-tr from-purple-900 to-purple-600 px-2 py-2">
            <Link to="/favorites" className="">
              <MdStar size={30} color="white" />
              <span className="block font-bold">Favorite</span>
            </Link>
          </div>
          <div className="bg- col-span-4 rounded-lg bg-gradient-to-tr from-green-900 to-green-600 px-2 py-2">
            <Link to="/playlists" className="">
              <MdQueueMusic size={30} color="white" />
              <span className="block font-bold">Playlists</span>
            </Link>
          </div>
          <div
            onClick={() => toast.error("Coming soon 💫")}
            className="bg- col-span-4 rounded-lg bg-gradient-to-tr from-yellow-900 to-yellow-600 px-2 py-2 opacity-30"
          >
            <div className="cursor-not-allowed">
              <MdTimer size={30} color="white" />
              <span className="block font-bold">Recent</span>
            </div>
          </div>
        </div> */}
        <SongList />
      </AppContentBox>
    </div>
  );
}

export default Dashboard;
