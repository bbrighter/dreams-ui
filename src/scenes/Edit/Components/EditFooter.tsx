import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';

import { useNavigateToDream } from '../../../hooks/navigate';
import useDreams from '../../../store/store';
import Bar from '../../Components/Bar';
import DreamRating from './DreamRating';
import FinalizeButton from './FinalizeButton';

export default function EditFooter() {
    return (
        <Bar
            mainAction={<DreamRating />}
            secondaryAction={[<FinalizeButton key='finalize' />]}
            position='bottom'
            optionalMiddleAction={<NextOrPreviousDream />}
        />

    )
}

function NextOrPreviousDream() {
    const navigate = useNavigateToDream()
    const dreams = useDreams(state => state.dreams)
    const currentDreamId = useDreams(state => state.dream.id)


    const [prevDreamIndex, setPrevDreamIndex] = useState(-1)
    const [nextDreamIndex, setNextDreamIndex] = useState(-1)

    useEffect(() => {
        const currentDreamIndex = dreams.findIndex(d => d.id == currentDreamId)
        setPrevDreamIndex(currentDreamIndex < dreams.length - 1 ? currentDreamIndex + 1 : -1)
        setNextDreamIndex(currentDreamIndex - 1)
    }, [currentDreamId, dreams])


    const onClick = (index: number) => {
        if (index == -1) return
        const dreamId = dreams[index].id
        navigate(dreamId)
    }

    return (
        <ButtonGroup>
            <IconButton
                disabled={prevDreamIndex == -1}
                onClick={() => onClick(prevDreamIndex)}
            >
                <ArrowUpwardIcon />
            </IconButton>
            <IconButton
                disabled={nextDreamIndex == -1}
                onClick={() => onClick(nextDreamIndex)}
            >
                <ArrowDownwardIcon />
            </IconButton>
        </ButtonGroup>
    )
}