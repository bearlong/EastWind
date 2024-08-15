import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function MySwiper() {
  return (
    <>
      <Swiper
        direction="vertical" // 設置為垂直滑動
        slidesPerView={4} // 每一頁顯示4個滑動項目
        spaceBetween={10} // 項目之間的間距
        loop={false}
      >
        <SwiperSlide className="test">Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        {/* 加更多的 SwiperSlide */}
      </Swiper>
      <style jsx>{`
        .test {
          weight: 800px;
          height: 800px;
        }
      `}</style>
    </>
  )
}
