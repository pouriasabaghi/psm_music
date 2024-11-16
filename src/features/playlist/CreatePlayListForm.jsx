import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { useForm } from "react-hook-form";
import useCreatePlaylist from "./useCreatePlaylist";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

function CreatePlayListForm() {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const [open, setOpen] = useState(false);

  const { createPlaylist, isPending } = useCreatePlaylist();

  function onSubmit(data) {
    createPlaylist(data.name, {
      onSuccess: (data) => {
        reset();
        setOpen(false);
      },
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger >
        <MdAddCircleOutline  size={30} />
      </DialogTrigger>

      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Create Playlist</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogDescription>
            <Input
              {...register("name", { required: true })}
              placeholder="playlist name"
              autoComplete="off"
            />
          </DialogDescription>
          <DialogFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePlayListForm;
