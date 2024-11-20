import { toast } from "sonner";

export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export async function copyToClipboard(url) {
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard");
  } catch (err) {
    console.error(err);
    toast.error("Failed to copy");
  }

}