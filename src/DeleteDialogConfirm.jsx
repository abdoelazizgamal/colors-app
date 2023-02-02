import { CheckCircleOutline, CloseOutlined } from "@mui/icons-material";
import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { blue, red } from "@mui/material/colors";
import { usePalettes } from "./context/PalettesProvider";

const DeleteDialogConfirm = ({ show, setShow, id, setID }) => {
  const { deletePalette } = usePalettes();
  const handleDelete = (e) => {
    deletePalette(e, id);
    handleClose();
  };
  const handleClose = () => {
    setShow(false);
    setID(null);
  };
  return (
    <>
      <Dialog
        open={show}
        aria-labelledby="delete-dialog-title"
        onClose={handleClose}
      >
        <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckCircleOutline />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button onClick={handleClose}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};

export default DeleteDialogConfirm;
