import MicIcon from '@mui/icons-material/Mic';
import MicNoneIcon from '@mui/icons-material/MicNone';
import MicOffIcon from '@mui/icons-material/MicOff';
import Fab from '@mui/material/Fab';
import { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import useDreams from '../../../store/store';


export default function RecordText() {
    const setDescription = useDreams(state => state.setDescription)
    const description = useDreams(state => state.dream.description)

    const {
        transcript,
        finalTranscript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable,
    } = useSpeechRecognition()

    if (!browserSupportsSpeechRecognition) {
        return <div></div>
    }

    // eslint-disable-next-line react-compiler/react-compiler
    useEffect(() => {
        let desc = description + transcript
        if (desc.slice(-1) != ' ') {
            desc += ' '
        }
        setDescription(desc)
        resetTranscript()
    }, [finalTranscript])



    const changeListening = () => {
        if (!listening) {
            SpeechRecognition.startListening({
                continuous: true,
                language: 'de-DE',
            })
        } else {
            SpeechRecognition.stopListening()
        }

    }

    const color = !isMicrophoneAvailable ? 'warning' : listening ? 'error' : 'primary'
    const icon = !isMicrophoneAvailable ? <MicNoneIcon /> : listening ? <MicIcon /> : <MicOffIcon />

    return (
        <>
            <Fab
                title='Aufnehmen'
                sx={{ marginTop: '1rem' }}
                color={color}
                onClick={changeListening}
            >
                {icon}
            </Fab>
        </>
    )
}
