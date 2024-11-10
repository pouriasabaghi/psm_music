import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import AppContentBox from "@/layouts/AppContentBox";
import RightMotion from "@/layouts/RightMotion";
import EditPlaylistForm from "@/features/playlist/EditPlaylistForm";
function EditPlaylist() {
  return (
    <RightMotion>
      <AppHeaderTitle>Playlist info</AppHeaderTitle>
      <AppContentBox>
        <EditPlaylistForm />
      </AppContentBox>
    </RightMotion>
  );
}

export default EditPlaylist;
