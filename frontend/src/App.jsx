import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import AddTaskPage from './pages/AddTaskPage'
import LandingPage from './pages/LandingPage'
import Layout from './layout/Layout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Layout><LandingPage /></Layout> } />
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/add-task' element={ <Layout><AddTaskPage /></Layout> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
