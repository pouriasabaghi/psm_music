import Player from "@/features/player/Player";
import { useSong } from "@/features/songs/useSong";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

function Song() {
  const { id } = useParams();
  const { song, isLoading  } = useSong(id)
  const navigate = useNavigate();


  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0}}
      exit={{ y: "100%" }}
      transition={{ duration: .5, ease: "easeInOut" }}
      className="margin-auto fixed right-0 top-0 z-50 h-full w-full max-w-[450px] bg-dark p-5 sm:mx-[calc((100%-450px)/2)]"
    >
      <div className="mb-5">
        <MdOutlineKeyboardArrowDown
          className="cursor-pointer"
          onClick={() => navigate("/")}
          size={30}
        />
      </div>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <Player song={song} />
      )}
    </motion.div>
  );
}

export default Song;
