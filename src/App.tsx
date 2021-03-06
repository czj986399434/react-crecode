import React from 'react';
import '../src/styles/adapt.scss'
import '../src/styles/layout.scss'
import '../src/styles/adapt.scss'
import '../src/styles/header.scss'
import '../src/styles/blog-list.scss'
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
import '../src/styles/loading-bottom.scss'
import '../src/styles/mask.scss'
import '../src/styles/footer.scss'
import 'antd/dist/antd.css'
import { createContext, useReducer, useEffect } from 'react'
import { reducer, defaultState, DefaultContextInterface } from './store/reducer/index'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes from './router-config/index'
export const DefalutContext = createContext<DefaultContextInterface>(null as unknown as DefaultContextInterface);
const storageKey = 'REACT_STATE'
function App(props:any) {
  const [state, dispatch] = useReducer(reducer,
    defaultState,
    (initial) => JSON.parse(localStorage.getItem(storageKey) as string) || initial
  )
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state])
  return (
    <DefalutContext.Provider value={{ defaultState: state, dispatch }}>
      <BrowserRouter forceRefresh={true}>
        <Switch>
        {routes.map((route,index) => {
          return <Route {...route} key={index}></Route>
        })}
        </Switch>
      </BrowserRouter>
    </DefalutContext.Provider>
  );
}

export default App;
