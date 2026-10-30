import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import IconButton from "@mui/material/IconButton";
import { useRef, useState } from "react";

type ReplayButtonProps = {
  visible: boolean;
  recordingId: number | undefined;
  getRecording: (id: number) => Promise<Blob>;
  audioFile: Blob | undefined;
};

export const ReplayButton = ({
  visible,
  recordingId,
  getRecording,
  audioFile,
}: ReplayButtonProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioUrlRef = useRef<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopPlaying = (url: string) => {
    setIsPlaying(false);
    URL.revokeObjectURL(url);
    audioUrlRef.current = null;
    audioRef.current = null;
  };

  const handleClick = async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }

      audioRef.current = null;
      setIsPlaying(false);
      return;
    }

    let blob = audioFile;

    if (recordingId && (blob?.size ?? 0) === 0) {
      blob = await getRecording(recordingId);
    }
    if (!blob) return;

    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
    }

    const audioUrl = URL.createObjectURL(blob);
    audioUrlRef.current = audioUrl;
    const audio = new Audio(audioUrlRef.current);
    audioRef.current = audio;

    audio.addEventListener("ended", () => {
      stopPlaying(audioUrl);
    });

    audio.addEventListener("error", () => {
      stopPlaying(audioUrl);
    });

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error(error);
      setIsPlaying(false);
    }
  };

  if (!visible) return null;

  return (
    <IconButton onClick={handleClick}>{isPlaying ? <StopIcon /> : <PlayArrowIcon />}</IconButton>
  );
};
