import Layout from "./layout";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { debounce, delegate, isElementInViewport, rgb } from "../utils";
import { myHttp } from "../api";
import { Input, notification, Popconfirm, Tooltip } from "antd";
import {
  CloseCircleOutlined,
  EditOutlined,
  LockOutlined,
  ReadOutlined,
  RollbackOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Mask } from "./common/mask";
import Modal from "antd/lib/modal/Modal";
import { DefalutContext } from "../App";
import { endLoading, startLoading } from "../store/action/loading";
interface CardProps {
  card: any;
  user_id: number;
  refresh: Function;
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
const Card = ({ card, user_id, refresh }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const {
    dispatch,
    defaultState: { loginUser },
  } = useContext(DefalutContext);
  const [inClient, setInClient] = useState<boolean>(true);
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const [moodEditVisible, setMoodEditVisible] = useState<boolean>(false);
  const [commentsVisible, setCommentsVisible] = useState<boolean>(false);
  const [contentVisible, setContentVisible] = useState<boolean>(false);
  const [readClass, setReadClass] = useState<string>(
    "read-more opacity-appear"
  );
  const [commentModalVisible, setCommentModalVisible] = useState<boolean>(
    false
  );
  const [lineVisible, setLineVisible] = useState<boolean>(false);
  const [moodEditValue, setMoodEditValue] = useState<string>("");
  const [addCommentContent, setAddCommentContent] = useState<string>("");
  const [readButtonVisible, setReadButtonVisible] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);
  const [maskCardStyle, setMaskCardStyle] = useState<React.CSSProperties>({});
  const [
    maskSmallCardStyle,
    setMaskSmallCardStyle,
  ] = useState<React.CSSProperties>({});
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
  const addComment = () => {
    myHttp
      .post("/comment/add", {
        diary_id: card.diary_id,
        user_id: loginUser.user_id,
        content: addCommentContent,
      })
      .then(() => {
        refresh();
      });
    setCommentModalVisible(false);
  };
  const updateDiary = (params: any) => {
    dispatch(startLoading());
    myHttp
      .post("/diary/update", params)
      .then(() => {
        refresh();
        dispatch(endLoading());
      })
      .catch(() => {
        dispatch(endLoading());
      });
  };
  const deleteDiary =()=>{
    myHttp.post('/diary/delete',{
      diary_id:card.diary_id
    }).then(()=>{
      refresh();
    })
  }
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
            transform: "translate(-230px,-100px)",
          });
          setMaskSmallCardStyle({
            opacity: 0,
          });
        }, 1000);
        setTimeout(() => {
          setMaskCardStyle((style: any) => {
            return { ...style, maxHeight: "100%" };
          });
        }, 2000);
      }
    );
    return () => {
      window.removeEventListener("scroll", () => {});
      cardRef.current?.removeEventListener("click", () => {});
    };
  }, []);
  const cardClass = useMemo(() => {
    let classArr = ["card", "borderRadius1"];
    if (Number(card.open) === 0) classArr.push("close-color");
    if (inClient) classArr.push("aniCA");
    else classArr.push("transparent");
    return classArr.join(" ");
  }, [inClient, card.open]);
  return (
    <div className={cardClass} ref={cardRef}>
      {contentVisible && (
        <Mask
          onClick={(e) => {
            setContentVisible(false);
            e.stopPropagation();
            setMaskSmallCardStyle({
              opacity: 1,
            });
          }}
        >
          <div className="card mask-card" style={maskCardStyle}>
            <h1 className="borderRadius2" style={maskSmallCardStyle}>
              {card.date.split(" ")[0]}
            </h1>
            <div
              className="borderRadius2 mood"
              onMouseEnter={() => {
                setButtonVisible(true);
              }}
              style={{
                ...maskSmallCardStyle,
                // backgroundImage: `linear-gradient(to right,red,blue)`,
              }}
            ></div>
            <span>{card.content}</span>
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
        {user_id === loginUser.user_id && buttonVisible && (
          <div className="mood-buttons">
            <EditOutlined
              className="mood-edit mood-button"
              onClick={() => {
                // editMood();
                notification.info({
                  message: '日志写实',
                  description:
                    '暂不提供修改功能',
                });
              }}
            />
            <Popconfirm
              title="删除后不可还原，谨慎操作"
              onConfirm={deleteDiary}
              okText="是"
              cancelText="否"
            >
              <CloseCircleOutlined className="mood-delete mood-button" />
            </Popconfirm>
            
            {/* <RollbackOutlined
              className="mood-button "
              onClick={() => {
                setButtonVisible(false);
              }}
            /> */}
            {card.open ? (
              <UnlockOutlined
                className="mood-button"
                onClick={() => {
                  updateDiary({ diary_id: card.diary_id, open: "0" });
                }}
              />
            ) : (
              <LockOutlined
                className="mood-button"
                onClick={() => {
                  updateDiary({ diary_id: card.diary_id, open: "1" });
                }}
              />
            )}
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
        onClick={() => {
          setCommentModalVisible(true);
        }}
        onMouseEnter={() => {
          getComments();
        }}
        onMouseLeave={() => {
          leaveComments();
        }}
      >
        <p>{card.abstract}</p>
      </div>
      <Modal
        title="竟然被你找到评论的入口"
        visible={commentModalVisible}
        onOk={addComment}
        onCancel={() => {
          setCommentModalVisible(false);
        }}
      >
        <Input
          value={addCommentContent}
          onChange={(e) => {
            setAddCommentContent(e.target.value);
          }}
        ></Input>
      </Modal>
    </div>
  );
};
interface DiaryProps {
  user_id: number;
}
const Diary = (props: DiaryProps) => {
  const { user_id } = props;
  const [cards, setCards] = useState<any>([]);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
  const {
    dispatch,
    defaultState: { loginUser },
  } = useContext(DefalutContext);
  const [showStoreList, setShowStoreList] = useState<any>(
    cards.map((card: any, index: any) => {
      return {
        show: false,
      };
    })
  );
  const refresh = () => {
    setRefreshFlag((refreshFlag) => {
      return !refreshFlag;
    });
  };
  useEffect(() => {
    myHttp
      .get("/diary/getSelfAll", {
        user_id,
      })
      .then((data: any) => {
        if(Number(user_id)===Number(loginUser.user_id))
        setCards(data.result.list);
        else 
        setCards(data.result.list.filter((item:any)=>{
             return item.open.toString()==='1'
        }))
      });
  }, [refreshFlag]);
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
                <Card card={card} user_id={user_id} refresh={refresh}></Card>
                {Blank}
              </li>
            );
          } else {
            return (
              <li key={card.diary_id}>
                {Blank}
                <Card card={card} user_id={user_id} refresh={refresh}></Card>;
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Diary;
