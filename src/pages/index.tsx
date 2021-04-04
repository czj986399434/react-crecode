import Header from "../components/header";
import Footer from "../components/footer";
import style from "../styles/index.module.scss";
import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
const IndexPage = () => {
  const [middleFold, setMiddleFold] = useState(true);
  const [middleIndex, setMiddleIndex] = useState(0);
  const secondCardContent =
    "人生真的很短，不要活得悲观，该玩该疯该努力该成功，最后都是殊途同归，所以我们能做的，就是把生死之间的过程精彩地展开";
  useEffect(() => {
    setTimeout(() => {
      setMiddleFold(false);
    }, 1000);
  }, []);
  return (
    <div
      className={
        window.location.href === "http://localhost:3000/"
          ? "layout-index"
          : "layout"
      }
    >
      <div className={style["index-nav"]}>
        <span className={style.motto}>
          青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪
        </span>
        <DownOutlined className={style["arrow-down"]} />
      </div>
      <Header index={true}></Header>
      <div className={style["middle-container"]}>
        <div
          className={style.middle}
          onClick={() => {
            setMiddleFold((bool) => {
              return !bool;
            });
          }}
        >
          <div
            className={style["middle-card"]+' '+style['display-flex-column']}
            style={{
              transform: `translate(${middleFold ? "300px" : "0"},${
                middleFold ? "30px" : "0"
              })`,
              zIndex: 1,
            }}
          >
            <h3
              className={
                style["font-weight-fold"] + " " + style["font-size-big"]
              }
            >
              about me
            </h3>
            <h4 className={style["font-size-middle"]}>a</h4>
            <h4 className={style["font-size-middle"]}>码农,</h4>
            <h4 className={style["font-size-middle"]}>bà liǎo</h4>
            <h4 className={style["font-size-middle"]}>——但是欢迎你，陌生人</h4>
          </div>
          <div
            className={style["middle-card"]+' '+style['text-indent-two']}
            onClick={() => {
              setMiddleIndex(1);
            }}
            style={{
              zIndex: 2,
            }}
          >
            {secondCardContent.split("").map((word: any, index) => {
              return <Word index={index} word={word}></Word>;
            })}
            
          </div>
          <div
            className={style["middle-card"]}
            style={{
              transform: `translate(${middleFold ? "-300px" : "0"},${
                middleFold ? "-30px" : "0"
              })`,
              zIndex: 3,
            }}
          ></div>
        </div>
      </div>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};
interface WordProps {
  word: string;
  index: number;
}
const Word = (props: WordProps) => {
  const { index, word } = props;
  const [displayVisible, setDisplayVisible] = useState(false);
  setTimeout(() => {
    setDisplayVisible(true);
  }, 300 * index);
  return (
    <span
      className={style["ani-appear"]+' '+style['font-size-small']}
      style={{
       display:displayVisible?'inline':'none'
      }}
    >
      {word}
    </span>
  );
};
export default IndexPage;
