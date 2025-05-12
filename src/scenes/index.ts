// import React from "react";
import Edit from './Edit';
import Start from './Start';
import Statistics from './Statistics'

// const Edit = React.lazy(() => import("./Edit").then(module => ({ default: module.default.routeProps.element.type })))
// const Start = React.lazy(() => import("./Start").then(module => ({ default: module.default.routeProps.element.type })))
// const Statistics = React.lazy(() => import("./Statistics").then(module => ({ default: module.default.routeProps.element.type })))

const indices = [
    {
        routeProps: {
            path: '/',
            element: Start.routeProps.element,
        },
        name: 'Start',
    },
    {
        routeProps: {
            path: 'dreams/:id',
            element: Edit.routeProps.element,
        },
        name: 'Edit Dream',
    },
    {
        routeProps: {
            path: 'statistics',
            element: Statistics.routeProps.element,
        },
        name: 'Statistics',
    },

    // Start,
    // Edit,
    // Statistics,
]

export default indices