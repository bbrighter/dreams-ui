import { JSX, lazy, Suspense } from 'react';

const Edit = lazy(() => import('./Edit/Edit'))
const Management = lazy(() => import('./Management/Management'))
const Start = lazy(() => import('./Start/Start'))
const Statistics = lazy(() => import('./Statistics/Statistics'))

const indices: Array<{ path: string, element: JSX.Element, name: string }> = [
    {

        path: '/',
        element: <Start />,
        name: 'Start',
    },
    {
        path: 'dreams/:id',
        element: <Edit />,
        name: 'Edit Dream',
    },
    {

        path: 'statistics',
        element: <Statistics />,
        name: 'Statistics',
    },
    {

        path: 'management',
        element: <Management />,
        name: 'Management',
    },
]

export default indices.map(v => ({
    path: v.path,
    element: <Suspense fallback={<div>Loading...</div>}>{v.element}</Suspense>,
    name: v.name,
}))