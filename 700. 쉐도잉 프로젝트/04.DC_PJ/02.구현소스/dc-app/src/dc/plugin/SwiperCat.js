import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
/* 제이쿼리넣기 */
import $ from "jquery";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./swipercat.css";

// import required modules
import { Navigation } from "swiper";
// 데이터 가져오기
import cat_data from "../data/cat";
import { Link } from "react-router-dom";

export default function SwiperCat(props) {
    // 데이터 셋팅
    const sdt = cat_data;    

    return (
        <>
            <Swiper
                // slidesPerView={2}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                // 스와이퍼 사이즈별 슬라이드수 변경!
                breakpoints={{
                    200: {
                        slidesPerView: 3,
                    },
                    700: {
                        slidesPerView: 4,
                    },
                    1000: {
                        slidesPerView: 5,
                    },
                    1200: {
                        slidesPerView: 7,
                    },
                }}
                className="mySwiper">
                {sdt.map((v, i) => (
                    <SwiperSlide key={i}>
                        {/* "/det" 라우터 컴포넌트 페이지 호출시 state 속성값으로 객체를 보내어 값을 전달함!
                        도착페이지인 Detail.js 컴포넌트에 페이지 나타내야할 데이터 항목을
                        데이터 속성명과 같은 이름으로 셋팅하여 라우터 전달 state 객체에 담아서 보낸다!
                        cname은 캐릭터 이름 /  cdese는 캐락터 설명 / facts는 캐릭터 명세 정보임!
                        selcat은 캐릭터 이름전달 속성값
                        값은 v.cname으로 캐릭터 명을 보낸다 */}
                        <Link to="/det" state={
                            {
                            cname:v.cname,
                            cdesc:v.cdesc,
                            facts:v.facts}
                            }>

                        <section className="swinbx">
                            {/* 캐릭터이미지영역 */}
                            <div className="catimg">
                                <img src={v.tmsrc} alt={v.cname} />
                                
                            </div>
                            {/* 동영상타이틀영역 */}
                            <div className="cattit">
                                <h3>{v.cname}</h3>
                            </div>
                        </section>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}