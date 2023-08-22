import './App.css'

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <Header />

      <main className='main-container'>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </>
  )
}

export default App
