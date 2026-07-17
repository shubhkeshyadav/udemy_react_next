const NumResults = ({movies}) => {
   // console.log(movies.length);
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    )
}

export default NumResults;
