import { useNavigate, useParams } from "react-router-dom";
import { useEditSong } from "./useEditSong";

import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import {Button} from "../../ui/button";
import { useUpdateSong } from "./useUpdateSong";

function EditSongForm() {
  const { id } = useParams();

  const { song, isLoading } = useEditSong(id);
  
  if (isLoading) return <div>Loading...</div>;

  return <Form song={song} />;
}

function Form({ song }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    values: song,
  });

  const { updateSong, isPending } = useUpdateSong();

  function onSubmit(data) {    
    updateSong({id:song.id, data});
    navigate('/')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
      <Input label="Name" register={register("name", { required: true })} />
      <Input label="Album" register={register("album")} />
      <Input label="Artist" register={register("artist")} />
      <Button  disabled={isPending} type="success">
        Save
      </Button>
    </form>
  );
}

export default EditSongForm;
