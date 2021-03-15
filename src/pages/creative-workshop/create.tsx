
import Layout from '../../components/layout'
import { useState, useEffect, useRef, useMemo } from 'react'
import { Input,Button, message } from 'antd';
import {transfer} from '../../utils/textarea-transfer'
import axios from 'axios'
import {
  SyncOutlined,
} from '@ant-design/icons';
import { useGlobal } from '../../utils/context-hooks';
const { TextArea } = Input;
type CodeType = 'css' | 'js' | 'html'
const Create = () => {
  const [html_code, sethtml_code] = useState("<div class='b'>请创作</div>")
  const [js_code,setjs_code]=useState<string>('')
  const [css_code,setcss_code]=useState<string>('')
  const cssRef = useRef<HTMLStyleElement>(null)
  const jsRef = useRef<HTMLScriptElement>(null)
  const {dispatch,defaultState:{loginUser}}=useGlobal()
  //需要转换成闭包，因为每次执行代码script都会运行，会保留变量，会出现变量重复声明问题
  const realjs_code=useMemo(()=>{
        return `( function(){${js_code}} )()`
  },[js_code])
  const mainRef=useRef<HTMLDivElement>(null)
  const publish=()=>{
    if(loginUser.user_id){
      axios({
        method:'post',
        url:'...',
        data:{
          js_code,
          css_code,
          html_code,
          name:'1234',
          user_id:loginUser.user_id
        }
      }).then(data=>{
        if(data.data.status===200) message.success(data.data.message)
        else message.warning(data.data.message)
      })
    }else{

    }
    
  }
  const runJs=()=>{
    const curJs=document.getElementById('script-code') ;
    const main=mainRef.current as HTMLDivElement;
    if(curJs)main.removeChild(curJs)
    const js=document.createElement('script');
    const node =document.createTextNode(realjs_code);
    js.appendChild(node)
    js.id='script-code'
    main.appendChild(js)
  }
  const changeCode = (e: any, type: CodeType) => {
    switch (type) {
      case 'html':
        sethtml_code(e.target.value)
        console.log(e.target.value)
        break
      case 'css':
        console.log(e.target.value)
        
        setcss_code(transfer(e.target.value))  
        break
      case 'js':
            setjs_code(e.target.value);
          //  setInterval(()=>{
          //    console.log('... 1')
          //  },1000)
    }

  }
   useEffect(() => {
    const css = cssRef.current as HTMLStyleElement;
    css.innerText = css_code
    console.log(css)
   }, [css_code]);
  return (
    <Layout>
      <style className='css-code' ref={cssRef}></style>
      <div className='create' ref={mainRef}>
        <div className='cards'>
        <div className='html-area card'><TextArea placeholder={'html代码'} rows={10} value={html_code} onChange={(e) => {
          changeCode(e, 'html')
        }} /></div>
        <div className='css-area card' ><TextArea placeholder={'css代码'} rows={10} onChange={(e) => {
          changeCode(e, 'css')
        }} /></div>
        <div className='js-area card' ><TextArea className='text-area'  placeholder={'js代码'} rows={10} onChange={(e) => {
          changeCode(e, 'js')
        }} />
         <SyncOutlined onClick={()=>{
          runJs()
        }} className='run-js' />
      </div>
        </div>
        <div className='show' dangerouslySetInnerHTML={{ __html: html_code }}></div>
        <script id='script-code' ref={jsRef}></script>
       <Button onClick={()=>{
         publish()
       }}>发布</Button>
      </div>

    </Layout>
  )
}

export default Create
