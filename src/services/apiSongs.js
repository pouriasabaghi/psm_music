import http, { upload } from "../utils/http";

export const getSongs = async () => {
  const response = await http.get("/api/songs");
  return response.data;
};

export const uploadSong = async ({file, setProgress}) => {
  const formData = new FormData();
  formData.append("file", file);

  setProgress(0);

  const response = await upload.post("api/songs", formData, {
    onUploadProgress: (progressEvent) => {
      const currentProgressPercentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total,
      );
      const percentCompleted = Math.min(currentProgressPercentage, 95);
      setProgress(percentCompleted);
    },
  });

  return response.data;
};
