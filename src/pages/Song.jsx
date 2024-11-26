import Player from "@/features/player/Player";
import { useSong } from "@/features/songs/useSong";
import { MdOutlineKeyboardArrowDown, MdShare } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import FullPageSpinner from "@/ui/FullPageSpinner";
import { copyToClipboard } from "@/utils/utli";
import BottomNavigation from "@/layouts/BottomNavigation";

function Song() {
  const { id } = useParams();
  const { song, isLoading } = useSong(id);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="margin-auto h-[calc(100%-68px)] fixed right-0 top-0 z-50 w-full max-w-[450px] bg-dark p-5 sm:mx-[calc((100%-450px)/2)]"
    >
      <div className="mb-5 flex justify-between">
        <MdOutlineKeyboardArrowDown
          className="cursor-pointer"
          onClick={() => navigate(-1)}
          size={30}
        />

        <MdShare
          onClick={() => copyToClipboard(window.location.href)}
          className="cursor-pointer"
          size={20}
        />
      </div>
      {isLoading ? <FullPageSpinner /> : <Player song={song} />}
    </motion.div>
  );
}

export default Song;
