import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';

import UpdateMovieForm from './Movies/UpdateMovieForm'
import AddMoive from './Movies/Add-Movie'
import AddMovie from "./Movies/Add-Movie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Link to='/add-movie'>ADD A MOVIE</Link>

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setMovieList={setMovieList} movieList={movieList}/>
      </Route>

      <Route 
        path="/update-movie/:id"
        render={props => <UpdateMovieForm {...props} movieList={movieList} setMovieList={setMovieList}/>}
      />

      <Route path="/add-movie">
        <AddMovie setMovieList={setMovieList} movieList={movieList}/>
      </Route>
       
    </>
  );
};

export default App;
