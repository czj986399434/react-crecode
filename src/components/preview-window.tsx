
import Layout from './layout'
import { useState, useEffect, useRef } from 'react'
interface Props {
    imgList: any;
    activeIdx: number;
    changeActiveIdx: func;
    play:boolean
    changePlay:any
}
interface func {
    (index: number): void;
}
const PreviewWindow = ({ activeIdx, imgList, changeActiveIdx,play,changePlay }:Props) => {
    const [show, setShow] = useState<boolean>(true)
   
    const changeIdx = (direction: ('left' | 'right')) => {
        let idx=activeIdx
        if (direction === 'left' && activeIdx > 0) idx--
        else if (direction === 'right' && activeIdx < imgList.length - 1) idx++
        else if(direction==='right' &&activeIdx == imgList.length - 1) idx=0
        else idx=imgList.length-1
        changeActiveIdx(idx)
    }
    return (
        <div className='preview-window' 
        
        style={{
            transform: `translate(0,${show ? 0 : '100%'})`
        }}>
            <div className='hide-button' onClick={() => {
                setShow(nowShow => {
                    return !nowShow
                })
            }}>
                <span>{show ? '收起' : '展开'}</span>
                <img src={'/double-arro-up.png'} className={show ? 'rotate' : ''}></img>
            </div>
            <div className='control-button' onClick={() => {
                changePlay()
            }}>
                <img src={play?'/suspended.png':'/stop.png'} ></img>
            </div>
            <div className='left-button preview-item' onClick={() => {
                changeIdx('left')
            }}>

            </div>
            <div className='picture-window '>
                <div className='picture-container preview-item' style={{ width: `${50 * imgList.length}px` }}>
                    {imgList.map((img: any, index: number) => {
                        return (<img 
                            onClick={()=>{
                                changeActiveIdx(index)
                            }}
                            key={index}
                             className={activeIdx === index ? 'preview-item item-selected' : 'preview-item'} src={img.src} />)
                    })}
                </div>
            </div>

            <div className='right-button preview-item' onClick={() => {
                changeIdx('right')
            }}></div>
        </div>
    )
}

export default PreviewWindow
