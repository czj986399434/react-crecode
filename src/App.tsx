import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../src/styles/adapt.scss'
import '../src/styles/layout.scss'
import '../src/styles/adapt.scss'
import '../src/styles/header.scss'
import '../src/styles/index.scss'
import '../src/styles/pictures.scss'
import '../src/styles/pictures-basic.scss'
import '../src/styles/preview-window.scss'
import '../src/styles/diary.scss'
import '../src/styles/space.scss'
import '../src/styles/blog.scss'
import '../src/styles/space-blog.scss'
import '../src/styles/article.scss'
import '../src/styles/creative-workshop.scss'
import '../src/styles/create.scss'
import '../src/styles/edit.scss'
import 'antd/dist/antd.css'
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
