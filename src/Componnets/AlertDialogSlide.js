import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.setRead(false)
    setOpen(false);
  };
 React.useEffect(()=>{
   
    setOpen(props.check)
 },[props.check])
  return (
    <div>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        style={{backdropFilter: 'blur(8px)'}}
      >
        <div style={{height:'70vh',width:'90vw', display:'flex',flexDirection:'column'}}>
        <DialogTitle> <h1>{props.id.title}</h1> <p><b>@{props.id.name}</b></p></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
             {props.id.post} 
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{width:'10%'}}>
            <div><Button onClick={handleClose}><FavoriteBorderSharpIcon fill='red'/> Like</Button>
          <Button onClick={handleClose}><ArrowBackIcon/></Button></div>
          
        </DialogActions>
        </div>
      </Dialog>
    
      
    </div>
  );
}