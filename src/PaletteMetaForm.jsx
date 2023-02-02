import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { usePalettes } from "./context/PalettesProvider";
const PaletteMetaForm = ({ handleSubmit }) => {
  const {
    palettes,
    newPaletteName,
    handleNewPaletteChange,
    setNewPaletteName,
  } = usePalettes();
  const [stage, setStage] = React.useState(null);
  const showEmojiPicker = () => {
    setStage("emoji");
  };
  const saveEmoji = (emoji) => {
    handleSubmit({ paletteName: newPaletteName, emoji: emoji.native });
    setStage(null);
  };

  const handleShowFormClose = () => {
    setStage(null);
    setNewPaletteName("");
  };
  React.useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  });
  return (
    <>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setStage("form")}
        >
          Save
        </Button>
        <Dialog
          open={stage === "emoji"}
          onClose={handleShowFormClose}
          aria-labelledby="form-dialog-emoji"
        >
          <DialogTitle id="form-dialog-emoji">
            Choose a Palette Emoji
          </DialogTitle>
          <Picker data={data} onEmojiSelect={saveEmoji} theme={"light"} />
        </Dialog>
        <Dialog
          open={stage === "form"}
          onClose={handleShowFormClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a Palette Name
          </DialogTitle>
          <ValidatorForm onSubmit={showEmojiPicker} instantValidate={false}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new beautiful palette. Make sure
                it's unique!
              </DialogContentText>

              <TextValidator
                label="Palette Name"
                value={newPaletteName}
                name="newPaletteName"
                onChange={handleNewPaletteChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter Palette Name", "Name already used"]}
                className="save-palette"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleShowFormClose}>Cancel</Button>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    </>
  );
};

export default PaletteMetaForm;
