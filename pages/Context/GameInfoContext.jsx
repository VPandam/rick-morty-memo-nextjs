import React from "react";

const GameInfoContext = React.createContext();

export function GameInfoProvider (props){
    let cardClickOne = undefined
    let cardClickTwo = undefined
    let cardClickOneURL = undefined
    let cardClickTwoURL = undefined

    let puntuacion = 0;
    let moves = 0
    let pause = false;
    
    const numberOfCards = 24;

    const value = {
        cardClickOne,
        cardClickTwo,
        cardClickOneURL,
        cardClickTwoURL,
        puntuacion,
        moves,
        pause,
        numberOfCards
    }

    return <GameInfoContext.Provider value={value} {...props}></GameInfoContext.Provider>
}

export function useGameInfo (){
    const context = React.useContext(GameInfoContext);

    if (!context){
        throw new Error ('useGameInfo should be inside provider GameInfoContext')
    }
    return context;

}