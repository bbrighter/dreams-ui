import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import Edit from './Edit'

const rendering = () => render(
            <MemoryRouter initialEntries={['/dreams/1']}>
                <Routes>
                    <Route path="/dreams/:id" element={<Edit />} />
                </Routes>
            </MemoryRouter>,
)

describe('viewing and editing a single dream', () => {
    it('everything is rendered', async () => {
        rendering()

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

            expect(screen.getByTitle('Nächster Traum')).not.toBeDisabled()
            expect(screen.getByTitle('Vorheriger Traum')).toBeDisabled()

            expect(screen.getByText('Redigieren')).toBeDisabled()

            expect(screen.getByLabelText('1 Star')).toBeInTheDocument()
            expect(screen.getByLabelText('2 Stars')).toBeInTheDocument()
            expect(screen.getByLabelText('3 Stars')).toBeInTheDocument()
            expect(screen.getByLabelText('4 Stars')).toBeInTheDocument()
            expect(screen.getByLabelText('5 Stars')).toBeInTheDocument()
        })
    })

    it('edit description', { skip: true }, async () => {
        vi.useFakeTimers()
        rendering()

        await act(async () => {
            await vi.runAllTimersAsync()
            await Promise.resolve()
        })

        const saveButton = screen.getByTitle('Speichern')
        expect(saveButton.getAttribute('class')).match(/colorSuccess/)

        const descriptionInput = screen.getByLabelText('Beschreibung')

        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime, delay: 0 })
        await act(async () => {
            user.type(descriptionInput, ' and more text')
            vi.advanceTimersToNextTimer()
        })

        expect(screen.getByText('description and more text')).toBeInTheDocument()
        expect(saveButton.getAttribute('class')).match(/colorError/)

        await act(async () => {
            await vi.runAllTimersAsync()
            await Promise.resolve()
        })

        expect(saveButton.getAttribute('class')).match(/colorSuccess/)

        vi.useRealTimers()
    })

    it('remove category', async () => {
        rendering()

        const category = (await screen.findByText('Category')).closest('div')!
        const deleteCategory = category.querySelector('svg')!
        expect(deleteCategory).not.toBeNull()
        await userEvent.click(deleteCategory)
        expect(screen.queryByText('Category')).toBeNull()
    })

    it('add category', async () => {
        rendering()

        const categoryInput = await screen.findByLabelText('Kategorien')
        await userEvent.type(categoryInput, 'New category{enter}')

        expect(screen.getByRole('button', { name: 'New category' })).toBeInTheDocument()
    })

    it('remove person', async () => {
        rendering()

        const personChip = (await screen.findByText('Person')).closest('div')!
        expect(personChip).toBeInTheDocument()
        const remove = personChip.querySelector('.MuiChip-deleteIcon')!
        await userEvent.click(remove)
        expect(screen.queryByText('Person')).not.toBeInTheDocument()
    })

    it('add person', async () => {
        rendering()

        const personInput = await screen.findByLabelText('Beteiligte Personen')
        await userEvent.type(personInput, 'Somebody{enter}')
        expect(screen.getByText('Somebody')).toBeInTheDocument()
    })

    it('rate and finalize', async () => {
        rendering()

        const rating = await screen.findByTitle('Bewertung')
        expect(rating).toBeInTheDocument()
        const finalizeButton = screen.getByText('Redigieren')
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

    it('set stars', async () => {
        rendering()

        const ratingBar = await screen.findByTitle('Bewertung')
        expect(ratingBar).toBeInTheDocument()
        const stars2 = within(ratingBar).getByLabelText('2 Stars')
        await userEvent.click(stars2)
        const label = ratingBar.querySelector(`label[for="${stars2.id}"]`)!
        const icon = label.querySelector('.MuiRating-icon')!
        expect(icon).toHaveClass('MuiRating-iconFilled')
        expect(icon).not.toHaveClass('MuiRating-iconEmpty')
    })

    it('finalize', async () => {
        rendering()

        const finalizeButton = await screen.findByText('Redigieren')
        expect(finalizeButton).toBeDisabled()

        const star3 = screen.getByLabelText('3 Stars')
        await userEvent.click(star3)

        expect(finalizeButton).not.toBeDisabled()
        await userEvent.click(finalizeButton)
        expect(finalizeButton).toBeDisabled()
    })
})
