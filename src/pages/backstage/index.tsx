import { Menu, Button } from "antd";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useMemo, useState } from "react";
import React from "react";
import style from "./index.module.scss";
import BackstageBlog from "./backstage-blog";
import BackstageUser from "./backstage-user";

const { SubMenu } = Menu;

const Backstage = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectKeys] = useState<string[]>(["blog"]);
  const toggleCollapsed = () => {
    setCollapsed((bool) => {
      return !bool;
    });
  };
  const containerDisplay = useMemo(() => {
    switch (selectedKeys[0]) {
      case "statistics":
        return <div></div>;
      case "blog":
        return <BackstageBlog></BackstageBlog>;
      case "user":
        return <BackstageUser></BackstageUser>;
    }
  }, [selectedKeys]);
  return (
    <div className={style.backstage}>
      <div style={{ width: 256 }} className={style.menu}>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
        <Menu
          selectedKeys={selectedKeys}
          mode="inline"
          inlineCollapsed={collapsed}
          multiple={false}
          onSelect={({ item, key }) => {
            setSelectKeys([key as string]);
          }}
        >
          <Menu.Item key="statistics" icon={<PieChartOutlined />}>
            统计
          </Menu.Item>
          <SubMenu key="sub1" icon={<DesktopOutlined />} title="控制">
            <Menu.Item key="user">用户</Menu.Item>
            <Menu.Item key="blog">博客</Menu.Item>
            <Menu.Item key="diary">日记</Menu.Item>
            <Menu.Item key="work">作品</Menu.Item>
          </SubMenu>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Option 3
          </Menu.Item>
        </Menu>
      </div>
      <div className={style["backstage-container"]}>{containerDisplay}</div>
    </div>
  );
};

export default Backstage;
