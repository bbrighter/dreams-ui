import { EntityDreamsResponse } from '../api/generated_api';
import { Category } from './categories';
import { Person } from './persons';

export interface Dreams {
    dreams: Array<{
        id: number;
        date: Date;
        visible: boolean
        finalized: boolean
        persons: Array<Person>,
        categories: Array<Category>
    }>;
}

export function dreamsResponseToDreams(resp: EntityDreamsResponse): Dreams {
    return {
        dreams: resp.dreams.map(d => {
            const date = new Date(d.date)
            return {
                id: d.id,
                date: date,
                visible: d.visible,
                finalized: d.finalized,
                persons: d.persons ?? [],
                categories: d.categories ?? [],
            }
        }),
    }
}