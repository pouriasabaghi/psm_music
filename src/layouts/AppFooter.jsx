import MiniPlayer from "../features/player/MiniPlayer";
import BottomNavigation from "./BottomNavigation";

function AppFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex h-[118px] w-full max-w-[450px] flex-col items-center justify-end bg-dark">
      <MiniPlayer />
      <BottomNavigation />
    </div>
  );
}

export default AppFooter;
