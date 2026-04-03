
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { useSimpleDebounce } from "../../hooks/simpleDebounce"
import { categoriesService, dreamService, useDreams } from "../../store"
import { useIsSaved } from "../../store/selectors"
import { EditFooter, EditHeader, TagInputs } from "./Components"

const DEBOUNCE_TIME = 2_000

export default function Edit() {
  const navigate = useNavigate()
  const { dream, setDescription } = useDreams()
  const { description } = dream
  const { id: urlId } = useParams()

  const isSaved = useIsSaved()

  useEffect(() => {
    const numericId = Number(urlId)
    if (!urlId || isNaN(numericId)) {
      navigate("/")
      return
    }
    dreamService.getDream(numericId).catch((err) => {
      if (err.status == 404) {
        navigate("/")
        return
      }
    })
    categoriesService.list()
  }, [urlId])

  const debouncedSave = useSimpleDebounce(async () => {
    if (!isSaved) {
      await dreamService.saveDream()
    }
  }, DEBOUNCE_TIME)

  const onChangeDescriptionDebounce = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = e.currentTarget.value
    setDescription(value)
    debouncedSave()
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <EditHeader />
      <Container sx={{ marginBottom: "1rem", flexGrow: 1 }} component="form">
        <TextField
          sx={{
            width: "100%",
            marginTop: "1rem",
            height: "80%",
          }}
          label="Beschreibung"
          multiline
          minRows={5}
          maxRows={18}
          value={description}
          onChange={onChangeDescriptionDebounce}
        />
        <TagInputs type="category" />
        <TagInputs type="person" />
      </Container>
      <EditFooter />
    </Box>
  )
}
