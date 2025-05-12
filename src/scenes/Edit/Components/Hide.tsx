import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import ShieldIcon from '@mui/icons-material/Shield';
import { IconButton } from '@mui/material';

import useDreams from '../../../store/store';

export default function Hide() {
    const visible = useDreams(state => state.dream.visible)
    const changeVisibility = useDreams(state => state.changeVisibility)

    const handleClick = async () => {
        await changeVisibility()
    }

    return (
        <IconButton onClick={handleClick}>
            {visible ? <RemoveModeratorIcon /> : <ShieldIcon />}
        </IconButton>
    )
}