import React, { useEffect, useState, useRef } from 'react'
import styles from '@/styles/bearlong/mouseMove.module.scss'

export default function MouseMove({
  deg = 0,
  imgSrc = '',
  setIsAnimating = () => {},
  isAnimating = true,
}) {
  const contentRef = useRef(null)
  const requestRef = useRef(null)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  //   const [deg, setDeg] = useState(0)
  //   const [isFront, setIsFront] = useState(true)
  //   const [imgSrc, setImgSrc] = useState('/Pei.svg')

  //   const mahjongArr = ['Ton.svg', 'Shaa.svg', 'Pei.svg', 'Nan.svg']
  useEffect(() => {
    const handleMouseMove = (e) => {
      const content = contentRef.current
      if (content) {
        const updatePosition = () => {
          const targetX = e.clientX - content.offsetWidth / 2 + window.scrollX
          const targetY =
            e.clientY - content.offsetHeight / 2 + window.scrollY - 66.54
          setTranslate({ x: targetX, y: targetY })

          content.style.transform = `translate(${targetX}px, ${targetY}px)`
        }

        // 使用 requestAnimationFrame 來減少過度更新
        requestRef.current = requestAnimationFrame(updatePosition)
      }
    }

    const handleWheel = (e) => {
      // 根據滾輪滾動量來更新位置
      setTranslate((prevTranslate) => ({
        x: prevTranslate.x + e.deltaX * 0.1, // 調整滾輪的縮放比例
        y: prevTranslate.y + e.deltaY * 0.1,
      }))
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('wheel', handleWheel)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('wheel', handleWheel)
      cancelAnimationFrame(requestRef.current)
    }
  }, [])

  useEffect(() => {
    const content = contentRef.current
    if (content) {
      content.style.transform = `translate(${translate.x}px, ${translate.y}px) rotateY(${deg}deg)`
    }
  }, [deg, translate])

  return (
    <>
      <div
        className={`content ${styles.content}`}
        ref={contentRef}
        style={{ transform: `rotateY(${deg}deg)` }}
      >
        <div className={`front ${styles.front}`}>
          <div className="page">
            <img
              className={`${styles.mouseMove} mouseMove`}
              src={`/images/boyu/mahjong${imgSrc}`}
              alt=""
            />
          </div>
        </div>
        <div className={`back ${styles.back}`}></div>
      </div>
    </>
  )
}
