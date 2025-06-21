import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import Edit from './Edit'

describe('viewing and editing a single dream', () => {
    it('everything is rendered', async () => {
        render(
            <MemoryRouter initialEntries={['/dreams/1']}>
                <Routes>
                    <Route path="/dreams/:id" element={<Edit />} />
                </Routes>
            </MemoryRouter>)

        await waitFor(() => {
            expect(screen.getByTitle('Speichern')).toBeInTheDocument()
            expect(screen.getByTitle('Zurück')).toBeInTheDocument()

            expect(screen.getByDisplayValue('2025-01-01')).toBeInTheDocument()
            expect(screen.getByTitle('Datum')).toBeInTheDocument()

            expect(screen.getByLabelText('Beschreibung')).toBeInTheDocument()
            expect(screen.getByText('description')).toBeInTheDocument()

            expect(screen.getByLabelText('Kategorien')).toBeInTheDocument()
            expect(screen.getByText('Category')).toBeInTheDocument()

            expect(screen.getByLabelText('Beteiligte Personen')).toBeInTheDocument()
            expect(screen.getByText('Person')).toBeInTheDocument()
        })
    })

    it('edit description', { timeout: 10_000 }, async () => {
        // TODO: Enable fake timers to speed test up
        // vi.useFakeTimers()
        render(
            <MemoryRouter initialEntries={['/dreams/1']}>
                <Routes>
                    <Route path="/dreams/:id" element={<Edit />} />
                </Routes>
            </MemoryRouter>)

        const saveButton = screen.getByTitle('Speichern')
        await waitFor(() => {
            expect(saveButton.getAttribute('class')).match(/colorSuccess/)
        })

        const descriptionInput = await screen.findByLabelText('Beschreibung')
        await userEvent.type(descriptionInput, ' and more text')

        expect(screen.getByText('description and more text')).toBeInTheDocument()
        expect(saveButton.getAttribute('class')).match(/colorError/)

        // vi.advanceTimersByTime(5_000)

        await waitFor(() => {
            expect(saveButton.getAttribute('class')).match(/colorSuccess/)
        }, { timeout: 6000 })


        // vi.runOnlyPendingTimers()
        // vi.useRealTimers()
    })

    it('remove category', async () => {
        render(
            <MemoryRouter initialEntries={['/dreams/1']}>
                <Routes>
                    <Route path="/dreams/:id" element={<Edit />} />
                </Routes>
            </MemoryRouter>)

        const category = (await screen.findByText('Category')).closest('div')!
        const deleteCategory = category.querySelector('svg')!
        expect(deleteCategory).not.toBeNull()
        await userEvent.click(deleteCategory)
        expect(screen.queryByText('Category')).toBeNull()
    })

    it('add category', async () => {
        render(
            <MemoryRouter initialEntries={['/dreams/1']}>
                <Routes>
                    <Route path="/dreams/:id" element={<Edit />} />
                </Routes>
            </MemoryRouter>)

        const categoryInput = await screen.findByLabelText('Kategorien')
        await userEvent.type(categoryInput, 'New category{enter}')

        expect(screen.getByRole('button', { name: 'New category' })).toBeInTheDocument()

    })

    it('remove person', { skip: true }, async () => {

    })

    it('add person', { skip: true }, async () => {

    })

    it('rate and finalize', async () => {
        render(
            <MemoryRouter initialEntries={['/dreams/1']}>
                <Routes>
                    <Route path="/dreams/:id" element={<Edit />} />
                </Routes>
            </MemoryRouter>)

        const rating = await screen.findByTitle('Bewertung')
        expect(rating).toBeInTheDocument()
        const finalizeButton = screen.getByText('Redigieren')
        screen.debug(finalizeButton)
        expect(finalizeButton).toBeDisabled()

        const stars = within(rating).getAllByRole('radio')
        await userEvent.click(stars[0])

        expect(finalizeButton).not.toBeDisabled()
        await userEvent.click(finalizeButton)
        expect(finalizeButton).toBeDisabled()
    })

    // it('recording button works', async () => {
    //     vi.mock(import('react-speech-recognition'), async (importOriginal) => {
    //         const actual = await importOriginal()
    //         return {
    //             ...actual,
    //             useSpeechRecognition: vi.fn(() => ({
    //                 transcript: '',
    //                 finalTranscript: '',
    //                 listening: false,
    //                 resetTranscript: vi.fn(),
    //                 browserSupportsSpeechRecognition: true,
    //                 isMicrophoneAvailable: true,
    //             } as SpeechRecognitionOptions)),
    //         }
    //     })

    //     render(
    //         <MemoryRouter initialEntries={['/dreams/1']}>
    //             <Routes>
    //                 <Route path="/dreams/:id" element={<Edit />} />
    //             </Routes>
    //         </MemoryRouter>)

    //     const recordButton = await screen.findByTitle('Aufnehmen')
    //     expect(recordButton.getAttribute('class')).match(/MuiFab-primary/)
    //     await userEvent.click(recordButton)
    //     // The following fails for whatever reason, probably because of the mocked react-speech-recognition
    //     // await waitFor(() => {
    //     //     const recordButtonWarn = screen.getByTitle('Aufnehmen')
    //     //     expect(recordButtonWarn.getAttribute('class')).match(/MuiFab-warning/)
    //     // })
    // })
})