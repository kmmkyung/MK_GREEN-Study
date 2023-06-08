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
import $ from "jquery";


export default function SwiperVid(props) {
    // 데이터 셋팅
    const sdt = swipervid_data;

    // 비디오 보이기 함수
    const showVid = (src,tit) => { // src - 비디오 경로, tit - 비디오 제목
        
        console.log(src,tit);

        let ifr = $(".playvid iframe")

        // 1. 아이프레임 src 넣기
        document.querySelector(".playvid iframe").setAttribute("src",src="?autoplay=1");
            // $(".playvid iframe").attr("src",src="?autoplay=1")
        
        // 2. 비디오 타이틀 넣기
        $("ifrtit").text(tit);

        // 3. 비디오 전체박스 보이기
        $("vidbx").fadeIn(300);

        // 4. 닫기버튼
        let vbx = $(".vidbx");
        $("cbtn").click(()=>{vbx.fadeOut(300), ifr.attr("src",src="?autoplay=0")});


    }

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
                <SwiperSlide key={i}>
                    <section className="swinbox" onClick={()=>showVid(v.vsrc,v.tit)}>
                        {/* 동영상 이미지 */}
                        <div className="vidming">
                            <img src={v.isrc} alt={v.tit}/>
                        </div>
                        {/* 동영상 타이틀 */}
                        <div className="vidtit">
                            <h4>{v.cat}</h4>
                            <h3>{v.tit}</h3>
                        </div>
                    </section>
                </SwiperSlide>
                )
            }
          </Swiper>
        </>
      );
    }