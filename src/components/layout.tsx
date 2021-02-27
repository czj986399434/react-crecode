import React, { ReactNode } from 'react'
import Header from './header'
type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'crecode' }: Props) => (
  <div className='layout'>
    <header>
    <Header></Header>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
)

export default Layout
