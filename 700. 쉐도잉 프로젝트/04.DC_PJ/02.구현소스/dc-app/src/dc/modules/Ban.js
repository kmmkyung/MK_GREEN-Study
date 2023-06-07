// 배너 컴포넌트 -Ban.js
// 배너 CSS
import "../css/ban.css"
// 배너 데이터
import ban_data from "../data/banner";
// 제이쿼리
import $ from "jquery"

/*
    [ Js 혹은 JQuery 라우터 구현시 로드 불일치 문제 ]
    JS기능이 들어간 페이지의 로드구역 설정시
    본 페이지가 index 페이지에 바로 불려질 경우 이 문제는 발생하지 않는다.
    그러나 라우터로 서브 로딩 구현할 경우 이 구역은 라우터 모체로 로딩되는 것으로 실행된다.
    따라서 본 모듈에 적용하려고 한 의도와는 달리 본 소스에는 적용되지 못한다
    -> 라우터 로딩 불일치 문제!

    [ 해결방법 : 로딩구역을 함수로 만들고 컴포넌트 소스 하단에서 호출함 ]
    예)function jqFn(){로드구역을 포함한 소스}
        function 컴포넌트(){
            return(
                <>
                    소스들
                    {jqFn()}   <---- 호출!!!
                </>
            )
        }
*/

// 로드구역 함수화하여 소스 하단에서 호출!
function jqFn(){

    $(()=>{ ////// JQB //////

        // 광클 금지 변수
        let prot = 0;

        // 1. 버튼 클릭시 이동기능 구현
        $(".abtn").click(function(){

            // 광클 금지
            if(prot) return;
            prot=1;
            // 0.4초 있다가 다시 prot 0으로!
            setTimeout(()=>prot=0,400);

            // 1. 버튼 구분하기
            let isB = $(this).is(".rb")
            console.log('오른쪽버튼?',isB);  

            // 1-2. 슬라이드 타겟 설정 : 클릭된 버튼의 형제 요소 슬라이더
            const tg = $(this).siblings(".slider")

            // 2. 분기하여 기능구현하기
            // (1) 오른쪽 버튼 클릭시: 오른쪽에서 0 -> left:-100으로 들어옴
            if(isB){
                    //오른쪽 버튼을 누르면 .4초동안 -100% 하고 아래 함수 호출! 
                tg.animate({left:"-100%"},400,function(){ // this는 tg!
                    // 첫번째 li 맨 뒤로 보내기
                    $(this).append($(this).find("li").first())
                    // css 튀지않게 맞춰줌!
                    .css({left:"0%"});
                }); ///// animate /////
            } ///// if /////
            
            // (2) 왼쪽 버튼 클릭시: 왼쪽에서 들어옴(left:-100%->0)
            else{
                // 마지막 li 맨앞이동 + 동시에 left -100% 후 0%로 애니
                tg.prepend(tg.find("li").last())
                .css({left:"-100%"})
                .animate({left:"0%"},400)
            } ///// else /////

            // 3. 배너와 일치하는 블릿에 클래스 "on" 넣기!
            // 대상: .indic li(블릿)
            // eq(순번) -> 오른쪽 이동시 1, 왼쪽 이동시 0
            // isB값으로 오른쪽은 true -> 1, 왼쪽은 false->0
            // 순서가 바뀌는 슬라이드에 고유 순번속성 data-seq값을 읽어옴
            $(".indic li").eq(tg.find("li").eq(isB).attr("data-seq")).addClass("on").siblings().removeClass("on");
            
        }); ///// --- click --- /////
    }); ////// JQB //////
} ///////////////// jqFn 함수 //////////////////////

// 반복리스트 코드 생성용 컴포넌트 //////
function MakeList(props){ // rec - 개별레코드값(객체형식)
    return(
        <li data-seq={props.idx}>
            <img className="banimg" src={props.rec["src"]} alt="배너"/>
            <section className="bantit">
                <h3>{props.rec["tit1"]}</h3>
                <h2>{props.rec["tit2"]}</h2>
                <p>{props.rec["cont"]}</p>
                <button>{props.rec["btn"]}</button>
            </section>
        </li>
    )
}//////////////////// MakeList /////////////////////


// 배너출력용 컴포넌트 //////
function Ban(props){ // props.cat은 배너 데이터 구분 속성명
    const sel_data = ban_data[props.cat];
    // sel_data에 담긴값은 data/banner.js의 객체의 배열값

    return(
        <div className="banner">
            {/* 이동 슬라이드 */}
            <ul className="slider">
                {sel_data.map((x,i)=> <MakeList rec={x} key={i} idx={i}/>)}
            </ul>
            {/* 이동 버튼 + 슬라이드 블릿 : 슬라이드가 2개 이상 */}
            {/* 조건식 && 코드: 조건식이 true일떄 코드출력 */}
            {
                sel_data.length > 1 && (
                // 하나에 싸자!
                <>
                    {/* 양쪽이동버튼 */}
                    <button className="abtn lb">＜</button>
                    <button className="abtn rb">＞</button> 
                    {/* 블릿 인디케이터(데이터 개수만큼!) */}
                    <ol className="indic">
                        {
                            sel_data.map((x,i)=>(
                                // i 첫번째꺼면 클래스 on을 넣고 아니면 넣지마!
                                <li className={i==0?'on':''} key={i}></li>
                            ))
                        }
                    </ol>
                </>
                )
            }
            {/* JS/JQuery 로드구역 호출! */}
            {jqFn()}
        </div>
    );
} ////////// Ban 컴포넌트 ///////////

export default Ban;