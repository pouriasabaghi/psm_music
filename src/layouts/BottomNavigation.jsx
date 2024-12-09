import { NavLink } from "react-router-dom";
import { AiOutlineFire } from "react-icons/ai";
import { PiMusicNoteThin } from "react-icons/pi";
import { MdHome, MdQueueMusic, MdStarOutline } from "react-icons/md";
import { useNetworkStatus } from "@/context/NetworkStatusContext";
import { toast } from "sonner";

function BottomNavigation() {
  const isOffline = useNetworkStatus();

  const offlineDisableClass = isOffline ? "opacity-20" : "";

  function handleClick(e) {
    if (isOffline) {
      e.preventDefault();
      toast.warning("Not available in offline mode");
    }
  }

  return (
    <nav className="flex w-full justify-between px-5">
      <NavLink to="/" className="flex flex-col items-center py-3">
        <MdHome size={30} />
        <span className="mx-auto text-[10px]">Home</span>
      </NavLink>

      <NavLink
        onClick={handleClick}
        to="/playlists"
        className={`flex flex-col items-center py-3 ${offlineDisableClass}`}
      >
        <MdQueueMusic size={30} />
        <span className="mx-auto text-[10px]">Playlists</span>
      </NavLink>

      <NavLink
        onClick={handleClick}
        to="/favorites"
        className={`flex flex-col items-center py-3 ${offlineDisableClass}`}
      >
        <MdStarOutline size={30} />
        <span className="mx-auto text-[10px]">Favorites</span>
      </NavLink>

      <NavLink
        onClick={handleClick}
        to="/top-playlists"
        className={`flex flex-col items-center py-3 ${offlineDisableClass}`}
      >
        <AiOutlineFire size={30} />
        <span className="mx-auto text-[10px]">Top lists</span>
      </NavLink>

      <NavLink
        onClick={handleClick}
        to="/top-songs"
        className={`flex flex-col items-center py-3 ${offlineDisableClass}`}
      >
        <PiMusicNoteThin size={30} />
        <span className="mx-auto text-[10px]">Top Songs</span>
      </NavLink>
    </nav>
  );
}

export default BottomNavigation;
