import MiniPlayer from "../features/player/MiniPlayer";

function AppFooter() {
  return (
    <div className="fixed bottom-0 z-10 flex h-14 w-full max-w-[450px] items-center bg-dark px-3">
      <MiniPlayer />
    </div>
  );
}

export default AppFooter;
