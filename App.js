import Header from "./Header"
import Introduction from "./Introduction"
import Footer from "./Footer"
import Projects from "./Projects"
import About from "./About"
import ScrollNavi from "./Scroll-Navi"
import { useRef } from "react"
import { BrowserRouter as Router} from "react-router-dom";
import React from "react"



function App() {
  const projectref = useRef()
  const introductionref = useRef()
  const aboutref = useRef()
  
  return (
    <div className="main">
      <Header />
      <Router>
        
          <Introduction introductionref={introductionref}/>
          <About aboutref={aboutref}/>
          <Projects projectref={projectref}/>
          <ScrollNavi introductionref={introductionref} aboutref={aboutref} projectref={projectref}/>
        
      </Router>
      <Footer />
    </div>
  );
}

export default App;
