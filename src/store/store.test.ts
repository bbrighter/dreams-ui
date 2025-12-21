import { describe, expect, it } from 'vitest';

import useDreams from './store';

describe('store', () => {
    it('load public dreams into state', async () => {
        await useDreams.getState().getDreams()
        const dreams = useDreams.getState().dreams

        expect(dreams).toHaveLength(2)
        const dream = dreams[1]
        expect(dream.id).toBe(1)
        expect(dream.date).toStrictEqual(new Date('2025-01-01T12:30:00Z'))
        expect(dream.visible).toBeTruthy()
        expect(dream.finalized).toBeFalsy()
    })

    it('load private and public dreams into state', async () => {
        await useDreams.getState().getDreams()
        const dreams = useDreams.getState().dreams

        expect(dreams).toHaveLength(2)
    })

    it('create a new dream', async () => {
        await useDreams.getState().getDreams()
        const id = await useDreams.getState().createDream()

        expect(id).toBe(3)
        expect(useDreams.getState().dreams).toHaveLength(3)
        const dream = useDreams.getState().dream
        expect(dream.finalized).toBeFalsy()
        expect(dream.id).toBe(3)
    })

    it('delete an existing dream', async () => {
        await useDreams.getState().getDreams()
        await useDreams.getState().deleteDream(1)

        expect(useDreams.getState().dreams).toHaveLength(1)
    })

    it('load one dream into state', async () => {
        await useDreams.getState().getDream(1)

        const dream = useDreams.getState().dream
        expect(dream.id).toBe(1)
        expect(dream.date).toStrictEqual(new Date('2025-01-01T12:30:00Z'))
        expect(dream.categories).toHaveLength(1)
        expect(dream.persons).toHaveLength(1)
        expect(dream.description).toBe('description')
        expect(dream.visible).toBeTruthy()
        expect(dream.isSaved).toBeTruthy()
        expect(dream.finalized).toBeFalsy()
    })

    it('change the date of a dream', async () => {
        await useDreams.getState().getDream(1)

        useDreams.getState().setDate('2024-01-01T18:00:00Z')
        expect(useDreams.getState().dream.date).toStrictEqual(new Date('2024-01-01T18:00:00Z'))
        expect(useDreams.getState().dream.isSaved).toBeFalsy()
    })

    it('change the description of a dream', async () => {
        await useDreams.getState().getDream(1)

        useDreams.getState().setDescription('new')
        expect(useDreams.getState().dream.description).toBe('new')
        expect(useDreams.getState().dream.isSaved).toBeFalsy()
    })

    it('update a dream and send it', async () => {
        await useDreams.getState().getDream(1)
        await useDreams.getState().getDreams()
        useDreams.getState().setDescription('new')

        const ok = await useDreams.getState().updateDescription()
        expect(ok).toBeTruthy()
        const okDate = await useDreams.getState().updateDate(new Date('2024-01-01T18:00:00Z'))
        expect(okDate).toBeTruthy()
        expect(useDreams.getState().dream.description).toBe('new')
        expect(useDreams.getState().dream.date).toStrictEqual(new Date('2024-01-01T18:00:00Z'))
        expect(useDreams.getState().dream.isSaved).toBe(true)
    })

    it('finalize a dream', async () => {
        await useDreams.getState().getDream(1)
        await useDreams.getState().getDreams()

        await useDreams.getState().finalizeDream()

        const dream = useDreams.getState().dream
        expect(dream.finalized).toBe(true)
        expect(useDreams.getState().dreams.find(d => d.id == 1)!.finalized).toBe(true)
    })

    it('rate a dream', async () => {
        await useDreams.getState().getDream(1)
        await useDreams.getState().getDreams()

        await useDreams.getState().rateDream(3)

        const dream = useDreams.getState().dream
        expect(dream.rating).toBe(3)
        expect(useDreams.getState().dreams.find(d => d.id == 1)!.rating).toBe(3)
    })
})