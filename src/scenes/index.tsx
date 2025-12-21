import React, { JSX, lazy, LazyExoticComponent, ReactNode, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import ErrorBoundary from './Errors'

const Edit = lazy(() => import('./Edit'))
const Management = lazy(() => import('./Management'))
const Start = lazy(() => import('./Start'))
const Statistics = lazy(() => import('./Statistics'))

const withSuspense = (Component: LazyExoticComponent<() => JSX.Element>) => {
    const fallback = <div>Loading...</div>

    return (
        <Suspense fallback={fallback}>
            <Component />
        </Suspense>
    )
}

type RawRoute = {
    path: string
    element: LazyExoticComponent<() => JSX.Element>
    name: string
}

type Route = {
    path: string
    element: ReactNode
    name: string
    errorElement: ReactNode
}

const rawRoutes: Array<RawRoute> = [
    { path: '/', element: Start, name: 'Start' },
    { path: 'dreams/:id', element: Edit, name: 'Edit Dream' },
    { path: 'statistics', element: Statistics, name: 'Statistics' },
    { path: 'management', element: Management, name: 'Management' },
]

const routes: Array<Route> = rawRoutes.map(v => (
    {
        ...v,
        element: withSuspense(v.element),
        errorElement: <ErrorBoundary />,
    }))

export default createBrowserRouter(routes, {
    basename: '/dreams',
})
