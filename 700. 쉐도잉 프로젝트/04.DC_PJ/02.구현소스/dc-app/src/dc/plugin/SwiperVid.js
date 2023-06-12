import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./swipervid.css";

/* 폰트어썸 임포트 */
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        document.querySelector(".playvid iframe").setAttribute("src",src+"?autoplay=1");
            // $(".playvid iframe").attr("src",src="?autoplay=1")
        
        // 2. 비디오 타이틀 넣기
        $(".ifrtit").text(tit);

        let vbx = $(".vidbx");
        // 3. 비디오 전체박스 보이기
        vbx.fadeIn(300);

        // 4. 닫기버튼
        $(".cbtn").click(()=>{vbx.fadeOut(300); ifr.attr("src","")});


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
                        <FontAwesomeIcon icon={faPlayCircle} 
                                style={{
                                    position:"absolute",
                                    bottom:"55%",
                                    left:"10%",
                                    color:"#fff",
                                    fontSize:"50px"
                                    }} />
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