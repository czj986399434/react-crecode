import { labelRouters } from '../constants/header'
import { ThemeContext } from '../pages/_app'
import { useState, useEffect, useMemo, useContext } from 'react'
import { changeRouter, receiveUser, requestUser } from '../store/action/index'
import { useAdapt } from '../utils/adapthooks'
import { Dropdown, Menu } from 'antd'
import '../mock/login'
import axios from 'axios'
const Header = (props: any) => {

  const [bodyWidth] = useAdapt()
  const { dispatch, defaultState } = useContext(ThemeContext) as any;
  const { router_index, loginUser, isLogin } = defaultState
  const [idx, setIdx] = useState<number>(-1)
  // const router = useRouter()
  const toHome = (e: any) => {
    e.preventDefault();
    // router.push('/')
  }
  const highlight = (state: 'on' | 'off', index: number) => {
    if (state === 'on') setIdx(index)
    else setIdx(-1)
  }
  const link = (index: number) => {
    dispatch(changeRouter(index))
    // router.push(labelRouters[index].value)
  }
  const tologin = () => {
    dispatch(requestUser())
    axios.get('/login').then(data => {
      dispatch(receiveUser(data.data))
    })
  }
  console.log('router_index' + router_index)
  const loginMenu = useMemo(() => (<Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
    <Menu.Item danger>注销</Menu.Item>
  </Menu>), [])
  return (
    <div className='main-header'>
      {bodyWidth >= 730 ?
        //响应式布局
        (<>
          <span className='logo' onClick={(e) => {
            toHome(e)
          }}>CreCode</span>
          <span className='motto'>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
          <div className='labels'>
            {labelRouters.map((router, index) => (
              <div className={router_index === index ? 'label label-highlight' : 'label'}
                key={router.name}
                onClick={() => {
                  console.log('index' + index)
                  link(index)
                }}
                onMouseOver={() => {
                  highlight('on', index)
                }} onMouseOut={() => {
                  highlight('off', index)
                }}>{router.name}
                <div className='box-highlight' style={{ width: idx === index ? '7rem' : '0' }}></div>
              </div>

            )
            )}
          </div>
          {isLogin ? <Dropdown overlay={loginMenu}>
            <img className='qqLogin' src={loginUser.head_portrait} onClick={() => {
              tologin()
            }} />
          </Dropdown> : <img className='qqLogin' src='/qq.png' onClick={() => {
            tologin()
          }} />}
        </>)
        :
        ''
      }

    </div>
  )
}

export default Header
