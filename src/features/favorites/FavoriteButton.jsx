import { useState } from "react";
import { MdStarBorder, MdStar } from "react-icons/md";
import { useToggleFavorite } from "./useToggleFavorite";
import { useNetworkStatus } from "@/context/NetworkStatusContext";
import { toast } from "sonner";

function FavoriteButton({ song }) {
  const { toggleFavorite, isPending } = useToggleFavorite();
  const isOffline = useNetworkStatus();

  const [isFavorite, setIsFavorite] = useState(song.favorite);

  const handleToggleFavorite = () => {
    if (isOffline) {
      toast.warning("Not available in offline mode");
      return;
    }
    
    if (isPending) return;

    toggleFavorite(song.id);
    setIsFavorite((prev) => !prev);
  };

  return isFavorite ? (
    <MdStar
      size={30}
      className="cursor-pointer text-yellow-500"
      onClick={handleToggleFavorite}
    />
  ) : (
    <MdStarBorder
      size={30}
      className="cursor-pointer text-white"
      onClick={handleToggleFavorite}
    />
  );
}

export default FavoriteButton;
