import { useState } from "react";
import UploadInput from "../../ui/UploadInput";

import { useUploadSong } from "./useUploadSong";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";

function UploadSongForm() {
  const [progress, setProgress] = useState(0);
  const { upload, isPending, data } = useUploadSong();
  const navigate = useNavigate();

  async function handleSelectFile(e) {
    const files = e.target.files;
    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        const file = files[key];
        upload(
          { file, setProgress },
          {
            onError: (err) => {
              setProgress(0);
            },
            onSuccess: (data) => {
              setProgress(100);
            },
          },
        );
      }
    }
  }

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center gap-y-5">
        <UploadInput
          label={
            isPending
              ? "Uploading..."
              : isPending === false
                ? "Uploaded"
                : "Upload Song"
          }
          progress={progress}
          onSelectFile={handleSelectFile}
          disabled={isPending}
        />
        {progress === 100 && (
          <>
            <Button onClick={()=>navigate(`/songs/edit/${data?.song.id}`)}>
              Edit song info
            </Button>
            <Button onClick={() => setProgress(0)}>Upload new one</Button>
          </>
        )}
      </div>
    </>
  );
}

export default UploadSongForm;
