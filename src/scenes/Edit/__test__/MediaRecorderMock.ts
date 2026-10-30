// MediaRecorderMock.ts

import { vi } from "vitest";

export class MediaRecorderMock {
  static isTypeSupported = vi.fn(() => true);

  state: RecordingState = "inactive";
  mimeType: string;

  ondataavailable: ((event: BlobEvent) => void) | null = null;
  onstop: (() => void) | null = null;
  onerror: ((event: Event) => void) | null = null;

  constructor(
    public stream: MediaStream,
    options?: MediaRecorderOptions,
  ) {
    this.mimeType = options?.mimeType ?? "audio/webm;codecs=opus";
  }

  start = vi.fn(() => {
    this.state = "recording";
  });

  stop = vi.fn(() => {
    this.state = "inactive";
    this.ondataavailable?.({
      data: new Blob(["test audio"], { type: this.mimeType }),
    } as BlobEvent);
    this.onstop?.();
  });
}
