import { MdArrowBack, MdCloudUpload } from "react-icons/md";
import Input from "../ui/Input";
import { NavLink, useLocation } from "react-router-dom";
function AppHeader() {
  const location = useLocation();
  const isUploadPage = location.pathname === "/upload-song";

  return (
    <nav className="mb-5 flex items-center gap-x-4">
      {isUploadPage ? (
        <NavLink to="/">
          <MdArrowBack color="white" size={30} />
        </NavLink>
      ) : (
        <NavLink to="/upload-song">
          <MdCloudUpload color="white" size={30} />
        </NavLink>
      )}

      <Input type="text" placeholder="Search" />
    </nav>
  );
}

export default AppHeader;
