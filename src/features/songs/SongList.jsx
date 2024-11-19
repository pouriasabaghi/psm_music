import { Link } from "react-router-dom";
import SongItem from "./SongItem";
import { useSongs } from "./useSongs";
import { Button } from "@/ui/button";
import SongSkeleton from "@/ui/SongSkeleton";

function SongList() {
  const { songs, isPending } = useSongs();

  if (isPending) return <SongSkeleton count={7} />;

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
        <SongItem key={song.id} song={song} />
      ))}
    </div>
  );
}

export default SongList;
