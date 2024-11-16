import { Link, useParams } from "react-router-dom";
import AppContentBox from "@/layouts/AppContentBox";
import { usePlayer } from "@/context/PlayerContext";
import { useEffect } from "react";
import { usePlaylistSongs } from "@/features/playlist/usePlaylistSongs";
import PlaylistSong from "@/features/playlist/PlaylistSong";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import SongSkeleton from "@/ui/SongSkeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import {
  MdDeleteOutline,
  MdMoreVert,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import { AlertDialogFooter, AlertDialogHeader } from "@/ui/alert-dialog";
import useDeletePlaylist from "@/features/playlist/useDeletePlaylist";

function Playlist() {
  const { id, name } = useParams();
  const { songs, isLoading } = usePlaylistSongs(id);

  const { dispatch } = usePlayer();
  useEffect(() => {
    dispatch({ type: "song/list", payload: id });
  }, [dispatch, id]);

  return (
    <div>
      <AppHeaderTitle endEl={<PlaylistDropdown playlistId={id} />}>
        {name}
      </AppHeaderTitle>
      <AppContentBox>
        <div className="space-y-4" role="list">
          {isLoading ? (
            <SongSkeleton count={5} />
          ) : (
            songs.map((song) => <PlaylistSong key={song.id} song={song} />)
          )}
        </div>
      </AppContentBox>
    </div>
  );
}

function PlaylistDropdown({ playlistId }) {
  const { deletePlaylist, isPending } = useDeletePlaylist();


  function handleDeletePlaylist(playlistId) {
    deletePlaylist(playlistId);
  }

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MdMoreVert
            size={20}
            className="cursor-pointer text-gray-400 hover:text-gray-500"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <MdOutlineModeEditOutline className="mr-1" size={20} />
            <Link to={`/playlists/edit/${playlistId}`}>Edit</Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <MdDeleteOutline />
            <AlertDialogTrigger>Delete</AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => handleDeletePlaylist(playlistId)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Playlist;
