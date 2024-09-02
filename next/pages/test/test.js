import React, { useEffect, useState, useRef } from 'react'

import MouseMove from '@/components/mouseMove'

export default function test() {
  const [isFront, setIsFront] = useState(true)
  const [deg, setDeg] = useState(0)

  const [imgSrc, setImgSrc] = useState('/Pei.svg')

  const mahjongArr = ['Ton.svg', 'Shaa.svg', 'Pei.svg', 'Nan.svg']

  const handleClick = () => {
    setIsFront((prevIsFront) => {
      if (prevIsFront) {
        const randomIndex = Math.floor(Math.random() * mahjongArr.length)
        setImgSrc(`/${mahjongArr[randomIndex]}`)
      }
      setDeg((prevDeg) => prevDeg + 180)
      return !prevIsFront
    })
  }
  return (
    <>
      <div
        className="test"
        onClick={() => {
          handleClick()
        }}
      >
        <MouseMove deg={deg} imgSrc={imgSrc} />
      </div>
      <style jsx>
        {`
          .test {
            background: black;
            height: 300vh;
          }
        `}
      </style>
    </>
  )
}
