import Layout from "../../components/layout";
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import E from "wangeditor";
import { draftContent } from "../../constants/blog";
import { Button, Input, Popover, Tooltip } from "antd";
import { tags } from "../../constants/tag";
import { Axios, myHttp } from "../../api";
import { DefalutContext } from "../../App";
import { endLoading, startLoading } from "../../store/action/loading";
import {
  FileImageOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { initialBlog, saveBlog } from "../../store/action/save-blog";

const Submit = (props: any) => {
  const { chooseTags, changeTags } = props;
  const {
    dispatch,
    defaultState: { loading },
  } = useContext(DefalutContext);
  const submitBlog = () => {
    props.onSubmit();
  };

  return (
    <div className="submit-box">
      <p>tags</p>
      {tags.map((tag, index) => {
        const Tag = () => {
          const [ghost, setGhost] = useState(true);
          return (
            <Button
              key={index}
              size="small"
              className="tag"
              ghost={ghost}
              onClick={() => {
                setGhost((ghost) => {
                  if (ghost) changeTags(index, { name: tag.name });
                  else changeTags(index, undefined);
                  return !ghost;
                });
              }}
              style={{ color: tag.color }}
            >
              {tag.name}
            </Button>
          );
        };
        return <Tag key={index}></Tag>;
      })}
      <Button
        type="primary"
        className="submit-button"
        loading={loading}
        onClick={submitBlog}
      >
        确认发布
      </Button>
    </div>
  );
};
let editor = null as any;
const Blog = (props: any) => {
  const chooseTags = new Array(tags.length);
  const [draftBool, setDraftBool] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [coverImage, setCoverImage] = useState("");
  const [saveIconFlag, setSaveIconFlag] = useState<boolean>(false);
  const {
    dispatch,
    defaultState: { loading, loginUser, blogData },
  } = useContext(DefalutContext);
  const fileRef = useRef(null) as any;
  const submitBlog = () => {
    const tags = chooseTags.filter((tag) => {
      return tag !== undefined;
    });
    dispatch(startLoading());
   myHttp.post("/blog/add", {
      title,
      tags,
      content,
      coverImage:'',
      user_id: loginUser.user_id,
    }).then(data=>{
      dispatch(endLoading())
      dispatch(initialBlog())
      setTimeout(()=>{
         // eslint-disable-next-line no-restricted-globals
         location.reload()
      },1000)
      setIsModalVisible(false)
    })
  };
  const save = useCallback(() => {
    const saveData = {
      content,
      title,
    };
    dispatch(saveBlog(saveData));
  }, [content, title, dispatch]);
  useEffect(() => {
    // 注：class写法需要在componentDidMount 创建编辑器
    editor = new E("#div1");

    editor.config.onchange = (newHtml: string) => {
      setContent(newHtml);
    };
    /**一定要创建 */
    editor.create();

    return () => {
      // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
      editor.destroy();
    };
  }, []);
  useEffect(() => {
    let timeoutTimer: NodeJS.Timeout;
    const interTimer = setInterval(() => {
      setSaveIconFlag(true);
      const saveData = {
        content,
        title,
      };
      dispatch(saveBlog(saveData));
      timeoutTimer = setTimeout(() => {
        setSaveIconFlag(false);
        setDraftBool(true);
      }, 500);
    }, 1000*60);
    return () => {
      clearInterval(interTimer);
      timeoutTimer && clearTimeout(timeoutTimer);
    };
  }, [content,title,dispatch]);
  useEffect(() => {
    if (props.blog_id) {
    } else {
      const { title, content } = blogData;
      setTitle(title);
      editor.txt.html(content)
    }
  }, [props.blog_id]);

  const uploadCover = () => {
    const file = fileRef.current.files[0];
    const reader = new FileReader();
    // console.log("file");
    // console.log(file);
    // reader.readAsDataURL(file);
    // reader.onload = function (e) {
    //   console.log(this.result);
    //   setCoverImage(this.result as string);
    // };
  };
  const clickUpload = () => {
    fileRef.current.click();
  };
  return (
    <Layout>
      <div className="blog">
        <div className="blog-container">
          <div className="control-header">
            <Input
              value={title}
              maxLength={20}
              bordered={false}
              placeholder="标题,限20字"
              size="large"
              style={{ width: "400px" }}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <div className="draft">
              <Tooltip title="点击保存(仅保存标题正文)">
                <span
                  className="draft-bool"
                  onClick={() => {
                    setSaveIconFlag(true);
                    save();
                    setTimeout(() => {
                      setSaveIconFlag(false);
                      setDraftBool(true);
                    }, 500);
                  }}
                  style={{ color: draftBool ? "#409eff" : "#ddd" }}
                >
                  {draftBool ? draftContent.true : draftContent.false}
                  {saveIconFlag && <SyncOutlined spin />}
                </span>
              </Tooltip>

              <input
                type="file"
                accept="image/*"
                name="coverImage"
                ref={fileRef}
                style={{ display: "none" }}
                onClick={uploadCover}
              ></input>
              <Tooltip title="封面">
                <FileImageOutlined
                  className="cover-image-button"
                  onClick={clickUpload}
                />
              </Tooltip>

              <Popover
                trigger="click"
                content={
                  <Submit
                    chooseTags={chooseTags}
                    changeTags={(index: number, obj: any) => {
                      chooseTags[index] = obj;
                    }}
                    onSubmit={submitBlog}
                  ></Submit>
                }
                visible={isModalVisible}
                onVisibleChange={(visible) => {
                  setIsModalVisible(visible);
                }}
              >
                <Button
                  className="submit-button"
                  type="primary"
                  loading={loading}
                  onClick={() => {
                    setIsModalVisible(true);
                  }}
                >
                  发布
                </Button>
              </Popover>
            </div>
          </div>
          <div
            className="editor"
          >
            <div id="div1" className="wangeditor"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
