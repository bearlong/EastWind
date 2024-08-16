import React, { useState, useEffect, useCallback, useMemo } from 'react';
import JoinBTN from '@/components/roomList/joinBtn'
import BTNGroup from '@/components/roomList/BtnGroup'
import PageNext from '@/components/roomList/PageNext'
import RoomCard from '@/components/roomList/RoomCard'
import CompanyCard from '@/components/roomList/CompanyCard'
import RoomSearch from '@/components/roomList/RoomSearch'
import styles from '@/styles/gw/_roomList.module.sass'
import { useRouter } from 'next/router';


export default function Lobby() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('join');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 9;
  const router = useRouter();

  const fetchData = async (view, page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = view === 'join' ? 'parties' : 'company';
      const url = `http://localhost:3005/api/${endpoint}?page=${page}`;
      console.log('Fetching data from:', url);
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Received data:', result);
  
      if (result && result.data) {
        setData(result.data);
        setTotalPages(result.totalPages);
        setCurrentPage(result.currentPage);
        setTotalItems(result.totalItems);
      } else {
        setData([]);
        setError('Received invalid data format from server');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`獲取${view === 'join' ? '派對' : '店家'}數據時出錯: ${error.message}`);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { view } = router.query;
    if (view !== activeView) {
      setActiveView(view);
      setCurrentPage(1);
      fetchData(view, 1);
    }
  }, [router.query]);

  const handleViewChange = (view) => {
    router.push(`/lobby/Lobby?view=${view}`, undefined, { shallow: true });
  };

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    fetchData(activeView, newPage);
    // 不再更新 URL
  }, [fetchData]);

  const renderedCards = useMemo(() => {
    console.log('Rendering cards. Active view:', activeView, 'Data:', data);
    if (!data || data.length === 0) return <div>無可用數據</div>;
  
    return data.map(item => 
      activeView === 'join' 
        ? <RoomCard key={item.id} party={item} /> 
        : <CompanyCard key={item.id} company={item} />
    );
  }, [data, activeView]);


  return (
    <div className="container">
      <div className={styles.topBar}>
        <JoinBTN activeView={activeView} onViewChange={handleViewChange} />
        <RoomSearch />
        <BTNGroup />
        <div className={styles.totalCount}>
          共{totalItems}個{activeView === 'join' ? '團' : '店家'}
        </div>
      </div>

      <div className={styles.cardArea}>
      {/* {loading && <div>載入中...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && renderedCards} */}
      {renderedCards}
      </div>
      
      <PageNext 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}