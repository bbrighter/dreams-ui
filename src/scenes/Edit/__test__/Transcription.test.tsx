import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { RecordingState, TranscriptionState } from "@/store/types/recording.types";

import { TranscriptionButton } from "../Transcription/TranscriptionButton";
import { TranscriptionModal } from "../Transcription/TranscriptionModal";
import { getTranscribeButton } from "./utils";

describe("TranscriptionModal", () => {
  const onClose = vi.fn();
  const onSave = vi.fn();
  const renderModal = (transcription: string, description: string) =>
    render(
      <TranscriptionModal
        onClose={onClose}
        onSave={onSave}
        open
        description={description}
        transcription={transcription}
      />,
    );

  it("Edit transcription", async () => {
    renderModal("Transcription", "");

    const transcriptionTextBox = screen.getByRole("textbox", { name: "Beschreibung" });
    expect(transcriptionTextBox).toHaveValue("Transcription");

    await userEvent.type(transcriptionTextBox, " and more");
    expect(transcriptionTextBox).toHaveValue("Transcription and more");

    await userEvent.click(screen.getByRole("button", { name: "Speichern" }));
    expect(onSave).toHaveBeenCalledExactlyOnceWith("Transcription and more");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("Overwriting warning is shown if transcription and description differ", async () => {
    renderModal("Transcription", "Description");

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Die aktuelle Beschreibung wird überschrieben!");
  });

  it("Overwriting warning is not shown if description is empty", () => {
    renderModal("Transcription", "");

    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("Cancel closes", async () => {
    renderModal("", "");

    await userEvent.click(screen.getByRole("button", { name: "Abbrechen" }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});

describe("TranscriptionButton", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  const onSave = vi.fn();
  const startTranscription = vi.fn();
  const renderButton = (
    desc: string,
    recordingState: RecordingState,
    transcriptionState: TranscriptionState,
  ) =>
    render(
      <TranscriptionButton
        visible
        onSave={onSave}
        recording={{
          id: 1,
          recording: new Blob(),
          recordingState: recordingState,
          transcriptionState: transcriptionState,
          transcription: "Transcription",
        }}
        startTranscription={startTranscription}
        description={desc}
      />,
    );

  it("If transcription is ready, opens modal, does not call startTranscription", async () => {
    renderButton("Description", "stored", "completed");

    const button = getTranscribeButton();
    await userEvent.click(button);

    const modal = screen.getByRole("dialog");
    expect(modal).toBeVisible();
    expect(modal).toHaveTextContent("Transcription");
    expect(startTranscription).toHaveBeenCalledTimes(0);
  });

  it("If transcription is not ready, starts transcriptions and then opens modal", async () => {
    vi.useFakeTimers();

    startTranscription.mockImplementationOnce(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    });
    renderButton("", "stored", "pending");

    const button = getTranscribeButton();
    fireEvent.click(button);
    expect(button).toHaveClass("MuiButton-loading");
    expect(startTranscription).toHaveBeenCalledOnce();
    expect(screen.queryByRole("dialog")).toBeNull();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });
    expect(button).not.toHaveClass("MuiButton-loading");
    const modal = screen.getByRole("dialog");
    expect(modal).toBeVisible();
  });

  it("Error is shown in case of failed transcription", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {}); // To suppress logging the error and clutter the logs
    startTranscription.mockRejectedValueOnce(new Error("This is an error"));
    renderButton("", "stored", "pending");

    fireEvent.click(getTranscribeButton());
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("This is an error");
  });
});
