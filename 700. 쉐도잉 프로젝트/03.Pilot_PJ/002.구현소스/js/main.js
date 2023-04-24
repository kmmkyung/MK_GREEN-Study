// 파일럿 PJ 메인페이지 JS - main.js

// 자동스크롤 기능 함수 가져오기
import autoScroll from "./jquery-autoScroll.js";

// 자동스크롤 호출
autoScroll();

/***************************************************************************
    [ 메인페이지 주요 기능 ]
    1. 자동스크롤 기능 구현
    +페이지 도착 후 등장액션 구현

    2. 햄버거버튼 전체메뉴 보이기/숨기기
    +전체메뉴 배경동영상 보일때만 재생(숨길때 멈춤)

    3. 배너 터치기능 넘기기 (제이쿼리 UI 이용)
    + 배너별 타이틀 등장하기
    + 양쪽 이동버튼 플러그인 적용하기

***************************************************************************/

// 햄버거 버튼 클릭시 전체 메뉴 보이기
$(".ham").click(function(){
    // 햄버거 버튼 클래스 변경(토글)
    $(this).toggleClass("on");
    // 전체 메뉴 보이기
    $(".mbox").fadeToggle(400);

    // 햄버거 버튼에 클래스 on이 있으면 재생 / 없으면 정지
    // 있는지 확인!
    let isOn = $(this).is(".on")
    console.log(isOn);

    // 배경 동영상 재생/멈춤
    if(isOn) $(".bgm").get(0).play();
    else $(".bgm").get(0).pause();
    // audio, video 요소 선택시 get(순번)을 사용하는 것은
    // 같은 이름의 클래스를 사용할 경우 순서대로 요소를 담는다!
    // 하나만 있으면 0!

}); ///////////// click ////////////////

/***************************************************************************
    [ 터치 배너 기능 구현하기 ]
    -원리: 제이쿼리 UI를 이용하여 X축으로만 드래그가 되도록 설정후
    위치값을 체크하여 드래그가 끝난 시점에 자동위치이동 애니매이션 처리해 준다!

    2. 대상: .slide

    3. 기준
    (1) 왼쪽방향이동 : 기준값(-100%)보다 -10% 작은 경우(-110%)
    (1) 오른쪽방향이동 : 기준값(-100%)보다 10% 큰 경우(-90%)
    (1) 제자리이동 : 양쪽기준값 사이일때 (-110%~-90%)

    4. 구현시 주의사항
    -> % 단위는 모두 px 단위로 변환하여 구현한다!
    -> 배너크기가 윈도우 가로크기와 같다! 이것을 활용함!
***************************************************************************/
// 1. 대상선정
const slide =$(".slide");

// 2. 드래그 설정
slide.draggable({
    axis:"x"  // x축 고정
}); ////// 드래그 설정 ////

// 윈도우 크기 리턴
const reWin = () => $(window).width();
// 리사이즈 업데이트
$(window).resize(()=>{
    winW=reWin();
    console.log("winW:",winW)
});

// 3. 드래그가 끝난 후 -> dragstop 이벤트 발생 후!
// 기준위치 체크 후 이동애니메이션

// 윈도우 가로크기 : left 기준 위치 px 변환!
let winW = reWin();
// console.log("winW*0.9:",winW*0.9);
// console.log("winW:",winW);
// console.log("winW*1.1:",winW*1.1);

// 광드래그 방지위해 커버 셋팅
const cover = $(".cover");

// 드래그 끝난후 이벤트 함수 만들기
slide.on("dragstop",function(){
    // 광드래그 방지 위해 커버 보이기
    cover.show()

    // 슬라이드 left 위치값
    let sleft = $(this).offset().left;
    // console.log("dragstop",sleft);

    // 1. 오->왼쪽으로 이동 : -110% 미만일때
    if(sleft < -winW*1.1){
        slide.animate({left: -winW*2 + "px"},600,"easeOutQuint",()=>{
            // 이동 후 맨 앞 li 맨 뒤 이동!
            slide.append(slide.find("li").first()).css({left:"-100%"});
            // 커버 제거하기
            cover.hide();

            // 배너타이틀 함수
            showTit();
        });

        // 블릿변경함수 호출!
        addOn(2);
        // 왼쪽 이동이므로 2번쨰 슬라이드

    }///// if : 왼쪽 /////

    // 2. 왼->오쪽으로 이동 : -90% 초과일때
    else if(sleft > -winW*0.9){
        slide.animate({left: 0 + "px"},600,"easeOutQuint",()=>{
            // 이동 후 맨 뒤 li 맨 앞으로 이동하기!
            slide.prepend(slide.find("li").last()).css({left:"-100%"});
            // 커버 제거하기
            cover.hide();

            // 배너타이틀 함수
            showTit();
        });

        // 블릿변경함수 호출!
        addOn(0);
        // 오른쪽 이동이므로 0번쨰 슬라이드
        
    }///// else if : 오른쪽 /////

    // 3. 제자리로 이동 : -110%와 -90% 사이
    else{
        slide.animate({left: -winW + "px"},200,"easeOutQuint",()=>{
            // 커버 제거하기
            cover.hide();
        });
    }///// else : 제자리 이동 /////
}); /////////// slide ////////////////

