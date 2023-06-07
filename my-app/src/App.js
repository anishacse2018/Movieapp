import {useState,useEffect,useRef} from 'react';
import './App.css';
import axios from 'axios';
import searchIcon from "./search.svg";
import MovieCard from './MovieCard';

//API Key - 7d257af52799a5d4d3fde6b0a30d981c
//Access Token - eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDI1N2FmNTI3OTlhNWQ0ZDNmZGU2YjBhMzBkOTgxYyIsInN1YiI6IjY0NzYzMWEyOTI0Y2U2MDEzM2IwYjA4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RoG5FxVg_npCwCzIV_GSUWSAjdhUiMGV480fIym993w
//Fetch All Movies - https://api.themoviedb.org/3/trending/movie/day?api_key=7d257af52799a5d4d3fde6b0a30d981c;
//Search Movies - https://api.themoviedb.org/3/search/movie?api_key=8846bf424bdab0c08ef0f9dd7b9b0985&query=\(query)
//Search ex: https://api.themoviedb.org/3/search/movie?api_key=8846bf424bdab0c08ef0f9dd7b9b0985&query=Spiderman
//Image Retrieval - https://image.tmdb.org/t/p/w500/hLVD7Ti8gvvk4kla3D52E5ngAjv.jpg - last part is poster path
function App() {
  const[searchTerm,setSearchTerm]=useState('');
  const[sm,setSm]=useState(false);
  const[fm,setFm]=useState(false);

  const[searchmovies,setSearchMovies]=useState([]);
  const [fetchmovies, setFetchmovies] = useState([]);
  const searchMovies = async(title)=>{
    
    if(title==""){
      fetchMovies();
      return;
    }
    const API_URL="https://api.themoviedb.org/3/search/movie?api_key=7d257af52799a5d4d3fde6b0a30d981c";
    
    const response = await axios.get(`${API_URL}&query=${title}`);
    const def = await response.data.results;
    setSearchMovies(def);
    setSm(true);
    setFm(false);
  }
  const fetchMovies = async()=>{
    try{
      await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=7d257af52799a5d4d3fde6b0a30d981c').then(
        (response)=>{
          const data =  response.data.results;
          console.log(data);
          setFetchmovies(data);
          console.log(fetchmovies);
          setFm(true);
          setSm(false);
        }
      )
    }catch(err){
       console.log(err);
    }
  }
  useEffect(()=>{
    fetchMovies();
    console.log(fetchmovies);
  },[]);
  return (
    <div className="App">
      <h1>MovieLand</h1>
      <div className='search'>
      <input value={searchTerm} placeholder='Search For Movies' onChange={(e)=>setSearchTerm(e.target.value)} onKeyDown={(event)=>{if(event.key=="Enter") searchMovies(searchTerm)}}  />
      <img src={searchIcon} alt="search"  onClick={()=>searchMovies(searchTerm)}/>
    
      </div>
      
       {fm ? 
       fetchmovies.length>0 ?(
       <div className="container">
        {
          fetchmovies.map((movie)=>(
                <MovieCard key={movie.id} movie={movie} />
          ))
        }
        </div>
       ):(<div className="empty">
        <h2>No Movies Found</h2>
       </div>):(<div></div>)}
       {sm?
       searchmovies.length>0 ?(
       <div className="container">
        {   
          searchmovies.map((movie)=>(
                <MovieCard movie={movie} key={movie.id}/>
          ))
        }
        </div>
       ):(<div className="empty">
        <h2>No Movies Found</h2>
       </div>):(<div></div>)}
     
    </div>
  );
}

export default App;
