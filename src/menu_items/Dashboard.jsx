import React from 'react';
import Sidenav from '../components/Sidenav';
import NavBar from '../components/NavBar';
import DashboardContent from './Dashboard_Content';

export default function Dashboard() {
  return (
    <div>
      <Sidenav />
      <div />
      <NavBar />
      <div style={{ marginLeft: '18%' }}>
        <div>
          <DashboardContent />
        </div>
      </div>
    </div>
  );
}
