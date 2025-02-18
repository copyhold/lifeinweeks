import React from 'react';
import {name} from './services/state';
import {Weeks} from './components/Weeks';

function App() {
  
  return (
  <main>
    <header>{name()}</header>
    <Weeks />
  </main>
  )
}

export default App
