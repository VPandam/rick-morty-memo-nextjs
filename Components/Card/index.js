import styles from './Card.module.css'

 export default function Card (props){
    const divStyle = {
        backgroundImage: 'url(' + props.photo + ')'
    };

    return(
        <>
            <div className='Card'>
                <div className='image'>
                    <div className='front' style={divStyle} onClick={(e) => props.handleClickOnCard}></div>
                    <div className={`${styles.back} back`} onClick={(e) => props.handleClickOnCard(e, divStyle)}></div>
                </div>
                
            </div>

            <style jsx>{`
                .Card {
                    height: 100px;
                    width: 100px;
                
                    display: inline-block;
                    background-color: transparent;

                    
                    cursor: pointer;
                    margin: 10px 10px;

                }
                .image {
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                    transition: transform 1.5s;
                    transform-style: preserve-3d;
                    z-index: 99;
                }
                
                .front,
                .back {
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                
                    backface-visibility: hidden;
                
                    position: absolute;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                }
                
                
                
                .front {
                    transform: rotateY(180deg);
                }
                
                .rotate {
                    transform: rotateY(180deg);
                }
                .rotateBack {
                    transform: rotateY(180deg);
                }
                
                @media screen and (min-device-width: 1235px) and (max-device-width: 1799px) and (-webkit-min-device-pixel-ratio: 1) {
                    .Card {
                    width: 90px;
                    height: 90px;
                    margin: 9px 9px;

                    }
                }
                
                @media screen and (max-width: 1234) {
                    .Card {
                    width: 70px;
                    height: 70px;
                    margin: 7px 7px;
                    }
                }
                
                @media screen and (max-width: 592px) {
                    .Card {
                    width: 50px;
                    height: 50px;
                    margin: 5px 5px;
                    }
                }

            `}</style>
        </>
    )

    
 
}
    