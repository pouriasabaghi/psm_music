import { MdCloudUpload } from "react-icons/md";
import Input from "../ui/Input";
function AppHeader() {
  return (
    <nav className="flex items-center mb-5 gap-x-4">
      <MdCloudUpload color="white" size={30} />

      <Input type="text" placeholder="Search" />
    </nav>
  );
}

export default AppHeader;
