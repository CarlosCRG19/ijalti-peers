import React from 'react';

import Login from './views/Login';
import Navbar from './components/Navbar';
import PostJobOffer from './views/PostJobOffer';

import './App.css';

const App = () => (
  <>
    <Navbar />
    <main className="main-content">
      <Login />
      <PostJobOffer />
    </main>
  </>
);

export default App;
