import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ReviewDialog({ open, setOpen, AddReview, review, setReview }) {
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        if(!review.comment || !review.rating) return;
        setOpen(false);
        AddReview();
    };
    const reviewArray = [1, 2, 3, 4, 5];
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="">
                    {"Write a Review"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Write a review Among 5. <strong>1:</strong> Bad <strong>2:</strong> Fair <strong>3:</strong> Good <strong>4:</strong> Very Good <strong>5:</strong> Excellent
                    </DialogContentText>
                    <div>
                        <select onChange={(e)=>{setReview({...review, rating: e.target.value})}} className='border-2 mt-4'>
                            <option className='' key="" value="" selected={true} disabled={true}>Select Review</option>
                            {
                                reviewArray.map((Item) => (
                                    <option key={Item} value={Item}>{Item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className=''>
                        <h1 className="font-semibold text-lg mt-4">Write Review:</h1>
                        <textarea onChange={(e)=>{setReview({...review, comment: e.target.value})}} className="border-2 px-3 py-2" style={{width: "100%"}} rows="7"></textarea>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button className="cursor-pointer" onClick={handleClose}>Cancel</Button>
                    <Button className="cursor-pointer" onClick={handleSubmit} autoFocus>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}