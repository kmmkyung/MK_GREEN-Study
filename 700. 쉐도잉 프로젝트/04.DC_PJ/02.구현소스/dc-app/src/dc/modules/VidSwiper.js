///  VidSwipe 모듈 - VidSwipe.js
import $ from 'jquery';
import "../css/vidswiper.css";
import SwiperVid from '../plugin/SwiperVid';

// 제이쿼리 로드구역 함수 /////////
function jqFn(){
    $(()=>{

    }); //////// jQB ///////////
} ////////////// jQFn ///////////

function VidSwiper(props){
    // props.pg - 페이지별 데이터구분
    // props.tit - 모듈타이틀
    return(
        <>
        <section className='vidswdox'>
            {/* 1. 모듈타이틀 */}
            <h2 className='tit'>{props.tit}</h2>

            {/* 2. 스와이퍼 컴포넌트 */}
            <SwiperVid />

            {/* 3. 비디오 재생창 */}
            <section className='vidbx'>
                {/* 비디오 중앙박스 */}
                <div className='playvid'>
                    {/* 비디오 타이틀 */}
                    <h2 className='ifrtit'></h2>
                    {/* 아이프레임 */}
                    <iframe src='' allow='autoplay'></iframe>
                    {/* 비디오 닫기버튼 */}
                    <button className='cbtn'>×</button>
                </div>
            </section>
        </section>

        {/* 빈루트를 만들고 JS로드함수포함 */}
        {jqFn()}
        </>
    )
}

export default VidSwiper;