import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import React, { useContext } from "react";
import { myHttp } from "../../api";
import { DefalutContext } from "../../App";
import style from "./buble-box.module.scss";
interface Props {
  message: any;
  refresh:Function
}
const BubbleBox = (props: Props) => {
  const { message,refresh } = props;
  const {
    dispatch,
    defaultState: { loginUser },
  } = useContext(DefalutContext);
  const changeReadFlag = (readBool: number) => {
    myHttp.post("/message/update", {
      message_id: message.message_id,
      read: readBool,
    }).then(()=>{
        refresh()
    })
  };
  return (
    <div className={style.container}>
      <Tag
        style={{
          background: "#DADADA",
          color: "#fff",
        }}
      >
        {message.date}
      </Tag>
      <div className={style["bubble-box"]}>
        <span>{message.content}</span>
        {message.read === 1 ? (
          <span
            style={{ color: "#98E165", cursor: "pointer" }}
            onClick={() => {
              changeReadFlag(0);
            }}
          >
            <CheckCircleOutlined style={{ marginRight: "5px" }} />
            已读
          </span>
        ) : (
          <span
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => {
              changeReadFlag(1);
            }}
          >
            <InfoCircleOutlined style={{ marginRight: "5px" }} />
            未读
          </span>
        )}
      </div>
    </div>
  );
};
export default BubbleBox;
