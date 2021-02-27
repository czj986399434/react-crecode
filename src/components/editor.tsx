
// import E from 'wangeditor';
import { useEffect,useRef } from 'react';
const Editor = () => {
  const editRef=useRef(null);
  // useEffect(()=>{
  //    const elem=editRef.current;
  //    const editor=new E(elem);
  //    editor.create();
  // },[])
  return (
      <div className='edit-select' ref={editRef}>
      </div>
  )
}

export default Editor
