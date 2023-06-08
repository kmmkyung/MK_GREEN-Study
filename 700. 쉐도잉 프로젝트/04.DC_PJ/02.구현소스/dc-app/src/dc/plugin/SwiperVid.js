import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./swipervid.css";

// import required modules
import { Navigation } from "swiper";
import swipervid_data from "../data/swipervid";


export default function SwiperVid(props) {
    // 데이터 셋팅
    const sdt = swipervid_data;


    return (
        <>
          <Swiper
            slidesPerView={3}
            spaceBetween={12}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {
                sdt.map((v,i)=>            
                <SwiperSlide key={i}>{props.name} {v.iscr} {v.tit}</SwiperSlide>
                )
            }
          </Swiper>
        </>
      );
    }