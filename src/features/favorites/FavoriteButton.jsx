import { useState } from "react";
import { MdStarBorder, MdStar } from "react-icons/md";
import { useToggleFavorite } from "./useToggleFavorite";

function FavoriteButton({ song }) {
  const { toggleFavorite, isPending } = useToggleFavorite();

  const [isFavorite, setIsFavorite] = useState(song.favorite);

  const handleToggleFavorite = () => {
    if(isPending) return;

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
