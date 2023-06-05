// 메뉴버튼 모듈 - MenuBtn.js
import $ from 'jquery'
import "./css/menubtn.css";
// 메뉴버튼 데이터
import menu_data from './data/menubtn';

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
       
    }); ///// JQB /////
} ////////// jqFn //////////

// 반복리스트
function MenuBtn(){
    return(
        <>
        <section className="menubtn">
            <div>
                <div className="imbx">
                    <img src="./images/menubtn1.jpg" alt="이미지"/>
                </div>
                <div className="titbx">
                    <h3>WORLDS COLLIDE</h3>
                    <h2>WORLDS COLLIDE</h2>
                </div>
                <div className="btnbx">
                    <button>WORLDS COLLIDE</button>
                </div>
            </div>
        </section>
        {/* --빈루트를 만들고 JS로드함수 포함-- */}
        {jqFn()}
        </>
    )
} /////////// MenuBtn ///////////

export default MenuBtn;