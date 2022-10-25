import React, { useState, useEffect } from "react";
import { Character } from "./Character";
import {handleDiceHtml,getDiceRollArray, getHealthBarHtml} from "./allFunctions.js"

const RPG = (props) => {
  const [gameOver, setGameOver] = useState(false);
  const [round, setRound] = useState(0);
  const [result, setResult] = useState("");

  const [hero, setHero] = useState({
    name: "Wizard",
    avatar: "../wizard.png",
    maxHealth: 66,
    isDead: false,
    health: 66,
    diceCount: 3,
    currentDiceScore: [0, 0, 0],
  });

  const [monster, setMonster] = useState([
    {
      id: 1,
      name: "Orc",
      avatar: "../orc.png",
      maxHealth: 30,
      health: 30,
      diceCount: 2,
      isOpponent: true,
      isDead: false,
      currentDiceScore: [0],
    },
    {
      id: 2,
      name: "Demon",
      avatar: "../demon.png",
      maxHealth: 25,
      health: 25,
      diceCount: 2,
      isDead: false,
      currentDiceScore: [0],
    },
    {
      id: 3,
      name: "Goblin",
      avatar: "../goblin.png",
      maxHealth: 20,
      health: 20,
      diceCount: 3,
      isDead: false,
      currentDiceScore: [0],
    },
  ]);

    useEffect(() => {
     setTimeout( () => checkForResult(),200)
  } ,[round])

  const calculateNewHealthbar = () => {
    const totalAttackScoreHero = hero.currentDiceScore.reduce(
      (total, num) => total + num
    );
    const totalAttackScoreMonster = monster[0].currentDiceScore.reduce(
      (total, num) => total + num
    );

    setHero((prev) => ({
      ...prev,
      health:
        prev.health - totalAttackScoreMonster > 0
          ? prev.health - totalAttackScoreMonster
          : "0",
    }));
   
    setMonster(
      monster
        .map((mon, index) =>
          index === 0
            ? {
                ...mon,
                health:
                  mon.health - totalAttackScoreHero > 0
                    ? mon.health - totalAttackScoreHero
                    : "0",
                isDead: mon.health - totalAttackScoreHero <= 0 ? true : false,
              }
            : { ...mon }
        )
        .filter((mon) => mon.isDead !== true)
        .map((mon, index) =>
          index === 0 ? { ...mon, isOpponent: true } : { ...mon }
        )
    );
    
  };
 
  const nextRound = () => {
    attack();
  };
  const checkForResult = () => {
    if (hero.health <= 0 && monster.length  <= 0) {
      setGameOver(true);
      setResult("draw");
    } else if (hero.health <= 0) {
      setGameOver(true);
      setResult("monsters won 💀 ");
    } else if (monster.length === 0) {
      setGameOver(true);
      setResult("hero won 🥳");
    }
  }
  const attack = () => {
    getDiceRollArray();
    getHealthBarHtml();
    calculateNewHealthbar();
    setRound((prev) => prev + 1);
  };

  const [started, setStarted] = useState(false);
  const startGame = () => {
    setStarted(true);
    setRound((prev) => prev + 1);
  };

  const getDicePlaceholderHtml = (diceCount) => {
    let dices = new Array(diceCount)
      .fill("")
      .map((index) => <div key="index" className="placeholder-dice"></div>);
    return dices;
  };

  return (
    <div className="rpg">
      {!started ? (
        <button className="start-btn" onClick={() => startGame()}>START GAME</button>
      ) : (
        <div>
          {!gameOver ? (
            <div className="rpg">
              <Character
                name={hero.name}
                avatar={hero.avatar}
                health={hero.health}
                healthBar={getHealthBarHtml(hero.health, hero.maxHealth)}
                diceHtml={
                  started
                    ? handleDiceHtml(hero)
                    : getDicePlaceholderHtml(hero.diceCount)
                }
              />
              {monster[0] ? (
                <Character
                  name={monster[0].name}
                  avatar={monster[0].avatar}
                  health={monster[0].health}
                  healthBar={getHealthBarHtml(
                    monster[0].health,
                    monster[0].maxHealth
                  )}
                  diceHtml={
                    round >= 1
                      ? handleDiceHtml(monster[0])
                      : getDicePlaceholderHtml(monster[0].diceCount)
                  }
                />
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="result-screen"> {result} </div>
          )}
         {!gameOver ? <button
            className="atk-btn"
            onClick={() => {
              round === 0 ? startGame() : nextRound();
            }}
          >
            ATTACK
          </button> : ""}
          <div> Round: {round} </div>
        </div>
      )}
    </div>
  );
};

export { RPG };
