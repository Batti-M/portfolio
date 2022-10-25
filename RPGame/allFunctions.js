import React from "react";


const handleDiceHtml = (character) => {
    character.currentDiceScore = getDiceRollArray(character.diceCount);
    character.diceHtml = character.currentDiceScore.map((num) => (
      <div className="dice">{num}</div>
    ));
    return character.diceHtml;
  };

  const getDiceRollArray = (diceCount) => {
    return new Array(diceCount)
      .fill(0)
      .map(() => Math.floor(Math.random() * 6) + 1);
  };

  const getPercentage = (remainingHealth, maximumHealth) =>
    (100 * remainingHealth) / maximumHealth;

  const getHealthBarHtml = (health, maxHealth) => {
    const percent = getPercentage(health, maxHealth);
    return (
      <div className="health-bar-outer">
        <div
          className={
            percent < 26 ? "danger health-bar-inner" : "health-bar-inner"
          }
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    );
  };

  export {handleDiceHtml,getDiceRollArray,getPercentage, getHealthBarHtml}