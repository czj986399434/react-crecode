import Layout from "./layout";
import PreviewWindow from "./preview-window";
import { useState, useEffect } from "react";
import { myHttp } from "../api";
interface BasicProps {
  user_id: any;
}
const Basic = (props: BasicProps) => {
  const { user_id } = props;
  const [activeIdx, setActiveIdx] = useState(0);
  const [play, setPlay] = useState(false);
  const [refresh,setRefresh]=useState<boolean>(false)
  const [imgList, setImgList] = useState<any[]>([
  ]);
  const changeActiveIdx = (index: number) => {
    setActiveIdx(index);
  };
  const changePlay = () => {
    setPlay((play) => {
      return !play;
    });
  };
  useEffect(() => {
    let timer = setInterval(() => {
      setActiveIdx((idx) => {
        if (idx < imgList.length) idx++;
        if (idx == imgList.length) idx = 0;
        return idx;
      });
    }, 2000);
    if (!play) clearInterval(timer);
    return () => {
      clearInterval(timer);
    };
  }, [play]);
  useEffect(() => {
    myHttp
      .get("/picture/get", {
        user_id,
      })
      .then((data: any) => {
        if (data.result) setImgList(data.result.list);
      });
  }, [refresh]);
  return (
    <div className="pictures-basic">
      <div className="empty-box"></div>
      <img src={`http://qiniu.crecode.cn/${imgList[activeIdx]?.urlPath}`} alt='图片' />
      <PreviewWindow
        imgList={imgList}
        activeIdx={activeIdx}
        changeActiveIdx={changeActiveIdx}
        play={play}
        changePlay={changePlay}
        setRefresh={setRefresh}
        user_id={user_id}
      ></PreviewWindow>
      <div className="introduce"></div>
    </div>
  );
};

export default Basic;
