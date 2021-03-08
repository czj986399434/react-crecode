import Layout from "../../components/layout";
import React, { useState, useEffect, useContext } from "react";
import { draftContent } from "../../constants/blog";
import Editor from "../../components/editor";
import { Button, Input, message, Popover } from "antd";
import { tags } from "../../constants/tag";
import { Axios } from "../../api";
import { DefalutContext } from "../../App";
import { startLoading } from "../../store/action/loading";

const Submit = (props: any) => {
  const {chooseTags,changeTags}=props
  const {dispatch,defaultState:{loading}}=useContext(DefalutContext)
  const submitBlog = () => {
    props.onSubmit()
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
                  if (ghost) changeTags(index,{name:tag.name})
                  else changeTags(index,undefined)
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
      <Button type="primary" className="submit-button" loading={loading} onClick={submitBlog}>
        确认发布
      </Button>
    </div>
  );
};
const Blog = () => {
  const chooseTags=new Array(tags.length)
  const [draftBool, setDraftBool] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [content,setContent] = useState('')
  const [title, setTitle] = useState("");
  const {dispatch,defaultState:{loading,loginUser}}=useContext(DefalutContext)
  const submitBlog=()=>{
    const tags=chooseTags.filter(tag=>{
      return tag!==undefined
    })
    dispatch(startLoading())
    Axios.post('',{
      title,
      tags,
      content,
      user_id:loginUser.user_id
    })
  }
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
              <span className='draft-bool'>{draftBool ? draftContent.true : draftContent.false}</span>
              <Popover
                trigger="click"
                content={
                  <Submit
                  chooseTags={chooseTags}
                  changeTags={(index:number,obj:any)=>{
                    chooseTags[index]=obj
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
                  onClick={() => {
                    setIsModalVisible(true);
                  }}
                >
                  发布
                </Button>
              </Popover>
            </div>
          </div>
          <Editor style={{ opacity: isModalVisible ? "0" : "1" }} content={content} setContent={setContent}></Editor>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
