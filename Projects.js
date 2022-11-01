import React,{useRef,useState, useMemo, useEffect} from "react"
import { AniLetter } from "./Introduction"
import {MemeGenerator} from "./MemeGenerator"
import {RPG} from "./RPGame/RPG"
import {CatApp} from "./catmehappy/CatApp"


export const StateContext = React.createContext()

const Project = ({projectName,projectImg,projectDescription,project,githublink,id}) => {
   

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
           threshold: 0.2
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

   
   return (
      <StateContext.Provider value={{isShown,setIsShown,handleShown,targetRef}}>
         
      <div ref={targetRef} className={isVisible ? "project grow-anim" : "dontShow"} >
         <div className={`project-info ${projectName}`}>
            <div className="project-name ">
               
               <AniLetter>  {projectName} </AniLetter>  
               
            </div>
            <div className="project-description">
               {projectDescription}
            </div>
            <div className="project-links">
               
               <div  >
                  <button className="project-btn" onClick={handleShown}> 
                  {!isShown ? "Try it out!" : "Close"}</button>
               </div>
               <div className="git">
                  <a href={githublink}><img className='logos project-logo' src="GitHub.png" alt="github-icon" /></a>
               </div>

            </div>
            <div className="project-sample"> {isShown ? [project] : ""} </div>
         </div>

      </div>
      </StateContext.Provider>  
   )
}


const Projects = ({projectref,isShown,setIsShown,handleShown}) => {
   
   const [carouselIndex,setCarouselIndex] = useState(0)
   const rpgDescription = "ursprünglich war das RP-Game ein Vanilla Javascript Projekt. Um meine React-Skills zu verbessern, habe ich das das Game in React-Syntax umgewandelt."
   const memeDescription = "Der Meme-Generator ist ein React Projekt - Fokus hierbei lag auf dem Erlernen verschiedener React-hooks sowie Übung mit API Schnittstellen"
   const capstoneDescription = "CatMeHappy ist auch ein React Projekt -  es handelt sich um einen Onlineshop für Katzenbilder. Erlernen&Erstellen von costum hooks stand hierbei im Vordergrund "
   
   const increment = () => {
      if(carouselIndex === 2) 
      setCarouselIndex(0)
      else setCarouselIndex(prev => prev+1)
      console.log(carouselIndex)
   }
   const decrement = () => {
      if(carouselIndex === 0) 
      setCarouselIndex(2)
      else setCarouselIndex(prev => prev-1)
   }
  
   return(
      <div class="container">
         <div ref={projectref} className="projects">
            <button onClick={increment}id="next">&#8658;</button>
            <button onClick={decrement}id="prev">&#8656;</button>
            {carouselIndex === 0 ?
            <Project 
            project={<RPG />}
            projectName={"Roleplay-Game"} 
            projectImg={"rpg-game.png"} 
            projectDescription={rpgDescription}
            githublink={"https://github.com/Batti-M/portfolio/tree/main/RPGame"}
            /> : ""}

            {carouselIndex === 1 ?
            <Project 
            project={<MemeGenerator />}
            projectName={"Meme-Generator"} 
            projectImg={"memeGeneratorNew.png"} 
            projectDescription={memeDescription}
            githublink={"https://github.com/Batti-M/portfolio/blob/main/MemeGenerator.js"}
            /> : ""}

            {carouselIndex === 2 ?
            <Project 
            project={<CatApp isShown={isShown} handleShown={handleShown}/>} 
            projectName={"Catmehappy"} 
            projectImg={"capstone.png"} 
            projectDescription={capstoneDescription}
            githublink={"https://github.com/Batti-M/portfolio/tree/main/catmehappy"}
            /> : " "}
           
         </div>
         
      </div>
   )
}

export default Projects
