import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import TopSongsLists from "@/features/songs/TopSongs";

function TopSongs() {
  return (
    <div>
      <AppHeaderTitle>Top Songs</AppHeaderTitle>
      <AppContentBox>
        <TopSongsLists />
      </AppContentBox>
    </div>
  );
}

export default TopSongs;
