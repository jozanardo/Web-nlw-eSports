import './styles/main.css';
import * as Dialog from "@radix-ui/react-dialog"
import LogoImg from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { useState, useEffect } from 'react';
import { CreateAdModal } from './components/createAdModal';
import axios from 'axios'

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:8080/games')
      .then(response => {
        setGames(response.data)
      })
  },[])

  return (
      
      <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
        <img src={LogoImg} alt=""/>

        <h1 className="text-6xl text-white font-black mt-20 ">
          Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
        </h1>
        
        <div className="grid grid-flow-col auto-cols-[15.15%] gap-6 overflow-x-auto mt-16 pb-6 scrollbar-thin scrollbar-thumb-violet-500 scrollbar-track-violet-200">
          {games.map(game => {
            return (
              <GameBanner 
                key={game.id} 
                id={game.id}
                bannerUrl={game.bannerUrl} 
                title={game.title} 
                adsCount={game._count.ads}/>
            )
          })} 
        </div>    
        
        <Dialog.Root>
          <CreateAdBanner />
          <CreateAdModal />
          
        </Dialog.Root>
      </div>
  )
}

export default App
