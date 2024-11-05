import { MdArrowBack, MdCloudUpload } from "react-icons/md";
import Input from "../ui/Input";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="mb-5 flex items-center gap-x-4 px-5 pt-5 ">
      {isHomePage ? (
        <NavLink to="/songs/upload">
          <MdCloudUpload color="white" size={30} />
        </NavLink>
      ) : (
        <NavLink onClick={()=>navigate(-1)}>
          <MdArrowBack color="white" size={30} />
        </NavLink>
      )}

      <Input type="text" placeholder="Search" />
    </nav>
  );
}

export default AppHeader;
