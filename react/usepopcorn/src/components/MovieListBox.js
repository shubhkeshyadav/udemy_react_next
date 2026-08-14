import React from 'react'

const MovieListBox = ({movies,handeMovieSelect}) => {
  return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
            <li style={{cursor:'pointer'}} onClick={()=>handeMovieSelect(movie.imdbID)} key={movie.imdbID}>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
                <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
                </div>
            </li>
            ))}
        </ul>
  )
}

export default MovieListBox