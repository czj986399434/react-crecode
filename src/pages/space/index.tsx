import Layout from "../../components/layout";
import Diary from "../../components/diary";
import Picture from "../../components/picture-basic";
import React, { useEffect, useState, useContext, useRef } from "react";
import { DefalutContext } from "../../App";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Popconfirm,
  Popover,
  Select,
  Tooltip,
} from "antd";
import SpaceBlog from "../../components/space-blog";
import { useLocationParams } from "../../utils/location-params-hooks";
import { PlusOutlined } from "@ant-design/icons";
import { myHttp } from "../../api";
import { endLoading, startLoading } from "../../store/action/loading";
type DisplayType = "blog" | "diary" | "picture";
const { TextArea } = Input;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const Space = (props: any) => {
  const { Option } = Select;
  const locationParams = useLocationParams();
  const spaceUser = {
    user_id: 1,
    str_username: "weilinerL",
    str_nickname: "旅行青蛙",
    str_autograph: "走走停停的时光",
    str_head_portrait: "/jay1.jpeg",
    blog_count: 22,
    diary_count: 11,
    picture_count: 111,
  };

  const {
    defaultState: { loginUser, loading },
    dispatch,
  } = useContext(DefalutContext) as any;
  const [displayType, setDisplayType] = useState<DisplayType>("blog");
  const [pictureDisplay, setPictureDisplay] = useState("basic");
  const [popVisible, setPopVisible] = useState<boolean>(false);
  const handleVisibleChange = (visible: any) => {
    setPopVisible(visible);
  };
  const addDiary = (values: any) => {
    dispatch(startLoading());
    myHttp
      .post("/diary/add", {
        ...values,
        mood: "",
        user_id: loginUser.user_id,
      })
      .then(() => {
        dispatch(endLoading());
        setPopVisible(false);
      })
      .catch(() => {
        dispatch(endLoading());
        setPopVisible(false);
      });
  };
  const diaryAddContent = (
    <Form
      style={{
        width: "500px",
      }}
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={addDiary}
    >
      <Form.Item
        label="概要"
        name="abstract"
        rules={[{ required: true, message: "请写概要" }]}
      >
        <Input maxLength={40} />
      </Form.Item>

      <Form.Item
        label="内容"
        name="content"
        rules={[{ required: true, message: "无内容?那你写啥日记(doge)" }]}
      >
        <TextArea rows={7} maxLength={1000} showCount />
      </Form.Item>
      <Form.Item name="open" valuePropName="open" {...tailLayout}>
        <Checkbox>是否公开</Checkbox>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          添加
        </Button>
      </Form.Item>
    </Form>
  );
  let a;
  const childProps = {
    user_id: locationParams.user_id
      ? locationParams.user_id
      : loginUser.user_id,
  };
  switch (displayType) {
    case "blog":
      a = <SpaceBlog {...childProps}></SpaceBlog>;
      break;
    case "diary":
      a = <Diary {...childProps}></Diary>;
      break;
    case "picture":
      a = (
        <>
          <div className="select-items">
            <Select defaultValue="lucy" style={{ width: 120 }} allowClear>
              <Option value="lucy">Lucy</Option>
            </Select>
          </div>
          <Picture></Picture>
        </>
      );
  }

  return (
    <Layout>
      <div className="space">
        <div
          className="header"
          style={{
            background: `url('/jay1.jpeg')`,
          }}
        ></div>
        <div className="nav">
          <img className="avator" src="/jay2.jpeg"></img>
          <div
            className={
              displayType === "blog" ? "nav-item nav-item-bottom" : "nav-item"
            }
            onClick={() => {
              setDisplayType("blog");
            }}
          >
            <p>博客</p>
            <span>{spaceUser.blog_count}</span>
          </div>
          <div
            className={
              displayType === "diary" ? "nav-item nav-item-bottom" : "nav-item"
            }
            onClick={() => {
              setDisplayType("diary");
            }}
          >
            <p>日志</p>
            <span>{spaceUser.diary_count}</span>
          </div>
          <div
            className={
              displayType === "picture"
                ? "nav-item nav-item-bottom"
                : "nav-item"
            }
            onClick={() => {
              setDisplayType("picture");
            }}
          >
            <p>相册</p>
            <span>{spaceUser.picture_count}</span>
          </div>
          {displayType === "diary" && (
            <div>
              <Popover
                visible={popVisible}
                onVisibleChange={handleVisibleChange}
                content={diaryAddContent}
                title="日志添加"
                placement="rightTop"
                trigger="click"
              >
                <PlusOutlined />
              </Popover>
            </div>
          )}
          {displayType === "blog" && (
            <div>
              <Tooltip title="写博客">
                <a href="/blog/index" rel="noreferrer">
                  <PlusOutlined />
                </a>
              </Tooltip>
            </div>
          )}
        </div>
        <div className="main-body">{a}</div>
      </div>
    </Layout>
  );
};
const MainBody = (props: any) => {};

export default Space;
