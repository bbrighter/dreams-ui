import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator'
import ShieldIcon from '@mui/icons-material/Shield'
import { IconButton } from '@mui/material'

import { dreamService, useDreams } from '../../../store'

export default function Hide() {
    const visible = useDreams(state => state.dream.visible)
    const handleClick = () => dreamService.patchDreamVisiblity()

    return (
        <IconButton onClick={handleClick}>
            {visible ? <RemoveModeratorIcon /> : <ShieldIcon />}
        </IconButton>
    )
}
