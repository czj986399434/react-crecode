import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layout";
import { DefalutContext } from "../App";
import { requestUser, receiveUser } from "../store/action/index";
import { myHttp } from "../api";
import { Pagination } from "antd";
type SelectType = "hotest" | "latest";
interface ContentItem {
  blog_id: number;
  title: string;
  content: string;
  date: string;
  heat: number;
  likes: number;
  user: User;
}
interface User {
  user_id: number;
  username: string;
  nickname: string;
  [key: string]: any;
}
const IndexPage = () => {
  const [selectType, setSelectType] = useState<SelectType>("hotest");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [start, setStart] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  // const [limit,setLimit]
  const [contentList, setContentList] = useState<Array<ContentItem>>([]);
  const testContext = useContext(DefalutContext) as any;
  const { defaultState } = testContext;
  const { loginUser } = defaultState;
  console.log(defaultState);
  useEffect(() => {
    const params = {
      selectType,
      limit,
      start,
    };
    myHttp.get("/blog/get", params).then((data: any) => {
      const { result } = data;
      setTotalCount(result.totalCount);
      setContentList(result.list);
    });
  }, [selectType, limit, start]);
  const changePageStart = (page: number) => {
    setStart(page);
    // console.log(page);
  };
  const changeSize = (current: number, size: number) => {
    // console.log(current, size);
    setStart(current);
    setLimit(size);
  };
  return (
    <Layout>
      <div className="index">
        <div className="content-box basic-box">
          <div className="content-header">
            <div
              className={
                selectType === "hotest" ? "active-nav nav-item" : "nav-item"
              }
              onClick={() => {
                //  testContext.dispatch(changeUserState('LOGIN'))
                setSelectType("hotest");
              }}
            >
              热门
            </div>
            <div
              className={
                selectType === "latest" ? "active-nav nav-item" : "nav-item"
              }
              onClick={() => {
                setSelectType("latest");
              }}
            >
              最新
            </div>
          </div>
          {contentList.map((contentItem) => {
            return (
              <div className="content-item" key={contentItem.blog_id}>
                <div className="messages">
                  <span>{contentItem.user?.username}</span>
                  <span>{contentItem.date}</span>
                </div>
                <div className="title">{contentItem.title}</div>
                <div className="icons">
                  <div className="icons-item">
                    <img src="/hot-fill.png" alt="" />
                    <span>{contentItem.heat}</span>
                  </div>
                  <div className="icons-item">
                    <img src="/good-fill.png" alt="" />
                    <span>{contentItem.likes}</span>
                  </div>
                </div>
              </div>
            );
          })}
          <Pagination
            showQuickJumper
            pageSizeOptions={['10', '20', '50', '100']}
            current={start}
            total={totalCount}
            pageSize={limit}
            onChange={changePageStart}
            showTotal={(total) => `共${total}个`}
            onShowSizeChange={changeSize}
          />
        </div>
        <div className="sider ">
          {Object.keys(loginUser).length === 0 ? (
            <div></div>
          ) : (
            <div className="basic-box">
              <img className="avator" alt="" />
              <div className="motto"></div>
              <div className="preview">
                <div className="preview-item">
                  <p>博客数</p>
                  <span>{loginUser.blog_count}</span>
                </div>
                <div className="preview-item">
                  <p>日志数</p>
                  <span>{loginUser.diary_count}</span>
                </div>
              </div>
              <div className="link">进入空间</div>
            </div>
          )}
          <div className="basic-box">
            <p className="">活跃用户</p>
            <div></div>
          </div>
        </div>
        <div></div>
      </div>
    </Layout>
  );
};

export default IndexPage;
