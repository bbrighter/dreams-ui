import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { getDreamsHandler } from '../../__tests__/mocks/dreamsHandlers'
import { server } from '../../__tests__/setupTest'
import Start from './Start'

const findRowByDate = async (date: string): Promise<HTMLElement> => {
    const relevantRow = await screen.findByText(date) as HTMLElement
    expect(relevantRow).toBeInTheDocument()
    const wrapper = relevantRow.closest('li') as HTMLElement
    return wrapper
}

window.scrollTo = vi.fn()

describe('start page is rendered and can be clicked', () => {
    it('everything is rendered', async () => {
        render(<MemoryRouter><Start /></MemoryRouter>)

        const row = await findRowByDate('01.01.2025')
        expect(within(row).getByTitle('Löschen')).toBeInTheDocument()

        expect(screen.getByText('Neu')).toBeInTheDocument()

        expect(screen.getByText('Übersicht')).toBeInTheDocument()
        expect(screen.getByText('Auswertung')).toBeInTheDocument()
        expect(screen.getByText('Management')).toBeInTheDocument()
    })

    it('finalized and rating is rendered', async () => {
        render(<MemoryRouter><Start /></MemoryRouter>)

        const nonFinalizedRow = await findRowByDate('01.01.2025')
        const svg = nonFinalizedRow.querySelector('svg') as SVGElement
        expect(svg.getAttribute('class')).toMatch(/colorWarning/)
        const notRated = within(nonFinalizedRow).getByTitle('Bewertung')
        expect(notRated.getAttribute('aria-label')).toBe('0 Stars')

        const finalizedRow = await findRowByDate('01.02.2025')
        const warnSvg = finalizedRow.querySelector('svg') as SVGElement
        expect(warnSvg).toBeInTheDocument()
        expect(warnSvg.getAttribute('class')).not.toMatch(/colorWarning/)
        const rated = within(finalizedRow).getByTitle('Bewertung')
        expect(rated.getAttribute('aria-label')).toBe('3 Stars')
    })

    it('deletion works', async () => {
        render(<MemoryRouter><Start /></MemoryRouter>)

        const row = await findRowByDate('01.01.2025')
        const deleteButton = within(row).getByTitle('Löschen')
        await userEvent.click(deleteButton)

        expect(screen.queryByText('01.01.2025')).not.toBeInTheDocument()
    })

    it('empty list', async () => {
        server.use(getDreamsHandler([]))
        render(<MemoryRouter><Start /></MemoryRouter>)

        expect(await screen.findByText('Neu')).toBeInTheDocument()
        expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
    })
})
