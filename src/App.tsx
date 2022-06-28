import { useEffect } from 'react';
import './App.scss';
import { useGetSongs } from './lib/api-hooks';
import { FetchState } from './types';
import Player from './components/Player/Player';
import Header from './components/Header/Header';

function App() {

  const [songs, fetchState, getSongs, likes, postLikes] = useGetSongs();

  useEffect(() => {
    getSongs();
  }, []);

  console.log(songs);
  return (
    <>
      <Header />
      <div className="container">
       
        {fetchState === FetchState.LOADING && <p>Fetching songs...</p>}
        {fetchState === FetchState.ERROR && (
          <>
            <p>Oops! Something went wrong. Please try again.</p>
          </>
        )}
        {fetchState === FetchState.SUCCESS && (
          <>
            <Player songs={songs} postLikes={postLikes} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
