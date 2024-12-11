import Player from "@/features/player/Player";
import { useSong } from "@/features/songs/useSong";
import { MdOutlineKeyboardArrowDown, MdShare } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import FullPageSpinner from "@/ui/FullPageSpinner";
import { copyToClipboard } from "@/utils/utli";
import { useState } from "react";

function Song() {
  const { id } = useParams();
  const { song, isLoading } = useSong(id);
  const [tab, setTab] = useState("song");
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="margin-auto fixed right-0 top-0 z-50 h-[calc(100%-68px)] w-full max-w-[450px] bg-dark p-5 sm:mx-[calc((100%-450px)/2)]"
    >
      <div className="mb-5 flex justify-between">
        <MdOutlineKeyboardArrowDown
          className="cursor-pointer"
          onClick={() => navigate(-1)}
          size={30}
        />
        <div className="flex gap-x-3">
          <span
            onClick={() => setTab("song")}
            className={`font-bold ${tab === "song" ? "opacity-100" : "opacity-20"}`}
          >
            Song
          </span>
          <span
            onClick={() => setTab("lyrics")}
            className={`font-bold ${tab === "lyrics" ? "opacity-100" : "opacity-20"}`}
          >
            Lyrics
          </span>
        </div>
        <MdShare
          onClick={() => copyToClipboard(window.location.href)}
          className="cursor-pointer"
          size={20}
        />
      </div>
      {isLoading ? <FullPageSpinner /> : <Player tab={tab} song={song} />}
    </motion.div>
  );
}

export default Song;
