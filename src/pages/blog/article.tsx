import Layout from "../../components/layout";
import React, { useState, useEffect, useContext } from "react";
import { Input, Button, message, Popconfirm, Divider, Table, Tag } from "antd";
import { useHistory } from "react-router";
import { useLocationParams } from "../../utils/location-params-hooks";
import { myHttp } from "../../api";
import { useRefresh } from "../../utils/refresh-hooks";
import { DefaultContextInterface, DefaultState } from "../../store/reducer";
import moment from "moment";
import { DefalutContext } from "../../App";
import { defaultTags } from "../../constants/tag";
import { Link } from "react-router-dom";
import { useAdapt } from "../../utils/adapt-hooks";
interface Blog {
  blog_id: number;
  content: string;
  coverImage: string;
  date: string;
  heat: number;
  likes: number;
  refresh_date: string;
  title: string;
  user: any;
}
interface Comment {
  comment_id: number;
  content: string;
  date: string;
  user: any;
}
const Article = () => {
  const columns = [
    {
      title: "博客",
      dataIndex: "title",
      key: "title",
      render: (val: string, record: any) => {
        return (
          <Link to={{ pathname: `/blog/article?blog_id=${record.blog_id}` }}>
            {val}
          </Link>
        );
      },
    },
    {
      title: "热度",
      dataIndex: "heat",
      key: "heat",
    },
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      render: (tags: any[]) => (
        <>
          {tags.map((tag) => {
            let color = "#87d068";
            const idx = defaultTags.findIndex((obj) => {
              return obj.name === tag.name;
            });
            if (idx !== -1) color = defaultTags[idx].color;
            return (
              <Tag
                color={color}
                style={{
                  margin: "5px",
                }}
              >
                {tag.name}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];
  const history = useHistory();
  const [commentInput, setCommentInput] = useState("");
  const [blog, setBlog] = useState<Blog>({} as Blog);
  const [commentIndex, setCommentIndex] = useState(-1);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [userBlogList, setUserBlogList] = useState<any[]>([]);
  const [blogUser, setBlogUser] = useState<any>({});
  const dateArr = blog.date
    ? blog.date?.split(" ")[0].split("-")
    : moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const [inputFocus, setInputFocus] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const params = useLocationParams();
  const [refresh, changeRefresh] = useRefresh();
  const [bodyWidth] = useAdapt();
  const {
    dispatch,
    defaultState: { loginUser, isLogin },
  } = useContext(DefalutContext);
  const addComment = () => {
    if (commentInput === "") message.info("不能空白");
    else
      myHttp
        .post("/comment/add", {
          blog_id: params.blog_id,
          content: commentInput,
          user_id: loginUser.user_id,
        })
        .then(() => {
          setInputFocus(false);
          changeRefresh();
        });
  };
  const deleteComment = (comment_id: number) => {
    myHttp.post("/comment/delete", { comment_id }).then(() => {
      changeRefresh();
    });
  };
  useEffect(() => {
    if (!params.blog_id) {
      message.error("传参出错");
      setTimeout(() => {
        history.goBack();
      }, 2000);
    } else {
      myHttp.get("/blog/getOne", params).then((data: any) => {
        console.log(data);
        setBlog(data.result);
        setBlogUser(data.result.user);
      });
      myHttp.get("/comment/getBlogComments", params).then((data: any) => {
        setComments(data.result);
      });
    }
  }, [refresh]);
  useEffect(() => {
    if (blogUser.user_id)
      myHttp
        .get("/blog/get", {
          user_id: blogUser.user_id,
          limit: 20,
          selectType: "hotest",
        })
        .then((data: any) => {
          setUserBlogList(data.result.list);
        });
  }, [blogUser]);
  return (
    <Layout>
      <div className="article">
        <div className="article-container">
          <p>{blog.title}</p>
          <div className="art-header">
            <div className="header-item">
              <span>作者:</span>
              <span className="blue">{blog.user?.username}</span>
            </div>
            <div className="header-item">
              <span>更新于:</span>
              <span className="">{blog.date}</span>
            </div>
            <div className="header-item">
              <span>热度:</span>
              <span className="bold">{blog.heat}</span>
            </div>
            <div className="header-item">
              <span>点赞:</span>
              <span className="bold">{blog.likes}</span>
            </div>
          </div>
          <div className="date">
            <div className="day">{dateArr[2]}</div>
            <span className="month">{dateArr[1]}月</span>
            <span className="year">{dateArr[0]}</span>
          </div>
          <div className="content-container">
            {/* <img className="content-image" src={blog.coverImage} alt="封面" /> */}
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>
          </div>
          <div className="comment">
            <div className="comment-form">
              <img className="avator" src="/jay1.jpeg" alt="头像"></img>
              <Input
                className="input-empty"
                placeholder="请撰写评论"
                onFocus={() => {
                  setInputFocus(true);
                }}
                onChange={(e) => {
                  setCommentInput(e.target.value);
                }}
              ></Input>
              {inputFocus == true && (
                <div className="submit">
                  <Button type="primary" onClick={addComment}>
                    评论
                  </Button>
                </div>
              )}
            </div>
            <div className="comments-container">
              {comments.map((comment, index) => {
                return (
                  <div className="comments" key={comment.comment_id}>
                    <img className="avator" alt=""></img>
                    <div className="comments-container">
                      <span className="nickname">{comment.user?.nickname}</span>
                      <span className="time">{comment.date}</span>
                      <div
                        className="content"
                        onMouseEnter={() => {
                          setDeleteVisible(true);
                          setCommentIndex(index);
                        }}
                        onMouseLeave={() => {
                          setDeleteVisible(false);
                          setCommentIndex(-1);
                        }}
                      >
                        <span>{comment.content}</span>
                        {commentIndex === index &&
                          isLogin &&
                          loginUser.user_id === comment.user?.user_id && (
                            <Popconfirm
                              title="Are you sure to delete this task?"
                              onConfirm={() => {
                                deleteComment(comment.comment_id);
                              }}
                              okText="是"
                              cancelText="否"
                            >
                              <span
                                className="delete-comment"
                                style={{
                                  display: deleteVisible ? "inline" : "none",
                                }}
                              >
                                删除
                              </span>
                            </Popconfirm>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {bodyWidth >= 700 && (
          <div className="aside">
            <div className="card introduce">
              <div className="head">
                <img className="avator" alt="头像" />
                <span>作者 : {blogUser.nickname}</span>
              </div>
              <Divider orientation="right">crecode</Divider>
              <span className="autograph">{blogUser.autograph}</span>
            </div>
            <div className="card blog-list">
              <Table columns={columns} dataSource={userBlogList} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Article;
