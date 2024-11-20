import { useEffect, useState } from "react";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { usePlaylistFollowToggle } from "./usePlaylistFollowToggle";
import { useIsFollowing } from "./useIsFollowing";


function PlaylistFollowButton({ playlistId }) {
  const { toggleFollow, isPending } = usePlaylistFollowToggle();
  const { isFollowing, isLoading } = useIsFollowing(playlistId);

  const [follow, setIsFollow] = useState(false);

  useEffect(() => {
    setIsFollow(isFollowing);
  }, [isFollowing]);

  function handleToggle() {
    if (isPending || isLoading) return;

    toggleFollow(playlistId, {
      onSuccess: (data) => setIsFollow((prev) => !prev),
    });
  }

  return (
    <div className="flex justify-end">
      {!follow && (
        <MdBookmarkBorder
          size={30}
          className="cursor-pointer"
          onClick={handleToggle}
        />
      )}
      {follow && (
        <MdBookmark
          size={30}
          className="cursor-pointer"
          onClick={handleToggle}
        />
      )}
    </div>
  );
}

export default PlaylistFollowButton;
