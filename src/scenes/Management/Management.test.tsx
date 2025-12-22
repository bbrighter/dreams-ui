import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { server } from '../../__tests__/setupTest'
import Management from './Management'

describe('Management is rendered', () => {
    it('Tabs work and content is rendered', async () => {
        render(<MemoryRouter><Management /></MemoryRouter>)

        const categoryTab = await screen.findByText('Kategorien')
        const personTab = screen.getByText('Personen')

        expect(screen.getByText('Category')).toBeInTheDocument()
        expect(screen.getByText(1)).toBeInTheDocument()
        expect(screen.queryAllByText('Person')).toHaveLength(0)

        await userEvent.click(personTab)
        expect(screen.getByText('Person')).toBeInTheDocument()
        expect(screen.getByText(1)).toBeInTheDocument()
        expect(screen.queryAllByAltText('Category')).toHaveLength(0)

        await userEvent.click(categoryTab)
        expect(screen.getByText('Category')).toBeInTheDocument()
        expect(screen.queryAllByText('Person')).toHaveLength(0)
    })

    it('renaming works', async () => {
        render(<MemoryRouter><Management /></MemoryRouter>)

        const editButton = await screen.findByTitle('Umbenennen')
        await userEvent.click(editButton)

        expect(screen.queryByTitle('Bearbeiten')).not.toBeInTheDocument()
        const cancelButton = screen.getByTitle('Abbrechen')

        await userEvent.click(cancelButton)
        await userEvent.click(screen.getByTitle('Umbenennen'))
        const input = screen.getByDisplayValue('Category')
        await userEvent.clear(input)
        await userEvent.type(input, 'New category')
        const saveButton = screen.getByTitle('Bestätigen')
        await userEvent.click(saveButton)
        expect(screen.getByText('New category')).toBeInTheDocument()
    })

    it('deleting is disabled', async () => {
        server.use(
            http.get('categories', () => HttpResponse.json(
                { categories: [{ id: 1, name: 'Category', count: 0 }] })),
        )

        render(<MemoryRouter><Management /></MemoryRouter>)

        const deleteButton = await screen.findByTitle('Löschen')
        await userEvent.click(deleteButton)

        expect(screen.getByTitle('Abbrechen')).toBeInTheDocument()
        const confirmButton = screen.getByTitle('Bestätigen')
        await userEvent.click(confirmButton)

        expect(screen.queryByText('Category')).not.toBeInTheDocument()
    })

    it('merging works', { skip: true }, async () => {
        render(<MemoryRouter><Management /></MemoryRouter>)

        const mergeButton = await screen.findByTitle('Merge')
        await userEvent.click(mergeButton)

        expect(screen.getByTitle('Abbrechen')).toBeInTheDocument()
        const confirmButton = screen.getByTitle('Bestätigen')
        await userEvent.click(confirmButton)
        // TODO: Select and merge
    })
})
