import { useEffect } from 'react'

import useDreams from '../store/store'

export const useGetDreams = () => {
    const getDreams = useDreams(state => state.getDreams)
    const isLoaded = useDreams(state => state.dreamsLoaded)
    const loggedIn = useDreams(state => state.loggedIn)

    useEffect(() => {
        if (isLoaded == 'none' && !loggedIn) {
            getDreams().then().catch(err => alert(err))
        }
        if (isLoaded == 'public' && loggedIn) {
            getDreams().then().catch(err => alert(err))
        }
    }, [isLoaded, getDreams, loggedIn])
}