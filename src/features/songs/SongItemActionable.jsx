import OneLineText from "@/ui/OneLineText";
import { Toggle } from "@/ui/toggle";

function SongItemActionable({ song, onSelected, isSelected }) {
  function handleOnSelected() {
    onSelected((prev) =>
      prev.some((id) => id === song.id)
        ? prev.filter((id) => id !== song.id)
        : [...prev, song.id],
    );
  }
  return (
    <div
      onClick={handleOnSelected}
      className="flex cursor-pointer items-center gap-x-3"
      role="listitem"
    >
      <Toggle pressed={isSelected} className="w-full justify-start">
        <OneLineText>
          <span>{song.name}</span>
        </OneLineText>
      </Toggle>
    </div>
  );
}

export default SongItemActionable;
