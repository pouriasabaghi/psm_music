import SongListWithActions from "@/features/songs/SongListWithActions";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";

function SongsBulkActions() {
  return (
    <RightMotion>
      <AppHeaderTitle endEl={<></>}>Songs</AppHeaderTitle>
      <AppContentBox>
        <SongListWithActions />
      </AppContentBox>
    </RightMotion>
  );
}

export default SongsBulkActions;
