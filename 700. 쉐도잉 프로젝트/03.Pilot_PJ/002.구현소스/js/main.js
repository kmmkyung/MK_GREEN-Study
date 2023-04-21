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
console.log("winW*0.9:",winW*0.9);
console.log("winW:",winW);
console.log("winW*1.1:",winW*1.1);

// 광드래그 방지위해 커버 셋팅
const cover = $(".cover");

// 드래그 끝난후 이벤트 함수 만들기
slide.on("dragstop",function(){
    // 광드래그 방지 위해 커버 보이기
    cover.show()

    // 슬라이드 left 위치값
    let sleft = $(this).offset().left;
    console.log("dragstop!",sleft);

    // 1. 오->왼쪽으로 이동 : -110% 미만일때
    if(sleft < -winW*1.1){
        slide.animate({left: -winW*2 + "px"},600,"easeOutQuint",()=>{
            // 이동 후 맨 앞 li 맨 뒤 이동!
            slide.append(slide.find("li").first()).css({left:"-100%"});
            // 커버 제거하기
            cover.hide();
        });
    }///// if : 왼쪽 /////

    // 2. 왼->오쪽으로 이동 : -90% 초과일때
    else if(sleft > -winW*0.9){
        slide.animate({left: 0 + "px"},600,"easeOutQuint",()=>{
            // 이동 후 맨 뒤 li 맨 앞으로 이동하기!
            slide.prepend(slide.find("li").last()).css({left:"-100%"});
            // 커버 제거하기
            cover.hide();
        });
    }///// else if : 오른쪽 /////

    // 3. 제자리로 이동 : -110%와 -90% 사이
    else{
        slide.animate({left: -winW + "px"},200,"easeOutQuint",()=>{
            // 커버 제거하기
            cover.hide();
        });
    }///// else : 제자리 이동 /////
}); /////////// slide ////////////////


