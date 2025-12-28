import { useEffect } from 'react'

import { dreamService, useDreams } from '../store'

    export const useGetDreams = () => {
        const { dreamsLoaded, loggedIn } = useDreams()

        useEffect(() => {
                dreamService.getDreams().then().catch(err => alert(err))
        }, [dreamsLoaded, loggedIn])
    }
