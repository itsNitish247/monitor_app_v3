import React from 'react'
import MonitorServerRequest from './Server_Requests/Monitor_Server_RequestList'
import MonitorDatabaseRequest from './Database_Requests/Monitor_DatabaseRequestList'
import { Grid } from '@mui/material'
import MonitorWebserviceRequest from './Webservice_Request.js/Monitor_WebserviceRequestList'
import GroupRequest from '../GroupRequest/Group_Request'

function MontiorRequestList() {
  return (
<Grid container spacing={2}>
  <Grid item xs={12}>

<GroupRequest />
  <Grid item xs={12} style={{ marginBottom: '16px' }}>
     
     </Grid>
    
  {/* <MonitorServerRequest /> */}
  <Grid item xs={12} style={{ marginBottom: '16px' }}>
     
      </Grid>

{/* <MonitorDatabaseRequest /> */}
<Grid item xs={12} style={{ marginBottom: '16px' }}>
     
     </Grid>
     {/* <MonitorWebserviceRequest /> */}
  </Grid>
</Grid>

  )
}

export default MontiorRequestList
