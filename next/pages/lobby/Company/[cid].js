import { useRouter } from 'next/router';
import { useEffect, useState,useContext } from 'react';
import BookingLeftArea from '@/components/BookingPage/BookingLeftArea';
import BookingRightArea from '@/components/BookingPage/BookingRightArea';
import styles from '@/styles/gw/_partypage.module.scss'
import { AuthContext } from '@/context/AuthContext';


export default function CompanyPage() {
  const router = useRouter();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const {user} = useContext(AuthContext)
  console.log(user)

  useEffect(() => {
    if (!router.isReady) return;

    const { cid } = router.query;
    console.log('Company ID:', cid);

    if (cid) {
      setLoading(true);
      fetch(`http://localhost:3005/api/company/${cid}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data) {
            setCompanyData(data);
          } else {
            throw new Error('No data received');
          }
        })
        .catch(error => {
          console.error('Error fetching company data:', error);
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router.isReady]);

  if (!router.isReady || loading) return <div>載入中...</div>;
  if (error) return <div>錯誤：{error}</div>;
  if (!companyData) return <div>找不到公司資料</div>;

  return (
    <div className={styles.main}>
      <BookingLeftArea user = {user} companyData={companyData} />
      <BookingRightArea  user = {user} companyData={companyData} />
    </div>
  );
}
