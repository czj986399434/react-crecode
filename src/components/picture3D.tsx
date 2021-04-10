
import { useState, useRef, useEffect } from 'react';
import Layout from './layout'
interface Picture3DProps{
    user_id:any
}
const Picture3D = (props:Picture3DProps) => {
    const [imgs, setImgs] = useState([{
        src: '/jay1.jpeg'
    }, {
        src: '/jay2.jpeg'
    }, {
        src: '/jay3.jpeg'
    }, {
        src: '/jay3.jpeg'
    }])
    const [bigImg,setBigImg]=useState('/jay1.jpeg')
    const changeBigImg=(index:number)=>{
          setBigImg(imgs[index].src)
    }
    return (
        <Layout>
            <div className='pictures'>
                <img  src={bigImg} />
                <div className="stage-area">
                    <div className="container">
                        {imgs.map((img, index) => {
                            return <img src={img.src} 
                             onClick={()=>{
                                changeBigImg(index)
                             }}
                            style={{
                                transform: `rotateY(${360 * index / imgs.length}deg) translateZ(250px)`
                            }} key={index}/>
                        })}

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Picture3D
