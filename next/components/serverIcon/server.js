import React from 'react'
import styles from '@/styles/gw/_server.module.sass'
import * as ReactIcons from 'react-icons/md'

export default function Server({ service }) {
    // 解碼 HTML 實體
    const decodedService = service.replace(/\\u003C/g, '<').replace(/\\u003E/g, '>');
  // 解析服務名稱和圖標
  const [name, iconString] = decodedService.split(':');

  // 從圖標字符串中提取圖標名稱
  const iconNameMatch = iconString.match(/<(Md\w+)\s*\/>/);
  const iconName = iconNameMatch ? iconNameMatch[1] : null;

  // 從 react-icons/md 中獲取對應的圖標組件
  const IconComponent = iconName ? ReactIcons[iconName] : null;
  return (
    <div className={styles.server}>
      <div className={styles.serverIcon}>
        {' '}
        {IconComponent && <IconComponent />}
      </div>
      <div className={styles.serverText}>{name}</div>
    </div>
  )
}
