import MiniPlayer from "../features/player/MiniPlayer";

function AppFooter() {
  return (
    <div className="fixed left-0 right-0 mx-auto bottom-0 z-10 flex h-14 w-full max-w-[450px] items-center bg-dark px-3">
      <MiniPlayer />
    </div>
  );
}

export default AppFooter;
