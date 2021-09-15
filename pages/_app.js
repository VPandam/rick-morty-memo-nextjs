import '../styles/globals.css'
import { ChronoProvider} from '../Components/Context/ChronoContext'
import { GameInfoProvider } from '../Components/Context/GameInfoContext';


export default function MyApp ({Component, pageProps}) {

    return (
      <ChronoProvider>
      <GameInfoProvider>
        <Component {...pageProps} />
      </GameInfoProvider>
      </ChronoProvider>
    );
  
}




