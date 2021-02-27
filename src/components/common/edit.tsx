import { Popover,Modal } from 'antd'
import { SettingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DefalutContext } from '../../App'
import { useState, useEffect, useContext } from 'react'
const Edit = (props:any) => {
    const { user_id } = props
    const { dispatch, defaultState: { loginUser } } = useContext(DefalutContext) as any;
    const [show, setShow] = useState(true)
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
    const toDelete=()=>{
        props.toDelete()
    }
    const toEdit=()=>{
        props.toEdit()
    }
    let content;
    if (loginUser.user_id === user_id) {
        content = (<div className='edit'>
            <p> <EditOutlined onClick={()=>{
               toEdit()
            }}/>编辑</p>
            <p><DeleteOutlined onClick={()=>{
               toDelete()
            }}/>删除</p>
        </div>)
    } else if (loginUser.type === 'admin') {
        content = (<div className='edit'>
            <p><DeleteOutlined onClick={()=>{
               toDelete()
            }}/>删除</p>
        </div>)
    }
    useEffect(() => {
        if (loginUser.user_id === user_id) {
        } else if (loginUser.type === 'admin') {
        } else {
            setShow(false)
        }
    }, []);

    return (show ? <Popover content={content} trigger="click">
        <SettingOutlined />
        
    </Popover> : <></>)
}
export default Edit