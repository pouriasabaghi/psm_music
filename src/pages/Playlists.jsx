import AppContentBox from "@/layouts/AppContentBox";
import RightMotion from "@/layouts/RightMotion";
import PlaylistTable from "@/features/playlist/Playlists";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import CreatePlayListForm from "@/features/playlist/CreatePlayListForm";

function Playlists() {
  return (
    <RightMotion>
      <AppHeaderTitle>Playlists</AppHeaderTitle>
      <div className="flex justify-end w-full px-5">
        <CreatePlayListForm />
      </div>
      <AppContentBox>
        <PlaylistTable />
      </AppContentBox>
    </RightMotion>
  );
}

export default Playlists;
