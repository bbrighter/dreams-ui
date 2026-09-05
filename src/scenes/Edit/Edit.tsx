import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { categoriesService } from "@/services/categories.service";
import { dreamService } from "@/services/dream.service";

import { useSimpleDebounce } from "../../hooks/simpleDebounce";
import { useIsSaved } from "../../store/selectors";
import { useDreams } from "../../store/store";
import { DreamDescription } from "./DreamDescription/DreamDescription";
import { EditFooter } from "./Footer/Footer";
import { useFooterProps } from "./Footer/useFooterProps";
import { Header } from "./Header/Header";
import { useHeaderProps } from "./Header/useHeaderProps";
import { TagInputs } from "./TagInput/TagInputs";
import { useCategoryInput, usePersonInput } from "./TagInput/useTagInputs";

const DEBOUNCE_TIME = 2_000;

export default function Edit() {
  const navigate = useNavigate();
  const dream = useDreams((state) => state.dream);
  const setDescription = useDreams((state) => state.setDescription);
  const { description } = dream;
  const { id: urlId } = useParams();

  const isSaved = useIsSaved();

  useEffect(() => {
    const numericId = Number(urlId);
    if (!urlId || isNaN(numericId)) {
      navigate("/");
      return;
    }
    dreamService.getDream(numericId).catch((err) => {
      if (err.status == 404) {
        navigate("/");
        return;
      }
    });
    categoriesService.list();
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [urlId]);

  const debouncedSave = useSimpleDebounce(async () => {
    if (!isSaved) {
      await dreamService.saveDream();
    }
  }, DEBOUNCE_TIME);

  const onChangeDescriptionDebounce = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const value = e.currentTarget.value;
    setDescription(value);
    debouncedSave();
  };

  const headerProps = useHeaderProps();
  const personTagProps = usePersonInput();
  const categoryTagProps = useCategoryInput();
  const footerProps = useFooterProps();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header {...headerProps} />
      <Container sx={{ marginBottom: "1rem", flexGrow: 1 }} component="form">
        <DreamDescription description={description} onChange={onChangeDescriptionDebounce} />
        <TagInputs {...categoryTagProps} />
        <TagInputs {...personTagProps} />
      </Container>
      <EditFooter {...footerProps} />
    </Box>
  );
}
