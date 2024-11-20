import { useNavigate, useParams } from "react-router-dom";
import { useUpdatePlaylist } from "./useUpdatePlaylist";

import { useForm } from "react-hook-form";
import { Input } from "@/ui/input";
import { Button } from "../../ui/button";

import { usePlaylist } from "./usePlaylist";
import FullPageSpinner from "@/ui/FullPageSpinner";

function EditPlaylistForm() {
  const { id } = useParams();

  const { playlist, isLoading } = usePlaylist(id);

  if (isLoading) return <FullPageSpinner />;

  return <Form playlist={playlist} />;
}

function Form({ playlist }) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    values: playlist,
  });

  const { updatePlaylist, isPending } = useUpdatePlaylist();

  function onSubmit(data) {
    updatePlaylist({ playlistId: playlist.id, data });
    navigate("/playlists", { replace: true });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
      <Input placeholder="Name" {...register("name", { required: true })} />
      <Button disabled={isPending} type="success">
        Save
      </Button>
    </form>
  );
}

export default EditPlaylistForm;
