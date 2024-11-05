import FavoritesList from "@/features/favorites/FavoritesList";
import AppContentBox from "@/layouts/AppContentBox";
import AppHeaderTitle from "@/layouts/AppHeaderTitle";
import RightMotion from "@/layouts/RightMotion";


function Favorites() {
  return (
    <RightMotion>
      <AppHeaderTitle>Favorites</AppHeaderTitle>
      <AppContentBox>
        <FavoritesList />
      </AppContentBox>
    </RightMotion>
  );
}

export default Favorites;
