import { useEffect } from 'react'

import { dreamsService, useDreams } from '../store'
import { selectLoggedIn } from '../store'

export const useGetDreams = () => {
  const { dreamsLoaded } = useDreams()
  const logged = useDreams(selectLoggedIn)

  useEffect(() => {
    dreamsService.getDreams().then().catch(err => alert(err))
  }, [dreamsLoaded, logged])
}
