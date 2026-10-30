import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import { useCallback, useEffect, useRef, useState } from "react";

import { MIME_TYPE } from "@/constants";

type RecordingProps = {
  visible: boolean;
  postRecording: (blob: Blob) => Promise<void>;
};

export const Recording = ({ visible, postRecording }: RecordingProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const busyRef = useRef(false);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Array<Blob>>([]);
  const isMimeTypeSupported =
    typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(MIME_TYPE);

  const releaseMicrophone = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const stopRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    setIsRecording(false);

    if (recorder?.state === "recording") {
      recorder.stop();
    }
  }, []);

  const startRecording = useCallback(async () => {
    if (busyRef.current) return;

    busyRef.current = true;

    let stream: MediaStream | null = null;
    try {
      if (!navigator.mediaDevices.getUserMedia) {
        throw new Error("Dein Browser unterstützt keine Audioaufnahme");
      }

      if (!isMimeTypeSupported) {
        throw new Error(`MIME-Type ${MIME_TYPE} wird nicht unterstützt.`);
      }

      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream, { mimeType: MIME_TYPE });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      // oxlint-disable-next-line unicorn/prefer-add-event-listener
      recorder.onerror = () => setError("Bei der Audioaufnahme ist ein Fehler aufgetreten.");

      recorder.onstop = async () => {
        setIsRecording(false);
        setIsLoading(true);
        releaseMicrophone();
        mediaRecorderRef.current = null;

        try {
          const audioBlob = new Blob(chunksRef.current, { type: recorder.mimeType });

          if (audioBlob.size === 0) {
            throw new Error("Die Aufnahme ist leer");
          }
          await postRecording(audioBlob);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Speichern fehlgeschlagen");
        } finally {
          chunksRef.current = [];
          setIsLoading(false);
          busyRef.current = false;
        }
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      releaseMicrophone();
      mediaRecorderRef.current = null;
      busyRef.current = false;
      setError(err instanceof Error ? err.message : "Aufnahme konnte nicht gestartet werden");
    }
  }, [releaseMicrophone, postRecording, isMimeTypeSupported]);

  const onClick = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, stopRecording, startRecording]);

  useEffect(() => {
    return () => {
      const recorder = mediaRecorderRef.current;

      if (recorder && recorder.state !== "inactive") {
        recorder.onstop = null;
        recorder.stop();
      }

      releaseMicrophone();
    };
  }, [releaseMicrophone]);

  if (!visible) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, m: 2 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Fab
          onClick={onClick}
          color={isRecording ? "error" : "primary"}
          disabled={isLoading}
          title="Aufnehmen"
        >
          {isRecording ? <StopIcon /> : <MicIcon />}
        </Fab>
      )}
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};
