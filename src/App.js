import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import DefaultLayout from './components/DefaultLayout'
import Dashboard from './menu_items/Dashboard'
import Monitor_Request_List from './views/Monitor_Request/Monitor_Request_List'
import DatabaseList from './views/Database/DatabaseList'
import ServerList from './views/Server/ServerList'





const Login = React.lazy(() => import('./components/SignIn'))

class App extends Component {

  render() {

    return (
      
      <HashRouter>
        <Suspense >
          <Routes>
            <Route exact path="/" name="Login Page" element={<Login />} />
             <Route path='/MainLayout' exact element={<DefaultLayout /> } />
             <Route path='/dashboard' exact  element={<Dashboard />}   />   
             <Route path='/add-request' exact element={<Monitor_Request_List />}   />   
             <Route path='/database' exact  element={<DatabaseList />}   />   
             <Route path='/servers' exact  element={<ServerList />}   />   
          </Routes>
        </Suspense>
      </HashRouter>

    )
  }
}

export default App
