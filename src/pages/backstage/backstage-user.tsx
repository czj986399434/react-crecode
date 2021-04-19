import {
  Table,
  Tag,
  Space,
  Input,
  TablePaginationConfig,
  Button,
  Select,
  Modal,
  Row,
  Col,
} from "antd";
import style from "./index.module.scss";
import { data } from "../../constants/backstage";
import React, { useEffect, useMemo, useState } from "react";
import { myHttp } from "../../api";
const { Column, ColumnGroup } = Table;
const { Option } = Select;
const limit = 10;
const BackstageUser = () => {
  const [str, setStr] = useState<string>("");
  const [userList, setUserList] = useState([]);
  const [start, setStart] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>("info");
  const [formContent, setFormContent] = useState<string>("");
  const [messageRecord, setMessageRecord] = useState<any>({});
  const changeFormType = (value: any) => {
    setFormType(value);
  };
  const notify = () => {
    myHttp
      .post("/message/add", {
        user_id: messageRecord.user_id,
        type: formType,
        content: formContent,
      })
      .then(() => {
        initialForm();
      });
  };
  const initialForm = () => {
    setFormContent("");
    setFormType("info");
    setMessageRecord({});
  };
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
  }, [str, start]);

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
        <Column title="user_id" dataIndex="user_id" key="user_id" />
        <ColumnGroup title="Name">
          <Column title="名称" dataIndex="username" key="username" />
          <Column title="昵称" dataIndex="nickname" key="nickname" />
        </ColumnGroup>
        <Column title="座右铭" dataIndex="autograph" key="autograph" />
        <Column title="用户类型" dataIndex="type" key="type" />
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

        <Column
          title="Action"
          key="action"
          render={(text, record: any) => {
            return (
              <Space size="middle">
                <a
                  href={`/space?user_id=${record.user_id}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  进入主页
                </a>
                <Button
                  ghost
                  style={{ color: "#409eff" }}
                  onClick={() => {
                    setIsModalVisible(true);
                    setMessageRecord(record);
                  }}
                >
                  通知
                </Button>
              </Space>
            );
          }}
        />
      </Table>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={notify}>
        <Row gutter={[16, 16]}>
          <Col span={6}>类型</Col>
          <Col span={18}>
            <Select
              value={formType}
              style={{ width: 120 }}
              onChange={changeFormType}
            >
              <Option value="info">提示</Option>
              <Option value="warning">警告</Option>
              <Option value="success">成功</Option>
              <Option value="error">错误</Option>
            </Select>
          </Col>
          <Col span={6}>内容</Col>
          <Col span={18}>
            <Input
              value={formContent}
              onChange={(e) => {
                setFormContent(e.target.value);
              }}
            ></Input>
          </Col>
        </Row>
        
      </Modal>
    </div>
  );
};

export default BackstageUser;
