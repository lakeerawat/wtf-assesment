import React from 'react';
import '../style/GymClassCard.css'; // Import CSS for styling
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoginPage from './login';

const GymClassCard = ({id,classname, instructor,days, timing, duration, fee, image }) => {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="gym-class-card">
      <div className="class-image" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="class-details">
        <h2 className="class-name">{classname}</h2>
        <p className="instructor">Instructor: {instructor}</p>
        <p className="timing">Timing: {timing}</p>
        <div className="days">
          Days:
        {days.map((el)=>{
          return(<p className="day"> {el}</p>
        )
        })}
        </div>
        <p className="duration">Duration: {duration}</p>
        <p className="price">Fee : {fee}/ month</p>
      </div>
      <button onClick={handleClickOpen}>Sign Up</button>
      <Dialog
        fullWidth={fullWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>      
                please fill your details.
       </DialogTitle>
        <DialogContent>
<LoginPage id={id} classname={classname} handleClose={handleClose}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GymClassCard;
