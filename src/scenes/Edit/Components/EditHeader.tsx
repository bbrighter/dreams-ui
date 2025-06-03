import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save'
import { IconButton, Input } from '@mui/material';

import { useNavigateHomePage } from '../../../hooks/navigate';
import useDreams from '../../../store/store';
import Header from '../../Components/Header';
import Hide from './Hide';
import FinalizeButton from './Finalize';

export default function EditHeader(props: { isSaved: boolean }) {
    const isValidPassword = useDreams(state => state.isValidPassword())
    const date = useDreams(state => state.dream.date)
    const setDate = useDreams(state => state.setDate)
    const onChangeDate = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDate(e.currentTarget.value)
    }

    const DateInput = <Input
        type='date'
        value={date.toISOString().substring(0, 10)}
        onChange={onChangeDate}
        title='Datum'
    />
    const HideOrShow = () => {
        return (
            isValidPassword ? <Hide /> : <></>
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
    const updateDream = useDreams(state => state.updateDream)
    const saveDream = async () => {
        const ok = await updateDream()
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

    const handleClick = () => {
        navigate()
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