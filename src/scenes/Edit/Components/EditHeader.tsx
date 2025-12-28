import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SaveIcon from '@mui/icons-material/Save'
import { IconButton, Input } from '@mui/material'

import { useNavigateHomePage } from '../../../hooks/navigate'
import { dreamService, useDreams } from '../../../store'
import { selectLoggedIn } from '../../../store'
import Bar from '../../Components/Bar'
import Hide from './Hide'

export default function EditHeader() {
  const { dream } = useDreams()
  const loggedIn = useDreams(selectLoggedIn)
  const date = dream.date
  const onChangeDate = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dreamService.patchDreamDate(new Date(e.currentTarget.value))
  }

  const DateInput = (
    <Input
      type="date"
      value={date.toISOString().substring(0, 10)}
      onChange={onChangeDate}
      title="Datum"
    />
  )
  const HideOrShow = () => {
    return (
      loggedIn ? <Hide /> : <></>
    )
  }

  return (
    <Bar
      mainAction={<BackButton />}
      secondaryAction={[
        <SaveButton key={1} />,
        <HideOrShow key={2} />,
      ]}
      optionalMiddleAction={DateInput}
      position="top"
      showAuth
    />
  )
}

function SaveButton() {
  const isSaved = useDreams(state => state.dream.isSaved)

  const saveDream = () => {
    dreamService.patchDreamDescription()
  }

  const color = isSaved ? 'success' : 'error'
  return (
    <IconButton
      color={color}
      onClick={saveDream}
      title="Speichern"
    >
      <SaveIcon />
    </IconButton>
  )
}

export function BackButton() {
  const navigate = useNavigateHomePage()
  const resetDream = useDreams(state => state.resetDream)

  const handleClick = () => {
    navigate()
    resetDream()
  }

  return (
    <IconButton
      onClick={handleClick}
      title="Zurück"
    >
      <ArrowBackIcon />
    </IconButton>
  )
}
