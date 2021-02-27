
import Layout from '../../components/layout'
import {useState,useEffect} from 'react'
import { Input,Button  } from 'antd';
const Article = () => {
    const blog={
        user_id:1,
        blog_id:1,
        title:'这是一个标题',
        coverImage:'',
        content:'这是一个文本asdsdsd这是一个文本asdsdsd',
        date:'2020-05-20',
        heat:20,
        likes:50,
        tags:['react','antd'],
        str_user_name:'陈智健',
        comments:[{
            comment_id:1,
            user_id:1,
            head_portrait:'/jay1.jpeg',
            nickname:'旅行青蛙',
            content:'这是啥啊这是，感觉写不完了aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            time:'2021-02-15 06:46:28'
        },{
            comment_id:2,
            user_id:1,
            head_portrait:'/jay1.jpeg',
            nickname:'旅行青蛙',
            content:'这是啥啊这是，感觉写不完了',
            time:'2021-02-12 22:49:54'
        },{
            comment_id:3,
            user_id:1,
            head_portrait:'/jay1.jpeg',
            nickname:'旅行青蛙',
            content:'这是啥啊这是，感觉写不完了',
            time:'2021-02-12 22:49:54'
        },{
            comment_id:4,
            user_id:1,
            head_portrait:'/jay1.jpeg',
            nickname:'旅行青蛙',
            content:'这是啥啊这是，感觉写不完了',
            time:'2021-02-12 22:49:58'
        }]
    }
    const dateArr=blog.date.split('-');
    const [inputFocus,setInputFocus]=useState(true)
 return  (
    <Layout>
      <div className='article'>
     <div className='article-container'>
     <p>{blog.title}</p>
                  <div className='art-header'>    
                      <div className='header-item'>
                          <span >作者:</span>
                          <span className='blue'>{blog.str_user_name}</span>
                      </div>
                      <div className='header-item'>
                          <span>更新于:</span>
                          <span className=''>{blog.date}</span>
                      </div>
                      <div className='header-item'>
                          <span>热度:</span>
                          <span className='bold'>{blog.heat}</span>
                      </div>
                      <div className='header-item'>
                          <span>点赞:</span>
                          <span className='bold'>{blog.likes}</span>
                      </div>
                  </div>
                  <div className='date'>
                      <div className='day'>{dateArr[2]}</div>
                      <span className='month'>{dateArr[1]}月</span>
                      <span className='year'>{dateArr[0]}</span>
                  </div>
                  <div className='content-container'>
                      <img className='content-image' src={blog.coverImage} />
                      <div className='content'>{blog.content}</div>
                      
                  </div>
                 <div className='comment'>
                     <div className='comment-form'>
                         <img className='avator' src='/jay1.jpeg'></img>
                         <Input className='input-empty' placeholder='请撰写评论' onFocus={()=>{
                             setInputFocus(true)
                         }} onBlur={()=>{
                            setInputFocus(false)
                         }}></Input>
                         {inputFocus==true&&<div className='submit'>
                             <Button type="primary">评论</Button></div>}
                     </div>
                     <div className='comments-container'>
                     {blog.comments?.map((comment,index)=>{
                         return (
                             <div className='comments' key={comment.comment_id}>
                                 <img className='avator' alt=''></img>
                                 <div className='comments-container'>
                                     <span className='nickname'>{comment.nickname}</span>
                                     <span className='time'>{comment.time}</span>
                                     <div className='content'>{comment.content}</div>
                                     <span className='floor'>{index+1}l</span>
                                 </div>
                             </div>
                         )
                     })}
                     </div>
                    
                 </div>
     </div>
                </div>
    </Layout>
  )
}

export default Article
