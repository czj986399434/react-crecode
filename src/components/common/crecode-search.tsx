import {
  SearchOutlined,
  UserOutlined,
  VerticalRightOutlined,
} from "@ant-design/icons";
import { Avatar, Input, List, Tabs } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { myHttp } from "../../api";
import style from "../../styles/search.module.scss";
export const CrecodeSearch = (props: any) => {
  const [inputWidth, setInputWidth] = useState(200);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <div
      className={style.search}
      style={{
        width: inputVisible ? inputWidth + 60 + "px" : "40px",
        borderRadius: inputVisible ? 0 : "40px",
      }}
    >
      <Input
        className={style.input}
        bordered={false}
        value={searchValue}
        placeholder="用户/博客/日志/作品"
        onChange={(e: any) => {
          setSearchValue(e.target.value);
        }}
        style={{
          width: inputVisible ? inputWidth + "px" : 0,
        }}
      ></Input>

      <div
        className={style.a}
        style={{
          background: inputVisible ? "#ddd7cd" : "#dde2eb",
          borderRadius: inputVisible ? 0 : "35px",
        }}
      >
        {inputVisible ? (
          <VerticalRightOutlined
            className={style["hide-button"]}
            onClick={() => {
              setInputVisible(false);
            }}
          />
        ) : (
          <SearchOutlined
            className={style.icon}
            onClick={() => {
              setInputVisible(true);
            }}
          />
        )}
      </div>

      <SearchResult
        inputVisible={inputVisible}
        style={{ minWidth: inputWidth + 60 + "px" }}
        searchValue={searchValue}
      ></SearchResult>
    </div>
  );
};
interface SearchResultProps {
  style: React.CSSProperties | undefined;
  searchValue: string;
  inputVisible: boolean;
}
const { TabPane } = Tabs;
const SearchResult = (props: SearchResultProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { searchValue, inputVisible } = props;
  const [leftVisible, setLeftVisible] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<string>("a");
  const [blogSearch, setBlogSearch] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState<any[]>([]);
  const [diarySearch, setDiarySearch] = useState<any[]>([]);
  useEffect(() => {
    if (searchValue.indexOf("'") === -1)
      myHttp
        .get("/search", {
          word: searchValue,
        })
        .then((data: any) => {
          const { result } = data;
          setBlogSearch(result.blogSearch);
          setDiarySearch(result.diarySearch);
          setUserSearch(result.userSearch);
        });
  }, [searchValue]);
  const boxStyle = useMemo(() => {
    if (inputVisible === true)
      return style["search-result"] + " " + style["appear"];
    else return style["search-result"] + " " + style["disappear"];
  }, [inputVisible]);
  useEffect(() => {
    if (inputVisible === true) setVisible(true);
    else {
      setTimeout(() => {
        setVisible(false);
      }, 800);
    }
  }, [inputVisible]);
  const hasDataBool = useMemo(() => {
    let flag = 0;
    if (blogSearch.length !== 0) flag++;
    if (userSearch.length !== 0) flag++;
    if (diarySearch.length !== 0) flag++;
    if (flag === 0) return false;
    return true;
  }, [blogSearch, userSearch, diarySearch]);
  return (
    <div
      className={boxStyle}
      style={{
        ...props.style,
        width: hasDataBool ? 400 : 260,
        display: visible ? "block" : "none",
      }}
    >
      <Tabs
        activeKey={activeKey}
        tabPosition={"left"}
        onChange={(activeKey1) => {
          setActiveKey(activeKey1);
        }}
        renderTabBar={(props, DefaultTabBar) => (
          <div
            onMouseLeave={() => {
              console.log("..sds");
              setLeftVisible(false);
            }}
            onMouseEnter={() => {
              console.log("..sds");
              setLeftVisible(true);
            }}
          >
            <DefaultTabBar
              {...props}
              style={{ width: leftVisible ? 100 : 40, transition: "all .4s" }}
            />
          </div>
        )}
        className={style["tab-left"]}
        style={{ minHeight: 220, maxHeight: 500, overflow: "auto" }}
      >
        <TabPane
          key="a"
          tab={
            <div className={style["left-item"]}>
              <UserOutlined style={{ color: "#000" }} />
              <span className={style["left-text"]}>用户</span>
            </div>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={userSearch}
            renderItem={(user) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={
                    <a
                      href={`/space?user_id=${user.user_id}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {user.nickname}({user.username})
                    </a>
                  }
                  description={user.autograph}
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane
          key="2"
          tab={
            <div className={style["left-item"]}>
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2224"
                width="15"
                height="15"
              >
                <path
                  d="M512 348.028928c-64.937984 0-124.901376 21.38112-173.221888 57.491456V146.255872c0-27.404288-26.079232-49.620992-58.232832-49.620992-32.147456 0-58.228736 22.216704-58.228736 49.620992V651.204608c0 2.799616 0.28672 5.541888 0.811008 8.214528 11.114496 149.829632 136.2432 267.945984 288.872448 267.945984 160.02048 0 289.681408-129.691648 289.681408-289.66912S672.02048 348.028928 512 348.028928z m0 479.862784c-90.0096 0-165.451776-62.5664-185.174016-146.5856a190.754816 190.754816 0 0 1-5.031936-43.608064c0-28.049408 6.080512-54.677504 16.984064-78.647296 29.93152-65.796096 96.251904-111.54432 173.221888-111.54432 105.070592 0 190.208 85.153792 190.208 190.193664 0 105.035776-85.137408 190.191616-190.208 190.191616z"
                  fill=""
                  p-id="2225"
                ></path>
              </svg>
              <span className={style["left-text"]}>博客</span>
            </div>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={blogSearch}
            renderItem={(blog) => {
              const blogTitle = blog.title as string;
              const titleHtml = blogTitle.replace(
                searchValue,
                `<strong>${searchValue}</strong>`
              );
              const titleValue = (
                <div dangerouslySetInnerHTML={{ __html: titleHtml }}></div>
              );
              const blogContent = blog.content as string;
              const contentHtml = blogContent.replace(
                searchValue,
                `<strong>${searchValue}</strong>`
              );
              const contentValue = (
                <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
              );
              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <img
                        src="/jay1.jpeg"
                        style={{ width: "30px", objectFit: "cover" }}
                      ></img>
                    }
                    title={
                      <a
                        href={`/blog/article?blog_id=${blog.blog_id}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {titleValue}
                      </a>
                    }
                    description={contentValue}
                  />
                </List.Item>
              );
            }}
          />
        </TabPane>
        <TabPane
          key="3"
          tab={
            <div className={style["left-item"]}>
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3026"
                width="15"
                height="15"
              >
                <path
                  d="M704 160 320 160 320 80.288C320 53.408 298.496 32 272 32 245.312 32 224 53.632 224 80.288L224 160 127.712 160C92.8 160 64 188.608 64 223.904L64 928.096C64 963.36 92.512 992 127.712 992L896.288 992C931.2 992 960 963.392 960 928.096L960 223.904C960 188.64 931.488 160 896.288 160L800 160 800 80.288C800 53.408 778.496 32 752 32 725.312 32 704 53.632 704 80.288L704 160ZM192 416.672 832 416.672 832 863.296 192 863.296 192 416.672ZM672 641.376 384 801.376 384 481.376 672 641.376Z"
                  p-id="3027"
                ></path>
              </svg>
              <span className={style["left-text"]}>日志</span>
            </div>
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={diarySearch}
            renderItem={(diary) => {
              const diaryTitle = diary.title as string;
              const abstractHtml = diaryTitle.replace(
                searchValue,
                `<strong>${searchValue}</strong>`
              );
              const abstractValue = (
                <div dangerouslySetInnerHTML={{ __html: abstractHtml }}></div>
              );

              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <img
                        src={diary.user.head_portrait}
                        style={{ width: "30px", objectFit: "cover" }}
                      ></img>
                    }
                    title={
                      <a
                        href={`/space?user_id=${diary.user.user_id}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {abstractValue}
                      </a>
                    }
                  />
                </List.Item>
              );
            }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};
