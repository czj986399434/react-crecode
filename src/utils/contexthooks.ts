import { useContext } from "react"
import { ThemeContext } from "../pages/_app"

export const useGlobal= ()=>{
    const { dispatch, defaultState}= useContext(ThemeContext) as any;
    return [dispatch,defaultState]
} 