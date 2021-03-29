import Layout from "../../components/layout";
import { transfer } from "../../utils/textarea-transfer";
import React, { useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import { PageHeader, Pagination, Tooltip, message, Carousel } from "antd";
import {
  CopyOutlined,
  ExpandAltOutlined,
  StarTwoTone,
} from "@ant-design/icons";
import axios from "axios";
import { contentStyle } from "../../constants/creative-workshop";
const CreativeWorkshop = () => {
  const [limit, setLimit] = useState(10);
  const [start, setStart] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [workList, setWorkList] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("/work/get", {
        params: {
          limit,
          start,
        },
      })
      .then((data) => {
        const { result } = data.data;
        setWorkList(result.list);
        setTotalCount(result.totalCount);
      });
  }, [start, limit]);
  return (
    <Layout>
      <div className="creative-workshop">
        <PageHeader
          className="site-page-header"
          title="作品概览"
          subTitle="make it beautiful"
        />
        <a href="creative-workshop/create">
          <img src="/editor.png" className="icon" />
        </a>
        <div className="container">
          <Carousel effect="fade" dotPosition={"bottom"} dots={true}>
            {workList.map((work) => (
              <div>
                <h3 style={contentStyle}>
                  <Work work={work} key={work.work_id}></Work>
                  {/* <iframe src='../../../public/smile_face.html'></iframe> */}
                </h3>
              </div>
            ))}
          </Carousel>
        </div>
        <Pagination
          current={start}
          total={totalCount}
          onChange={(page) => {
            setStart(page);
          }}
          className="pageination"
        />
      </div>
    </Layout>
  );
};
const Work = (props: any) => {
  const { work, data } = props;
  const [src, setSrc] = useState("");
  const [code, setCode] = useState("");
  const [codeVisible, setCodeVisible] = useState(false);
  const copyCode = () => {
    copy(code);
    message.success("复制成功");
  };
  useEffect(() => {
    const fileCode = document.createElement("html");
    const headCode = document.createElement("head");
    const style = document.createElement("style");
    const bodyCode = document.createElement("body");
    const script = document.createElement("script");
    const jsNode = document.createTextNode(work.js_code);
    //赋值
    bodyCode.innerHTML = work.html_code;
    style.innerText = work.css_code;
    script.appendChild(jsNode);
    //插入
    headCode.appendChild(style);
    bodyCode.appendChild(script);
    fileCode.appendChild(headCode);
    fileCode.appendChild(bodyCode);
    setCode(fileCode.outerHTML);
    //需要transfer是因为textarea会把换行符变成<br>
    const blob = new Blob([transfer(fileCode.outerHTML)], {
      type: "text/html;charset=utf-8",
    });
    setSrc(window.URL.createObjectURL(blob));
  }, []);
  return (
    <div className="show-card" >
      <h1>{work.name}</h1>
      <iframe
        src={src}
        frameBorder="0"
        id="iframeSmile"
        scrolling="no"
        title={work.name}
        style={{ height: "100%", width: "100%" }}
      ></iframe>
      <div className="hover-buttons">
        <Tooltip title="复制代码">
          <CopyOutlined
            style={{
              margin: "0 10px",
              fontSize: "20px",
              cursor: "pointer",
              color:'#afafaf'
            }}
            onClick={() => {
              copyCode();
            }}
          />
        </Tooltip>
        <Tooltip title={codeVisible?'关闭代码':"展开代码"}>
          <ExpandAltOutlined
            style={{
              margin: "0 10px",
              fontSize: "20px",
              cursor: "pointer",
              color:'#afafaf'
            }}
            onClick={() => {
              setCodeVisible((preV) => {
                return !preV;
              });
            }}
          />
        </Tooltip>
      </div>
      {codeVisible && (
        <div className="code-display">
          <h1>html_code</h1>
          <span>{work.html_code}</span>
          <h1>css_code</h1>
          <span>{work.css_code}</span>
          <h1>js_code</h1>
          <span>{work.js_code}</span>
        </div>
      )}
    </div>
  );
};
export default CreativeWorkshop;
