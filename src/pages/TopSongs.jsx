import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import TopSongsLists from "@/features/songs/TopSongs";
import RightMotion from "@/layouts/RightMotion";

function TopSongs() {
  return (
    <RightMotion>
      <AppHeaderTitle>Top Songs</AppHeaderTitle>
      <AppContentBox>
        <TopSongsLists />
      </AppContentBox>
    </RightMotion>
  );
}

export default TopSongs;
