import React, { useEffect,useState } from 'react';


function AniLetter(props) {
    const handleMouseEnter = (e) => {
      e.target.classList.add("blobanimation");
    }
    
    const handleTransitionEnd = (e) => {
      e.target.classList.remove("blobanimation");
    }
  
    return (
              <p
                  onMouseEnter={handleMouseEnter}
                  onAnimationEnd={handleTransitionEnd}
              >
                {props.children}
              </p> 
           
    )
  }


const Introduction = ({introductionref}) => {

//starting Spinner
const [isShown,setIsShown] = useState({opacity:"1",display:"block"})

  const setOpacity = () => {
    setIsShown({...isShown,opacity:"0"})
  }
  const setDisplay = () => {
    setIsShown({...isShown, display: "none"})
  }
  useEffect(  () => { 
    setTimeout(setOpacity,2000)
    setTimeout(setDisplay,3000)

  },[])
  //end spinner

//start Animated Name
const name = "Bartosz"
const nachName = "Mieszkalski"
const updatedName = name.split("")
const updatedNachName = nachName.split("")
const animatedName = updatedName.map( letter => <AniLetter>{letter}</AniLetter>)
const animatedNachName = updatedNachName.map ( letter => <AniLetter>{letter}</AniLetter>)
    
    return (
        <div className='container'> 
          <div className="spinnerDiv" style={{opacity:`${isShown.opacity}`, display:`${isShown.display}`}}>
            <p className="spinnerLogo">BM
            </p>
            
            <span id="spinnerSpan" className='spinnerAnimation'></span>
          </div>
          <div ref={introductionref} className="content">
             
              <div className='name-area'>

                <div className='name'> 
                
                    {animatedName}
                  
                </div>
                <div className='name'>
                    
                    {animatedNachName}

                </div>
                
                <h2 className="gradient">selftaught web developer</h2> 
              </div>       
        
              <a href="mailto:bartosz-m@outlook.de" class="email-link" rel="noopener noreferrer" target="_blank"><img src="paperplane.svg" alt="paperplane" class="paperplane"></img>Mail me</a>
          </div> 
             
        </div>
    )
}

export default Introduction
export {AniLetter}