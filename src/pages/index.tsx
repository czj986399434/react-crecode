import Header from '../components/header'
import Footer from '../components/footer'
import style from '../styles/index.module.scss'
const IndexPage = () => {
  return (<div className={window.location.href==='http://localhost:3000/'?"layout-index":'layout'}>
    <div className={style['index-nav']}>
      <span className={style.motto}> 青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
    </div>
    <Header index={true}></Header>
  <footer>
    <Footer></Footer>
  </footer>
</div>)
};

export default IndexPage;
