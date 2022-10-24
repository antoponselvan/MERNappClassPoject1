import { useState } from 'react'
import {BrowserRouter, NavLink, Routes, Route} from 'react-router-dom'
import './App.css'
import LoginForm from './Pages/LoginForm'
import Welcome from './Pages/Welcome'
import CreateHolidayForm from './Pages/CreateHolidayForm'
import ListHolidays from './Pages/ListHolidays'

function App() {

  return (
   <>
    <h1>Client Side!</h1>
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Login</NavLink>
          </li>
          <li>
            <NavLink to="/holidays/new">Create</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<LoginForm/>}></Route>
        <Route path="/Welcome" element={<Welcome/>}></Route>
        <Route path="/holidays" element={<ListHolidays/>} />
        <Route path="/holidays/new" element={<CreateHolidayForm />} />
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
