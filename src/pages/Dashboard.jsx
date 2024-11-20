import { MdQueueMusic, MdStar, MdTimer } from "react-icons/md";
import SongList from "../features/songs/SongList";
import { Link } from "react-router-dom";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeader from "@/layouts/AppHeader";
import { usePlayer } from "@/context/PlayerContext";
import { useEffect } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { useTopPlaylists } from "@/features/playlist/useTopPlaylists";
import PlaylistItem from "@/features/playlist/PlaylistItem";

function Dashboard() {
  const { topPlaylists, isLoading } = useTopPlaylists();
  const { dispatch } = usePlayer();
  useEffect(() => {
    dispatch({ type: "song/list", payload: "songs" });
  }, [dispatch]);

  return (
    <div>
      <AppHeader />
      <AppContentBox>
        <div className="mb-5 grid grid-cols-12 gap-x-2">
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
          <div  onClick={() => toast.error("Coming soon 💫")} className="bg- col-span-4 rounded-lg bg-gradient-to-tr from-yellow-900 to-yellow-600 px-2 py-2 opacity-30">
            <div
              className="cursor-not-allowed"
            >
              <MdTimer size={30} color="white" />
              <span className="block font-bold">Recent</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="songs">
          <TabsList>
            <TabsTrigger value="songs">Songs</TabsTrigger>
            <TabsTrigger value="top_playlists">Top Playlists</TabsTrigger>
            <TabsTrigger value="top_songs" className="opacity-25">Top Songs</TabsTrigger>
          </TabsList>
          <TabsContent value="songs">
            <SongList />
          </TabsContent>
          <TabsContent value="top_playlists">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div className="justify-content-between grid w-full grid-cols-12 gap-x-6 gap-y-6">
                {topPlaylists.map((playlist) => (
                  <PlaylistItem key={playlist.id} playlist={playlist} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="top_songs">
          Coming soon 💫
          </TabsContent>
        </Tabs>
      </AppContentBox>
    </div>
  );
}

export default Dashboard;
