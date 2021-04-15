import { Table, Tag, Space, Input, TablePaginationConfig } from "antd";
import style from "./index.module.scss";
import { data } from "../../constants/backstage";
import { useEffect, useMemo, useState } from "react";
import { myHttp } from "../../api";
import { defaultTags } from "../../constants/tag";
const { Column, ColumnGroup } = Table;
const limit = 10;
const BackstageBlog = () => {
  const [str, setStr] = useState<string>("");
  const [blogList, setBlogList] = useState<any[]>([]);
  const [start, setStart] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
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
              {tags.map((tag) => {
                let color = "#87d068";
                const idx = defaultTags.findIndex((obj) => {
                  return obj.name === tag.name;
                });
                if (idx !== -1) color = defaultTags[idx].color;
                return (
                  <Tag
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
              <a>删除</a>
            </Space>
          )}
        />
        
      </Table>
    </div>
  );
};

export default BackstageBlog;
