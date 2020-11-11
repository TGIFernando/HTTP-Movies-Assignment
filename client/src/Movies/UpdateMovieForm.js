import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'



const initialFormValues = {
    id: 10000,
    title: '',
    director: '',
    metascore: 10000,
    stars: [],
}
const UpdateMovieForm = (props) => {
    const [currentMovie, setCurrentMoive] = useState(initialFormValues)
    const { id } = useParams()
    const { push } = useHistory()

    // const movie = props.movieList.filter(movie => movie.id == id)
    // console.log('movie: ', movie)
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setCurrentMoive(res.data)
            }).catch(err => {
                console.log(err)
            })
    },[id])

    const onChange = e => {
        setCurrentMoive({...currentMovie, [e.target.name]: e.target.value})
        console.log(currentMovie)
    }

    const onSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, currentMovie)
            .then(res => {
                console.log(res.data)
                props.setMovieList(
                    props.movieList.map(item => {
                        if (item.id === Number(id)){
                            return res.data
                        }else{
                            return item
                        }
                    })
                )
                push('/')
            }).catch(err => {
                console.log(err)
            })

    }
    return(
        <h1>
            <form onSubmit={onSubmit}>
                <label>Title: </label>
                <input onChange={onChange} value={currentMovie.title} name='title' type='text'/>
                <label>Director: </label>
                <input onChange={onChange} value={currentMovie.director} name='director' type='text'/>
                <label>Meta Score: </label>
                <input onChange={onChange} value={currentMovie.metascore} name='metascore' type='number'/>
                {/* <label>Stars: </label>
                <input onChange={onChange} value={currentMovie.stars} name='stars' type='text'/> */}
                <button>Submit Changes</button>
            </form>
        </h1>
    )
}

export default UpdateMovieForm