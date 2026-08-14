const NumResults = ({movies}) => {
   // console.log(movies.length);
   const totalMovies = movies?movies.length:0;
    return (
        <p className="num-results">
            Found <strong>{totalMovies}</strong> results
        </p>
    )
}

export default NumResults;
