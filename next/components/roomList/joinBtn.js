import React from 'react';
import styles from '@/styles/gw/_joinBtn.module.scss'

export default function JoinBTN({ activeView, onViewChange }) {
  return (
    <div className={styles.joinGw}>
      <button 
        className={`${styles.partyBtn} ${activeView === 'host' ? styles.activeGw : ''}`}
        onClick={() => onViewChange('host')}
        type="button"
      >
        主揪/揪團
      </button>
      <button 
        className={`${styles.partyBtn} ${activeView === 'join' ? styles.activeGw : ''} ${activeView === 'join' ? styles.highlightedJoin : ''}`}
        onClick={() => onViewChange('join')}
        type="button"
      >
        參團
      </button>
    </div>
  )
}