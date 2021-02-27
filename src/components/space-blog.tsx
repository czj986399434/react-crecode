import {useState,useEffect} from 'react'
import { Modal,message } from 'antd'
// import { useRouter } from 'next/router'
import {blogs} from '../mock/blog'
import Edit from './common/edit'
import axios from 'axios'
const SpaceBlog = () => {
     const [deleteVisible,setDeleteVisible]=useState(false)
   const [deleteLoading,setDeleteLoading]=useState(false) 
   const toDelete=()=>{
         setDeleteVisible(true)
   }
   const deleteConfirm=()=>{
       setDeleteLoading(true)
    //    axios.post('').then(res=>{
    //     setDeleteLoading(false)
    //    message.success('删除成功')
    //    }).catch(err=>{
    //     setDeleteLoading(false)

    //    })
   }
   const toEdit=(blog_id:number)=>{
    //    const router=useRouter();
    //    router.push({
    //        pathname:'/blog/article',
    //        query:{blog_id:blog_id}
    //    })
   }
 return  (
    <div className='space-blog'>
        <div className='inner'>
        {blogs.map((blog,index)=>{
            const dateArr=blog.date.split('-');
            return (
                <div className='article-item' key={blog.blog_id}>
                    
                  <div className='title'>
                      <span>{blog.title}</span>
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
                  <div className='read-more'>
                     <a href={`/blog/article?blog_id=${blog.blog_id}`} >立即阅读</a>
                  </div>
                  <div className='footer'>
                   <div className='tags'>
                   <Edit user_id={blog.user_id} toEdit={()=>{
                       toEdit(blog.blog_id)
                   }} toDelete={()=>{
                       toDelete()
                   }}></Edit>
                       <img className='icon' src='/tag.png'/>
                       {blog.tags?.map((tag,index)=>(
                            <div className='tag' key={index}>{tag}</div>
                       )
                       )}
                   </div>
                   <div className='float-right'>
                       <img src='/hot-fill.png' className='icon'/>
                       <span>{blog.heat}</span>
                   </div>
                   <div className='float-right'>
                       <img  src='/good-fill.png' className='icon'/>
                       <span>{blog.likes}</span>
                   </div>
                  </div>
                </div>
            )
        })}
        </div>
        <Modal
        title="Title"
        visible={deleteVisible}
        onOk={deleteConfirm}
        confirmLoading={deleteLoading}
        onCancel={()=>{
            setDeleteVisible(false)
        }}
      >
        <p>你确定要删除吗，删除后不可恢复</p>
      </Modal>
    </div>
  )
}

export default SpaceBlog
