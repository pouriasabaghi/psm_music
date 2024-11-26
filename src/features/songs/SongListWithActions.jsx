import { useSongs } from "./useSongs";
import SongSkeleton from "@/ui/SongSkeleton";
import SongItemActionable from "./SongItemActionable";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDelete,
  MdQueueMusic,
} from "react-icons/md";
import { memo, useState } from "react";
import { useDeleteSongs } from "./useDeleteSongs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/alert-dialog";
import AddSongToPlaylist from "../playlist/AddSongToPlaylist";
import { useTopSongs } from "./useTopSongs";
import { useSearchParams } from "react-router-dom";

const Item = memo(SongItemActionable);

function List({ songs, onSelected, selected }) {
  return (
    <div className="space-y-4" role="list">
      {songs.map((song) => (
        <Item
          onSelected={onSelected}
          key={song.id}
          song={song}
          isSelected={selected.includes(song.id)}
        />
      ))}
    </div>
  );
}

function SongListWithActions() {
  const [searchParams] = useSearchParams();
  const { songs: userSongs, isPending } = useSongs();
  const { topSongs, isPending: isPendingTopSongs } = useTopSongs();
  const { deleteSongs, isPending: isDeleting } = useDeleteSongs();

  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  function handleOnDeletes() {
    if (selected.length === 0) return;

    if (isDeleting) return;

    deleteSongs(selected, {
      onSettled: () => {
        setSelected([]);
      },
    });
  }

  function handleSelectAll() {
    // selectAll update after this operation so empty selectAll means user selected all
    if (!selectAll) {
      setSelected(userSongs.map((song) => song.id));
    } else {
      setSelected([]);
    }

    setSelectAll(!selectAll);
  }

  if (isPending || isPendingTopSongs)
    return (
      <div className="space-y-4">
        <SongSkeleton count={8} />
      </div>
    );

  const songs =
    searchParams.get("from") === "/top-songs" ? topSongs : userSongs;

  return (
    <>
      <div className="sticky -top-5 mb-5 grid grid-cols-12 gap-x-2 bg-dark">
        <AlertDialog>
          <AlertDialogTrigger
            disabled={selected.length === 0}
            className={`col-span-3 rounded-lg bg-gradient-to-tr from-red-900 to-red-600 px-2 py-2 text-start ${selected.length === 0 ? "opacity-35" : ""}`}
          >
            <MdDelete size={25} color="white" />
            <span className="mt-1 block font-bold">Delete</span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleOnDeletes}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div
          className={`col-span-5 rounded-lg bg-gradient-to-tr from-green-900 to-green-600 px-2 py-2 ${selected.length === 0 ? "opacity-35" : ""}`}
        >
          <MdQueueMusic size={25} color="white" />
          <AddSongToPlaylist
            songs={selected}
            trigger={
              <button
                disabled={selected.length === 0}
                className="mt-1 block font-bold"
              >
                Add to playlists
              </button>
            }
          />
        </div>
        <div
          onClick={handleSelectAll}
          className="col-span-4 rounded-lg bg-gradient-to-tr from-yellow-900 to-yellow-600 px-2 py-2"
        >
          {selectAll && (
            <>
              <MdCheckBox size={25} />
              <span className="mt-1 block font-bold">UnSelect all</span>
            </>
          )}
          {!selectAll && (
            <>
              <MdCheckBoxOutlineBlank size={25} />
              <span className="mt-1 block font-bold">Select all</span>
            </>
          )}
        </div>
      </div>

      <List songs={songs} onSelected={setSelected} selected={selected} />
    </>
  );
}

export default SongListWithActions;
