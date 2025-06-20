import Rating from '@mui/material/Rating';
import { useEffect, useState } from 'react';

import useDreams from '../../../store/store';

export default function DreamRating() {
    const rating = useDreams(state => state.dream.rating)
    const rateDream = useDreams(state => state.rateDream)

    const [value, setValue] = useState<number | null>(rating)

    const onChange = (_: React.SyntheticEvent, v: number | null) => {
        setValue(v)
        if (v != null) {
            rateDream(v)
        }
    }

    useEffect(() => {
        setValue(rating)
    }, [rating])


    return (
        <Rating
            value={value}
            onChange={onChange}
        />
    )
}