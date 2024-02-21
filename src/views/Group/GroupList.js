import React from 'react'
import { Grid } from '@mui/material'
import ServerList from '../Server/ServerList'
import ServerGroupList from '../server-group/Server_Group_List'
function GroupList() {
  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
      
    <ServerList />
    <Grid item xs={12} style={{ marginBottom: '16px' }}>
       
        </Grid>
  
  <ServerGroupList />
  

    </Grid>
  </Grid>
  )
}

export default GroupList
