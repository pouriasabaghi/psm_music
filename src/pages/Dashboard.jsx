import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, isPending } = useUser();
  
    
  if (isPending) return <div className="text-white">Loading...</div>;

  return <h2 className="text-white">Welcome, {user.email}!</h2>;
}

export default Dashboard;
