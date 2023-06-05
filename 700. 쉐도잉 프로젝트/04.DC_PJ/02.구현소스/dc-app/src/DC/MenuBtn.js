// 메뉴버튼 모듈 - MenuBtn.js
import $ from 'jquery'
import "./css/menubtn.css";

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
       
    }); ///// JQB /////
} ////////// jqFn //////////

// 반복리스트
function MenuBtn(props){
    return(
        <>
        <section className="menubtn">
            <div>
                <div className="imbx">
                    <img src={props.rec.isrc} alt="이미지"/>
                </div>
                <div className="titbx">
                    <h3>{props.rec.tit.split("^")[0]}</h3>
                    <h2>{props.rec.tit.split("^")[1]}</h2>
                </div>
                <div className="btnbx">
                    {/* 라우터를 이용한 이동은 반드시 Link를 사용하자! */}

                    <button>{props.rec.btn}</button>
                </div>
            </div>
        </section>
        {/* --빈루트를 만들고 JS로드함수 포함-- */}
        {jqFn()}
        </>
    )
} /////////// MenuBtn ///////////

export default MenuBtn;
