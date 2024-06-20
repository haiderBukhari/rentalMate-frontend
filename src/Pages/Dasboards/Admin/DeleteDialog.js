import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({open, setOpen, confirmDelete, setConfirmDelete}) {
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        setOpen(false);
        setConfirmDelete(true);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="">
                    {"Deleting the User"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this user. Because as user will be deleted all the products associated with the user will be deleted.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className="cursor-pointer" onClick={handleClose}>Cancel</Button>
                    <Button className="cursor-pointer" onClick={handleSubmit} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}