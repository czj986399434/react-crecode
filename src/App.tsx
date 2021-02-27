import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createContext, useReducer, useEffect } from 'react'
import { reducer, defaultState } from './store/reducer/index'
import {BrowserRouter,Route} from 'react-router-dom'
export const DefalutContext=createContext<any>(null);
const storageKey = 'REACT_STATE'
function App() {
  const [state, dispatch] = useReducer(reducer,
    defaultState,
    (initial) => JSON.parse(localStorage.getItem(storageKey) as string) || initial
  )
  useEffect(()=>{
    localStorage.setItem(storageKey, JSON.stringify(state));
  },[storageKey,state])
  return (
    <DefalutContext.Provider value={{defaultState:state,dispatch}}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </DefalutContext.Provider>
  );
}

export default App;
