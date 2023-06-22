// 검색 모듈 - Search.js
import $ from 'jquery'
import { useState } from 'react';
import "../css/search.css";
import cat_data from '../data/cat';
import CatList from '../modules/CatList';

// 제이쿼리 로드구역 함수
function jqFn(){
    $(()=>{
    
    }); ///// JQB /////
} ////////// jqFn //////////

function Search(){
    // 데이터 선택하기 : Hook 데이터 구성하기
    let [sdt,setSdt] = useState(cat_data);
    return(
        <>
            {/* 모듈코드 */}
            <section className='schbx'>
                {/* 1. 옵션 선택 박스 */}
                <div className='schopt'>

                </div>
                {/* 2. 결과리스트박스 */}
                <div className='listbx'>
                    {/* 결과타이틀 */}
                    <h2 className='restit'>
                        BROWSE CHARACTERS
                    </h2>
                {/* 정렬선택박스 */}
                <aside className='sortbx'>

                </aside>
                {/* 캐릭터 리스트 컴포넌트(전달속성 dt - 리스트 데이터) */}
                <CatList dt = {sdt} />
                </div>
            </section>
            {jqFn()}
        </>
    )
}

export default Search;