import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/layout";
import { DefalutContext } from "../../App";
import { requestUser, receiveUser } from "../../store/action/index";
import { myHttp } from "../../api";
import { message, Pagination, Select } from "antd";
import { defaultTags } from "../../constants/tag";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  FireOutlined,
  FireTwoTone,
  LikeOutlined,
  LikeTwoTone,
} from "@ant-design/icons";
import { binarySearch } from "../../utils/binary-search";
import { endLoading, startLoading } from "../../store/action/loading";
import { getSelfLikes } from "../../store/action/like";
type SelectType = "hotest" | "latest";
interface ContentItem {
  blog_id: number;
  title: string;
  content: string;
  date: string;
  heat: number;
  likes: number;
  user: User;
  tags: Tag[];
}
interface Tag {
  name: string;
  tag_id?: number;
}
interface User {
  user_id: number;
  username: string;
  nickname: string;
  [key: string]: any;
}
interface likeParams {
  likeBool: "0" | "1";
  blog_id: number;
}
type SelectTag = "" | "后端" | "前端" | "人工智能";
const { Option } = Select;
const BlogList = () => {
  const [refresh, setRefresh] = useState(false);
  const [selectType, setSelectType] = useState<SelectType>("hotest");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [start, setStart] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [selectTag, setSelectTag] = useState<SelectTag>("");
  // const [limit,setLimit]
  const [contentList, setContentList] = useState<Array<ContentItem>>([]);
  const testContext = useContext(DefalutContext) as any;
  const { defaultState, dispatch } = testContext;
  const { loginUser, isLogin } = defaultState;
  const { likes } = loginUser;
  const history = useHistory();
  useEffect(() => {
    const params = {
      selectType,
      limit,
      start,
      tag: selectTag,
    };
    myHttp.get("/blog/get", params).then((data: any) => {
      const { result } = data;
      setTotalCount(result.totalCount);
      setContentList(result.list);
    });
  }, [selectType, limit, start, selectTag, refresh]);
  const changePageStart = (page: number) => {
    setStart(page);
    // console.log(page);
  };
  const changeSize = (current: number, size: number) => {
    // console.log(current, size);
    setStart(current);
    setLimit(size);
  };
  const changeTag = (tag: SelectTag) => {
    setSelectTag(tag);
  };
  const toBlog = () => {
    history.push("/");
  };
  const setLike = ({ blog_id, likeBool }: likeParams) => {
    dispatch(startLoading());
    myHttp
      .post(`/like/set/${likeBool}`, {
        user_id: loginUser.user_id,
        blog_id,
      })
      .then(() => {
        myHttp
          .get("/like/getSelfLikes", {
            user_id: loginUser.user_id,
          })
          .then((data: any) => {
            dispatch(getSelfLikes(data.result.likes));
            dispatch(endLoading());
            setRefresh((refresh) => {
              return !refresh;
            });
          });
      });
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
            <Select
              defaultValue=""
              bordered={false}
              style={{ width: 100, marginLeft: "20px" }}
              onChange={changeTag}
            >
              <Option value="">全部</Option>
              {defaultTags.map((tag) => {
                return (
                  <Option value={tag.name} key={tag.name}>
                    {tag.name}
                  </Option>
                );
              })}
            </Select>
          </div>
          {contentList.map((contentItem) => {
            const likeFind = likes?.findIndex((like: any) => {
              return like.blog_id === contentItem.blog_id;
            });
            return (
              <div className="content-item" key={contentItem.blog_id}>
                <div className="messages">
                  <span className="content-user">
                    {contentItem.user?.username}
                  </span>
                  <span>{contentItem.date}</span>
                  <span className="content-tags">
                    {contentItem.tags.map((tag) => tag.name).join("/")}
                  </span>
                </div>
                <Link
                  to={{
                    pathname: `/blog/article?blog_id=${contentItem.blog_id}`,
                  }}
                >
                  <div className="title">{contentItem.title}</div>
                </Link>
                <div className="icons">
                  <div className="icons-item">
                    <FireTwoTone twoToneColor="" />
                    <span>{contentItem.heat}</span>
                  </div>
                  <div
                    className="icons-item"
                    onClick={() => {
                      if (!isLogin) message.info("请先登录");
                      else
                        setLike({
                          blog_id: contentItem.blog_id,
                          likeBool:
                            likeFind === -1 || likes[likeFind].like_bool === "0"
                              ? "1"
                              : "0",
                        });
                    }}
                  >
                    <LikeTwoTone
                      twoToneColor={
                        likes
                          ? likeFind === -1 || likes[likeFind].like_bool === "0"
                            ? ""
                            : "#000"
                          : ""
                      }
                    />
                    <span>{contentItem.likes}</span>
                  </div>
                </div>
              </div>
            );
          })}
          <Pagination
            showQuickJumper
            pageSizeOptions={["10", "20", "50", "100"]}
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
              <div className="avator-box" >
                <img className='avator' alt='' src='/jay1.jpeg'></img>
                <div className='border'></div>
                <div className='mirror'></div>
              </div>
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

export default BlogList;
