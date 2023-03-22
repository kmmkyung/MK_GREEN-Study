// 쇼핑몰 배너 JS - 01.가로방향 배너 슬라이드 //

// HTML태그 로딩후 loadFn함수 호출! ///
window.addEventListener("DOMContentLoaded", loadFn);

function loadFn() {
    console.log("로딩완료!");

    let slist = document.querySelectorAll("#slide>li");

    slist.forEach((ele, idx) => {

        ele.setAttribute("data-seq", idx);
    }); ////// forEach /////////////////

    // 1. 대상선정
    // 1-1. 이벤트 대상: .abtn
    const abtn = document.querySelectorAll(".abtn");

    // 1-2. 변경 대상: #slide
    const slide = document.querySelector("#slide");

    // 1-3. 블릿 대상: .indic li
    const indic = document.querySelectorAll(".indic li");
    console.log(indic);

    let prot = 0;

    const goSlide = (seq) => {

        if (prot) return;
        prot = 1; // 잠금!
        setTimeout(() => {
            prot = 0; // 해제!
        }, 400); /// 0.4초후 해제! ///


        let clist = slide.querySelectorAll("li");
   
        if (seq) {

            slide.style.left = "-100%";
            slide.style.transition = "left .4s ease-in-out";

            setTimeout(() => {
      
                slide.appendChild(clist[0]);
                slide.style.left = "0";
                slide.style.transition = "none";
            }, 400); //// 타임아웃 //////
        } //////////// if : 오른쪽클릭시 //////

        // 1-2. 왼쪽버튼 클릭시 //////////////
        else {
   
            slide.insertBefore(clist[clist.length - 1], clist[0]);

            slide.style.left = "-100%";
            slide.style.transition = "none";

            setTimeout(() => {
                slide.style.left = "0";
                slide.style.transition = "left .4s ease-in-out";
            }, 0); ////// 타임아웃 /////////
        } //////////// else : 왼쪽클릭시 //////

        // 2. 현재 슬라이드 순번과 같은 블릿표시하기
     
        clist = slide.querySelectorAll("li");
        let cseq = clist[seq].getAttribute("data-seq");

        // 2-3. 블릿초기화
        for (let x of indic) x.classList.remove("on");

        // 2-4. 읽어온 슬라이드 순번의 블릿에 클래스 "on"넣기
        indic[cseq].classList.add("on");

        // 3. 블릿클릭시 이동 현재순번변수(iseq)에 순번일치하기!
        iseq = Number(cseq);
    }; ////////// goSlide함수 ///////////

    // 3. 이동버튼대상에 이벤트 설정하기
    abtn.forEach((ele, idx) => {
        ele.onclick = () => {
            // 1. 인터발지우기함수 호출!
            // clearAuto();
            // 2. 슬라이드 함수 호출!
            goSlide(idx);
        }; ///// click함수 //////
    }); /////// forEach //////////

    // 인터발함수 지우기위한 변수
    let autoI;
    // 타임아웃함수 지우기위한 변수
    let autoT;

    /************************************ 
        함수명: autoSlide
        기능: 인터발함수로 슬라이드함수 호출
    ************************************/
    function autoSlide() {
        console.log("인터발시작!");
        // 인터발함수로 슬라이드함수 호출하기
        autoI = setInterval(() => goSlide(1), 3000);
    } ////////////// autoSlide함수 //////////

    // 자동넘김 최초호출!
    //    autoSlide();

    /************************************ 
        함수명: clearAuto
        기능: 인터발함수를 지우고 다시셋팅
   ************************************/
    function clearAuto() {
        console.log("인터발멈춤!");
        // 1. 인터발 지우기
        clearInterval(autoI);

        // 2. 타임아웃도 지우지 않으면
        // 쌓여서 타임아웃 쓰나미실행이 발생한다!
        clearTimeout(autoT);

        // 3. 잠시후 다시 작동하도록 타임아웃으로
        // 인터발함수를 호출한다!
        // 5초후(인터발은 3초후, 토탈 8초후 작동시작)
        autoT = setTimeout(autoSlide, 5000);
    } ///////// clearAuto 함수 /////////////

    let iseq = 0;

    indic.forEach((ele, idx) => {
        // ele-요소, idx-순번
        // 클릭이벤트 설정하기
        ele.onclick = () => {
            // 1. 클릭된 순번
            let cseq = idx;
            // 2. 현재 순번 - iseq
            // 3. 순번차 : 클릭된 순번 - 현재 순번
            let diff = cseq - iseq;
            // 순수값 차이 -> 절대값 : Math.abs()
            let pure = Math.abs(diff);

            console.log("클릭된순번:", cseq);
            console.log("현재순번:", iseq);
            console.log("순번차:", diff);
            console.log("순수차:", pure);

            // 4.방향별 슬라이드이동하기
            // 4-1. 양수면 오른쪽 //////
            if (diff > 0) {
   
                slide.style.left = -100 * pure + "%";
                slide.style.transition = "left .4s ease-in-out";

                // (2) 슬라이드 이동후!!! (0.4초후)
                setTimeout(() => {
                    // for문으로 자를수(순수값)만큼 순서대로처리!

                    // 계산되는 차이수(1씩감소하여 left값에 계산시킴!)
                    let temp = pure;

                    for (let i = 0; i < pure; i++) {
                        // temp 1씩감소하기!
                        temp--;

             
                        slide.appendChild(slide.querySelectorAll("li")[0]);
                        // (2-2) 동시에 left값을 0으로 변경한다!
                        slide.style.left = -100 * temp + "%";
                        // (2-3) 트랜지션 없애기!
                        slide.style.transition = "none";
                    } /////////// for /////////////////////
                }, 400); //// 타임아웃 //////
            } ////////// if ///////////
            // 4-2. 음수면 왼쪽 /////////
            else if (diff < 0) {
  

                for(let i = 0; i < pure; i++){

                    // 이동할 리스트
                    let clist = slide.querySelectorAll("li");

                    slide.insertBefore(clist[clist.length - 1], clist[0]);
    
                    // (2) 동시에 left값을 -100% 단위로 변경한다.
                    // i값이 0부터 반복회수만큼 증가하므로 이것을 이용함!
                    slide.style.left = ((i+1)*-100) + "%";
                    // 이때 트랜지션을 없앤다(한번실행후 부터 생기므로!)
                    slide.style.transition = "none";
                } ////////// for /////////////////////

                setTimeout(() => {
                    slide.style.left = "0";
                    slide.style.transition = "left .4s ease-in-out";
                }, 0); ////// 타임아웃 /////////
            } ////////// else if /////////
            // 4-3. 0이면 나가! //////////
            else {
                return;
            } ///////// else /////////////

            // 5. 현재블릿 초기화
            indic[iseq].classList.remove("on");

            // 6. 클릭된 순번으로 현재순번 변경
            iseq = cseq;

            // 7. 클릭된 블릿에 on넣기
            indic[iseq].classList.add("on");
        }; ////////// click ////////////
    }); //////// forEach ////////////////////
} //////////////// loadFn 함수 ///////////////
