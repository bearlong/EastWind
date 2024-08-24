import Head from 'next/head'
import { useLoader } from '@/hooks/use-loader'
import ToTheTop from '@/components/icons/to-the-top'
import HeaderAdmin from './headerAdmin.jsx'
import Footer from '../default-layout/footer.jsx'
import AdminSidebar from './admin-sidebar.js'

export default function AdminCenterLayout({ title = '只欠東風', children }) {
  const { loader } = useLoader()

  return (
    <>
      <HeaderAdmin>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </HeaderAdmin>
      <main className="flex-shrink-0">
        <section className="d-flex flex-column flex-md-row">
          <AdminSidebar />
          <ToTheTop />
          {children}
          {/* 全域的載入動畫指示器 */}
          {loader()}
        </section>
      </main>
      <Footer />
    </>
  )
}
