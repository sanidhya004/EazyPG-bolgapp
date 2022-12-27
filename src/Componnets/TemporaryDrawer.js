import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { CreatePost } from './CreatePost';
import { useEffect } from 'react';
import { Login } from './Login';

export default function TemporaryDrawer(props) {
    const[isAuth,setIsAuth]=React.useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  
  const toggleDrawer = (anchor, open) => (event) => {
     
     props.handlecreate(open)
    setState({ ...state, [anchor]: open });
  };
  
  useEffect(()=>{
    
    setState({ ...state, [props.drawercontrol]: true });
  },[props])
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      
       
      <React.Fragment key='top'>
          <Drawer
            anchor={'top'}
            open={state.top}
            onClose={toggleDrawer('top', false)}
            style={{backdropFilter: 'blur(8px)'}}
          >
            <div style={{height:'50vh',background:'black',display:'flex',justifyContent:'center',alignItems:'center'}}>
             <Login setIsAuth={setIsAuth}/>
            </div>
            
          </Drawer>
        </React.Fragment>
        <React.Fragment key='Right'>
          <Drawer
            anchor={'right'}
            open={state.right}
            onClose={toggleDrawer('right', false)}
            style={{backdropFilter: 'blur(8px)'}}
          >
            <div style={{height:'100vh',background:'white',width:'50vw'}}>
            <CreatePost/>
            </div>
           
          </Drawer>
        </React.Fragment>
        
     
    </div>
  );
}