import React, { useState, useEffect } from 'react';
import JoinBTN from '@/components/roomList/joinBtn'
import BTNGroup from '@/components/roomList/BtnGroup'
import PageNext from '@/components/roomList/PageNext'
import RoomCard from '@/components/roomList/RoomCard'
import CompanyCard from '@/components/roomList/CompanyCard'
import RoomSearch from '@/components/roomList/RoomSearch'
import styles from '@/styles/gw/_roomList.module.sass'
import { useRouter } from 'next/router';

export default function Lobby() {
  const [parties, setParties] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [activeView, setActiveView] = useState('join'); // 'join' for 參團, 'host' for 主揪 預設值join
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const router = useRouter();

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    // 從 URL 參數中獲取視圖類型
    const { view } = router.query;
    const currentView = view === 'host' ? 'host' : 'join';
    setActiveView(currentView);

    try {
      if (currentView === 'join') {
        const response = await fetch('http://localhost:3005/api/parties');
        if (!response.ok) throw new Error('Failed to fetch parties');
        const data = await response.json();
        setParties(data);
      } else {
        const response = await fetch('http://localhost:3005/api/company');
        if (!response.ok) throw new Error('Failed to fetch companies');
        const data = await response.json();
        setCompanies(data);
      }
    } catch (error) {
      console.error(`Error fetching ${currentView === 'join' ? 'parties' : 'companies'}:`, error);
      setError(`獲取${currentView === 'join' ? '派對' : '公司'}數據時出錯: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [router.query]); // 依賴於 router.query

  // const fetchData = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     if (activeView === 'join') {
  //       const response = await fetch('http://localhost:3005/api/parties');
  //       if (!response.ok) throw new Error('Failed to fetch parties');
  //       const data = await response.json();
  //       console.log('Fetched parties:', data);
  //       setParties(data);
  //     } else {
  //       const response = await fetch('http://localhost:3005/api/company');
  //       if (!response.ok) throw new Error('Failed to fetch companies');
  //       const data = await response.json();
  //       console.log('Fetched companies:', data);
  //       setCompanies(data);
  //     }
  //   } catch (error) {
  //     console.error(`Error fetching ${activeView === 'join' ? 'parties' : 'companies'}:`, error);
  //     setError(`獲取${activeView === 'join' ? '派對' : '公司'}數據時出錯: ${error.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleViewChange = (view) => {
    console.log('View changed to:', view);
    setActiveView(view);
  };

  const renderCards = () => {
    if (loading) return <div>載入中...</div>;
    if (error) return <div>{error}</div>;

    if (activeView === 'join') {
      console.log('Rendering party cards, count:', parties.length);
      return parties.map(party => <RoomCard key={party.id} party={party} />);
    } else {
      console.log('Rendering company cards, count:', companies.length);
      return companies.map(company => <CompanyCard key={company.id} company={company} />);
    }
  };

  const getTotalCount = () => {
    return activeView === 'join' ? parties.length : companies.length;
  };

  return (
    <div className="container">
      <div className={styles.topBar}>
        <JoinBTN activeView={activeView} onViewChange={handleViewChange} />
        <RoomSearch />
        <BTNGroup />
        <div className={styles.totalCount}>
          共{getTotalCount()}個{activeView === 'join' ? '團' : '店家'}
        </div>
      </div>

      <div className={styles.cardArea}>
        {renderCards()}
      </div>
      
      <PageNext />
    </div>
  );
}