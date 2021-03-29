import { Col, Row } from "antd";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAdapt } from "../utils/adapt-hooks";

const Footer = (props: any) => {
    let footerContentRef=useRef<HTMLDivElement>(null)
    const [bodyWidth,bodyHeight]=useAdapt()
    useEffect(() => {
        let desW = 1280;
        let content=footerContentRef.current as HTMLDivElement ;
        if(bodyWidth / desW < 0.5) {
           
            content.style.padding = "0px";
            content.style.paddingLeft = "16px";
            content.style.paddingRight = "16px";
          } else {
            
            content.style.paddingLeft = "48px";
            content.style.paddingRight = "48px";
            // console.log(devH);
          };
        return () => {
            
        };
    }, []);
  return (
    <div className="footer" ref={footerContentRef}>
      <Row className="footer-content" >
        <Col xs={24} sm={24} md={7} lg={7} xl={7}>
          <div className="footer-main" style={{fontFamily: 'Hiragino Sans GB'}}>
            <h6 style={{lineHeight: '4em',marginBottom: 0, fontSize: '18px'}}>
              社区
            </h6>
            <ul style={{listStyle: 'none', paddingLeft: 0, textDecoration: 'none'}}>
              <li>
                <Link to={{ pathname: "" }}>博客中心</Link>
              </li>
              <li>
                <Link to={{ pathname: "" }}>个人空间</Link>
              </li>
              <li>
                <Link to={{ pathname: "" }}>关于我们</Link>
              </li>
              <li>
                <Link to={{ pathname: "" }}>留言板</Link>
              </li>
              <li>
                <Link to={{ pathname: "" }}>意见反馈</Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col xs={24} sm={24} md={7} lg={7} xl={7}>
          <div
            className="footer-main"
            style={{ fontFamily: "Hiragino Sans GB" }}
          >
            <h6
              style={{ lineHeight: "4em", marginBottom: 0, fontSize: "18px" }}
            >
              资源
            </h6>
            <ul
              style={{
                listStyle: "none",
                paddingLeft: 0,
                textDecoration: "none",
              }}
            >
              <li className="creative">
                <Link to={{ pathname: "" }}>创意工坊</Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <div
            className="footer-logo"
            style={{ fontFamily: "Hiragino Sans GB" }}
          >
            <h2 style={{ marginTop: "26px" }}>
              <a href="/index" style={{ textDecoration: "none" }}>
                <span style={{ fontSize: "36px" }}>CreCode</span>
                <p style={{ fontSize: "16px", margin: "0px" }}>creative code</p>
              </a>
            </h2>
            <div>
              <p className="ml-1 mb-0">
                <a
                  href="http://www.miit.gov.cn/"
                  target="_blank"
                  style={{ color: "#000" }}
                  
                >
                  蜀ICP备19028524号-2
                </a>
              </p>
              <p className="ml-1 mb-0">
                <a href="https://github.com/WeilinerL">
                  <img
                    width="25"
                    height="25"
                    src="https://github.blog/wp-content/uploads/2008/12/forkme_left_green_007200.png?resize=149%2C149"
                    className="attachment-full size-full"
                    alt="Fork me on GitHub"
                    data-recalc-dims="1"
                  />
                </a>
                weilinerL@163.com
                <br />
                <a href="https://github.com/czj986399434">
                  <img
                    width="25"
                    height="25"
                    src="https://github.blog/wp-content/uploads/2008/12/forkme_left_green_007200.png?resize=149%2C149"
                    className="attachment-full size-full"
                    alt="Fork me on GitHub"
                    data-recalc-dims="1"
                  />
                </a>
                986399434@qq.com
              </p>
              <span className="ml-1">
                <a href="/" style={{ color: "#000" }}>
                  &copy; 2019 CreativeCode.
                </a>
              </span>
              <p style={{ margin: 0 }}>All Rights Reserved. CreCode版权所有</p>
            </div>
            <Row>
              <span style={{ fontSize: "10px", margin: 0 }}>
                起始于-StartAt: 2019/10/09
              </span>
              <span style={{ fontSize: "10px", margin: 0 }}>
                版本号-Version: 2.0.0
              </span>
            </Row>
            <Row>
              <span style={{fontSize: "80%", fontFamily: 'Hiragino Sans GB', marginRight: '6px'}}>
                推荐浏览器
              </span>
              <img
                style={{ width: "25px", height: "25px" }}
                src="/GoogleChrom.png"
                alt="Google"
              ></img>
              <img
                style={{ width: "25px", height: "25px" }}
                src="/FireFox.png"
                alt="FireFox"
              ></img>
              <img
                style={{ width: "25px", height: "25px" }}
                src="/IE.png"
                alt="IE"
              ></img>
              <img
                style={{ width: "25px", height: "25px" }}
                src="/Safari.png"
                alt="Safari"
              ></img>
              <img
                style={{ width: "25px", height: "25px" }}
                src="/Opera.png"
                alt="Opera"
              ></img>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
