import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
/* 제이쿼리넣기 */
import $ from 'jquery';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


/* 폰트어썸 임포트 */
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./swipervid.css";

// import required modules
import { Navigation } from "swiper";
// 데이터 가져오기
import swipervid_data from "../data/swipervid";


export default function SwiperVid(props) {
    // 데이터 셋팅
    const sdt = swipervid_data;

    // 하나당 슬라이드 수 : Hook 변수
    // const [변수,set변수] = useState(초기값)
    const [perSld,setPerSld] = useState(4);
    // 값의 사용은 Hook 변수를 쓰고 값의 변경은 set변수(값)

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
    };


    return (
        <>
          <Swiper
            // 한 화면당 개수를 Hook변수 사용!   
            // slidesPerView={perSld}
            spaceBetween={12}
            navigation={true}
            modules={[Navigation]}
            // 스와이퍼 사이즈별 슬라이드수 변경
            breakpoints={{
                200: {
                    slidesPerView: 2,
                },
                700: {
                    slidesPerView: 2.5,
                },
                1000: {
                    slidesPerView: 3.5,
                },
                1200: {
                    slidesPerView: 4,
                },
            }}
            className="mySwiper">
          {sdt.map((v, i) => (
                    <SwiperSlide key={i}>
                        <section className="swinbx" 
                        onClick={()=>showVid(v.vsrc,v.tit)}>
                            {/* 동영상이미지영역 */}
                            <div className="vidimg">
                                <img src={v.isrc} alt={v.tit}></img>
                                <FontAwesomeIcon icon={faPlayCircle} 
                                style={{
                                    position:"absolute",
                                    bottom:"55%",
                                    left:"10%",
                                    color:"#fff",
                                    fontSize:"50px"
                                    }} />
                            </div>
                            {/* 동영상타이틀영역 */}
                            <div className="vidtit">
                                <h4>{v.cat}</h4>
                                <h3>{v.tit}</h3>
                            </div>
                        </section>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}