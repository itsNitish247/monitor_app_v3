import  React  , {useState}from 'react';
import { styled,  } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';

import Divider from '@mui/material/Divider';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { useAppStore } from '../appStore';

import { useNavigate } from 'react-router-dom';
import SpeedIcon from '@mui/icons-material/Speed';
import ComputerIcon from '@mui/icons-material/Computer';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StorageIcon from '@mui/icons-material/Storage';
import ApiIcon from '@mui/icons-material/Api';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useTheme } from '@emotion/react';
import  {Collapse}  from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
const drawerWidth = 240;



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
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
 
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': { ...openedMixin(theme), backgroundColor: '#273143' , color:'white' }, 
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': { ...closedMixin(theme),  backgroundColor: '#273143' , color:'white' }, 
    }),
  }),
);

export default function Sidenav() {
  const navigate = useNavigate();

  const open = useAppStore((state) =>state.dopen)
  const [subitemOpen, setSubitemOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>

      <CssBaseline />
      
      <Drawer variant="permanent" open={open}>
     
        <Divider />
        <DrawerHeader sx={{
          justifyContent: 'center',
          fontSize : '30px'
        }}>
         Menu
        </DrawerHeader>
        <Divider />
        <List>
        <ListItem disablePadding sx={{ display: 'block' }} onClick={() =>{navigate("/Dashboard")}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                '&:hover': {
      backgroundColor: '#394253',
    },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <SpeedIcon sx={{ color: 'white' }} />
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
        primaryTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }} // Adjust typography as needed
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
      }}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          px: 2.5,
          width: '100%', 
          '&:hover': {
            backgroundColor: '#394253',
          },
        }}
        onClick={() => {
          setSubitemOpen(!subitemOpen); // Toggle subitem state
        }}
      >
        <ListItemIcon>
          <MonitorHeartIcon sx={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Monitor" />
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
          minHeight: 48,
          justifyContent: 'center',
          px: 6.5,
          '&:hover': {
            backgroundColor: '#394253',
          },
        }}
        onClick={() => { navigate("/add-groups") }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>  
          <AddBoxIcon  sx={{ color: 'white' }}/>
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
          minHeight: 48,
          justifyContent: 'center',
          px: 6.5,
          '&:hover': {
            backgroundColor: '#394253',
          },
        }}
        onClick={() => { navigate("/add-request") }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>  
          <AddBoxIcon  sx={{ color: 'white' }}/>
        </ListItemIcon>
        <ListItemText primary="Add-Request" />
      </ListItemButton>
    </ListItem>
  </List>
</Collapse>


<Divider />


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
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
      backgroundColor: '#394253',
    },
        
                }}
              >
              <ComputerIcon sx={{ color: 'white' }}/>
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
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                '&:hover': {
      backgroundColor: '#394253',
    },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <SpeedIcon sx={{ color: 'white' }} />
                </ListItemIcon>
                <ListItemText primary="Add Ports" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>



        <List>
        <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=> {navigate("/database-list")}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
      backgroundColor: '#394253',
    },
        
                }}
              >
              <StorageIcon sx={{ color: 'white' }}/>
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
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
      backgroundColor: '#394253',
    },
        
                }}
              >
              <ApiIcon sx={{ color: 'white' }}/>
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

        <Divider />


       
     

        <List>

        {open && (
    <ListItem disablePadding>
      <ListItemText
        primary="USERS"
        primaryTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }} // Adjust typography as needed
        sx={{ textAlign: 'left', fontWeight: '200' , marginLeft :2}}
      />
    </ListItem>
  )}
        <ListItem  disablePadding sx={{ display: 'block' }} onClick={()=> {navigate("/user-list")}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                            '&:hover': {
      backgroundColor: '#394253',
    },
        
                }}
              >
              <PersonAddIcon   sx={{ color: 'white' }} />
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                
                </ListItemIcon>
                <ListItemText primary="add-Users" sx={{ opacity: open ? 1 : 0 }} />
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
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
      backgroundColor: '#394253',
    },
        
                }}
              >
              <SummarizeIcon sx={{ color: 'white' }}/>
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




      </Drawer>
    
        
      
      </Box>

      
  );
}
