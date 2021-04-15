import { Popover, Modal } from "antd";
import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { DefalutContext } from "../../App";
import React, { useState, useEffect, useContext } from "react";
import { myHttp } from "../../api";
const Edit = (props: any) => {
  const { user_id,blog_id } = props;
  const {
    dispatch,
    defaultState: { loginUser },
  } = useContext(DefalutContext) as any;
  const [show, setShow] = useState(true);
  // const [deleteVisible,setDeleteVisible]=useState(false)
  // const [deleteLoading,setDeleteLoading]=useState(false)
  // const deleteConfirm=()=>{
  //      props.deleteConfirm()
  // }
  // <Modal
  //     title="Title"
  //     visible={deleteVisible}
  //     onOk={deleteConfirm}
  //     confirmLoading={confirmLoading}
  //     onCancel={handleCancel}
  //   >
  //     <p>{modalText}</p>
  //   </Modal>
  const toDelete = () => {
    props.toDelete();
  };
  const toEdit = () => {
   myHttp.get('/blog/refresh',{
       blog_id
   })
  };
  const content = (
    <div className="edit">
      <p
        onClick={() => {
          toEdit();
        }}
      >
        <EditOutlined />
        编辑
      </p>
      <p
        onClick={() => {
          toEdit();
        }}
      >
        <UndoOutlined />
        刷新
      </p>
      <p
        onClick={() => {
          toDelete();
        }}
      >
        <DeleteOutlined />
        删除
      </p>
    </div>
  );
  useEffect(() => {
    if (loginUser.user_id === user_id) {
    } else {
      setShow(false);
    }
  }, []);

  return show ? (
    <Popover content={content} trigger="click">
      <SettingOutlined />
    </Popover>
  ) : (
    <></>
  );
};
export default Edit;
