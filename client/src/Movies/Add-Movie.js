import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovieForm = {
    id: 0,
    title: "",
    director: "",
    metascore: '',
    stars: []
}

const AddMovie = (props) => {
    const [addMovie, setAddMovie] = useState(initialMovieForm)
    const onChange = e => {
        setAddMovie({...addMovie, [e.target.name]: e.target.value})
    }
    const { push } = useHistory()

    const onSubmit = (e) => {
        e.preventDefault()
        axios
            .post('http://localhost:5000/api/movies', addMovie)
                .then(res => {
                    console.log(res)
                    setAddMovie(initialMovieForm)
                    props.setMovieList(res.data)
                    push("/")
                }).catch(err => console.log(err))
    }


    return(
        <div>
            <form onSubmit={onSubmit}>
            <input
                    type="text"
                    name="title"
                    onChange={onChange}
                    placeholder="title"
                    value={addMovie.title}
                >
                </input>
                <input
                    type="text"
                    name="director"
                    onChange={onChange}
                    placeholder="director"
                    value={addMovie.director}
                >
                </input>
                <input
                    type="text"
                    name="metascore"
                    onChange={onChange}
                    placeholder="metascore"
                    value={addMovie.metascore}
                >
                </input>
                <button>Submit Movie</button>
            </form>
        </div>
    )
} 

export default AddMovie