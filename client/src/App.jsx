import React from 'react';

import Navbar from './components/Navbar';
import PostJobOffer from './views/PostJobOffer';

import './App.css';

const App = () => (
  <>
    <Navbar />
    <main className="main-content">
      <PostJobOffer />
    </main>
  </>
);

export default App;
