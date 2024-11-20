import AppContentBox from "@/layouts/AppContentBox";
import RightMotion from "@/layouts/RightMotion";
import PlaylistTable from "@/features/playlist/Playlists";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import CreatePlayListForm from "@/features/playlist/CreatePlayListForm";

function Playlists() {
  return (
    <RightMotion>
      <AppHeaderTitle endEl={<CreatePlayListForm />}>Playlists</AppHeaderTitle>
      <AppContentBox>
        <PlaylistTable />
      </AppContentBox>
    </RightMotion>
  );
}

export default Playlists;
