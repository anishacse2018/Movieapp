import React from 'react';
const MovieCard = ({movie}) =>{
  var s="https://image.tmdb.org/t/p/w500";
  return(
    <div className="movie" key={movie.id}>
        <div>{movie.release_date}</div>
      
        <div>
        <img src={movie.poster_path !== null ? s+movie.poster_path : "https://via.placeholder.com/400"} alt={movie.title} />
      </div>

      <div>
        <span>{movie.vote_average}</span>
        <h3>{movie.title}</h3>
      </div>
    </div>
  )
}
export default MovieCard;