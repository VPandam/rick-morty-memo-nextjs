import styles from "./Game.module.css"

import React, {useState, useEffect} from 'react';


import Card from '../../Components/Card/index.js'
import './Game.module.css'

import getRandomInt from '../../Functions/getRandomInt/getRandomInt'
import rotateCard from '../../Functions/rotateCard/rotateCard';

import { useChrono } from '../../Components/Context/ChronoContext';
import { useGameInfo } from '../../Components/Context/GameInfoContext';
import classNames from "classnames";



export default function Game ({ results }){

    const { numberOfCards } = useGameInfo();
    const { restartTime, startChrono, PauseTime } = useChrono();
    let { pause, cardClickOne, cardClickOneURL, cardClickTwo, cardClickTwoURL, puntuacion, moves  } = useGameInfo();
    
    const cards = [];

    for (let index = 0; index < numberOfCards; index++) {
        cards.push(<Card/>)  
    }

    const [data, setData] = useState(results)
    const [photos, setPhotos] = useState()


    useEffect(() => {
        if (data){
            asignPhotos()
        }
    }, [data])
    
    const  fetchData = async () =>{
        

        let page = getRandomInt(0,33);
        let url = `https://rickandmortyapi.com/api/character?page=${page}`;
        await fetch(url)
        .then((response) => response.json())
        .then((responseJson) =>  {
            setData(responseJson.results)  
        })
         
    }

    const asignPhotos = () => {
        console.log(data)
        let photos  = []
        
        for (let i = 0; i <= 1; i++) {
            for (let index = 0; index < numberOfCards/2; index++) {
                photos.push(data[index].image)              
            }
        }
        
        photos = photos.sort(function() {return Math.random()-0.5})
        setPhotos(photos)
    }


    const newGame = () => {
        let a = document.getElementsByClassName("image");
        let cards = [...a];
        
        if(!pause){

            restartCards(cards);
            setTimeout(fetchData,700)
            restartTime();
            moves = 0
            document.getElementById("moves").innerHTML = "Moves " + moves;
            PauseTime();
        }
        
    }

    const restartCards = (cards) => {
        cards.forEach(function (card){
            if(card.classList.contains("rotate")){
             card.classList.toggle("rotate");
            }    
        })
    }



    const handleClickOnCard = (e, character) => { 
        if(!pause){
            startChrono()
            if(e.target.classList.contains('back')){
                if (cardClickOneURL === undefined){
                    cardClickOne = e.target.offsetParent;
                    rotateCard(cardClickOne);
                    
                    cardClickOneURL = character
                    console.log("cardClickone")
                    
                }else{
                    pause = true;
                    cardClickTwo = e.target.offsetParent;
                    rotateCard(cardClickTwo);
                    cardClickTwoURL = character
                    
                    if (cardClickOneURL.backgroundImage === cardClickTwoURL.backgroundImage){
                        pause = false;
                        puntuacion ++;
                        console.log(puntuacion)
                        if(puntuacion === numberOfCards/2){
                            alert("You won!") 
                            PauseTime();    
                        }
                        moves = ++moves 
                        document.getElementById('moves').innerHTML ="Moves " + moves;
                        cardClickOneURL = undefined;
                        cardClickTwoURL = undefined;
                    }else{  
                        setTimeout(function() {
                        cardClickOne.classList.toggle("rotate")},1200);
                        setTimeout(function() {cardClickTwo.classList.toggle("rotate")
                        pause=false}, 
                        1200);
                        moves = ++moves;
                        document.getElementById('moves').innerHTML ="Moves " + moves;

                        cardClickOneURL = undefined;
                        cardClickTwoURL = undefined;

                    }
                }
            
            }
        }
    }

    if(photos){
        return(
            <React.Fragment>                
                <div className={styles.game}>

                    <div className={styles.imgContainer}>
                        {/* <img src={BackGroundImg} alt="" /> */}
                    </div>
                    
                    <div className={styles.cardsContainer}>
                        {cards.map((card, i) => 
                            <Card 
                                obj={card} 
                                key={i} 
                                photo={photos[i]}
                                handleClickOnCard={handleClickOnCard}
                            />)
                        }
                    </div>

                    <div className ={styles.chrono}>
                        <p id='moves' className={styles.moves}> Moves 0</p>
                        <p id='time' className={styles.time}>Time 00:00</p>
                        <div className={styles.startButton} onClick={newGame}>New Game</div>
                        
                    </div> 
                    

                    
                </div>
            </React.Fragment>

        )

    } else{
        return (
            <React.Fragment>

                    <div className={styles.imgContainer}>
                                {/* <img src={BackGroundImg} alt="" /> */}
                    </div>
                            
                    <h1>Cargando</h1>

                    
            </React.Fragment>
        )
    }
 
}
export async function getStaticProps (){
    let page = getRandomInt(0,33);
    let url = `https://rickandmortyapi.com/api/character?page=${page}`;
    const res = await fetch(url);
    const data = await res.json();
    const results = data.results;

    
    
    return {props: {results}}

}
