import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './views/Login';
import Navbar from './components/Navbar';
import PostJobOffer from './views/PostJobOffer';

import './App.css';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route
        path="/"
        element={(
          <>
            <a href="/login">Login</a>
            <a href="/post-job-offer">Post</a>
          </>
)}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/post-job-offer" element={<PostJobOffer />} />
    </Routes>
  </BrowserRouter>
);

export default App;
