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
  MdShare,
} from "react-icons/md";
import { AlertDialogFooter, AlertDialogHeader } from "@/ui/alert-dialog";
import useDeletePlaylist from "@/features/playlist/useDeletePlaylist";
import { copyToClipboard } from "@/utils/utli";
import RightMotion from "@/layouts/RightMotion";
import { useNetworkStatus } from "@/context/NetworkStatusContext";
import { useFilterPlaylistsSongs } from "@/features/playlist/useFilterPlaylistsSongs";
import SongItemOffline from "@/features/songs/SongItemOffline";
import OneLineText from "@/ui/OneLineText";

function Playlist() {
  const { id, name } = useParams();
  const { songs: songsOnCloud, isLoading } = usePlaylistSongs(id);

  const isOffline = useNetworkStatus();

  const { songs } = useFilterPlaylistsSongs({
    isOffline,
    isLoading,
    songsOnCloud,
  });

  const { dispatch } = usePlayer();
  useEffect(() => {
    dispatch({ type: "song/list", payload: id });
  }, [dispatch, id]);

  return (
    <RightMotion>
      <AppHeaderTitle endEl={<PlaylistDropdown playlistId={id} name={name} />}>
        <OneLineText className="max-w-60 block">
         <span>{name}</span>
        </OneLineText>
      </AppHeaderTitle>
      <AppContentBox>
        <div className="space-y-4" role="list">
          {isLoading ? (
            <SongSkeleton count={8} />
          ) : (
            songs.map((song) =>
              !isOffline ? (
                <PlaylistSong key={song.id} song={song} />
              ) : (
                <SongItemOffline key={song.id} song={song} />
              ),
            )
          )}
        </div>
      </AppContentBox>
    </RightMotion>
  );
}

function PlaylistDropdown({ playlistId, name }) {
  const { deletePlaylist, isPending } = useDeletePlaylist();

  function handleDeletePlaylist(playlistId) {
    deletePlaylist(playlistId);
  }

  async function handleCopy() {
    const url = `${window.location.origin}/playlists/share/${playlistId}/${name}`;
    await copyToClipboard(url);
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
          <DropdownMenuItem className="cursor-pointer" onClick={handleCopy}>
            <MdShare className="mr-1" size={20} />
            <span>Share</span>
          </DropdownMenuItem>

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
