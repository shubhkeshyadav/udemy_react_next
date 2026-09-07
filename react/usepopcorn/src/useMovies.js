import React from 'react';
import { useState,useEffect } from 'react';

const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
async function getMovies(url,controller){
    const apiObj  = await fetch(url,{signal:controller.signal});
    if(!apiObj.ok){
      throw new Error("Error Somethingwent wrong");
    } 
    const fData =  await apiObj.json();
    return fData;
}

export const useMovies = (query,cb) => {
  const [isError, setIsError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [movies, setMovies] = useState([]);

  const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;



    useEffect(()=>{
  const controller = new AbortController();

    setIsError("");
    setShowLoader(false);
        
        const loadData = async () => {

        try{

                setShowLoader(true);

                if(query.length < 3){
                  throw new Error("Movie not found!!");
                }

                const moviesDt = await getMovies(url,controller);
                if(moviesDt){
                  if(moviesDt.Response === 'False'){
                    throw new Error("Movie not found!!");
                  }   
                  cb?.(); // close rhs move while searching new movie
                  setMovies(()=>moviesDt.Search);
                  setShowLoader(()=>false);
                }
          }
          catch(err){
            if(err.name!='AbortError'){
              setIsError(err.message);
              setShowLoader(false);
            }
          }
        }
        loadData();
        return function(){
          controller.abort();
        }

    },[query]);
    return {showLoader,isError,movies};
}