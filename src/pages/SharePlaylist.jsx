import { Link, useParams } from "react-router-dom";
import AppContentBox from "@/layouts/AppContentBox";
import { usePlayer } from "@/context/PlayerContext";
import { useEffect, } from "react";
import { usePlaylistSongs } from "@/features/playlist/usePlaylistSongs";
import PlaylistSong from "@/features/playlist/PlaylistSong";

import SongSkeleton from "@/ui/SongSkeleton";



import AppHeaderFull from "@/layouts/AppHeaderFull";
import PlaylistFollowButton from "@/features/playlist/PlaylistFollowButton";
import { MdQueueMusic } from "react-icons/md";

function SharePlaylist() {
  const { id, name } = useParams();
  const { songs, isLoading } = usePlaylistSongs(id);

  const { dispatch } = usePlayer();
  useEffect(() => {
    dispatch({ type: "song/list", payload: id });
  }, [dispatch, id]);

  return (
    <div>
      <AppHeaderFull startEl={<Link to={`/playlists`}><MdQueueMusic size={30} /></Link>} endEl={<PlaylistFollowButton playlistId={id} />}>{name}</AppHeaderFull>
      <AppContentBox>
        <div className="space-y-4" role="list">
          {isLoading ? (
            <SongSkeleton count={7} />
          ) : (
            songs.map((song) => <PlaylistSong key={song.id} song={song} />)
          )}
        </div>
      </AppContentBox>
    </div>
  );
}


export default SharePlaylist;
