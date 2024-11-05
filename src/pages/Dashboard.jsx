import { MdQueueMusic, MdStar, MdTimer } from "react-icons/md";
import SongList from "../features/songs/SongList";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-12 mb-5 gap-x-2">
        <div className="col-span-4 rounded-lg px-2 py-2 bg-gradient-to-tr bg- from-purple-900 to-purple-600">
          <Link to="/favorites" className="">
            <MdStar size={30} color="white" />
            <span className=" block font-bold">Favorite</span>
          </Link>
        </div>
        <div className="col-span-4 rounded-lg  bg-gradient-to-tr bg- from-green-900 to-green-600 px-2 py-2">
          <Link to="/favorites" className="">
            <MdQueueMusic size={30} color="white" />
            <span className=" block font-bold">Playlists</span>
          </Link>
        </div>
        <div className="col-span-4 rounded-lg  bg-gradient-to-tr bg- from-yellow-900 to-yellow-600 px-2 py-2">
          <Link to="/favorites" className="">
            <MdTimer size={30} color="white" />
            <span className=" block font-bold">Recent</span>
          </Link>
        </div>
      </div>

      
      <SongList />
    </div>
  );
}

export default Dashboard;
