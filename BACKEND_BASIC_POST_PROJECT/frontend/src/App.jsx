import React from 'react'
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Createpost from './pages/Createpost';
import Feed from './pages/feed';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Hello world !</h1>}/>
        <Route path="/create-post" element={<Createpost/>}/>
        <Route path="/feed" element={<Feed/>}/>
      </Routes>
    </Router>
  )
}

export default App