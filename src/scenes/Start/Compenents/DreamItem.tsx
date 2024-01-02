import * as React from 'react'
import styled from "@emotion/styled";
import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import CloudIcon from '@mui/icons-material/Cloud';
import { useNavigate } from 'react-router-dom';

const StyledListItem = styled(ListItem)`
    :hover{
        cursor: pointer;
        background-color: rgba(0,0,0,0.2);
    }
`

export default function DreamItem(props: {
    id: number
    date: Date
}) {
    const navigate = useNavigate()

    const navigateTo = (dreamId: number) => {
        navigate('/dreams/' + dreamId)
    }


    return (
        <StyledListItem onClick={() => navigateTo(props.id)}>
            <ListItemAvatar >
                <CloudIcon />
            </ListItemAvatar>
            <ListItemText>
                {props.date.toLocaleDateString("de-DE", { dateStyle: "medium" })}
            </ListItemText>
        </StyledListItem>)
}