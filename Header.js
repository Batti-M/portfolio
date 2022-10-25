import React from 'react';

const Header = () => {
    return (
      
            <div className="header">
                <h1 className="name-short"> BM </h1>
                <ul>
                    <li className="list-item linkedIn"><a href="https://www.linkedin.com/in/bartosz-mieszkalski-30365916a/"><img className='logos' src="linkedin.png" alt="" /></a></li>   
                    <li className="list-item git"><a href="https://github.com/batti-mies"><img className='logos' src="GitHub.png" alt="github-icon" /></a></li>   
                 </ul>
            </div>
       
    )
}

export default Header