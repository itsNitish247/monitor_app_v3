import React from 'react'
import { Box } from '@mui/material'
import Sidenav from '../../components/Sidenav'

export default function ServerList() {
  return (
   <>
      <Box sx={{ display: 'flex' }}>
     <Sidenav />
     <Box component="main" sx={{flexGrow:1 ,p:3}}>
      <h1>Servers</h1>
      </Box>
    </Box>
   </>
  )
}
