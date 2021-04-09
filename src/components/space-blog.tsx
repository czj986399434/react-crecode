import { useState, useEffect } from "react";
import { Modal, message } from "antd";
// import { useRouter } from 'next/router'
import Edit from "./common/edit";
import { myHttp } from "../api";
import { useGlobal } from "../utils/context-hooks";
import { useScrollBottom } from "../utils/scroll-hooks";
import { endLoading, startLoading } from "../store/action/loading";
import { LoadingBottom } from "./common/loading-bottom";
import { useHistory } from "react-router";
const limit = 1;
const SpaceBlog = (props: any) => {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [start, setStart] = useState<number>(1);
  const { bottomBool, setBottomBool } = useScrollBottom();
  const {
    dispatch,
    defaultState: { loginUser, loading },
  } = useGlobal();
  const history =useHistory()
  const toDelete = () => {
    setDeleteVisible(true);
  };
  const deleteConfirm = () => {
    setDeleteLoading(true);
    //    axios.post('').then(res=>{
    //     setDeleteLoading(false)
    //    message.success('删除成功')
    //    }).catch(err=>{
    //     setDeleteLoading(false)

    //    })
  };
  const toEdit = (blog_id: number) => {
    console.log('toEdit')
      history.push(`/blog/index?blog_id=${blog_id}`)
  };
  useEffect(() => {
    dispatch(startLoading());
    myHttp
      .get("/blog/get", {
        user_id: props.user_id,
        start,
        limit,
      })
      .then((data: any) => {    
          dispatch(endLoading());
          console.log(data);
          setTotalCount(data.result.totalCount);
          setBlogs((blogs) => {
            return [...blogs, ...data.result?.list];
          });
          setBottomBool(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);
  useEffect(() => {
    if (start * limit < totalCount)
      setStart((start) => {
        return start + 1;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottomBool]);
  return (
    <div className="space-blog">
      <div className="inner">
        {blogs.map((blog, index) => {
          const dateArr = blog.date.split(" ")[0].split("-");
          return (
            <div className="article-item" key={blog.blog_id}>
              <div className="title">
                <span>{blog.title}</span>
              </div>
              <div className="date">
                <div className="day">{dateArr[2]}</div>
                <span className="month">{dateArr[1]}月</span>
                <span className="year">{dateArr[0]}</span>
              </div>
              <div className="content-container">
                <img className="content-image" src={blog.coverImage===''?'jay1.jpeg':`http://qiniu.crecode.cn/${blog.coverImage}`} />
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                ></div>
              </div>
              <div className="read-more">
                <a href={`/blog/article?blog_id=${blog.blog_id}`}>立即阅读</a>
              </div>
              <div className="footer">
                <div className="tags">
                  <Edit
                    user_id={props.user_id}
                    toEdit={() => {
                      toEdit(blog.blog_id);
                    }}
                    toDelete={() => {
                      toDelete();
                    }}
                  ></Edit>
                  <img className="icon" src="/tag.png" />
                  {blog.tags?.map((tag: any, idx: number) => (
                    <div className="tag" key={tag.name}>
                      {tag.name}
                    </div>
                  ))}
                </div>
                {/* <div className="float-right">
                  <img src="/hot-fill.png" className="icon" />
                  <span>{blog.heat}</span>
                </div>
                <div className="float-right">
                  <img src="/good-fill.png" className="icon" />
                  <span>{blog.likes}</span>
                </div> */}
              </div>
              {index === blogs.length - 1 && totalCount <= start * limit && (
                <LoadingBottom></LoadingBottom>
              )}
            </div>
          );
        })}
      </div>
      <Modal
        title="Title"
        visible={deleteVisible}
        onOk={deleteConfirm}
        confirmLoading={deleteLoading}
        onCancel={() => {
          setDeleteVisible(false);
        }}
      >
        <p>你确定要删除吗，删除后不可恢复</p>
      </Modal>
    </div>
  );
};

export default SpaceBlog;
