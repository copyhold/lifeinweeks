import { useState } from 'react'
import { createEffect } from 'solid-js';
import {allWeeks, name} from './services/state';
import {Week} from './components/Week';

const life_length = 100;
function App() {
  
  return (
  <main>
    <header>{name()}</header>
    <section>
      {allWeeks().map((week) => (
        <Week week={week} key={week.start.getTime()} />
      ))}
    </section>
  </main>
  )
}

export default App
