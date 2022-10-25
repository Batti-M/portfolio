import React from "react";

const ScrollNavi = ({aboutref,projectref,introductionref}) => {

    return (
           
                <div className="scroll-navigator">
                        <div className="line"></div>
                        <button className='scroll-nav-btn scroll-navigator-content'
                        onClick={(e) => 
                        introductionref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })}><img alt ="a" src="home.svg"></img> </button>

                        <button onClick={() => {
                        aboutref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })}}
                        className='scroll-nav-btn scroll-navigator-about'><img alt ="a" src="stack.svg"></img></button>
                    
                        <button onClick={() => {
                        projectref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })}}
                        className='scroll-nav-btn scroll-navigator-project'><img alt ="a" src="project-management.png"/></button>
                    
                </div> 

    )
}

export default ScrollNavi