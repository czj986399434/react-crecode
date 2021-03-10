import { useState, useEffect, useContext } from 'react'
import Layout from '../components/layout'
import {DefalutContext} from '../App'
import {requestUser,receiveUser} from '../store/action/index'
type NavType = 'hot' | 'new'
interface ContentItem{
  blog_id:number;
  title:string;
  content:string;
  date:string;
  heat:number;
  likes:number;
  user_id:number;
  user_name:string
}
const IndexPage = () => {
  const [navType, setNavType] = useState<NavType>('hot')
  const [contentList, setContentList] = useState<Array<ContentItem>>([])
  const testContext =useContext(DefalutContext) as any
  const {defaultState}=testContext;
  const {loginUser}=defaultState
  console.log(defaultState)
  useEffect(() => {
    const list:ContentItem[] = [{
      blog_id: 1,
      title: '你是哦',
      content: '文字',
      date: '2020-02-28',
      heat: 123,
      likes: 44,
      user_id: 1,
      user_name: '陈智健'
    }, {
      blog_id: 2,
      title: '你是2',
      content: '文字',
      date: '2020-02-28',
      heat: 123,
      likes: 55, 
      user_id: 1,
      user_name: '陈智健'
    }, {
      blog_id: 3,
      title: '你是3',
      content: '文字',
      date: '2020-02-21',
      heat: 555,
      likes: 66, 
      user_id: 1,
      user_name: '陈智健'
    }, {
      blog_id: 4,
      title: '你是4',
      content: '文字',
      date: '2020-02-22',
      heat: 777,
      likes:88,
      user_id:1,
      user_name:'陈智健'
    }, {
      blog_id: 5,
      title: '你是5',
      content: '文字',
      date: '2020-02-23',
      heat: 889,
      likes:999,
      user_id:1,
      user_name:'陈智健'
    }]
    setContentList(list)
  }, [])
  return (
    <Layout>
      <div className='index'>
        <div className='content-box basic-box'>
          <div className='content-header'>
            <div className={navType === 'hot' ? 'active-nav nav-item' : 'nav-item'} onClick={() => {
               
              //  testContext.dispatch(changeUserState('LOGIN'))
              setNavType('hot')
            }}>热门</div>
            <div className={navType === 'new' ? 'active-nav nav-item' : 'nav-item'} onClick={() => {
              setNavType('new')
            }}>最新</div>
          </div>
          {contentList.map((contentItem => {
            return (<div className='content-item' key={contentItem.blog_id}>
              <div className='messages'>
                <span >{contentItem.user_name}</span>
                <span >{contentItem.date}</span>
              </div>
              <div className='title'>{contentItem.title}</div>
              <div className='icons'>
                <div className='icons-item'>
                  <img src='/hot-fill.png'/>
                 <span>{contentItem.heat}</span> 
                  </div>
                <div className='icons-item'>
                <img src='/good-fill.png' />
                 <span>{contentItem.likes}</span> 
                  </div>
              </div>
            </div>)
          }))}
        </div>
        <div className='sider '>
          {Object.keys(loginUser).length===0?<div></div>:
          <div className='basic-box'>
          <img className='avator'/>
          <div className='motto'></div>
          <div className='preview'>
            <div className='preview-item'>
              <p>博客数</p>
              <span>{loginUser.blog_count}</span>
            </div>
            <div className='preview-item'>
              <p>日志数</p>
              <span>{loginUser.diary_count}</span>
            </div>
          </div>
          <div className='link'>
            进入空间
            
          </div>
          </div>}
          <div className='basic-box'>
            <p className=''>活跃用户</p>
            <div></div>
          </div>
        </div>
        <div></div>
      </div>
    </Layout>
  )
}

export default IndexPage
