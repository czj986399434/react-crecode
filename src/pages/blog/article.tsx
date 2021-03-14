import Layout from "../../components/layout";
import { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import { useHistory } from "react-router";
import { useLocationParams } from "../../utils/location-params-hooks";
import { myHttp } from "../../api";
import { useRefresh } from "../../utils/refresh-hooks";
import moment from "moment";
import { useGlobal } from "../../utils/context-hooks";
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
  const history = useHistory();
  const [commentInput, setCommentInput] = useState("");
  const [blog, setBlog] = useState<Blog>({} as Blog);
  const dateArr = blog.date
    ? blog.date?.split(" ")[0].split("-")
    : moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  const [inputFocus, setInputFocus] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const params = useLocationParams();
  const [refresh, changeRefresh] = useRefresh();
  const [dispatch, { loginUser }] = useGlobal();
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
      });
      myHttp.get("/comment/getBlogComments", params).then((data: any) => {
        setComments(data.result);
      });
    }
  }, [refresh]);
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
            <img className="content-image" src={blog.coverImage} alt="封面" />
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
                      <div className="content">{comment.content}</div>
                      {/* <span className="floor">{index + 1}l</span> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Article;
