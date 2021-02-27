
import {useState,useEffect} from 'react'
export function useAdapt(){
    const [bodyWidth, setBodyWidth] = useState<number>(0);
    const [bodyHeight,setBodyHeight]=useState<number>(0);
    useEffect(() => {
        setBodyWidth(document.body.clientWidth)
        setBodyHeight(document.body.clientHeight);
        window.addEventListener('resize', () => {
          setBodyWidth(document.body.clientWidth)
          setBodyHeight(document.body.clientHeight);
        })
        return () => {
          window.removeEventListener('resize', () => {
          })
        }
      }, []);
      return [bodyWidth,bodyHeight]
}