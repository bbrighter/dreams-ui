import { Fab } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import styled from "@emotion/styled";
import useDreams from "../../../store/store";
import { useEffect } from "react";


const ShadowFab = styled(Fab) <{ isHighlight: boolean }>`
    left: calc(50% - 56px/2);
    box-shadow: ${(props) => props.isHighlight ? "0 0 20px #ff4f4f" : "0 0 0"};
`

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

    useEffect(() => {
        let desc = description + transcript
        if (desc.slice(-1) != " ") {
            desc += " "
        }
        setDescription(desc)
        resetTranscript()
    }, [finalTranscript])



    const changeListening = () => {
        if (!listening) {
            SpeechRecognition.startListening({
                continuous: true,
                language: "de-DE",
            })
        } else {
            SpeechRecognition.stopListening()
        }

    }

    const color = !isMicrophoneAvailable ? "warning" : listening ? "error" : "primary"
    const icon = !isMicrophoneAvailable ? <MicNoneIcon /> : listening ? <MicIcon /> : <MicOffIcon />

    return (
        <ShadowFab
            sx={{ marginTop: "1rem" }}
            isHighlight={listening}
            color={color}
            onClick={changeListening}
        >
            {icon}
        </ShadowFab>
    )
}
