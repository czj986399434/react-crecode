import Layout from "./layout";
import { useEffect, useMemo, useRef, useState } from "react";
import { debounce, isElementInViewport } from "../utils";
interface CardProps {
  card: any;
}
const Card = ({ card }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inClient, setInClient] = useState<boolean>(true);
  const handleScroll = () => {
    if (isElementInViewport(cardRef.current as HTMLDivElement))
      setInClient(true);
    else setInClient(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll, 200), true);
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
  return (
    <div
      className={
        inClient ? "aniCA card borderRadius1" : "card borderRadius1 transparent"
      }
      ref={cardRef}
    >
      <h1 className="borderRadius2">{card.cardDate}</h1>
      <h2 className="borderRadius2">{card.cardTitle}</h2>
      <div className="cardBody borderRadius1">
        <p>{card.cardContent}</p>
      </div>
    </div>
  );
};
const Diary = () => {
  const cards = [
    {
      cardDate: "2020-09-20",
      cardTitle: "sdsdsds",
      cardContent: "笨蛋",
    },
    {
      cardDate: "2020-09-20",
      cardTitle: "sdsdsds",
      cardContent: "笨蛋",
    },
    {
      cardDate: "2020-09-20",
      cardTitle: "sdsdsds",
      cardContent: "笨蛋",
    },
    {
      cardDate: "2020-09-20",
      cardTitle: "sdsdsds",
      cardContent: "笨蛋",
    },
    {
      cardDate: "2020-09-20",
      cardTitle: "sdsdsds",
      cardContent: "笨蛋",
    },
  ];
  const [showStoreList, setShowStoreList] = useState<any>(
    cards.map((card, index) => {
      return {
        show: false,
      };
    })
  );

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
        {cards.map((card, index) => {
          const Blank = (
            <div
              // className={
              //   showStoreList[index]
              //     ? "content content-more"
              //     : "content content-hidden"
              // }
              className='empty-content'
              onClick={() => {
                let list = showStoreList.map((item: boolean, idx: number) => {
                  return index === idx ? !item : item;
                });
                setShowStoreList([...list]);
              }}
            >
              
            </div>
          );
          if (index % 2 === 0) {
            return (
              <li key={index}>
               <Card card={card}></Card>
                {Blank}
              </li>
            );
          } else {
            return (
              <li key={index}>
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
