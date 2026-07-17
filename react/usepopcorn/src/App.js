import { useState } from "react";
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
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const TempComp = () => {
  const [rating,setRating] = useState(0);
  return <div>
    <StarRating maxRating={3} onSetRating={setRating}/>
    <p>Thi movie was rated {rating} on IMDB</p>
  </div>
}

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
    <StarRating size={48} maxRating={5} messages={['Terrible',"Bad","Okay","Good","Amazing"]} className={'testClassName'}/>
    <StarRating size={40} maxRating={5} color={"blue"}/>
    <StarRating maxRating={5} color={"green"}/>
    <StarRating maxRating={5} color={"red"}/>
    <StarRating maxRating={5} color={"purple"}/>
    <TempComp/>
      {/* <NavBar>
        <Search/>
        <NumResults movies={movies}/>
      </NavBar>
      <MainComp>
            <ListBox>
                <MovieListBox movies={movies}/>
            </ListBox>
            <ListBox>
              <WatchedSummary/>        
              <WatchedMovieList watched={watched}/> 
            </ListBox>
      </MainComp> */}
    </>
  );
}
export const MainComp = ({children}) => {
  return (
          <main className="main">
            {children}
          </main>
        )
}

