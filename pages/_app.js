import '../styles/globals.css'
import { ChronoProvider} from './Context/ChronoContext'
import { GameInfoProvider } from './Context/GameInfoContext';


export default function MyApp ({Component, pageProps}) {

    return (
      <ChronoProvider>
      <GameInfoProvider>
        <Component {...pageProps} />
      </GameInfoProvider>
      </ChronoProvider>
    );
  
}




