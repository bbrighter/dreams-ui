import * as React from 'react'
import { Fab } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useDream from '../../../store/dream';
import styled from '@emotion/styled';


const ShadowFab = styled(Fab) <{ isHighlight: boolean }>`
    left: calc(50% - 56px/2);
    box-shadow: ${(props) => props.isHighlight ? '0 0 20px #ff4f4f' : '0 0 0'};
`

export default function RecordText() {
    const setDescription = useDream(state => state.setDescription)
    const description = useDream(state => state.description)

    const {
        transcript,
        finalTranscript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition()

    if (!browserSupportsSpeechRecognition) {
        return <div></div>
    }

    React.useEffect(() => {
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
                language: 'de-DE'
            })
        } else {
            SpeechRecognition.stopListening()
        }

    }

    return (
        <ShadowFab
            isHighlight={listening}
            color={listening ? 'error' : 'primary'}
            onClick={changeListening}
        >
            {listening && <MicOffIcon />}
            {!listening && <MicIcon />}
        </ShadowFab>
    )
}
