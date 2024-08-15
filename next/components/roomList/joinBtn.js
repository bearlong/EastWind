import React from 'react';
import styles from '@/styles/gw/_joinBtn.module.scss'

export default function JoinBTN({ activeView, onViewChange }) {
  return (
    <div className={styles.joinGw}>
      <div 
        className={`${styles.partyBtn} ${activeView === 'host' ? styles.activeGw : ''}`}
        onClick={() => onViewChange('host')}
      >
        <a href="#">主揪/揪團</a>
      </div>
      <div 
        className={`${styles.partyBtn} ${activeView === 'join' ? styles.activeGw : ''} ${activeView === 'join' ? styles.highlightedJoin : ''}`}
        onClick={() => onViewChange('join')}
      >
        <a href="#">參團</a>
      </div>
    </div>
  )
}