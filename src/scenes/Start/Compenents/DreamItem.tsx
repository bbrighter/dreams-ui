import * as React from 'react'
import styled from "@emotion/styled";
import { IconButton, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import CloudIcon from '@mui/icons-material/Cloud';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import useDreams from '../../../store/store';




const StyledListItem = styled(ListItem)`
    :hover{
        cursor: pointer;
        background-color: rgba(0,0,0,0.2);
    }
`

const StyledListItemText = styled(ListItemText) <{ visible: number }>`
    color: ${props => (props.visible ? 'primary' : '#90caf9')};

`

export default function DreamItem(props: {
    id: number
    date: Date
    visible: boolean
}) {
    const deleteDream = useDreams(state => state.deleteDream)
    const navigate = useNavigate()

    const navigateTo = (dreamId: number) => {
        navigate('/dreams/' + dreamId)
    }


    return (
        <StyledListItem
            onClick={() => navigateTo(props.id)}
            secondaryAction={
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation()
                        deleteDream(props.id)
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemAvatar >
                <CloudIcon />
            </ListItemAvatar>
            <StyledListItemText visible={+props.visible}>
                {props.date.toLocaleDateString("de-DE", { dateStyle: "medium" })}
            </StyledListItemText>
        </StyledListItem>)
}