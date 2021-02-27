
import Layout from './layout'
import {useEffect, useState} from 'react'
const Diary = () =>{
  const cards=[{
    cardDate:'2020-09-20',
    cardTitle:'sdsdsds',
    cardContent:'笨蛋'
  },{
    cardDate:'2020-09-20',
    cardTitle:'sdsdsds',
    cardContent:'笨蛋'
  },{
    cardDate:'2020-09-20',
    cardTitle:'sdsdsds',
    cardContent:'笨蛋'
  },{
    cardDate:'2020-09-20',
    cardTitle:'sdsdsds',
    cardContent:'笨蛋'
  },{
    cardDate:'2020-09-20',
    cardTitle:'sdsdsds',
    cardContent:'笨蛋'
  }];
  const [showStoreList,setShowStoreList]=useState<any>(cards.map((card,index)=>{
    return {
      show:false,
    }
  }))
  useEffect(()=>{
    setShowStoreList(cards.map(()=>{
       return  false
     }))
  },[cards.length])
  return  (
      <div className="diary">
      <ul>
        {cards.map((card,index)=>{
         return (
          <li key={index}>
          <div className=" card borderRadius1">
            <h1 className="borderRadius2">
              {card.cardDate}
            </h1>
            <h2 className="borderRadius2">
              {card.cardTitle}
            </h2>
            <div className="cardBody borderRadius1" >
             <p>
             {card.cardContent}
            </p>
          </div>
        </div> 
        <div className={showStoreList[index]?'content content-more':'content content-hidden'}
        onClick={()=>{
          let list =showStoreList.map((item:boolean,idx:number)=>{
                  return index===idx?!item:item   
          })
          setShowStoreList([...list])
        }}
        >
          sssssss
        sssssssssssssssssssssssssssssss
        sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
        ssssssssssdsdss
        ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
        sssssssssdsdssssssssssssssssssssssssssssssssssssssssssssssssssssssss
        sssssssssssssssssssssssssssssssssssssssssssssssssssssssssassssssssssssssss
        aaaas
        </div>
        {/* <div className='empty-content' style={{display:showStoreList[index]?'inline-block':'none'}}></div> */}
    </li>
         )
        })}
  </ul>
  </div>
  )
}

export default Diary
