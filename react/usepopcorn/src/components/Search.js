export default function Search({query,setQuery}){
    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    return <>
        <input value={query} onChange={handleChange} className="search" type="text" placeholder="Search movies..."/>
    </>
}