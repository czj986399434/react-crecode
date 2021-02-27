
import Layout from './layout'
import PreviewWindow from './preview-window'
import { useState,useEffect } from 'react'
const Basic = () => {
  const [activeIdx, setActiveIdx] = useState(0)
  const [play,setPlay]=useState(false)
  const [imgList, setImgList] = useState([{
    src: '/jay1.jpeg'
  }, {
    src: '/jay2.jpeg'
  }, {
    src: '/jay3.jpeg'
  }, {
    src: '/jay3.jpeg'
  }])
  const changeActiveIdx=(index:number)=>{
    setActiveIdx(index)
  }
  const changePlay=()=>{
    setPlay(play=>{
      return !play
    })
  }
  useEffect(()=>{
    let timer= setInterval(()=>{
         setActiveIdx((idx)=>{
           if ( idx < imgList.length ) idx++
          if(idx == imgList.length ) idx=0
           return idx
         })

     },2000)
     if(!play)  clearInterval(timer)
     return ()=>{
       clearInterval(timer)
     }
  },[play])
  return (
      <div className='pictures-basic'>
        <div className='empty-box'>

        </div>
        <img src={imgList[activeIdx].src} />
        <PreviewWindow imgList={imgList} activeIdx={activeIdx} changeActiveIdx={changeActiveIdx} play={play} changePlay={changePlay}></PreviewWindow>
        <div className='introduce'></div>
      </div>
  )
}

export default Basic
