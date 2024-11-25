import { GoHome } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { LuListMusic } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
import { AiOutlineFire } from "react-icons/ai";
import { PiMusicNoteThin } from "react-icons/pi";

function BottomNavigation() {
  return (
    <nav className="flex justify-between w-full px-5">
      <NavLink to="/" className="flex flex-col py-3 items-center">
        <GoHome size={30} />
        <span className="mx-auto text-[10px]">Home</span>
      </NavLink>

      <NavLink to="/playlists" className="flex flex-col py-3 items-center">
        <LuListMusic size={30} />
        <span className="mx-auto text-[10px]">Playlists</span>
      </NavLink>

      <NavLink to="/favorites" className="flex flex-col py-3 items-center">
        <CiStar size={30} />
        <span className="mx-auto text-[10px]">Favorites</span>
      </NavLink>

      <NavLink to="/top-playlists" className="flex flex-col py-3 items-center">
        <AiOutlineFire size={30} />
        <span className="mx-auto text-[10px]">Top lists</span>
      </NavLink>

      <NavLink to="/top-songs" className="flex flex-col py-3 items-center">
        <PiMusicNoteThin  size={30} />
        <span className="mx-auto text-[10px]">Top Songs</span>
      </NavLink>
    </nav>
  );
}

export default BottomNavigation;
