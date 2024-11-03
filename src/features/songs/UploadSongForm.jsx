import { useState } from "react";
import UploadInput from "../../ui/UploadInput";

import { useUploadSong } from "./useUploadSong";
import {Button} from "../../ui/button";

function UploadSong() {
  const [progress, setProgress] = useState(0);
  const { upload, isPending, data } = useUploadSong();

  async function handleSelectFile(e) {
    const file = e.target.files[0];
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
            <Button tag="a" to={`/songs/${data?.song.id}`}>
              Edit song info
            </Button>
            <Button onClick={() => setProgress(0)}>Upload new one</Button>
          </>
        )}
      </div>
    </>
  );
}

export default UploadSong;
