import TopPlaylists from "@/features/playlist/TopPlaylists";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";

function TopLists() {
  return (
    <div>
      <AppHeaderTitle>Top Playlists</AppHeaderTitle>
      <AppContentBox>
        <TopPlaylists />
      </AppContentBox>
    </div>
  );
}

export default TopLists;
