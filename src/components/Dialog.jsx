import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { CgPen } from "react-icons/cg";
import ButtonGeneric from "./Button";


export default function FormDialog(props) {
  const [open, setOpen] = useState(false);

  const [changeTitle, setChangeTitle] = useState(props.title);
  const [changeDescription, setChangeDescription] = useState(props.description);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (shouldSave) => {
    if(shouldSave) handleTaskEdition()
    setOpen(false);
  };

  const handleTaskEdition = () => {
    let tasks = JSON.parse(window.localStorage.getItem("tasks"));
    tasks = tasks.map(task => {
        if(task.id === props.taskId) return Object.assign({...task},{description:changeDescription, title:changeTitle})
        return task;
    })
    window.localStorage.setItem("tasks", JSON.stringify(tasks));

    props.setTitle(changeTitle);
    props.setDescription(changeDescription);

    window.location.reload();
  }

  return (
    <div>
        <div className="edit-task-details-button">
        <ButtonGeneric  onClick={handleClickOpen}>
            <CgPen />
        </ButtonGeneric>
        </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editing my taks</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task title"
            type="text"
            fullWidth
            value = {changeTitle}
            onChange = {e => setChangeTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task description"
            multiline={true}
            type="text"
            fullWidth
            value = {changeDescription}
            onChange = {e => setChangeDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={e => handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={e => handleClose(true)} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}