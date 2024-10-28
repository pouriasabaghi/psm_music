function SongItem({ song }) {
  return (
    <div className="flex gap-x-3" role="listitem">
      <img
        className="h-16 w-16 object-cover"
        width={64}
        height={64}
        src="https://meidaan.com/wp-content/uploads/2021/03/%D8%A2%D9%84%D8%A8%D9%88%D9%85-%DA%AF%D9%88%D8%B2%D9%86-%D8%B9%D9%84%DB%8C-%D8%B3%D9%88%D8%B1%D9%86%D8%A7.jpg"
        alt="%song title%"
      />
      <div className="flex flex-col gap-y-3" >
        <span className="max-w-64 overflow-hidden overflow-ellipsis text-nowrap">
          Gavazn
        </span>
        <div className="max-w-64 overflow-hidden overflow-ellipsis text-nowrap text-sm text-slate-200">
          <span>artist</span> | <span>album</span>
        </div>
      </div>
    </div>
  );
}

export default SongItem;
