import headphone from "@/assets/img/headphone.webp";
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
        <OneLineText className="mt-1 max-w-40 font-bold">
          <h6>{playlist.name}</h6>
        </OneLineText>
        {playlist.total_songs ? (
          <small>Total song is {playlist.total_songs}</small>
        ) : (
          <small>No song </small>
        )}
      </Link>
      {playlist.isFollowed && (
        <>
          <div className="absolute left-2 top-2 flex h-[35px] w-[35px] items-center justify-center rounded-[4px] bg-[#00000054]">
            <PlaylistFollowButton playlistId={playlist.id} />
          </div>

          <div className="absolute bottom-16 left-2 flex rounded-[4px] bg-[#00000054] px-2 py-1 text-sm font-bold">
            <span>{playlist.owner_name}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default PlaylistItem;
