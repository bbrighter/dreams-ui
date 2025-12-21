import styled from '@emotion/styled'
import CloudIcon from '@mui/icons-material/Cloud'
import CloudOffIcon from '@mui/icons-material/CloudOff'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, ListItem, ListItemAvatar, ListItemText, Rating } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { MetaDream } from '../../../store/dream/dreams'
import useDreams from '../../../store/store'

const StyledListItem = styled(ListItem)`
    :hover{
        cursor: pointer;
        background-color: rgba(0,0,0,0.2);
    }
`
export default function DreamItem(props: {
    dream: MetaDream
}) {
    const deleteDream = useDreams(state => state.deleteDream)
    const navigate = useNavigate()

    const navigateTo = (dreamId: number) => {
        navigate('/dreams/' + dreamId)
    }

    const color = props.dream.finalized ? 'inherit' : 'warning'

    return (
        <StyledListItem
          onClick={() => navigateTo(props.dream.id)}
          secondaryAction={(
                <IconButton
                  onClick={(e) => {
                        e.stopPropagation()
                        deleteDream(props.dream.id)
                    }}
                  title="Löschen"
                >
                    <DeleteIcon />
                </IconButton>
              )}
        >
            <ListItemAvatar>
                {props.dream.visible ? <CloudIcon color={color} /> : <CloudOffIcon color={color} />}
            </ListItemAvatar>
            <ListItemText>
                {props.dream.date.toLocaleDateString('de-DE', { dateStyle: 'medium' })}
            </ListItemText>
            <Rating
              title="Bewertung"
              value={props.dream.rating}
              readOnly
              size="small"
              sx={{ pr: 2, pl: 2 }}
            />
        </StyledListItem>
)
}
