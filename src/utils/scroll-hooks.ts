import { useEffect, useState } from "react";

export const useScrollBottom = (defaultBool?:boolean) => {
  const [bottomBool, setBottomBool] = useState<boolean>(defaultBool||false);
  const getScrollTop = () => {
    var scrollTop = 0,
      bodyScrollTop = 0,
      documentScrollTop = 0;
    if (document.body) {
      bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
      documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop =
      bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  };
  const getScrollHeight = () => {
    var scrollHeight = 0,
      bodyScrollHeight = 0,
      documentScrollHeight = 0;
    if (document.body) {
      bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
      documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight =
      bodyScrollHeight - documentScrollHeight > 0
        ? bodyScrollHeight
        : documentScrollHeight;
    return scrollHeight;
  };
  const getWindowHeight = () => {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
      windowHeight = document.documentElement.clientHeight;
    } else {
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  };
  useEffect(()=>{
    window.onscroll = () => {
        if (getScrollTop() + getWindowHeight() === getScrollHeight()) {
          console.log("已经到最底部了！!");
          setBottomBool(true);
        }
      };
      return ()=>{
          window.removeEventListener('scroll',()=>{})
      }
  },[])
  return {bottomBool, setBottomBool};
};
