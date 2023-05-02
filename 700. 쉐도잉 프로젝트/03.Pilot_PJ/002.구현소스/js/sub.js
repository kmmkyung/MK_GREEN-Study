// 카테고리 서브페이지 JS - sub.js

// 메뉴기능함수 가져오기
import menuFn from "./mainjs/menu.js";
// 배너기능함수 가져오기
import banFn from "./mainjs/ban.js";
// 공통 데이터 가져오기
import comData from "./tempData/data-common.js";


// ################# 상단/하단영역메뉴 뷰 템플릿 셋팅 ################
// Vue.component(내가지은요소명,{옵션})
Vue.component("top-comp",{
    template:comData.tareaSub,
}); ///////////////////// 상단 Vue component ////////////////
Vue.component("foot-comp",{
    template:comData.barea,
}); ///////////////////// 하단 Vue component ////////////////

// ############ 상단영역 뷰 인스턴스 생성하기 #############//
// new Vue({옵션})
new Vue({
    el: "#top",
    data:{},  //_______________________
    // created 실행구역 : DOM연결전
    created:function(){
        // DOM연결 전 데이터 가공 작업
        console.log("created구역");
    }, //______________________________
    // mounted 실행구역: DOM연결 후 
    mounted:function(){
        //제이쿼리 코드 함수 호출!
        console.log("mounted구역");
        
        // 메뉴기능함수 호출
        menuFn();

        // 스와이퍼 생성함수 호출
        makeSwiper();

        // 부드러운 스크롤 호출
        startSS()

    }
})


// ################# 하단영역 뷰 인스턴스 생성하기 ################
new Vue({
    el: "#info",
}) ////////////하단영역 뷰 인스턴스 생성하기

// 스와이퍼 플러그인 인스턴스 생성하기 //
// 스와이퍼 생성함수
function makeSwiper(){    
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            // 인터렉션 비활성화 false
            // -> 인터렉션 활성화(가만히 두면 다시 자동 넘김)
          },
        pagination: {
            el: ".swiper-pagination",
            clickable: true, // 블릿 클릭 이동 여부
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });
}///////////////// makeSwiper 함수 ///////////////