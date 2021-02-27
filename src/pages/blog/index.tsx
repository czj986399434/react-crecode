
import Layout from '../../components/layout'
import {useState,useEffect} from 'react'
import {draftContent} from '../../constants/blog'
import Editor from '../../components/editor'
const Blog = () => {
  const [draftBool,setDraftBool]=useState<boolean>(false)
 return  (
    <Layout>
      <div className='blog'>
      <div className='control-header'>
        <div className='draft'>{draftBool?draftContent.true:draftContent.false}</div>
        <div className='submit'>发布</div>
      </div>
      <Editor></Editor>
      </div>
    </Layout>
  )
}

export default Blog
