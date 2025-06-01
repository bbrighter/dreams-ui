import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import Start from './Start'

describe('start page is rendered and can be clicked', () => {
    it('everything is rendered', async () => {
        render(<MemoryRouter><Start /></MemoryRouter>)

        await waitFor(() => {
            expect(screen.getByText('Neu')).toBeInTheDocument()

            expect(screen.getByText('01.01.2025')).toBeInTheDocument()
            expect(screen.getByTitle('Löschen')).toBeInTheDocument()

            expect(screen.getByText('Übersicht')).toBeInTheDocument()
            expect(screen.getByText('Auswertung')).toBeInTheDocument()
        })
    })

    it('deletion works', async () => {
        render(<MemoryRouter><Start /></MemoryRouter>)

        const deleteButton = await screen.findByTitle('Löschen')
        expect(screen.queryByText('01.01.2025')).toBeInTheDocument()
        await userEvent.click(deleteButton)

        expect(screen.queryByText('01.01.2025')).not.toBeInTheDocument()
    })
})