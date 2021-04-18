import { labelRouters } from "../constants/header";
import { DefalutContext } from "../App";
import React, { useState, useEffect, useMemo, useContext } from "react";
import { changeRouter, receiveUser, requestUser } from "../store/action/index";
import { useAdapt } from "../utils/adapt-hooks";
import { Drawer, Dropdown, Menu } from "antd";
import "../mock/login";
import { Link, useHistory } from "react-router-dom";
import { Axios, myHttp } from "../api";
import { sleep } from "../utils";
import { CrecodeSearch } from "./common/crecode-search";
import BubbleBox from "./common/bubble-box";
const { SubMenu } = Menu;
const Header = (props: any) => {
  const history = useHistory();
  const [bodyWidth] = useAdapt();
  const { dispatch, defaultState } = useContext(DefalutContext) ;
  const { router_index, loginUser, isLogin } = defaultState;
  const [idx, setIdx] = useState<number>(-1);
  const [menuCurrent, setMenuCurrent] = useState<string>("主页");
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuClass, setMenuClass] = useState<string>("menu");
  const [messageDrawerVisible,setMessageDrawerVisible]=useState<boolean>(false)
  const [messageList,setMessageList]=useState<any[]>([])
  const [refreshFlag,setRefreshFlag]=useState<boolean>(false)
  // const router = useRouter()
  useEffect(() => {
    myHttp.get('/message/get',{user_id:loginUser.user_id}).then((data:any)=>{
      const {result} =data
      setMessageList(result?.list)
    })
    
  }, [refreshFlag]);
  const refresh=()=>{
    setRefreshFlag((flag)=>{
      return !flag
    })
  }
  const menuClick = (e: any) => {
    setMenuCurrent(e.key);
  };
  const toHome = (e: any) => {
    e.preventDefault();
    // router.push('/')
  };
  const highlight = (state: "on" | "off", index: number) => {
    if (state === "on") setIdx(index);
    else setIdx(-1);
  };
  const link = (index: number) => {
    dispatch(changeRouter(index));
  };
  const tologin = () => {
    dispatch(requestUser());
    myHttp.get(`/user/login?open_id=1`).then((data: any) => {
      dispatch(receiveUser(data.result));
    });
  };
  const closeDrawer=()=>{
      setMessageDrawerVisible(false)
  }
  const loginMenu = useMemo(
    () => (
      <Menu>
        {loginUser.type === "admin" && (
          <Menu.Item>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="/admin"
            >
              进入后台
            </a>
          </Menu.Item>
        )}

        <Menu.Item onClick={()=>{
              setMessageDrawerVisible(true)
            }}>
          <span
            
          >
            消息通知
          </span>
        </Menu.Item>
        <Menu.Item>
          <span
            
          >
            3rd menu item
          </span>
        </Menu.Item>
        <Menu.Item danger>注销</Menu.Item>
      </Menu>
    ),
    []
  );
  return (
    <div className={props.index ? "main-header index-header" : "main-header"}>
      {bodyWidth >= 800 ? (
        //响应式布局
        <>
          <div className="middle">
            <span
              className={props.index ? "logo color-white" : "logo"}
              onClick={(e) => {
                toHome(e);
              }}
            >
              CreCode
            </span>
            <span
              className={"motto"}
              style={{
                opacity: bodyWidth > 1200 ? "1" : "0",
                display: props.index ? "none" : "inline",
              }}
            >
              青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪
            </span>
            <div className={"labels"}>
              {labelRouters.map((router, index) => {
                let classN = ["label"];
                if (router_index === index) classN.push("label-highlight");
                if (props.index) classN.push("color-white");
                return (
                  <Link to={router.value} key={router.name}>
                    <div
                      className={classN.join(" ")}
                      onClick={() => {
                        console.log("index" + index);
                        link(index);
                      }}
                      onMouseOver={() => {
                        highlight("on", index);
                      }}
                      onMouseOut={() => {
                        highlight("off", index);
                      }}
                    >
                      {router.name}
                      <div
                        className="box-highlight"
                        style={{ width: idx === index ? "7rem" : "0" }}
                      ></div>
                    </div>
                  </Link>
                );
              })}
            </div>
            {isLogin ? (
              <Dropdown overlay={loginMenu}>
                <img
                  className="qqLogin"
                  src={"/jay1.jpeg" || loginUser.head_portrait}
                  onClick={() => {
                    tologin();
                  }}
                />
              </Dropdown>
            ) : (
              <img
                className="qqLogin"
                src="/qq.png"
                onClick={() => {
                  tologin();
                }}
              />
            )}
          </div>
        </>
      ) : (
        <div className="menu-container">
          <div
            className={props.index ? "menu-header index-header" : "menu-header"}
          >
            <span className={props.index ? "logo color-white" : "logo"}>
              CreCode
            </span>
            <svg
              style={{
                transform: `rotate(${menuVisible ? "0" : "45deg"})`,
                zIndex: 1,
              }}
              className="menu-icon"
              onClick={async () => {
                if (menuVisible === true) {
                  setMenuClass("menu menu-disappear");
                  await sleep(500);
                } else {
                  setMenuClass("menu ");
                }
                setMenuVisible((visible) => {
                  return !visible;
                });
              }}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2807"
              width="40"
              height="40"
            >
              <path
                d="M384 480H192c-52.8 0-96-43.2-96-96V192c0-52.8 43.2-96 96-96h192c52.8 0 96 43.2 96 96v192c0 52.8-43.2 96-96 96zM192 160c-17.6 0-32 14.4-32 32v192c0 17.6 14.4 32 32 32h192c17.6 0 32-14.4 32-32V192c0-17.6-14.4-32-32-32H192zM832 480H640c-52.8 0-96-43.2-96-96V192c0-52.8 43.2-96 96-96h192c52.8 0 96 43.2 96 96v192c0 52.8-43.2 96-96 96zM640 160c-17.6 0-32 14.4-32 32v192c0 17.6 14.4 32 32 32h192c17.6 0 32-14.4 32-32V192c0-17.6-14.4-32-32-32H640zM384 928H192c-52.8 0-96-43.2-96-96V640c0-52.8 43.2-96 96-96h192c52.8 0 96 43.2 96 96v192c0 52.8-43.2 96-96 96zM192 608c-17.6 0-32 14.4-32 32v192c0 17.6 14.4 32 32 32h192c17.6 0 32-14.4 32-32V640c0-17.6-14.4-32-32-32H192zM832 928H640c-52.8 0-96-43.2-96-96V640c0-52.8 43.2-96 96-96h192c52.8 0 96 43.2 96 96v192c0 52.8-43.2 96-96 96zM640 608c-17.6 0-32 14.4-32 32v192c0 17.6 14.4 32 32 32h192c17.6 0 32-14.4 32-32V640c0-17.6-14.4-32-32-32H640z"
                p-id="2808"
                fill={props.index ? "#fff" : "#409EFF"}
              ></path>
            </svg>
          </div>
          <Menu
            className={menuClass}
            style={{ width: "100%", display: menuVisible ? "block" : "none" }}
            onClick={menuClick}
            selectedKeys={[menuCurrent]}
            mode="vertical"
          >
            {labelRouters.map((labelRouter) => (
              <Menu.Item key={labelRouter.name}>
                <Link to={{ pathname: labelRouter.value }}>
                  {labelRouter.name}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      )}
      <CrecodeSearch></CrecodeSearch>
      <Drawer
      className='message'
       width={600}
          title="消息通知"
          placement={'right'}
          closable={true}
          onClose={closeDrawer}
          visible={messageDrawerVisible}
          
        >
          {messageList.map((message:any)=>{
            return (<BubbleBox message={message} refresh={refresh}></BubbleBox>)
          })}
        </Drawer>
    </div>
  );
};

export default Header;
