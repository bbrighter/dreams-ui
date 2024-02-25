import { AppBar, ButtonGroup, Toolbar } from '@mui/material'
import * as React from 'react'
import Authentication from './Authentication'


export default function Header(
    props: {
        mainAction: React.ReactNode
        secondaryAction?: Array<React.ReactNode>
        optionalMiddleAction?: React.ReactNode
    }
) {
    let SecondaryActions = [<></>] as Array<React.ReactNode>
    if (props.secondaryAction) {
        SecondaryActions = props.secondaryAction.map(v => v)
    }


    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {props.mainAction}
                {props.optionalMiddleAction}
                <ButtonGroup variant='outlined'>
                    {SecondaryActions}
                    <Authentication />
                </ButtonGroup>
            </Toolbar>
        </AppBar >
    )
}