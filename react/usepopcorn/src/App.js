import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import MovieListBox from "./components/MovieListBox";
// import MovieWatchedListBox from "./components/MovieWatchedListBox";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import ListBox from "./components/ListBox";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import StarRating from "./components/StarRating";
import TextExpand from "./components/TextExpand";
import MovieDetail from "./components/MovieDetail";
import Loader from "./components/Loader";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useTest } from "./useTest";
const TempComp = () => {
  const [rating,setRating] = useState(0);
  return <div>
    <StarRating maxRating={3} onSetRating={setRating}/>
    <p>Thi movie was rated {rating} on IMDB</p>
  </div>
}



export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [query, setQuery] = useState("train");
  const [watched, setWatched] = useLocalStorageState([],'watched_data');
  const {showLoader,isError,movies} = useMovies(query,handeMovieClose);
  const {newNo} = useTest(5);

  /* useEffect(()=>{
    localStorage.setItem("watched_data", JSON.stringify(watched));
  },[watched]); */

  const handeMovieSelect = (movieId) => {
    setSelectedMovie(()=>movieId);
  }

  function handeMovieClose(){
    setSelectedMovie(false);
  }

  const handleAddWatch = (movie) => {
    setWatched((old)=>[...old,movie]);
    handeMovieClose();
  } 

  const handleDeleteWatch = (movieId) => {
    setWatched((movies)=>movies.filter((m)=>m.imdbID!=movieId));
  }

  return (
    <>
    {/* <StarRating maxRating={"5"} messages={['Terrible',"Bad","Okay","Good","Amazing"]} className={'testClassName'}/>
    <TempComp /> */}
    {/* <TextExpand/> */}
      <NavBar>
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </NavBar>
      <MainComp>
            <ListBox>
                {showLoader && <Loader/>}
                 {!showLoader && !isError && <MovieListBox handeMovieSelect={handeMovieSelect} movies={movies}/>}
                 {isError && <ErrorMsg msg={isError}/>}
            </ListBox>
            <ListBox>
              {selectedMovie ? 
                  <MovieDetail watched={watched} selectedMovie={selectedMovie} onMovieClose={handeMovieClose} onAddWatch={handleAddWatch}/>:
                <>
                  <WatchedSummary watched={watched}/>        
                  <WatchedMovieList watched={watched} onDeleteWatch={handleDeleteWatch}/>
                </>
              }
            </ListBox>
      </MainComp>
    </>
  );
}


const ErrorMsg = ({msg}) => {
  return <p className="error">⛔️{msg}</p>;
}

export const MainComp = ({children}) => {
  return (
          <main className="main">
            {children}
          </main>
        )
}

