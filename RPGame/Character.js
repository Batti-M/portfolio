import React  from "react"

const Character = ({name,avatar,diceHtml,health,healthBar}) => {

    return (
            <div className="character-card">
                <h4 className="character-name"> {name} </h4>
                <img className="avatar" alt="avatar" src={avatar} />
                <div className="health">health: <b>{health} </b></div>
                {healthBar}
                <div className="dice-container">
                    {diceHtml}
                </div>
            </div>
            )
}

export {Character}

