import { BrowserRouter, Route, Routes } from 'react-router-dom'


import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import Layout from './layout/Layout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Layout><LandingPage /></Layout> } />
          <Route path='/home' element={ <Layout><HomePage /></Layout> } />
          <Route path='/login' element={ <LoginPage /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
