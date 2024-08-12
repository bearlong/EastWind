// import MyNavbar from './my-navbar-nouse'
import MyNavbarBS5 from './my-navbar'
import MyFooter from './my-footer'
import Head from 'next/head'
import NextBreadCrumb from '@/components/common/next-breadcrumb'
import { useLoader } from '@/hooks/use-loader'

import Header from './header.jsx'
import Footer from './footer.jsx'

export default function DefaultLayout({ title = 'Next-BS5', children }) {
  const { loader } = useLoader()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Header />
      <MyNavbarBS5 />
      <main className="flex-shrink-0">
        {/* <NextBreadCrumb isHomeIcon isChevron bgClass="" /> */}
        {children}
        {/* 全域的載入動畫指示器 */}
        {loader()}
      </main>
      <Footer />
      <MyFooter />
    </>
  )
}