/*******************************************************
    [ 터치배너 이동시 블릿변경하기 ]
    -방법: 잘라서 이동되는 li에 고유순번을
    사용자 정의 속성으로 처음에 설정 후
    -슬라이드 이동하면 그 속성값을 읽어서
    블릿순번에 반영한다!    
*******************************************************/ 
// 사용자 정의 순번속성 대상: .slide li
// 제이쿼리: for문순회 메서드 each()
// 배너 li
const blist = slide.find("li");
// 배너 갯수
const bcnt = blist.length;

blist.each((idx,ele)=>{
    // console.log(idx,bcnt);
    // 처음것을 마지막 순번으로 넣기
    if(idx===0)
        $(ele).attr("data-seq",bcnt-1);
    else // 두번째부터 끝까지 0부터 적용(1작음!)
        $(ele).attr("data-seq",idx-1);
}); /////////////////each/////////////////////

/*******************************************************
    블릿 on 넣기 함수
    1) 오른쪽으로 이동할 경우
    -> 0번째 슬라이드의 data-seq값
    2) 왼쪽으로 이동일 경우
    ->2번째 슬라이드 data-seq값
    3)위의 선택값으로 블릿의 li 순번에 on 넣고 나머지는 뺀다!
*******************************************************/
// 대상선정: .bindic li
const bindic = $(".bindic li");

function addOn(seq){ //  seq - 읽을 슬라이드 순번
    // 방향 어떻게 알지? 0은 오른쪽 2는 왼쪽이동

    // 1. 해당 슬라이드 data-seq 읽어오기
    let dseq = slide.find("li").eq(seq).attr("data-seq");
    // console.log(dseq);

    // 2. 해당 슬라이드와 등일한 순번블릿에 on넣기
    bindic.eq(dseq).addClass("on")
    .siblings().removeClass("on")
} //////////// addOn 함수 ////////////////

///////////////////////////////////////
////// 각 배너 등장 타이틀 셋팅 /////////
///////////////////////////////////////
    let bantxt = {
        "ban1": "Men's Season<br>Collection",
        "ban2": "2023 Special<br>Collection",
        "ban3": "GongYoo<br>Collection",
        "ban4": "T-Shirt<br>Collection",
        "ban5": "Shoes<br>Collection",
        "ban6": "Wind Jacket<br>Collection"
    }; ///////////// bantxt객체 //////////////

/*******************************************************
    함수명: showTit
    기능: 각 배너 타이틀 보이기
    호출: 배너이동후 콜백함수에서 호출함!
*******************************************************/
   function showTit(){
    // 요구사항: 배너 이동 후 호출하여 해당 배너의 순번에
    // 맞는 타이틀을 동적으로 생성하여 애니메이션 한다!

    // 주인공 배너 변수에 담기
    const mainban = slide.find("li").eq(1)

    // 1. 항상 도착후엔 두번째 슬라이드가 주인공이다!
    // 슬라이드 순번은 1번!
    // 슬라이드 클래스명 읽어오기(타이틀이 클래스명과 연관됨!)
    let clsnm = mainban.attr("class");
 
    // 2. 클래스명에 해당되는 객체값 읽어오기
    let bantit = bantxt[clsnm];

    // 호출확인
    console.log("배너타이틀",clsnm,bantit);

    // 모든 추가 타이틀 지우기
    $(".btit").remove();

    // 3. 타이틀을 넣을 요소를 배너에 추가한다!
    mainban.append(`<h2 class="btit"></h2>`)

     // 타이틀 left위치 변수처리
    // ban2, ban3만 오른쪽위치
    let lval = "30%";
    if(clsnm==="ban2"||clsnm==="ban3") lval="70%";

    // 4. 해당배너 h2 태그에 배너 타이틀 넣기
    mainban.find(".btit").html(bantit).css({
        position:"absolute",
        top:"50%",
        left:lval,
        transform:"translate(-50%,-50%)",
        font:"bold 4.5vmax Verdana",
        color: "#fff",
        textShadow:"1px 1px 3px #777",
        whiteSpace:"nowrap",
        opacity: 0 //처음에 투명
    }) ////////////////////////////
    .animate({ // 등장애니메이션~!!!
        top:"50%",
        opacity: 1
    },1000,"easeInOutQuart");

} ///////////////////// showTit 함수 //////////////////

// 타임아웃변수
let banAgain;

// 자동넘김 인터발 셋팅하기
// 변수에 담아 정지하기
let banAuto;
const banAutoSlide = () => {
banAuto = setInterval(()=>{
    slide.animate({left: -winW*2 + "px"},600,"easeOutQuint",()=>{
            // 이동 후 맨 앞 li 맨 뒤 이동!
            slide.append(slide.find("li").first()).css({left:"-100%"});
            // 커버 제거하기
            cover.hide();
            
            // 배너타이틀 함수
            showTit();
        });
        
        // 블릿변경함수 호출!
        addOn(2);
        // 왼쪽 이동이므로 2번쨰 슬라이드
    },3000)  ////////////////// banAuto 함수 //////////////////
};////////////////////// banAutoSlide /////////

    
// 자동넘김 지우기 함수
const clearAuto = () => {
    clearInterval(banAuto);
    clearTimeout(banAgain);
    banAgain = setTimeout(banAutoSlide,5000);
}; ////////////////// clearAuto 함수 //////////////////

// 베너이동시 자동넘김 지우기 셋팅
slide.on("drag dragstart dragstop",clearAuto);

// 자동넘김 최초호출
banAutoSlide();
