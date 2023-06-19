// DC 페인 페이지 컴포넌트
import Ban from "./modules/Ban";
import MenuBtn from "./modules/MenuBtn";
import VidIntro from "./modules/VidIntro";
import SwiperVid from "./plugin/SwiperVid";
import VidSwiper from "./modules/VidSwiper"
import CatSwipe from "./modules/CatSwipe";

const Main = () => {
    return (
        <>
            {/* 1.배너모듈 :랜덤수로 데이터 선택 */}
            <Ban cat={"main"+Math.ceil(Math.random()*2)} />
            {/* 2. 메뉴버튼모듈 */}
            <MenuBtn />
            {/* 3. 비디오소개모듈 */}
            <VidIntro pg="main" mm="" />
            {/* 4. 비디오스와이프모듈 */}
            <VidSwiper
            pg="main"
            tit="LATEST TRAILERS, CLIPS & MORE"
            />
            {/* 5. 메뉴 스와이퍼 모듈 */}
            <CatSwipe />
            {/* 6. 배너모듈(캐릭터) */}
            <Ban cat="CHARACTERS" />
            {/* 7. 메뉴 스와이퍼 모듈 */}
            {/* 8. 메인 하단 모듈 */}


        </>
    );
}; /////////// Main //////////////

export default Main;

