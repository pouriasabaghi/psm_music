import UploadSongForm from "@/features/songs/UploadSongForm";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";

function UploadSong() {
  return (
    <RightMotion>
      <AppHeaderTitle>Upload song</AppHeaderTitle>
      <AppContentBox>
        <UploadSongForm />
      </AppContentBox>
    </RightMotion>
  );
}

export default UploadSong;
