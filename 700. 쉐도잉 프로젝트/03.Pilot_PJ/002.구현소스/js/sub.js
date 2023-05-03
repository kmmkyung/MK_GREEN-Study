// 카테고리 서브페이지 JS - sub.js

// 메뉴기능함수 가져오기
import menuFn from "./mainjs/menu.js";
// 배너기능함수 가져오기
import banFn from "./mainjs/ban.js";
// 공통 데이터 가져오기
import comData from "./tempData/data-common.js";
// 신상정보
import sinsang from "./dgsData/sinsang.js";

// 스와이퍼 변수
let swiper;

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
        startSS();
        
        // 신상품 기능함수 호출
        sinsangFn();
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

///////// 신상품 기능구현 함수 /////////////
function sinsangFn(){


/*************************************
    함수명: moveList
    기능: 신상품 리스트박스를 연속하여
        왼쪽 방향으로 흘러가게 함!
*************************************/

// 대상: .flist
const flist = $(".flist");
// 위치값 변수
let lpos = 0;
// 재귀호출 상태값 변수(1-호출가능 / 0-호출불가능)
let call_sts = 0; 
// 스크롤시 상태값변수
let sc_sts = 0;
// 재귀호출 타임아웃용변수
let callT;


function moveList(){

    // 1. 이동 위치값(left값) 감소하기
    lpos--;
    // console.log("위치값:",lpos);

    // 2. 한계값 초기화하기 + 첫번째 요소 맨뒤로 이동하기
    if(lpos <-300) {
        // 위치값 초기화
        lpos=0;

        // 첫번째 li 맨뒤로 이동
        flist.append(flist.find("li").first());
    }

    // 3. 이동하기
    flist.css({
        left: lpos+"px"
    })

    // 타임아웃 비우기
    clearTimeout(callT)
    
    // 재귀호출하기(비동기호출  - setTimeout)
    // 조건: call_sts 상태값이 1일때만 호출함!
    if(call_sts) callT = setTimeout(moveList,40);
}/////////////// moveList //////////////

// 신상품 이동함수 최초호출
moveList();

// 신상품 리스트에 마우스 오버시 멈춤
// 신상품 리스트에 마우스 아웃시 멈춤
// hover(함수1,함수2)
flist.hover(function(){ // over
    call_sts = 0; // 콜백중단
},
function(){ // out
    call_sts =1; // 콜백허용
    moveList(); // 함수재호출
}); ////////// hover /////////////

/************************************
신상품 리스트 li에 마우스 오버시 정보보이기
1. 대상: .flist li
2. 정보구분법 : li의 클래스명으로 신상품 정보와
                매칭하여 상품정보박스를 동적으로
                생성하여 애니메이션을 주어 보이게 함

************************************/
flist.find("li").hover(function(){ //over
    // 1. 클래스 정보 알아내기
    let clsnm = $(this).attr("class");
    
    // 2. 클래스 이름으로 셋팅된 신상정보 객체 데이터 가져오기
    let gd_info = sinsang[clsnm];
    console.log(clsnm,gd_info);

    // 3. 상품정보박스 만들고 보이게 하기
    // 마우스 오버된 li 자신 (this)에 넣어준다!
    $(this).append(`<div class="ibox"></div>`);
    // .ibox에 상품 정보 넣기
    // ^ 특수문자임으로 정규식에 넣을때 \역슬래쉬와 함께 씀 -> /\^/
    $(".ibox",this).html(gd_info.replace(/\^/g,"<br>"))
    .animate({
        top:"110%",
        opacity: 1
    },300,"easeOutCirc");
    },
    function(){ //out
        // .ibox 나갈때 지우기
        $(".ibox",this).remove();
    }
); ////////////////// hover ///////////////////

/************************************
스크롤 위치가 신상품 박스가 보일때만 움직이기
************************************/
// JS getBoundingClientRect() 의 값과 같은 것은?
// 용용박스 offset().top 위치값 - scroll바 위치값

// 1. 대상요소위치값
let tgpos = flist.offset().top;

// 2. 스크롤 위치변수
let scTop = 0;

// 3. 화면 높이값
let winH = $(window).height();
console.log("화면높이값",winH)

// 4. 스크롤 이벤트 함수 ////////////
$(window).scroll(function(){
    // 4-1. 스크롤 위치값    
    scTop = $(this).scrollTop();
    // 4-2. gBCR 값 구하기
    let gBCR = tgpos-scTop
    console.log("gBCR",gBCR);
    
    // 4-3. 신상품 리스트 이동 / 멈춤 분기하기
    // (1)이동기준 gBCR값이 화면높이보다 작고 0보다 클때 이동
    if(gBCR < winH && gBCR > -300 && sc_sts===0){
        sc_sts = 1; // 콜백허용!(한번만 실행)
        moveList(); // 함수재호출!
        console.log("범위1")
    }
    // (2)기타경우 멈춤(조건: 윈도우높이보다 크거나 0보다 작고 call_sts===1일때 )
    else if((gBCR > winH || gBCR < -300)&& sc_sts===1){
        sc_sts = 0; // 콜백중단!
        call_sts = 0; // 콜백중단!
        console.log("범위2")
    }

        ////////////////////////////
        // 서브 배너 스와이퍼 API를 //
        // 이용한 작동멈춤셋팅하기! //
        ////////////////////////////
        // 기준: 화면높이값 보다 
        //      스크롤위치가 크면 멈춤
        // 스와이퍼API : swiper.autoplay.stop()
        //      스크롤위치가 작으면 자동넘김
        // 스와이퍼API : swiper.autoplay.start()
        if(scTop > winH){
            swiper.autoplay.stop()
          } /////////// if ////////
          else{
            swiper.autoplay.start()
          } //////// else ///////////
          
}); /////////////// scroll /////////////////

} ///////////// sinsangFn 함수 //////////////////