import Layout from "./layout";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { debounce, delegate, isElementInViewport, rgb } from "../utils";
import { myHttp } from "../api";
import { Input, Tooltip } from "antd";
import {
  CloseCircleOutlined,
  EditOutlined,
  ReadOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Mask } from "./common/mask";
interface CardProps {
  card: any;
}
const Comment = (props: any) => {
  const { comment, index } = props;
  const commentRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={commentRef}
      style={{
        transform: `translate(${index * 300}px,0px)`,
        color: `rgb${rgb()}`,
        animationDelay: `${index * 2}s`,
      }}
    >
      <div></div>
      <span>
        {comment.nickname}:{comment.content}
      </span>
    </div>
  );
};
const Card = ({ card }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inClient, setInClient] = useState<boolean>(true);
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const [moodEditVisible, setMoodEditVisible] = useState<boolean>(false);
  const [commentsVisible, setCommentsVisible] = useState<boolean>(false);
  const [contentVisible, setContentVisible] = useState<boolean>(false);
  const [readClass, setReadClass] = useState<string>(
    "read-more opacity-appear"
  );
  const [lineVisible, setLineVisible] = useState<boolean>(false);
  const [moodEditValue, setMoodEditValue] = useState<string>("");
  const [readButtonVisible, setReadButtonVisible] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);
  const [maskCardStyle, setMaskCardStyle] = useState<React.CSSProperties>({});
  const [maskSmallCardStyle,setMaskSmallCardStyle]=useState<React.CSSProperties>({});
  const handleScroll = () => {
    if (
      cardRef.current &&
      isElementInViewport(cardRef.current as HTMLDivElement)
    )
      setInClient(true);
    else setInClient(false);
  };
  const editMood = () => {
    setButtonVisible(false);
    setMoodEditVisible(true);
  };
  const cancalEdit = () => {
    setMoodEditVisible(false);
  };
  const leaveComments = () => {
    setCommentsVisible(false);
  };
  const getComments = () => {
    setLineVisible(true);
    setReadButtonVisible(true);
    setCommentsVisible(true);
    myHttp
      .get("/comment/getDiaryComments", { diary_id: card.diary_id })
      .then((data: any) => {
        setComments(data.result);
      });
  };
  const readMore = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setContentVisible(true);
  };
  useEffect(() => {
    setTimeout(() => {
      setReadClass("read-more rotate-y");
    }, 4000);
    //为啥加了这个就可以了呢
    return () => {
      setReadClass("read-more opacity-appear");
    };
  }, [readButtonVisible]);
  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll, 200), true);
    delegate(
      cardRef.current as Element,
      "click",
      ".read-more",
      (e: any, el: any) => {
        console.log(e.currentTarget.getBoundingClientRect());
        const { top, left } = e.currentTarget.getBoundingClientRect();
        setMaskCardStyle({
          position: "fixed",
          top: top - 30,
          left: left - 30,
        });
        setTimeout(() => {
          setMaskCardStyle({
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          });
          setMaskSmallCardStyle({
            opacity:0
          })
        }, 1000);
        console.log(el);
      }
    );
    return () => {
      window.removeEventListener("scroll", () => {});
      cardRef.current?.removeEventListener("click", () => {});
    };
  }, []);
  return (
    <div
      className={
        inClient ? "aniCA card borderRadius1" : "card borderRadius1 transparent"
      }
      ref={cardRef}
    >
      {contentVisible && (
        <Mask
          onClick={(e) => {
            setContentVisible(false);
            e.stopPropagation();
          }}
        >
          <div className="card mask-card" style={maskCardStyle}>
            <h1 className="borderRadius2" style={maskSmallCardStyle}>{card.date.split(" ")[0]}</h1>
            <div
              className="borderRadius2 mood"
              onMouseEnter={() => {
                setButtonVisible(true);
              }}
              style={
                {
                  ...maskSmallCardStyle
                  // backgroundImage: `linear-gradient(to right,red,blue)`,
                }
              }
            ></div>
          </div>
        </Mask>
      )}
      {lineVisible && <div className="vertical-line"></div>}
      {readButtonVisible && (
        <div className={readClass}>
          <Tooltip title="看正文">
            <ReadOutlined onClick={readMore} />
          </Tooltip>
        </div>
      )}
      <h1 className="borderRadius2">{card.date.split(" ")[0]}</h1>
      <div
        className="borderRadius2 mood"
        onMouseEnter={() => {
          setButtonVisible(true);
        }}
        style={
          {
            // backgroundImage: `linear-gradient(to right,red,blue)`,
          }
        }
      >
        {buttonVisible && (
          <div className="mood-buttons">
            <EditOutlined
              className="mood-edit mood-button"
              onClick={() => {
                editMood();
              }}
            />
            <CloseCircleOutlined className="mood-delete mood-button" />
            <RollbackOutlined
              className="mood-button "
              onClick={() => {
                setButtonVisible(false);
              }}
            />
          </div>
        )}
        {moodEditVisible && (
          <div>
            <RollbackOutlined
              onClick={() => {
                cancalEdit();
              }}
            />
            <Input
              onChange={(e) => {
                setMoodEditValue(e.target.value);
              }}
              value={moodEditValue}
              bordered={false}
            ></Input>
          </div>
        )}
      </div>
      <div className="danmu">
        {comments.map((comment: any, index: number) => {
          return (
            <Comment
              comment={comment}
              key={comment.comment_id}
              index={index}
            ></Comment>
          );
        })}
      </div>
      <div
        className={
          commentsVisible
            ? "cardBody borderRadius1 translucent"
            : "cardBody borderRadius1"
        }
        onMouseEnter={() => {
          getComments();
        }}
        onMouseLeave={() => {
          leaveComments();
        }}
      >
        <p>{card.abstract}</p>
      </div>
    </div>
  );
};
interface DiaryProps {
  user_id: number;
}
const Diary = (props: DiaryProps) => {
  const { user_id } = props;
  const [cards, setCards] = useState<any>([]);
  const [showStoreList, setShowStoreList] = useState<any>(
    cards.map((card: any, index: any) => {
      return {
        show: false,
      };
    })
  );
  useEffect(() => {
    myHttp
      .get("/diary/getSelfAll", {
        user_id,
      })
      .then((data: any) => {
        setCards(data.result.list);
      });
  }, []);
  useEffect(() => {
    setShowStoreList(
      cards.map(() => {
        return false;
      })
    );
  }, [cards.length]);
  return (
    <div className="diary">
      <ul>
        {cards.map((card: any, index: number) => {
          const Blank = (
            <div
              // className={
              //   showStoreList[index]
              //     ? "content content-more"
              //     : "content content-hidden"
              // }
              className="empty-content"
              onClick={() => {
                let list = showStoreList.map((item: boolean, idx: number) => {
                  return index === idx ? !item : item;
                });
                setShowStoreList([...list]);
              }}
            ></div>
          );
          if (index % 2 === 0) {
            return (
              <li key={card.diary_id}>
                <Card card={card}></Card>
                {Blank}
              </li>
            );
          } else {
            return (
              <li key={card.diary_id}>
                {Blank}
                <Card card={card}></Card>;
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Diary;
