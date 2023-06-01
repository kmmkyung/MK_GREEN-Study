// 리스트 페이지 JS - list.js

// [ 제이슨 파일 데이터 로컬스토리지에 넣기 ]
// 1. 변수에 제이슨 파일 문자화 하여 불러오기
let jsn = JSON.stringify(mydata);
// console.log(jsn);

// 2. 로컬스토리지 변수를 설정하여 할당하기
localStorage.setItem("bdata",jsn);
// console.log("로컬스:",localStorage.getItem("bdata"));

// 3. 로컬스토리지 데이터를 파싱하여 게시판 리스트에 넣기
// 3-1. 로컬 스토리지 데이터 파싱하기
let bdata = JSON.parse(localStorage.getItem("bdata"));
console.log("로컬스파싱:",bdata,"/개수",bdata.length);

// 3-2. 게시판 변수 생성하기
// 페이지 번호<- 함수내 전달변수로 처리!
let pgnum = 1; 
// 페이지 단위수 : 한 페이지당 레코드 수
let pgblock = 9;

// 시작번호 생성: (페이지번호-1)*페이지 단위수
// -> (pgnum-1)*pgblock
// 끝번호 생성: 페이지번호 * 페이지단위수
// -> pgnum*pgblock

/************************************************************
    함수명: bindList
    기능: 페이지별 리스트를 생성하여 바인딩함(화면에 디스플레이 함)
************************************************************/
function bindList(pgnum){ //pgnum - 페이지번호
    // 0. 게시판 리스트 생성
        let blist="";
        // 전체 레코드 개수
        let totnum=bdata.length

    // 1. 일반형 for문으로 특정대상 배열 데이터 가져오기
    // 데이터 순서: 번호 글제목 글쓴이 등록일자 조회수
    for(let i = pgblock*(pgnum-1); i<pgnum*pgblock; i++){
        // 마지막 번호한계값 조건으로 마지막페이지 데이터는 존재하는 데이터까지만 바인딩하기
        if(i<totnum){
            blist +=`
                <tr>
                    <td>${bdata[i]["idx"]}</td>
                    <td>
                        <a href="view.html?idx=${bdata[i]["idx"]}">
                        ${bdata[i]["tit"]}
                        </a>
                    </td>
                    <td>${bdata[i]["writer"]}</td>
                    <td>${bdata[i]["date"]}</td>
                    <td>${bdata[i]["cnt"]}</td>
                </tr>
            `;
        } ////// if문 /////
    } ///// for문 /////
    // 확인!
    // console.log('코드',blist);

    // 2. 리스트 코드 테이블에 넣기
    $("#board tbody").html(blist);
    
    // 3. 페이지 블록 만들기
    // 3-1. 전체 페이지 번호수 계산하기
    // 전체레코드수 / 페이지단위수(나머지 있으면 +1)
    // 전체레코드 수: totnum 변수에 할당해 놓음
    let pgtotal = Math.floor(totnum/pgblock);
    console.log('페이징전체수',pgtotal);
    // 나머지
    let pgadd = totnum % pgblock;
    console.log('페이징나머지',pgadd);
    
    // 페이징 코드 변수
    let pgcode = "";

    // 3-2. 페이징코드 만들기
    // 나머지가 있으면 1을 더함
    if(pgadd!=0){
        pgtotal = pgtotal+1;
    } ////////// if문 ///////////

    // 코드만들기 for문
    for(let i = 1; i<=pgtotal; i++){
        pgcode += 
        // 페이지 번호와 i가 같으면 a링크를 만들지 않는다
        pgnum == i ? `<b>${i}</b>` : `<a href="#">${i}</a>`;

        // 사이 구분자(마지막번호 뒤는 제외)
        if(i!=pgtotal){
            pgcode += " | ";
        }
    } ///////// for문 ////////////

    // 3-3. 페이징코드 넣기
    $(".paging").html(pgcode);

    // 3-5. 이벤트링크 생성하기
    $(".paging a").click(function(e){
        // 기본이동막기
        e.preventDefault();
        // 바인딩함수호출(페이지번호 보냄)
        bindList($(this).text())
    }); /////////// click ////////////
} /////////// bindList /////////////

////-----------------로드구역------------------------////
$(()=>{
    // 최초 리스트 바인딩 호출
    bindList(1);
    // 
}); /////////////// JQB //////////////////////
