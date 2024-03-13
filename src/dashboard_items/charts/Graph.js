import React from 'react'
import CpuUsage from './cpu'
import { Grid } from '@mui/material'
import RamUsage from './ram'

import DiskUsage from './Disk'
import Status from './Status'

function Graph() {
  return (
  <>
  <Grid container>
  <CpuUsage />
  <Grid container marginTop={2}>
    <RamUsage />
  </Grid>
  <Grid container marginTop={2}>
    <DiskUsage />
  </Grid>
  <Grid container marginTop={2}>
    <Status />
  </Grid>
  </Grid>
  
  </>
  )
}

export default Graph
