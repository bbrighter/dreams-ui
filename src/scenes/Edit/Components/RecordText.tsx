import MicIcon from '@mui/icons-material/Mic'
import MicNoneIcon from '@mui/icons-material/MicNone'
import MicOffIcon from '@mui/icons-material/MicOff'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import { useCallback, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import { useDreams } from '../../../store'

export default function RecordText() {
  const { setDescription, setTranscript, dream } = useDreams()
  const description = dream.description

  const {
    transcript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition()

  useEffect(() => {
    if (!finalTranscript) return

    let desc = description + finalTranscript
    if (!desc.endsWith(' ')) {
      desc += ' '
    }
    setDescription(desc)
    resetTranscript()
  }, [finalTranscript, setDescription, resetTranscript])

  useEffect(() => {
    const tr = listening ? transcript : ''
    setTranscript(tr)
  }, [transcript, listening, setTranscript])

  useEffect(() => {
    if (!isMicrophoneAvailable) {
      alert('Microphone is not available')
    }
  }, [isMicrophoneAvailable])

  if (!browserSupportsSpeechRecognition) {
    return <div></div>
  }

  const changeListening = useCallback(() => {
    if (!listening) {
      SpeechRecognition.startListening({
        continuous: true,
        language: 'de-DE',
      })
    }
    else {
      SpeechRecognition.stopListening()
    }
  }, [listening])

  const color = !isMicrophoneAvailable ? 'warning' : listening ? 'error' : 'primary'
  const icon = !isMicrophoneAvailable ? <MicNoneIcon /> : listening ? <MicIcon /> : <MicOffIcon />

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: '1rem' }}>
      <Fab
        title="Aufnehmen"
        color={color}
        onClick={changeListening}
      >
        {icon}
      </Fab>
    </Box>
  )
}
