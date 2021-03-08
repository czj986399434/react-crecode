import E from "wangeditor";
import { useEffect, useRef, useState } from "react";
let editor = null as any;
const Editor = (props: any) => {
  const { content, setContent } = props;
  useEffect(() => {
    // 注：class写法需要在componentDidMount 创建编辑器
    editor = new E("#div1");

    editor.config.onchange = (newHtml: string) => {
      setContent(newHtml);
    };
    /**一定要创建 */
    editor.create();

    return () => {
      // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
      editor.destroy();
    };
  }, []);

  // 获取html方法1
  function getHtml() {
    alert(content);
  }
  return (
    <div className="editor" style={props.style}>
      <div id="div1" className="wangeditor"></div>
      <button onClick={getHtml}>获取html</button>
    </div>
  );
};

export default Editor;
