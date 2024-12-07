import TopPlaylists from "@/features/playlist/TopPlaylists";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";

function TopLists() {
  return (
    <RightMotion>
      <AppHeaderTitle>Top Playlists</AppHeaderTitle>
      <AppContentBox>
        <TopPlaylists />
      </AppContentBox>
    </RightMotion>
  );
}

export default TopLists;
