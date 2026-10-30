import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ReplayButton } from "../ReplayButton/ReplayButton";

describe("ReplayButton", () => {
  const getRecording = vi.fn();
  const play = vi.fn();
  const pause = vi.fn();

  const renderReplayButton = ({
    recordingId,
    audioFile,
  }: { recordingId?: number; audioFile?: Blob } = {}) =>
    render(
      <ReplayButton
        visible={true}
        recordingId={recordingId}
        getRecording={getRecording}
        audioFile={audioFile}
      />,
    );

  let audioInstance: Partial<HTMLAudioElement>;

  beforeEach(() => {
    vi.spyOn(globalThis, "Audio").mockImplementation(function () {
      audioInstance = {
        play: play,
        pause: pause,
        currentTime: 0,
        addEventListener: vi.fn(),
      } satisfies Partial<HTMLAudioElement>;

      return audioInstance as unknown as HTMLAudioElement;
    });

    vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock-url");
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
  });

  it("Click: Gets and plays recording", async () => {
    getRecording.mockResolvedValue(new Blob(["abc"]));
    renderReplayButton({ recordingId: 1 });

    const button = await screen.findByRole("button");
    await userEvent.click(button);

    await waitFor(() => {
      expect(getRecording).toHaveBeenCalledExactlyOnceWith(1);
      expect(play).toHaveBeenCalled();
    });
  });

  it("Already downloaded: Click only plays recording", async () => {
    renderReplayButton({ recordingId: 1, audioFile: new Blob(["abcd"]) });

    const button = await screen.findByRole("button");
    await userEvent.click(button);

    await waitFor(() => {
      expect(play).toHaveBeenCalledOnce();
    });
    expect(getRecording).toHaveBeenCalledTimes(0);
  });

  it("Clicking twice plays and pauses recording", async () => {
    renderReplayButton({ recordingId: 1, audioFile: new Blob(["abcd"]) });

    const button = await screen.findByRole("button");
    await userEvent.click(button);

    await waitFor(() => {
      expect(play).toHaveBeenCalledOnce();
    });
    audioInstance.currentTime = 10;

    await userEvent.click(button);
    await waitFor(() => {
      expect(pause).toHaveBeenCalledOnce();
      expect(audioInstance.currentTime).toBe(0);
    });
  });
});
