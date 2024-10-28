import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import SongList from "../features/songs/SongList";

function Dashboard() {

  return <SongList />;
}

export default Dashboard;
