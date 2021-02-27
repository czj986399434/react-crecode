
import Layout from '../../components/layout'
import Diary from '../../components/diary'
import Picture from '../../components/picture-basic'
import { useEffect, useState, useContext } from 'react'
import { ThemeContext } from '../_app'
import {Select} from 'antd'
import SpaceBlog from '../../components/space-blog'
type DisplayType = 'blog' | 'diary' | 'picture'
const Space = (props: any) => {
  const {Option}=Select
  const spaceUser = {
    user_id: 1,
    str_username: 'weilinerL',
    str_nickname: '旅行青蛙',
    str_autograph: '走走停停的时光',
    str_head_portrait: '/jay1.jpeg',
    blog_count: 22,
    diary_count: 11,
    picture_count: 111
  }
  
  const { defaultState: { loginUser }, dispatch } = useContext(ThemeContext) as any;
  const [displayType, setDisplayType] = useState<DisplayType>('blog');
  const [pictureDisplay,setPictureDisplay]=useState('basic')
  const self = (loginUser.user_id === spaceUser.user_id);

  let a = (<Diary></Diary>)
  switch (displayType) {
    case 'blog':
      a = (<SpaceBlog></SpaceBlog>)
      break;
    case 'diary':
      a = (<Diary></Diary>);
      break
    case 'picture':
      a = (
        <>
        <div className='select-items'>
        <Select defaultValue="lucy" style={{ width: 120 }} allowClear>
      <Option value="lucy">Lucy</Option>
    </Select>
        </div>
          <Picture></Picture>
        </>
      )
  }
  return (
    <Layout>
      <div className="space">
        <div className='header' style={{
          background: `url('/jay1.jpeg')`
        }}>
        </div>
        <div className='nav'>
          <img className='avator' src='/jay2.jpeg'></img>
          <div className={displayType === 'blog' ? 'nav-item nav-item-bottom' : 'nav-item'} onClick={() => {
            setDisplayType('blog')
          }}>
            <p>博客</p>
            <span>{spaceUser.blog_count}</span>
          </div>
          <div
            className={displayType === 'diary' ? 'nav-item nav-item-bottom' : 'nav-item'}
            onClick={() => {
              setDisplayType('diary')
            }}
          >
            <p>日志</p>
            <span>{spaceUser.diary_count}</span>
          </div>
          <div className={displayType === 'picture' ? 'nav-item nav-item-bottom' : 'nav-item'}
            onClick={() => {
              setDisplayType('picture')
            }}
          >
            <p>相册</p>
            <span>{spaceUser.picture_count}</span>
          </div>
        </div>
        <div className='main-body'>
          {a}
        </div>
      </div>
    </Layout>
  )
}
const MainBody = (props: any) => {

}

export default Space
