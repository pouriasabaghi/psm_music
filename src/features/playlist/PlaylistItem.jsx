import headphone from "@/assets/img/headphone.png";
import OneLineText from "@/ui/OneLineText";
import { Link } from "react-router-dom";
function PlaylistItem({ playlist }) {
  return (
    <Link to={`/playlists/${playlist.id}/${playlist.name}`} className="col-span-6 cursor-pointer">
      <img
        src={playlist.cover || headphone}
        alt={playlist.name}
        className="sm:h-44 mx-auto h-40 w-full object-cover rounded-lg"
      />
      <OneLineText className="max-w-40 font-bold">
        <h6>{playlist.name}</h6>
      </OneLineText>
      {playlist.total_songs ? (
        <small>Total song is {playlist.total_songs}</small>
      ) : (
        <small>No song </small>
      )}
    </Link>
  );
}

export default PlaylistItem;
