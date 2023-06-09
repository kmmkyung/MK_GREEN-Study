// 메인 레이아웃 컴포넌트
import Logo from "./Logo"
import "./css/layout.css"
import { Link, Outlet } from "react-router-dom"

/********************************
  [ 리액트 라우터와 연결하여 사용되는 라우터 컴포넌트 ]
  1. <Link to = "/경로명"></Link>
  ->to 속성의 경로는 <Route path="/경로명"> 과 일치함!
  2. <Outlet />
  -> 라우트 연결 컴포넌트 출력자리 컴포넌트
********************************/ 


const Layout = () => {

  // GNB메뉴 데이터 구성하기
  const gnb_data = [
    {
      txt:"Home",
      link:"/",
    },
    {
      txt:"CHARACTERS",
      link:"/ct",
    },
    {
      txt:"COMICS",      
      link:"/co",
      sub:[
        {
            txt:"DC MOVIES",
            link:"/dm",
        },
        {
            txt:"DC SERIES",
            link:"/ds",
        },
        {
            txt:"DC ON HBO MAX",
            link:"/hbo",
        },
      ]
    },
    {
      txt:"MOVIES & TV",
      link:"/mv",
      sub:[
        {
            txt:"DC MOVIES",
            link:"/dm",
        },
        {
            txt:"DC SERIES",
            link:"/ds",
        },
        {
            txt:"DC ON HBO MAX",
            link:"/hbo",
        },
      ]
    },
    {
      txt:"GAMES",
      link:"/gm",
    },
    {
      txt:"NEWS",
      link:"/nw",
    },
    {
      txt:"VIDEO",
      link:"/vd",
    }
  ]

  return(
  <>
    {/* // 상단영역 */}
    <header className="top">
      {/* // 네비게이션 파트 */}
      <nav className="gnb">
        <ul>
          <li>
            <Logo/>
          </li>
            {
              gnb_data.map((v,i)=>
                <li key={i}>
                  <Link to ={v.link}>{v.txt}</Link>
                  {/* console.log('v.sub'); */}
                  {/* v.sub가 없으면 undfined */}
                  {
                    // 조건식 &&출력코드
                    // 조건: sub 데이터가 없지 않으면
                    // undefined - 정의되지 않은 값
                    // null - 빈값
                    // 위 두 값은 데이터가 없다는 값임

                    v.sub != undefined &&
                    <div className="smenu">
                      <ol>
                        {
                          v.sub.map((v,i)=>
                          <li key={i}>
                            <Link to ={v.link}>{v.txt}</Link>
                          </li>)
                        }
                      </ol>
                    </div>
                  }
                </li>
              )
            }
        </ul>
      </nav>
    </header>

    {/* 2. 메인영역 */}
    <main className="cont">
      {/* 출력파트: 각 페이지의 컴포넌트가 출력됨 */}
      <Outlet />
    </main>

    {/* 3. 하단영역 */}
    <footer className="info">
            All Site Content © &amp; TM DC, unless otherwise noted here.
            <br /> 
            All rights reserved. 
    </footer>
  </>
  )
}; /////// LayOut ////////

// 내보내기
export default Layout;