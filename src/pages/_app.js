import '../styles/layout.scss'
import '../styles/adapt.scss'
import '../styles/header.scss'
import '../styles/index.scss'
import '../styles/pictures.scss'
import '../styles/pictures-basic.scss'
import '../styles/preview-window.scss'
import '../styles/diary.scss'
import '../styles/space.scss'
import '../styles/blog.scss'
import '../styles/space-blog.scss'
import '../styles/article.scss'
import '../styles/creative-workshop.scss'
import '../styles/create.scss'
import '../styles/edit.scss'
import 'antd/dist/antd.css'
import axios from 'axios'
import {initial} from "../store/action/index.ts"
import {createContext, useReducer,useEffect} from 'react'
import   {reducer,defaultState}     from '../store/reducer/index.ts'

export const ThemeContext=createContext(null);
function MyApp({ Component, pageProps }) {
          const [state,dispatch]=useReducer(reducer,
                defaultState,
               
                )
      //     useEffect(() => {
      //           console.log('刷新了？')
      //          dispatch(initial())
      //     }, []);     
          useEffect(() => {
            localStorage.setItem('local', JSON.stringify(state));
            console.log(localStorage.getItem('local'))
          }, [state]);
  return  <ThemeContext.Provider value={{defaultState:state,dispatch:dispatch}}>
  <Component {...pageProps} />
             </ThemeContext.Provider>
}
export default MyApp
