import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth'; // 請確保路徑正確
import BTNGroup from '@/components/roomList/BtnGroup'
import PageNext from '@/components/roomList/PageNext'
import RoomCard from '@/components/roomList/RoomCard'
import RoomSearch from '@/components/roomList/RoomSearch'
import JoinBTN from '@/components/roomList/joinBtn'
import styles from '@/styles/gw/_roomList.module.sass'

export default function RoomList() {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    async function fetchParties() {
      try {
        const response = await fetch('http://localhost:3005/api/parties');
        const data = await response.json();
        console.log('API 響應:', data);

        if (response.ok) {
          if (Array.isArray(data)) {
            setParties(data);
          } else if (data.message) {
            setMessage(data.message);
          }
        } else {
          throw new Error(data.message || '獲取派對數據時出錯');
        }
      } catch (error) {
        console.error('獲取錯誤:', error);
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchParties();
  }, []);

  if (loading) return <div className="text-center my-5">正在載入派對數據...</div>;

  return (
    <div className="container mt-4">
      <div className={styles.topBar}>
        {auth.isAuth ? (
          <p>歡迎, {auth.userData.name || auth.userData.username}!</p>
        ) : (
          <p>訪客模式</p>
        )}
        <JoinBTN />
        <RoomSearch />
        <BTNGroup />
        {parties.length > 0 && <div className="h6">共找到 {parties.length} 個派對</div>}
      </div>

      {message ? (
        <div className="alert alert-info">{message}</div>
      ) : parties.length > 0 ? (
        <div className={styles.cardArea}>
          {parties.map(party => (
            <RoomCard key={party.id} party={party} />
          ))}
        </div>
      ) : (
        <div className="alert alert-info">目前沒有可用的派對</div>
      )}

      {parties.length > 0 && <PageNext />}
    </div>
  );
}