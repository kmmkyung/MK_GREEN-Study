// DC 코믹스 페이지 컴포넌트
import React from "react";
import Ban from "./modules/Ban";
import VidIntro from "./modules/VidIntro";


const Comics = (props) => {
    {console.log(props.sub);}

    // 
    const tit_data = [
        " LATEST COMICS & GRAPHIC NOVELS  ",
        "DC UNIVERSE INFINITE",
        "ALL COMICS SERIES",
    ];

    return(
        <>
        <h1></h1>
            <VidIntro pg="COMICS" mm="on"/>
        </>
    );
}; /////////// Main //////////////

export default Comics;