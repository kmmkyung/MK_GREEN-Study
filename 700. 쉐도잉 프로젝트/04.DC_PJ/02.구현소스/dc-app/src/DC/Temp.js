// 어떤 모듈 - Temp.js
import $ from 'jquery'
import "./temp.css/.css";

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
       
    }); ///// JQB /////
} ////////// jqFn //////////

function Temp(){
    return(
        <>
            {/* 모듈코드 */}
            {jqFn()}
        </>
    )
}

export default Temp;