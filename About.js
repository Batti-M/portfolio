import React,{useRef,useState, useMemo, useEffect} from "react"   

const About = ({aboutref}) => {
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
        const allObserver = document.querySelectorAll(".observerClass")
        allObserver.forEach( item => observer.observe(item))
        if(currentTarget) observer.observe(currentTarget)
        
        return () => {
            
            if(currentTarget) observer.unobserve(currentTarget)
        }
    },[targetRef, options])

    
    
    const [changeHtml,setChangeHtml] = useState(false)

    const changeInnerHtml = () => {
        setChangeHtml(!changeHtml)
    }
    const [reveal,setReveal] = useState(false)

    const toggleReveal = () => {
        if(!reveal){
            document.querySelector(".icon-area").classList.add("active");
            document.querySelector(".information-dark").classList.add("activeII")
            document.querySelector(".reveal-about-me").innerHTML = "close";
            setReveal(!reveal)
        }
        else if(reveal)
            {
            document.querySelector(".icon-area").classList.remove("active");
            document.querySelector(".information-dark").classList.remove("activeII");
            document.querySelector(".reveal-about-me").innerHTML = "About me";
            setReveal(!reveal)
        }
    }

    return(
        <div className="container">
            <div ref={aboutref} className=" about">
                <div className="icon-area" ref={targetRef}>

                    <div className="html-icon">
                        <img className={ isVisible? "icons show1" : "icons "} src="icons8-html-5.svg" alt=""></img>
                    </div>
                    <div className="css-icon">
                        <img className={ isVisible? "icons show2" : "icons"} src="icons8-css3 (1).svg" alt=""></img>
                    </div>
                    <div className="js-icon">
                        <img className={ isVisible? "icons show3" : "icons "} src="javascript-icon.svg" alt=""></img>
                    </div>
                    <div className="react-icon">
                        <img className={ isVisible? "icons show4" : "icons"} src="react-2.svg" alt=""></img>
                    </div>
                    <button className="reveal-about-me" onClick={toggleReveal}> About me</button>
                </div>
               

                
                <div id="blink" className="blink information-light"  ref={targetRef} onClick={changeInnerHtml}>

                    <p className="s"> i </p>

                </div>
                
                <div className="information-dark" ref={targetRef}>
                    { !changeHtml ?
                        <div>
                        
                            <p> Seit mehreren Monaten lerne ich den Umgang mit HTML,CSS und Javascript. </p>
                            <p> Seit einigen Wochen lerne ich das JS Framework React, mit dem dieses Portfolio gebaut wurde.</p>
                            <hr></hr>
                            <p>Neben Tutorials auf Youtube , habe ich mir den größten Teil meines Könnens durch die Platformen CSX,Scrimba und TheOdinProject angeeignet,wobei CSX sich mehr auf das Erlernen/Üben von Funktionen fokusiert hat und Scrimba/TheOdinProject projektbasierend waren.</p>

                        </div> : 
                        <div> 
                            <p>Und keine Sorge, als Person bin ich bei Weitem nicht so kompliziert wie mein Name<span role="img" aria-label="laughing smiley">😜</span></p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default About

   
