import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { createCategories } from "@/__tests__/fixtures/categories";
import { createDream, createDreams, createRecording } from "@/__tests__/fixtures/dreams";
import { getCategoriesHandler } from "@/__tests__/mocks/categoryHandlers";
import {
  getDreamHandler,
  getDreamsHandler,
  postRecordingHandler,
  postTranscriptionHandler,
} from "@/__tests__/mocks/dreamsHandlers";
import { server } from "@/__tests__/setupTest";
import { EntitiesRecordingState } from "@/api/generated_api";

import Edit from "../Edit";
import { MediaRecorderMock } from "./MediaRecorderMock";
import {
  clickRecordingButton,
  getCategoryInput,
  queryDeleteRecordingButton,
  getDescriptionInput,
  getFinalizeButton,
  getHeaderBar,
  getPersonInput,
  getSaveButton,
  getStarButton,
  getTranscribeButton,
} from "./utils";

const rendering = () =>
  render(
    <MemoryRouter initialEntries={["/dreams/1"]}>
      <Routes>
        <Route path="/dreams/:id" element={<Edit />} />
      </Routes>
    </MemoryRouter>,
  );

describe("viewing and editing a single dream", () => {
  const cat = { id: 1, name: "Category", type: "category" };
  const person = { id: 2, name: "Person", type: "person" };

  it("everything is rendered", async () => {
    server.use(
      getDreamsHandler(
        createDreams([
          createDream({ id: 1, date: "2025-01-01T10:00:00Z" }),
          createDream({ id: 2, date: "2025-02-01T10:00:00Z" }),
        ]),
      ),
      getDreamHandler(
        createDream({
          id: 2,
          date: "2025-02-01T10:00:00Z",
          description: "description",
          categories: [cat, person],
        }),
      ),
      getCategoriesHandler(createCategories([cat, person])),
    );
    rendering();

    await waitFor(() => {
      const header = getHeaderBar();
      expect(getSaveButton()).toBeInTheDocument();
      expect(within(header).getByTitle("Zurück")).toBeInTheDocument();
      expect(within(header).getByDisplayValue("2025-02-01")).toBeInTheDocument();
      expect(within(header).getByTitle("Datum")).toBeInTheDocument();

      expect(getDescriptionInput()).toBeInTheDocument();
      expect(screen.getByText("description")).toBeInTheDocument();

      expect(getCategoryInput()).toBeInTheDocument();
      expect(screen.getByText("Category")).toBeInTheDocument();

      expect(getPersonInput()).toBeInTheDocument();
      expect(screen.getByText("Person")).toBeInTheDocument();

      expect(screen.getByTitle("Nächster Traum")).toBeDisabled();
      //   expect(screen.getByTitle("Vorheriger Traum")).toBeEnabled();

      expect(getFinalizeButton()).toBeDisabled();

      const stars = [1, 2, 3, 4, 5];
      stars.forEach((s) => {
        expect(getStarButton(s)).toBeInTheDocument();
      });
    });
  });

  it("edit description", { skip: true }, async () => {
    vi.useFakeTimers();
    rendering();

    await act(async () => {
      await vi.runAllTimersAsync();
      await Promise.resolve();
    });

    const saveButton = getSaveButton();
    expect(saveButton.getAttribute("class")).match(/colorSuccess/);

    const descriptionInput = getDescriptionInput();

    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime, delay: 0 });
    await act(async () => {
      user.type(descriptionInput, " and more text");
      vi.advanceTimersToNextTimer();
    });

    expect(screen.getByText("description and more text")).toBeInTheDocument();
    expect(saveButton.getAttribute("class")).match(/colorError/);

    await act(async () => {
      await vi.runAllTimersAsync();
      await Promise.resolve();
    });

    expect(saveButton.getAttribute("class")).match(/colorSuccess/);

    vi.useRealTimers();
  });

  it("remove category", async () => {
    server.use(
      getDreamHandler(createDream({ categories: [cat] })),
      getCategoriesHandler(createCategories([cat])),
    );
    rendering();

    const category = (await screen.findByText("Category")).closest("div")!;
    const deleteCategory = category.querySelector("svg")!;
    expect(deleteCategory).not.toBeNull();
    await userEvent.click(deleteCategory);
    expect(screen.queryByText("Category")).toBeNull();
  });

  it("add category", async () => {
    server.use(
      getDreamHandler(createDream({ categories: [] })),
      getCategoriesHandler(createCategories([cat])),
    );
    rendering();

    const categoryInput = await waitFor(() => getCategoryInput());
    await userEvent.type(categoryInput, "New category{enter}");

    expect(screen.getByRole("button", { name: "New category" })).toBeInTheDocument();
  });

  it("remove person", async () => {
    server.use(
      getDreamHandler(createDream({ categories: [person] })),
      getCategoriesHandler(createCategories([person])),
    );
    rendering();

    const personChip = (await screen.findByText("Person")).closest("div")!;
    expect(personChip).toBeInTheDocument();
    const remove = personChip.querySelector(".MuiChip-deleteIcon")!;
    await userEvent.click(remove);
    expect(screen.queryByText("Person")).not.toBeInTheDocument();
  });

  it("add person", async () => {
    server.use(
      getDreamHandler(createDream({ categories: [] })),
      getCategoriesHandler(createCategories([person])),
    );
    rendering();

    const personInput = await waitFor(() => getPersonInput());
    await userEvent.type(personInput, "Somebody{enter}");
    expect(screen.getByText("Somebody")).toBeInTheDocument();
  });

  it("rate and finalize", async () => {
    server.use(getDreamHandler(createDream()));
    rendering();

    const rating = await screen.findByTitle("Bewertung");
    expect(rating).toBeInTheDocument();
    const finalizeButton = getFinalizeButton();
    expect(finalizeButton).toBeDisabled();

    const stars = within(rating).getAllByRole("radio");
    await userEvent.click(stars[0]);

    expect(finalizeButton).not.toBeDisabled();
    await userEvent.click(finalizeButton);
    expect(finalizeButton).toBeDisabled();
  });

  it("Record and delete recording", async () => {
    vi.stubGlobal("MediaRecorder", MediaRecorderMock);

    const mockStream = {
      getTracks: () => [{ stop: vi.fn() }],
    } as unknown as MediaStream;

    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: {
        getUserMedia: vi.fn().mockResolvedValue(mockStream),
      },
    });

    server.use(getDreamHandler(createDream()), postRecordingHandler());
    rendering();

    await clickRecordingButton();
    await clickRecordingButton();

    const deleteRecordingButton = queryDeleteRecordingButton()!;
    getTranscribeButton();
    await userEvent.click(deleteRecordingButton);

    expect(queryDeleteRecordingButton()).toBeNull();
  });

  it("Transcription transcribes, opens modal and saving writes it into the dream", async () => {
    server.use(
      getDreamHandler(
        createDream({
          recording: createRecording({
            transcript: "",
            recordingState: EntitiesRecordingState.RecordingStateStored,
          }),
        }),
      ),
      postTranscriptionHandler({ transcript: "Here is a text" }),
    );
    rendering();

    const transcriptionButton = await waitFor(() => getTranscribeButton());
    await userEvent.click(transcriptionButton);

    const modal = screen.getByRole("dialog");
    expect(modal).toHaveTextContent("Here is a text");

    const saveButton = within(modal).getByRole("button", { name: "Speichern" });
    await userEvent.click(saveButton);
    expect(modal).not.toBeVisible();

    expect(screen.getByRole("textbox")).toHaveTextContent("Here is a text");
  });

  it("set stars", async () => {
    server.use(getDreamHandler(createDream()));
    rendering();

    const ratingBar = await screen.findByTitle("Bewertung");
    expect(ratingBar).toBeInTheDocument();
    const stars2 = within(ratingBar).getByLabelText("2 Stars");
    await userEvent.click(stars2);
    const label = ratingBar.querySelector(`label[for="${stars2.id}"]`)!;
    const icon = label.querySelector(".MuiRating-icon")!;
    expect(icon).toHaveClass("MuiRating-iconFilled");
    expect(icon).not.toHaveClass("MuiRating-iconEmpty");
  });

  it("finalize", async () => {
    server.use(getDreamHandler(createDream({ rating: undefined })));
    rendering();

    const finalizeButton = await waitFor(() => getFinalizeButton());
    expect(finalizeButton).toBeDisabled();

    const star3 = getStarButton(3);
    await userEvent.click(star3);

    expect(finalizeButton).not.toBeDisabled();
    await userEvent.click(finalizeButton);
    expect(finalizeButton).toBeDisabled();
  });
});
