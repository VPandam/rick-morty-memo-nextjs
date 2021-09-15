import React, {useMemo, useState} from "react";

const ChronoContext = React.createContext();

export function ChronoProvider (props){
    
    let hora = 0
    let minutes = 0
    let seconds = 0
    let time = ''
    let stop = true;

    
    const chrono = () => {
        if (stop === false) {
            seconds++

            if (seconds > 59) {
                seconds = 0
                minutes++
            }
            if (minutes > 59) {
                minutes = 0
                hora++
            }
            
            ShowChrono();
            setTimeout(() => {    
                callChrono();

              }, 1000);
        }
    }

    const callChrono = () => {
        chrono();
    }
    
    const ShowChrono = () => {
       
        if (hora < 10) time = ''
        else time = hora
        if (minutes < 10) time = time + '0'
        time = time + minutes + ':'
        if (seconds < 10) time = time + '0'
        time = time + seconds
        document.getElementById('time').innerHTML = "Time " + time
    }
    
    const startChrono = () => {
        if (stop === true) {
			stop = false
			chrono()
            
		}
    }
    
    

    const PauseTime = () => {
        stop = true
    }
    const restartTime = () => {
        
        hora = minutes = seconds = 0
        time = ''
        ShowChrono()
    }

    const value = useMemo(() => {
        return ({
            restartTime,
            PauseTime,
            callChrono,
            startChrono,
            ShowChrono,
            chrono,
            stop,
            hora,
            minutes,
            seconds,
            time

        })
    }, [stop, hora, minutes, seconds, time, stop])

    return <ChronoContext.Provider value={value} {...props} />
}

export function useChrono (){
    const context = React.useContext(ChronoContext);

    if (!context){
        throw new Error ('useChrono should be inside provider ChronoContext')
    }
    return context;
}
