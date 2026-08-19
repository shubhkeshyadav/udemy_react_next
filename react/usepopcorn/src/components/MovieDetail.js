import React, { useEffect, useState } from 'react'
import StarRating from './StarRating';
import Loader from './Loader';
/* import Loader from './Loader';
 */
const getMovieDetail = async (movieId) => {
  try{
    const url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&i=${movieId}`
    const qry = await fetch(url);
    const data = await qry.json();
    return data;
  }
  catch(error){
    throw error;
  }
}

const MovieDetail = ({selectedMovie,onMovieClose,onAddWatch,watched}) => {
  const [movie,setMovie] = useState({});
  const[isLoading,setIsLoading] = useState(false);
  const[userRating,setUserRating] = useState(0);

  let userGivenRating = 0;
  if(watched.length > 0){
    watched.map((obj)=>{
      if(obj.imdbID ===selectedMovie){
        userGivenRating = obj.userRating;
      }
    });
  }
  //if(watched.length)
  /* let userGivenRating = 0;
  let isWatched = false;
  if(watched.length > 0){
    isWatched = watched.map((obj)=>obj.imdbID.includes(selectedMovie));
    if(isWatched){
      userGivenRating = watched.find((obj)=>obj.imdbID === selectedMovie)?.userRating;
    }
  } */

     useEffect(()=>{
       const cb = (e) => {
          if(e.code == 'Escape'){
            onMovieClose();
            console.log('here==>');
          }
       }
        document.addEventListener('keydown',cb);

        return ()=>{
          document.removeEventListener('keydown',cb);
        }
      },[]);

  const {
    Title     : title,
    Year      : year,
    Poster    : poster,
    Runtime   : runtime,
    Plot      : plot,
    Released  : released,
    Actors    : actors,
    Director  : director,
    Genre     : genre,
    imdbRating,
  } = movie;
  useEffect(()=>{
    (async () => {
      try{
        setIsLoading(true);
        const detail = await getMovieDetail(selectedMovie);
        setMovie(()=>detail);
        setIsLoading(false);
      }
      catch(err){
        console.log(err.message);
      }
    })();
  },[selectedMovie]);

  const handleAddWatch = () => {
    const newArr = 
      {
        imdbID: selectedMovie,
        Title: title,
        Year: year,
        Poster:poster,
        runtime: Number(runtime.split(" ").at(0)),
        imdbRating: imdbRating,
        userRating: userRating,
    }
    onAddWatch(newArr);
  }

  const onUserRating = (userRating) => {
    setUserRating(()=>userRating);
  }

  useEffect(()=>{
    if(!title)return;
    document.title = title;

    return function(){
      document.title="usePopcorn";
    }

  },[title]);

  return (
    <div className='details'>
          {(isLoading) ? 
          <Loader/>:
            <>
              <header>
                  <button className="btn-back" onClick={onMovieClose}>
                    &larr;
                  </button>
                  <img src={poster} alt={`Poster of ${movie} movie`} />
                  <div className="details-overview">
                    <h2>{title}</h2>
                    <p>
                      {released} &bull; {runtime}
                    </p>
                    <p>{genre}</p>
                    <p>
                      <span>⭐️</span>
                      {imdbRating} IMDb rating
                    </p>
                    <p>{plot}</p>
                  </div>
              </header>

              <section>
                <div className='rating'>
                  {userGivenRating <=0 && 
                    <StarRating defaultRating={userGivenRating} maxRating={10} size={27} onSetRating={onUserRating}/>
                  }
                  {
                  (userGivenRating <= 0 && userRating  > 0) &&
                    <button className='btn-add' onClick={handleAddWatch}>+ Add to list</button>
                  }

                  {userGivenRating > 0 &&
                  <>
                    <p>You rated this movie : {userGivenRating} * </p>
                  </>
                  }

                  
                  
                  {/* {userGivenRating > 0 &&} */}
                </div>
                <p><em>{plot}</em></p>
                <p>Strring {actors}</p>
                <p>Directed by {director}</p>
              </section>
            </>
          }

    </div>
  )
}

export default MovieDetail