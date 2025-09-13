import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router";
import LoginView from './views/auth_view/login_view';
import MainView from './views/main_view/main_view';

function App() {
  return (
    <>
        <Routes  >
          <Route path="/" element={<LoginView />} />
          <Route path="/main" element={<MainView />} />
        </Routes>   
    </>
  )
}

export default App
