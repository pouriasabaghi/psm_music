import headphone from "@/assets/img/headphone.png";
import OneLineText from "@/ui/OneLineText";
function PlaylistItem({ playlist }) {
  return (
    <div className="col-span-6 cursor-pointer">
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
    </div>
  );
}

export default PlaylistItem;
