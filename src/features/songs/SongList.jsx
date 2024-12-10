import { Link } from "react-router-dom";
import SongItem from "./SongItem";
import { useSongs } from "./useSongs";
import { Button } from "@/ui/button";
import SongSkeleton from "@/ui/SongSkeleton";
import { usePlayerController } from "@/context/PlayerControllerContext";

function SongList() {
  const { songs, isPending } = useSongs();
  const { play, stop } = usePlayerController();

  if (isPending)
    return (
      <div className="space-y-4">
        <SongSkeleton count={8} />
      </div>
    );

  if (songs.length === 0)
    return (
      <div>
        <p>You didn't add any song, try uploading one</p>
        <Button className="mt-5" asChild>
          <Link to={"/songs/upload"}>Upload song</Link>
        </Button>
      </div>
    );

  return (
    <div className="space-y-4" role="list">
      {songs.map((song) => (
        <SongItem key={song.id} song={song} play={play} stop={stop} />
      ))}
    </div>
  );
}

export default SongList;
