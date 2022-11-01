import React,{useState,useContext, createContext} from 'react';
import ScrollNavi from "./Scroll-Navi"

const Header = ({introductionref,aboutref,projectref}) => {
    return (
        

        <div className="header">
                <NavbarIcon introductionref={introductionref} aboutref={aboutref} projectref={projectref}/>
                <h1 className="name-short"> BM </h1>
                <ul>
                       
                    <li className="list-item git"><a href="https://github.com/Batti-M/portfolio"><img className='logos' src="GitHub.png" alt="github-icon" /></a></li>   
                 </ul>
        </div>
        
       
    )
}

export default Header



const NavbarIcon = ({introductionref,aboutref,projectref}) => {
    const[navActive,setNavActive] = useState("scroll-navigator")
    
    const toggleScrollNavi = () => {
        navActive === "scroll-navigator" ? setNavActive("showNavi") : setNavActive("scroll-navigator")
        navActive === "scroll-navigator" ? 
        document.querySelector(".dropdown-icon").style.rotate = "135deg" : 
        document.querySelector(".dropdown-icon").style.rotate = "-45deg"
    }
    return(
        <>
            <button onClick={toggleScrollNavi} className='dropdown-icon'></button>
            <ScrollNavi introductionref={introductionref} aboutref={aboutref} projectref={projectref} navActive={navActive}/>
        </>
    
    )

}
