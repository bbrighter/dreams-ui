import { useEffect } from 'react'

import { dreamsService, useDreams } from '../store'

export const useGetDreams = () => {
  const { dreamsLoaded, loggedIn } = useDreams()

  useEffect(() => {
    dreamsService.getDreams().then().catch(err => alert(err))
  }, [dreamsLoaded, loggedIn])
}
