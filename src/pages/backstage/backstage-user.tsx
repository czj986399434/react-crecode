import { Table, Tag, Space, Input, TablePaginationConfig } from "antd";
import style from "./index.module.scss";
import { data } from "../../constants/backstage";
import { useEffect, useMemo, useState } from "react";
import { myHttp } from "../../api";
const { Column, ColumnGroup } = Table;
const limit = 10;
const BackstageUser = () => {
  const [str, setStr] = useState<string>("");
  const [userList, setUserList] = useState<any[]>([]);
  const [start, setStart] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  useEffect(() => {
    if (str.indexOf("'") === -1)
      myHttp
        .get("/user/adminSearch", { str, limit, start })
        .then((data: any) => {
          if (data.result) {
            setUserList(data.result.list);
            setTotalCount(data.result.totalCount);
          }
        });
  }, [str,start]);
  return (
    <div>
      <Input
        value={str}
        onChange={(e) => {
          setStr(e.target.value);
        }}
      ></Input>
      <Table
        dataSource={userList}
        pagination={{
          position: ["bottomCenter"],
          current: start,
          pageSize: limit,
          total: totalCount,
          showQuickJumper: true,
          showTotal: (total) => `共${total}个`,
          onChange: (page, pageSize) => {
            setStart(page);
          },
        }}
      >
        <ColumnGroup title="Name">
          <Column title="名称" dataIndex="username" key="username" />
          <Column title="昵称" dataIndex="nickname" key="nickname" />
        </ColumnGroup>
        <Column title="座右铭" dataIndex="autograph" key="autograph" />
        <Column
          title="头像"
          dataIndex="head_portrait"
          key="head_portrait"
          render={(val, record) => {
            return (
              <img
                src={`http://qiniu.crecode.cn/${val}`}
                className={style.avator}
                alt="头像"
              ></img>
            );
          }}
        />
        <Column title="user_id" dataIndex="user_id" key="user_id" />
        <Column
          title="Action"
          key="action"
          render={(text, record: any) => (
            <Space size="middle">
              <a
                href={`/space?user_id=${record.user_id}`}
                rel="noreferrer"
                target="_blank"
              >
                进入主页
              </a>
              <a>封禁</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default BackstageUser;
