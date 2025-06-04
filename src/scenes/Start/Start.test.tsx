import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

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
    })

    it('finalized and non-finalized are rendered correctly', async () => {
        render(<MemoryRouter><Start /></MemoryRouter>)

        const finalizedRow = await findRowByDate('01.01.2025')
        const svg = finalizedRow.querySelector('svg') as SVGElement
        expect(svg.getAttribute('class')).toMatch(/colorWarning/)

        const nonFinalizedRow = await findRowByDate('01.02.2025')
        const warnSvg = nonFinalizedRow.querySelector('svg') as SVGElement
        expect(warnSvg).toBeInTheDocument()
        expect(warnSvg.getAttribute('class')).not.toMatch(/colorWarning/)
    })

    it('deletion works', async () => {
        render(<MemoryRouter><Start /></MemoryRouter>)

        const row = await findRowByDate('01.01.2025')
        const deleteButton = within(row).getByTitle('Löschen')
        await userEvent.click(deleteButton)

        expect(screen.queryByText('01.01.2025')).not.toBeInTheDocument()
    })
})