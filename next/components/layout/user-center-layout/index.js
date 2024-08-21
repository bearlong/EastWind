import Head from 'next/head'
import { useLoader } from '@/hooks/use-loader'

import Header from '../default-layout/header.jsx'
import Footer from '../default-layout/footer.jsx'
import UserSidebar from './user-sidebar.js'

export default function UserCenterLayout({ children }) {
  const { loader } = useLoader()

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Header />
      {/* <MyNavbarBS5 /> */}
      <main className="flex-shrink-0">
        <section className="d-flex flex-column flex-md-row">
          <UserSidebar />
          {children}
          {/* 全域的載入動畫指示器 */}
          {loader()}
        </section>
      </main>
      <Footer />
    </>
  )
}
