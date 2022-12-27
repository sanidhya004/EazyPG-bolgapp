
import './App.css';
import React from 'react';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import Home from './Componnets/Home';
import { Login } from './Componnets/Login';
import { CreatePost } from './Componnets/CreatePost';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {signOut} from '@firebase/auth'
import { auth,provider } from './firbase-config' 
import TemporaryDrawer from './Componnets/TemporaryDrawer';
import { Profile } from './Componnets/Profile';
import {useNavigate} from 'react-router-dom'

function App() {
   
  
  const[isAuth,setIsAuth]=React.useState(false);
  var display=localStorage.getItem("name")
  const pages = ['Home','Create Post'];
  const settings = ['Profile','Logout'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const[drawerBottom,setDrawerBottom]=React.useState('')

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  React.useEffect(() => {
    const loggedInUser = localStorage.getItem("isAuth");
    const photo=localStorage.getItem('photo')
    if (loggedInUser) {
      
      setIsAuth(true)
    
    }
    
    
  }, []);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCreate=()=>{
     setDrawerBottom('')
  }
  const handleCreatepost=()=>{
     if(isAuth){
       setDrawerBottom('right')
     }
     else{
       setDrawerBottom('top')
     }
    
  }
  const handlePages=()=>{
     return pages.map((item)=> {
        if(item=="Home"){
            return(<MenuItem key={item} onClick={()=>{ window.location.pathname="/"}}  >
              <Typography textAlign="center" >{item}</Typography>
            </MenuItem>)
        }
        if(item=="Create Post"){
          return(<><MenuItem key={item}  onClick={()=>{ handleCreatepost()}} >
            <Typography textAlign="center" >{item}</Typography>
          </MenuItem></>)
        }
     })
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const signOutUser=()=>{
     signOut(auth).then(()=>{
       localStorage.clear()
       setIsAuth(false)
       window.location.reload()
       
       
     })
  }
 const handleMenu=()=>{
     return settings.map((item)=>{
        
        if(item !='Logout' && isAuth){
         return(  <MenuItem key={item} >
            <Typography textAlign="center" onClick={()=>{ window.location.pathname="/profile"}}>{item}</Typography>
          </MenuItem>)
        }

        else{
             if(isAuth){
                return(  <MenuItem key={item}>
                    <Typography textAlign="center" onClick={signOutUser}>{item}</Typography>
                  </MenuItem>)
             }
             else{
                return(  <MenuItem key={item} onClick={()=>{setDrawerBottom('top')}} >
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>)
             }
        }
        
     })
 }
 
  return (
    
    <Router>
      <div className="body">
        <TemporaryDrawer drawercontrol={drawerBottom} handlecreate={handleCreate}/>
        <div className="appbar">
          
      <AppBar position="static" style={{backgroundColor:'black'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
             Blog.com
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Blog.com
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {handlePages()}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={localStorage.getItem('photo')} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             
              {handleMenu()}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
       <Routes>
           <Route path="/"element={<Home/>}  setDrawerBottom={setDrawerBottom}/>
           <Route path="/createpost"element={<CreatePost check={isAuth}/>} />
           <Route path="/Login"element={<Login setIsAuth={setIsAuth}/>} />
           <Route path="/profile" element={<Profile/>}/>
       </Routes>
       </div>
    </Router>
  );
}

export default App;
