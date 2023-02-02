import { Button } from "@mui/material";
import { withStyles } from "@mui/styles";
import React from "react";
import { ChromePicker } from "react-color";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import styles from "./styles/ColorPickerFormStyles";

const ColorPickerForm = ({
  currentColor,
  updateColor,
  addColor,
  newColorName,
  handleNewColorChange,
  paletteIsFull,
  classes,
}) => {
  return (
    <>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateColor}
        className={classes.picker}
      />
      <ValidatorForm onSubmit={addColor} instantValidate={false}>
        <TextValidator
          className={classes.colorNameInput}
          placeholder="Color Name"
          variant="filled"
          margin="normal"
          value={newColorName}
          onChange={handleNewColorChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Enter a color name",
            "Color name must be unique",
            "Color already used!",
          ]}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          className={classes.addColor}
          disabled={paletteIsFull}
          style={{
            backgroundColor: paletteIsFull ? "grey" : currentColor,
          }}
        >
          {paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </>
  );
};

export default withStyles(styles)(ColorPickerForm);
