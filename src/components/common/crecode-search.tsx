import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useState } from "react";
import style from "../../styles/search.module.scss";
export const CrecodeSearch = (props: any) => {
  const [inputWidth, setInputWidth] = useState(200);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  return (
    <div
      onBlur={() => {
        setInputVisible(false);
      }}
      onMouseEnter={() => {
        setInputVisible(true);
      }}
      className={style.search}
      style={{
        width: inputVisible ? inputWidth + 60 + "px" : "40px",
      }}
    >
      <Input
        className={style.input}
        bordered={false}
        style={{
          width: inputVisible ? inputWidth + "px" : 0,
        }}
      ></Input>
      <div
        className={style.a}
        style={{
          background: inputVisible ? "#ddd7cd" : "#dde2eb",
        }}
      >
        <SearchOutlined className={style.icon} />
      </div>
    </div>
  );
};
