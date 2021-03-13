import { labelRouters } from "../constants/header";
import { DefalutContext } from "../App";
import { useState, useEffect, useMemo, useContext } from "react";
import { changeRouter, receiveUser, requestUser } from "../store/action/index";
import { useAdapt } from "../utils/adapthooks";
import { Dropdown, Menu } from "antd";
import "../mock/login";
import { Link, useHistory } from "react-router-dom";
import { Axios, myHttp } from "../api";
const Header = (props: any) => {
  const history =useHistory()
  const [bodyWidth] = useAdapt();
  const { dispatch, defaultState } = useContext(DefalutContext) as any;
  const { router_index, loginUser, isLogin } = defaultState;
  const [idx, setIdx] = useState<number>(-1);
  // const router = useRouter()
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
    myHttp.get(`/user/login?open_id=1`).then((data:any) => {
      dispatch(receiveUser(data.result));
    });
  };
  const loginMenu = useMemo(
    () => (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.alipay.com/"
          >
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.tmall.com/"
          >
            3rd menu item
          </a>
        </Menu.Item>
        <Menu.Item danger>注销</Menu.Item>
      </Menu>
    ),
    []
  );
  return (
    <div className="main-header">
      {bodyWidth >= 800 ? (
        //响应式布局
        <>
          <div className="middle">
            <span
              className="logo"
              onClick={(e) => {
                toHome(e);
              }}
            >
              CreCode
            </span>
            <span
              className="motto"
              style={{
                opacity: bodyWidth > 1200 ? "1" : "0",
              }}
            >
              青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪
            </span>
            <div className="labels">
              {labelRouters.map((router, index) => (
                <Link to={router.value} key={router.name}>
                  <div
                    className={
                      router_index === index ? "label label-highlight" : "label"
                    }
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
              ))}
            </div>
            {isLogin ? (
              <Dropdown overlay={loginMenu}>
                <img
                  className="qqLogin"
                  src={'/jay1.jpeg'||loginUser.head_portrait}
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
        ""
      )}
    </div>
  );
};

export default Header;
