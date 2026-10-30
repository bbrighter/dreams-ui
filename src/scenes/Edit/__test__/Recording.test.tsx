import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Recording } from "../Recording/Recording";
import { MediaRecorderMock } from "./MediaRecorderMock";
import { clickRecordingButton } from "./utils";

describe("Recording component", () => {
  const stopTrack = vi.fn();

  const mockStream = {
    getTracks: () => [{ stop: stopTrack }],
  } as unknown as MediaStream;

  const postRecording = vi.fn();
  const renderRecording = (visible: boolean = true) =>
    render(<Recording visible={visible} postRecording={postRecording} />);

  beforeEach(() => {
    vi.stubGlobal("MediaRecorder", MediaRecorderMock);

    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: {
        getUserMedia: vi.fn().mockResolvedValue(mockStream),
      },
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("Start and finish recording", async () => {
    renderRecording();

    await clickRecordingButton();

    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ audio: true });

    await clickRecordingButton();
    expect(postRecording).toHaveBeenCalledOnce();
    const blob = postRecording.mock.calls[0][0];

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.size).toBeGreaterThan(0);
    expect(stopTrack).toHaveBeenCalled();

    // TODO: Do i need to check more?
  });

  it("Show error if MIME-Type not supported", async () => {
    MediaRecorderMock.isTypeSupported.mockReturnValue(false);

    renderRecording();

    await clickRecordingButton();

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("MIME-Type audio/webm;codecs=opus wird nicht unterstützt.");
  });

  it("Show error if media devices are not supported", async () => {
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: {
        getUserMedia: undefined,
      },
    });

    renderRecording();

    await clickRecordingButton();

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Dein Browser unterstützt keine Audioaufnahme");
  });

  it.skip("Loading is displayed", async () => {
    // TODO: Allow handler to take some time and use fakeTimers
  });
});
