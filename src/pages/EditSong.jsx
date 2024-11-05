import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import EditSongForm from "../features/songs/EditSongForm";
import AppContentBox from "@/layouts/AppContentBox";
import RightMotion from "@/layouts/RightMotion";
function EditSong() {
  return (
    <RightMotion>
      <AppHeaderTitle>Song info</AppHeaderTitle>
      <AppContentBox>
        <EditSongForm />
      </AppContentBox>
    </RightMotion>
  );
}

export default EditSong;
