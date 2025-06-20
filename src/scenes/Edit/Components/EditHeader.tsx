import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save'
import { IconButton, Input } from '@mui/material';

import { useNavigateHomePage } from '../../../hooks/navigate';
import useDreams from '../../../store/store';
import Header from '../../Components/Header';
import Hide from './Hide';

export default function EditHeader(props: { isSaved: boolean }) {
    const loggedIn = useDreams(state => state.loggedIn)
    const date = useDreams(state => state.dream.date)
    const updateDate = useDreams(state => state.updateDate)
    const onChangeDate = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        updateDate(e.currentTarget.value)
    }

    const DateInput = <Input
        type='date'
        value={date.toISOString().substring(0, 10)}
        onChange={onChangeDate}
        title='Datum'
    />
    const HideOrShow = () => {
        return (
            loggedIn ? <Hide /> : <></>
        )
    }


    return (
        <Header
            mainAction={<BackButton />}
            secondaryAction={[
                <SaveButton key={1} isSaved={props.isSaved} />,
                <HideOrShow key={2} />,
            ]}
            optionalMiddleAction={DateInput}
        />
    )
}

function SaveButton(props: { isSaved: boolean }) {
    const navigate = useNavigateHomePage()
    const updateDescription = useDreams(state => state.updateDescription)
    const saveDream = async () => {
        const ok = await updateDescription()
        if (ok) navigate()
    }

    const color = props.isSaved ? 'success' : 'error'
    return (

        <IconButton
            color={color}
            onClick={saveDream}
            title='Speichern'
        >
            <SaveIcon />
        </IconButton>
    )
}

export function BackButton() {
    const navigate = useNavigateHomePage()
    const resetDream = useDreams(state => state.resetDream)

    const handleClick = () => {
        navigate()
        resetDream()
    }

    return (
        <IconButton
            onClick={handleClick}
            title='Zurück'
        >
            <ArrowBackIcon />
        </IconButton >
    )
}