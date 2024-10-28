import { MdCloudUpload } from "react-icons/md";

function UploadInput({
  label,
  onSelectFile,
  progress = "0",
  disabled = false,
}) {
  return (
    <div className="relative flex">
      <div
        className={`absolute h-full w-full rounded-lg ${progress === 100 ? "bg-green-500" : "bg-blue-500"}`}
        style={{ width: `${progress}%`, transition: "width 500ms" }}
      ></div>
      <div className="relative z-10 p-[2px]">
        <div className="flex h-36 w-36 items-center justify-center rounded-lg bg-dark-900">
          <label className="flex flex-col items-center gap-2">
            <MdCloudUpload size={60} />
            {label && <span>{label}</span>}
            <input
              disabled={disabled}
              type="file"
              onChange={onSelectFile}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default UploadInput;
