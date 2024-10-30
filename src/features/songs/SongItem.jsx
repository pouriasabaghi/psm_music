import headphoneImg from './../../assets/img/headphone.png';

function SongItem({ song }) {
  return (
    <div className="flex gap-x-3 cursor-pointer" role="listitem">
      <img
        className="h-16 w-16 object-cover"
        width={64}
        height={64}
        src={song.cover || headphoneImg}
        alt="%song title%"
      />
      <div className="flex flex-col gap-y-3" >
        <span className="max-w-64 overflow-hidden overflow-ellipsis text-nowrap">
          {song.name}
        </span>
        <div className="max-w-64 overflow-hidden overflow-ellipsis text-nowrap text-sm text-slate-200">
          <span>{song.artist}</span> 
          {song.artist && song.album && <span> | </span>}
           <span>{song.album}</span>
        </div>
      </div>
    </div>
  );
}

export default SongItem;
