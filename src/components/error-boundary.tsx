import React from 'react'
interface Iprops{}
interface Istate{
    hasError:boolean
}
class ErrorBoundary extends React.Component<Iprops,Istate> {
    constructor(props:any) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error:any) {
      // 更新 state 使下一次渲染能够显示降级后的 UI
      return { hasError: true };
    }
  
  
    render() {
      console.log(this.state.hasError)
      if (this.state.hasError) {
        // 你可以自定义降级后的 UI 并渲染
        
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }
  export default ErrorBoundary