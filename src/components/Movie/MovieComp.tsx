import React from 'react'
import IMovie from '../../Interfaces/IMovie';
import { MdDelete, MdEdit } from "react-icons/md";
import "./movie.css"

interface Props{
  movie:IMovie;
    setIsEdit:(arg0: boolean)=>void;
    onOpen:()=>void;
    setMovieData:(arg0:IMovie)=>void;
    handleDelete:(arg0:string|undefined)=>void
}


const MovieComp :React.FC<Props>= ({movie,setIsEdit,setMovieData,onOpen,handleDelete}) => {
  return (
    <div className="movieComp" key={movie._id}>
                  <div className="LeftContainer">
                    <span>Name: {movie.Title}</span>
                    <span>App: {movie.StreamingApp}</span>
                    <span>Rating: {movie.Rating}</span>
                  </div>
                  <div className="RightContainer">
                    <button
                      className="EditButton"
                      onClick={() => {
                        setIsEdit(true);
                        setMovieData(movie);
                        onOpen();
                      }}
                    >
                      Edit <MdEdit />
                    </button>
                    <button
                      className="DeleteButton"
                      onClick={() => {
                        handleDelete(movie?._id);
                      }}
                    >
                      Delete <MdDelete />
                    </button>
                  </div>
                </div>
  )
}

export default MovieComp