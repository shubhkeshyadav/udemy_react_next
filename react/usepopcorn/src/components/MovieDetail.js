import React from 'react'

const MovieDetail = ({selectedMovie,onMovieClose}) => {
  return (
    <div className='details'>
        <button class="btn-back" onClick={onMovieClose}>&larr;</button>
        {selectedMovie}
    </div>
  )
}

export default MovieDetail