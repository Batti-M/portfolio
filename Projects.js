import React,{useRef,useState, useMemo, useEffect} from "react"
import { AniLetter } from "./Introduction"
import {MemeGenerator} from "./MemeGenerator"
import {RPG} from "./RPGame/RPG"
import {CatApp} from "./catmehappy/CatApp"

export const StateContext = React.createContext()

const Project = ({projectName,projectImg,projectDescription,project}) => {

   // handle animation
   const targetRef = useRef()
   const [isVisible, setIsVisible] = useState(false)
   
   const callbackFuntion = entries => {
       const [entry] = entries
       setIsVisible(entry.isIntersecting)
   }

   const options = useMemo( () => {
        return {
           root: null,
           rootMargin: "0px",
           threshold: 0.4
        }
   },[])

   useEffect( () => {
       const observer = new IntersectionObserver(callbackFuntion,options)
       const currentTarget = targetRef.current;
       if(currentTarget) observer.observe(currentTarget)

       return () => {
           if(currentTarget) observer.unobserve(currentTarget)
       }
   },[targetRef, options])

   //state for project samples
   const [isShown,setIsShown] = useState(false)
   const handleShown = (prev) => {
     setIsShown(prev => !prev)
  }
   //handle gif on mouseover
   const [isHovering,setIsHovering] = useState(false)

   const handleMouseOver = () => {
      setIsHovering(true);
    };
  
    const handleMouseOut = () => {
      setIsHovering(false);
    };

   return (
      <div ref={targetRef} className={isVisible ? "project projectAnimation" : "dontShow"}>
         <div className="project-info">
            <div className="project-name projectAnimation">
               
               <AniLetter>  {projectName} </AniLetter>  
               
            </div>
            <div className="project-description">
               {projectDescription}
            </div>
               <StateContext.Provider value={{isShown,setIsShown,handleShown}}>
               <div className="project-links">
                  <div className="project-sample"> {isShown ? [project] : ""} </div>
                  <div className="flex-row">

                     <button className="project-btn" onClick={handleShown}> 
                     {!isShown ? "Try it out!" : "Close"}</button>
                     <a className="project-logo" href="https://github.com/batti-mies"><img className='logos' src="GitHub.png" alt="github-icon" /></a>

                  </div>
               </div>
               </StateContext.Provider>  
         </div>
         <div onMouseOver ={handleMouseOver} onMouseOut={handleMouseOut} className="proj-img"> 
            
            {/* <div style={{display: isHovering ? "block" : "none"}} className=".project-img-div">
               <img className="project-img-div"alt="" src={`${gifsrc}`} /> 
            </div>  */}
           
            <div>
            <img alt="" src={projectImg} className="project-img"/> 
            </div>
           
         </div>
      </div>
   )
}


const Projects = ({projectref,isShown,setIsShown,handleShown}) => {
 
  
   const rpgDescription = "ursprünglich war das RP-Game ein Vanilla Javascript Projekt. Um meine React-Skills zu verbessern, habe ich das das Game in React-Syntax umgewandelt. Testen Sie es und retten Sie die Welt ;)"
   const memeDescription = "Der Meme-Generator ist ein React Projekt - Fokus hierbei lag auf dem Erlernen verschiedener React-hooks sowie Übung mit API Schnittstellen"
   const capstoneDescription = "CatMeHappy ist auch ein React Projekt -  es handelt sich um einen Onlineshop für Katzenbilder. Erlernen&Erstellen von costum hooks stand hierbei im Vordergrund "
  
   return(
      <div ref={projectref} class="container container-large">
         <div ref={projectref} className="projects">
         
            <Project project={<RPG isShown={[isShown,setIsShown]} handleShown={handleShown} />} gifsrc={"rpg.gif"} projectName={"Roleplay Game"} projectImg={"rpg-game.png"} projectDescription={rpgDescription} />
            <Project project={<MemeGenerator isShown={isShown} handleShown={handleShown} />} gifsrc={"meme.gif"} projectName={"Meme-Generator"} projectImg={"memeGeneratorNew.png"} projectDescription={memeDescription}/> 
            <Project project={<CatApp isShown={isShown} handleShown={handleShown}/>} gifsrc={"capstone.gif"} projectName={"Catmehappy  "} projectImg={"capstone.png"} projectDescription={capstoneDescription}/> 
           
         </div>
         
      </div>
   )
}

export default Projects