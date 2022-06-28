import axios from 'axios';
import {  useState } from 'react';
import { FetchState, likesData, songData,} from '../types';


export function useGetSongs() {

  const [fetchState, setFetchState] = useState(FetchState.DEFAULT);
  const [songs, setSongs] = useState<Array<songData>>([]);
  const [likes, setLikes] = useState<Array<likesData>>([]);


  const getSongs = async () => {
    try {
      setFetchState(FetchState.LOADING);

      const res = await axios.get('https://api-stg.jam-community.com/song/trending');
      const resData = res.data as Array<songData>;

      setSongs(resData);
      setFetchState(FetchState.SUCCESS);
    } catch (err) {
      setFetchState(FetchState.ERROR);
    }
  };

  const postLikes = async (id:string) => {
    try {
      setFetchState(FetchState.LOADING);
      const formData = new FormData();
      formData.append('id',id)

      const res = await axios.post(`https://api-stg.jam-community.com/interact/like?apikey=${process.env.REACT_APP_API_KEY}`,formData,{
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
          }
      });
     
      const resData = res.data as Array<likesData>;

      setLikes(resData);
      setFetchState(FetchState.SUCCESS);
    } catch (err) {
      setFetchState(FetchState.ERROR);
    }
  };
  return [songs, fetchState, getSongs,likes,postLikes] as const;
}