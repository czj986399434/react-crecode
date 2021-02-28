import React from 'react';
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
import { BrowserRouter, Route } from 'react-router-dom'
import routes from './router-config/index'
import { renderRoutes } from 'react-router-config'
export const DefalutContext = createContext<any>(null);
const storageKey = 'REACT_STATE'
function App() {
  const [state, dispatch] = useReducer(reducer,
    defaultState,
    (initial) => JSON.parse(localStorage.getItem(storageKey) as string) || initial
  )
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [storageKey, state])
  console.log(routes)
  return (
    <DefalutContext.Provider value={{ defaultState: state, dispatch }}>
      <BrowserRouter>
        {routes.map(route => {
          return <Route {...route} ></Route>
        })}
      </BrowserRouter>
    </DefalutContext.Provider>
  );
}

export default App;
