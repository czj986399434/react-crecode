import {
  Table,
  Tag,
  Space,
  Input,
  TablePaginationConfig,
  Popconfirm,
  Switch,
} from "antd";
import style from "./index.module.scss";
import { data } from "../../constants/backstage";
import React, { useEffect, useMemo, useState } from "react";
import { myHttp } from "../../api";
import { defaultTags } from "../../constants/tag";
import { useRefresh } from "../../utils/refresh-hooks";
const { Column, ColumnGroup } = Table;
const limit = 10;

const BackstageBlog = () => {
  const [str, setStr] = useState<string>("");
  const [blogList, setBlogList] = useState<any[]>([]);
  const [refreshFlag,refresh]=useRefresh()
  const [start, setStart] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [templateContent, setTemplateContent] = useState<string>("");
  const [deleteContent, setDeleteContent] = useState<string>("");
  const [deleteTempleteChecked, setDeleteTempleteChecked] = useState<boolean>(
    true
  );
  const onChange = (checked: boolean) => {
    setDeleteTempleteChecked(checked);
  };
  const deleteBlog = (record: any) => {
    const deletePromise = myHttp.post("/blog/delete", {
      blog_id: record.blog_id,
    });
    let noticePromise;
    if (record.user) {
      noticePromise = myHttp.post("message/add", {
        user_id: record.user?.user_id,
        type: "warning",
        content: deleteTempleteChecked
          ? `你的博客:博客id为${record.blog_id},博客名为${record.title},因"${templateContent}"已被我们删除，请整改后自行上传`
          : deleteContent,
      });
    }

    Promise.all([deletePromise,noticePromise]).then(()=>{
      setDeleteContent('')
      setTemplateContent('')
      refresh()
    })
  };
  const popTitle = (
    <div>
      <span style={{marginRight:5}}>开启模板</span><Switch checked={deleteTempleteChecked} onChange={onChange} />
      {deleteTempleteChecked ? (
        <div>
          <span>原因:</span>
          <Input
            value={templateContent}
            onChange={(e) => {
              setTemplateContent(e.target.value);
            }}
          ></Input>
        </div>
      ) : (
        <div>
           <span>输入:</span>
          <Input
            value={deleteContent}
            onChange={(e) => {
              setDeleteContent(e.target.value);
            }}
          ></Input>
        </div>
      )}
    </div>
  );
  useEffect(() => {
    if (str.indexOf("'") === -1)
      myHttp
        .get("/blog/adminSearch", { str, limit, start })
        .then((data: any) => {
          if (data.result) {
            setBlogList(data.result.list);
            setTotalCount(data.result.totalCount);
          }
        });
  }, [str, start,refreshFlag]);
  return (
    <div>
      <Input
        value={str}
        onChange={(e) => {
          setStr(e.target.value);
        }}
      ></Input>
      <Table
        dataSource={blogList}
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
        <Column title="blog_id" dataIndex="blog_id" key="blog_id" />
        <Column title="标题" dataIndex="title" key="title" />
        <Column title="时间" dataIndex="date" key="date" />
        <Column title="刷新时间" dataIndex="refresh_date" key="refresh_date" />
        <Column
          title="封面"
          dataIndex="coverImage"
          key="coverImage"
          render={(val, record) => {
            return (
              <img
                src={`http://qiniu.crecode.cn/${val}`}
                className={style.avator}
                alt="封面"
              ></img>
            );
          }}
        />

        <Column
          title="标签"
          key="tags"
          dataIndex="tags"
          render={(tags: any[]) => (
            <>
              {tags.map((tag, index) => {
                let color = "#87d068";
                const idx = defaultTags.findIndex((obj) => {
                  return obj.name === tag.name;
                });
                if (idx !== -1) color = defaultTags[idx].color;
                return (
                  <Tag
                    key={index}
                    color={color}
                    style={{
                      margin: "5px",
                    }}
                  >
                    {tag.name}
                  </Tag>
                );
              })}
            </>
          )}
        ></Column>
        <Column
          title="Action"
          key="action"
          render={(text, record: any) => (
            <Space size="middle">
              <a
                href={`/blog/article?blog_id=${record.blog_id}`}
                rel="noreferrer"
                target="_blank"
              >
                查看
              </a>
              <Popconfirm
                title={popTitle}
                onConfirm={() => {
                  deleteBlog(record);
                }}
              >
                <a>删除</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default BackstageBlog;
