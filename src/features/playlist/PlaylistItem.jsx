import headphone from "@/assets/img/headphone.png";
import OneLineText from "@/ui/OneLineText";
import { Link } from "react-router-dom";
import PlaylistFollowButton from "./PlaylistFollowButton";
function PlaylistItem({ playlist }) {
  return (
    <div className="relative col-span-6 cursor-pointer">
      <Link to={`/playlists/${playlist.id}/${playlist.name}`} className="block">
        <img
          src={playlist.cover || headphone}
          alt={playlist.name}
          className="mx-auto h-40 w-full rounded-lg object-cover sm:h-44"
        />
        <OneLineText className="max-w-40 font-bold mt-1">
          <h6>{playlist.name}</h6>
        </OneLineText>
        {playlist.total_songs ? (
          <small>Total song is {playlist.total_songs}</small>
        ) : (
          <small>No song </small>
        )}
      </Link>
      {playlist.isFollowed && (
        <div className="absolute left-2 top-2 bg-[#00000054] p-0 w-[35px] h-[35px] justify-center items-center rounded-[4px] flex">
          <PlaylistFollowButton playlistId={playlist.id} />
        </div>
      )}
    </div>
  );
}

export default PlaylistItem;
