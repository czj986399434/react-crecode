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
import { defaultTags } from "../../constants/tag";
import { Axios, myHttp } from "../../api";
import { DefalutContext } from "../../App";
import { endLoading, startLoading } from "../../store/action/loading";
import { FileImageOutlined, SyncOutlined } from "@ant-design/icons";
import { initialBlog, saveBlog } from "../../store/action/save-blog";
import { useLocationParams } from "../../utils/location-params-hooks";
import { useHistory } from "react-router";

const Tag = (props: any) => {
  const { chooseTags, changeTags, index, tag } = props;
  const [ghost, setGhost] = useState(true);
  useEffect(() => {
    if (chooseTags[index]) setGhost(false);
    else setGhost(true);
  }, []);
  useEffect(() => {
    if (!ghost) changeTags(index, { name: tag.name });
    else changeTags(index, undefined);
  }, [ghost]);
  return (
    <Button
      size="small"
      className="tag"
      ghost={ghost}
      onClick={() => {
        setGhost((ghost) => {
          return !ghost;
        });
      }}
      style={{ color: tag.color }}
    >
      {tag.name}
    </Button>
  );
};
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
      {defaultTags.map((tag, index) => {
        return (
          <Tag
            key={index}
            chooseTags={chooseTags}
            changeTags={changeTags}
            index={index}
            tag={tag}
          ></Tag>
        );
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
  const history = useHistory();
  const [chooseTags, setChooseTags] = useState<any[]>(
    new Array(defaultTags.length)
  );
  const [draftBool, setDraftBool] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [coverImage, setCoverImage] = useState("");
  const [saveIconFlag, setSaveIconFlag] = useState<boolean>(false);
  const locationParams = useLocationParams();
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
    const blog_id = locationParams.blog_id || blogData.blog_id;
    if (blog_id) {
      myHttp
        .post("/blog/update", {
          title,
          content,
          coverImage,
          blog_id,
          tags,
        })
        .then((data) => {
          dispatch(endLoading());
          dispatch(initialBlog());
          setTimeout(() => {
            // eslint-disable-next-line no-restricted-globals
            history.goBack();
          }, 1000);
          setIsModalVisible(false);
        });
    } else {
      myHttp
        .post("/blog/add", {
          title,
          tags,
          content,
          coverImage,
          user_id: loginUser.user_id,
        })
        .then((data) => {
          dispatch(endLoading());
          dispatch(initialBlog());
          setTimeout(() => {
            // eslint-disable-next-line no-restricted-globals
            location.reload();
          }, 1000);
          setIsModalVisible(false);
        });
    }
  };

  const save = useCallback(() => {
    const saveData = {
      content,
      title,
      coverImage,
      chooseTags,
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
        coverImage,
        chooseTags,
      };
      dispatch(saveBlog(saveData));
      timeoutTimer = setTimeout(() => {
        setSaveIconFlag(false);
        setDraftBool(true);
      }, 500);
    }, 1000 * 60);
    return () => {
      clearInterval(interTimer);
      timeoutTimer && clearTimeout(timeoutTimer);
    };
  }, [content, title, dispatch]);
  useEffect(() => {
    if (locationParams.blog_id) {
      myHttp
        .get("/blog/getOne", {
          blog_id: locationParams.blog_id,
        })
        .then((data: any) => {
          const { title, coverImage, content, tags } = data.result;
          setTitle(title);
          editor.txt.html(content);
          setCoverImage(coverImage);
          //这里需要转换，因为请求得到的是带有id的，不能随便直接传给chooseTags
          const chooseTagss = new Array(defaultTags.length);
          tags.forEach((tag: any) => {
            const index = defaultTags.findIndex((val) => {
              return val.name === tag.name;
            });
            console.log(index);
            if (index !== -1) {
              chooseTagss[index] = { ...tag };
            }
          });
          console.log(chooseTagss);
          setChooseTags(chooseTagss);
        });
    } else {
      const { title, content, coverImage, chooseTags } = blogData;
      setTitle(title);
      editor.txt.html(content);
      setCoverImage(coverImage);
      setChooseTags(chooseTags);
    }
  }, [locationParams.blog_id]);

  const uploadCover = () => {
    const file = fileRef.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("pic", file, file.name);
      const config = {
        headers: { "Content-Type": "mutipart/form-data" },
      };
      myHttp.post("/uploadPic", formData, config).then((data:any) => {
        setCoverImage(data.result)
      });
    }
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
                onChange={(e)=>{
                uploadCover()
                }}
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
                      const tagss = [...chooseTags];
                      tagss[index] = obj;
                      setChooseTags(tagss);
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
          <div className="editor">
            <div id="div1" className="wangeditor"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
