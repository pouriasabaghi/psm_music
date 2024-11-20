import { useNavigate, useParams } from "react-router-dom";
import { useEditSong } from "./useEditSong";

import { useForm } from "react-hook-form";
import { Input } from "@/ui/input";
import { Button } from "../../ui/button";
import { useUpdateSong } from "./useUpdateSong";
import FullPageSpinner from "@/ui/FullPageSpinner";

function EditSongForm() {
  const { id } = useParams();

  const { song, isLoading } = useEditSong(id);

  if (isLoading) return <FullPageSpinner />;

  return <Form song={song} />;
}

function Form({ song }) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    values: song,
  });

  const { updateSong, isPending } = useUpdateSong();

  function onSubmit(data) {
    updateSong({ id: song.id, data });
    navigate("/");
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
      <Input placeholder="Name" {...register("name", { required: true })} />
      <Input placeholder="Album" {...register("album")} />
      <Input placeholder="Artist" {...register("artist")} />
      <Button disabled={isPending} type="success">
        Save
      </Button>
    </form>
  );
}

export default EditSongForm;
