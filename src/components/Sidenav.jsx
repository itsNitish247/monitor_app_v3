import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation
import SpeedIcon from '@mui/icons-material/Speed';
import ComputerIcon from '@mui/icons-material/Computer';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StorageIcon from '@mui/icons-material/Storage';
import ApiIcon from '@mui/icons-material/Api';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { useAppStore } from '../appStore';

const drawerWidth = 150;
const IconColor = "black";
const OnHover = "#ede7f6";

const openedMixin = (theme) => ({
  width: drawerWidth,

  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', 
  height: '45px',
}));

const ContentWrapper = styled('div')({
  height: '100%',
  overflowY: 'auto', 
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': { ...openedMixin(theme), backgroundColor: '#ffffff', color: 'black' },
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': { ...closedMixin(theme), backgroundColor: '#ffffff', color: 'black' },
  }),
}));

export default function Sidenav() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const open = useAppStore((state) => state.dopen);
  const [subitemOpen, setSubitemOpen] = useState(false);


  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <ContentWrapper>
          <Divider />
          <DrawerHeader sx={{ justifyContent: 'center', fontSize: '30px' }}>Menu</DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: 'block', mb: -2 }} onClick={() => navigate("/Dashboard")}>
              <ListItemButton
                sx={{
                  minHeight: 5,
                  justifyContent: open ? 'initial' : 'center',
                  borderRadius: 30,
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: OnHover,
                    '& .MuiTypography-root': {
                      color: '#9c27b0',
                    },
                    '& .MuiSvgIcon-root': {
                      color: '#9c27b0',
                    },
                  },
                  ...(isActive("/Dashboard") && { backgroundColor: '#ede7f6' ,  color: '#9c27b0',  '& .MuiSvgIcon-root': {
                      color: '#9c27b0',
                    }, }),
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3.5 : 'auto', justifyContent: 'center' }}>
                  <SpeedIcon sx={{ color: IconColor }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>


       
        
        <List>
       
        {open && (
    <ListItem disablePadding>
      <ListItemText
        primary="TOOLS"
        primaryTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }} 
        sx={{ textAlign: 'left', fontWeight: '200' , marginLeft :2}}
      />
    </ListItem>
  )}
  <ListItem disablePadding>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', 
        mb: subitemOpen ? 0 : -2,
      }}
    >
      <ListItemButton
        sx={{
          minHeight: 5,
          px: 2.5,
          width: '100%', 
          borderRadius : 30,
          '&:hover': {
      backgroundColor: OnHover,
      '& .MuiTypography-root': {
        color: '#9c27b0', 
      },
      '& .MuiSvgIcon-root': {
        color: '#9c27b0', 
      },
    },
    
        }}
        onClick={() => {
          setSubitemOpen(!subitemOpen); 
        }}
      >
        <ListItemIcon>
          <MonitorHeartIcon sx={{ color: IconColor }} />
        </ListItemIcon>
        <ListItemText primary="Monitor"  sx={{marginRight:6}}/>

        {/* Conditional rendering of expand/collapse icon */}
        {open && (subitemOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
      </ListItemButton>
    </Box>
  </ListItem>
</List>
{/* Subitem dropdown */}
<Collapse in={open && subitemOpen} timeout="auto" unmountOnExit>
  <List component="div" disablePadding>
    <ListItem disablePadding>
      <ListItemButton
        sx={{
          minHeight: 5,
          justifyContent: 'center',
          px: 5.5,
          borderRadius : 30,
          '&:hover': {
      backgroundColor: OnHover,
      '& .MuiTypography-root': {
        color: '#9c27b0', 
      },
      '& .MuiSvgIcon-root': {
        color: '#9c27b0', 
      },
     
    },
    ...(isActive("/add-groups") && { backgroundColor: '#ede7f6' ,  color: '#9c27b0',  '& .MuiSvgIcon-root': {
                      color: '#9c27b0',
                    }, }),
        }}
        onClick={() => { navigate("/add-groups") }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>  
          <AddBoxIcon  sx={{ color: IconColor}}/>

        </ListItemIcon>
        <ListItemText primary="Add-Group" />
      </ListItemButton>
    </ListItem>
  </List>
</Collapse>
<Collapse in={open && subitemOpen} timeout="auto" unmountOnExit>
  <List component="div" disablePadding>
    <ListItem disablePadding>
      <ListItemButton
        sx={{
          minHeight: 5,
          justifyContent: 'center',
          px: 5.5,
          borderRadius : 30,
          '&:hover': {
      backgroundColor: OnHover,
      '& .MuiTypography-root': {
        color: '#9c27b0', 
      },
      '& .MuiSvgIcon-root': {
        color: '#9c27b0', 
      },
    },
    ...(isActive("/add-request") && { backgroundColor: '#ede7f6' ,  color: '#9c27b0',  '& .MuiSvgIcon-root': {
                      color: '#9c27b0',
                    }, }),
        }}
        onClick={() => { navigate("/add-request") }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>  
          <AddBoxIcon  sx={{ color: IconColor }}/>
        </ListItemIcon>
        <ListItemText primary="Add-Request" />
      </ListItemButton>
    </ListItem>
  </List>
</Collapse>





        <List>
        {open && (
    <ListItem disablePadding>
      <ListItemText
        primary="SERVICES"
        primaryTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }} // Adjust typography as needed
        sx={{ textAlign: 'left', fontWeight: '200' , marginLeft :2}}
      />
    </ListItem>
  )}

        <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=> {navigate("/server-list")}}>
              <ListItemButton
                sx={{
                  minHeight: 5,
                  borderRadius : 30,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  mb: -2 ,
                  '&:hover': {
      backgroundColor: OnHover,
      '& .MuiTypography-root': {
        color: '#9c27b0', 
      },
      '& .MuiSvgIcon-root': {
        color: '#9c27b0', 
      },
    },
    ...(isActive("/server-list") && { backgroundColor: '#ede7f6' ,  color: '#9c27b0',  '& .MuiSvgIcon-root': {
                      color: '#9c27b0',
                    }, }),
                }}
              >
              <ComputerIcon sx={{ color: IconColor }}/>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                
                </ListItemIcon>
                <ListItemText primary=" Add Servers" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>

        <List>
        <ListItem disablePadding sx={{ display: 'block' }} onClick={() =>{navigate("/ports-List")}}>
              <ListItemButton
                sx={{
                  minHeight:5,
                  borderRadius : 30,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  mb: -2 ,
                  '&:hover': {
      backgroundColor: OnHover,
      '& .MuiTypography-root': {
        color: '#9c27b0', 
      },
      '& .MuiSvgIcon-root': {
        color: '#9c27b0', 
      },
    },
    ...(isActive("/ports-List") && { backgroundColor: '#ede7f6' ,  color: '#9c27b0',  '& .MuiSvgIcon-root': {
                      color: '#9c27b0',
                    }, }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <SpeedIcon sx={{ color: IconColor }} />
                </ListItemIcon>
                <ListItemText primary="Add Ports" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>



        <List>
        <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=> {navigate("/database-list")}}>
              <ListItemButton
                sx={{
                  minHeight: 5,
                  borderRadius : 30,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  mb: -2 ,
                  '&:hover': {
      backgroundColor: OnHover,
      '& .MuiTypography-root': {
        color: '#9c27b0', 
      },
      '& .MuiSvgIcon-root': {
        color: '#9c27b0', 
      },
    },
    ...(isActive("/database-list") && { backgroundColor: '#ede7f6' ,  color: '#9c27b0',  '& .MuiSvgIcon-root': {
                      color: '#9c27b0',
                    }, }),
        
                }}
              >
              <StorageIcon sx={{ color: IconColor }}/>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                
                </ListItemIcon>
                <ListItemText primary=" Add Database" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>



        <List>
        <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=> {navigate("/webservice-list")}}>
              <ListItemButton
                sx={{
                  minHeight: 5,
                  borderRadius : 30,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  mb: -2 ,
                  '&:hover': {
      backgroundColor: OnHover,
      '& .MuiTypography-root': {
        color: '#9c27b0', 
      },
      '& .MuiSvgIcon-root': {
        color: '#9c27b0', 
      },
    },
    ...(isActive("/webservice-list") && { backgroundColor: '#ede7f6' ,  color: '#9c27b0',  '& .MuiSvgIcon-root': {
                      color: '#9c27b0',
                    }, }),
                }}
              >
              <ApiIcon sx={{ color: IconColor }}/>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                
                </ListItemIcon>
                <ListItemText primary=" Add Api" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>

     


       
     

        <List>

        {open && (
    <ListItem disablePadding>
      <ListItemText
        primary="USERS"
        primaryTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }}
        sx={{ textAlign: 'left', fontWeight: '200' , marginLeft :2}}
      />
    </ListItem>
  )}
        <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=> {navigate("/user-list")}}>
              <ListItemButton
                sx={{
                  minHeight: 5,
                  justifyContent: open ? 'initial' : 'center',
                  borderRadius : 30,
                  px: 2.5,
                  mb: -2 ,
                  '&:hover': {
      backgroundColor: OnHover,
      '& .MuiTypography-root': {
        color: '#9c27b0', 
      },
      '& .MuiSvgIcon-root': {
        color: '#9c27b0', 
      },
    },
    ...(isActive("/user-list") && { backgroundColor: '#ede7f6' ,  color: '#9c27b0',  '& .MuiSvgIcon-root': {
                      color: '#9c27b0',
                    }, }),
                  }}
              >
              <PersonAddIcon   sx={{ color: IconColor }} />
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                
                </ListItemIcon>
                <ListItemText primary="Add-Users" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>

        <List>
        {open && (
    <ListItem disablePadding>
      <ListItemText
        primary="REPORTS"
        primaryTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }} // Adjust typography as needed
        sx={{ textAlign: 'left', fontWeight: '200' , marginLeft :2}}
      />
    </ListItem>
  )}
        <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=> {navigate("/users-list")}}>
              <ListItemButton
                sx={{
                  minHeight: 5,
                  justifyContent: open ? 'initial' : 'center',
                  borderRadius : 30,
                  px: 2.5,
                  '&:hover': {
      backgroundColor: OnHover,
      '& .MuiTypography-root': {
        color: '#9c27b0', 
      },
      '& .MuiSvgIcon-root': {
        color: '#9c27b0', 
      },
    },
    ...(isActive("/users-list") && { backgroundColor: '#ede7f6' ,  color: '#9c27b0',  '& .MuiSvgIcon-root': {
                      color: '#9c27b0',
                    }, }),
        
                }}
              >
              <SummarizeIcon sx={{ color: IconColor }}/>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                
                </ListItemIcon>
                <ListItemText primary="Reports" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
      </ContentWrapper>




      </Drawer>
    
        
      
      </Box>

      
  );
}
