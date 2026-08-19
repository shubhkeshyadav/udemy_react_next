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
/*
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
]; 


 const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
]; */

const tempWatchedData = [];

const TempComp = () => {
  const [rating,setRating] = useState(0);
  return <div>
    <StarRating maxRating={3} onSetRating={setRating}/>
    <p>Thi movie was rated {rating} on IMDB</p>
  </div>
}

const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
async function getMovies(url,controller){

  //try{
    const apiObj  = await fetch(url,{signal:controller.signal});
    if(!apiObj.ok){
      throw new Error("Error Somethingwent wrong");
    } 
    const fData =  await apiObj.json();
    
    return fData;
  /* }catch(error){
     throw new Error(error);
  } */



}

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  //const [selectedMovie, setSelectedMovie] = useState(null);
  const [query, setQuery] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);

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
                  if(selectedMovie){
                    handeMovieClose(); // clode rhs move while searching new movie
                  }
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

  const handeMovieSelect = (movieId) => {
    setSelectedMovie(()=>movieId);
  }

  const handeMovieClose = () => {
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

