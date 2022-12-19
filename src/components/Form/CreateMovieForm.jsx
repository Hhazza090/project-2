import { useState } from 'react';
import { Grid, Button, TextField } from '@mui/material';
import axios from 'axios';

export const CreateMovieForm = ({setMovies}) => {

    const [movieData, setMovieData] = useState({
        title: '',
        director: '',
        releaseYear: '',
        contentRating: '',
        runTime: '',
        writers: ['', '', ''],
        actors: ['', '', ''],
        imageURL: '',
        description: ''
    });

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(movieData);
        await axios.post(`${process.env.REACT_APP_GATEWAY_URI}/${process.env.REACT_APP_GATEWAY_RESOURCE}`, movieData);
        setMovies(movies => [...movies, movieData]);
        handleClear();
    }

    const handleClear = e => {
        e?.preventDefault();
        setMovieData({
            title: '',
            director: '',
            releaseYear: '',
            contentRating: '',
            runTime: '',
            writers: ['', '', ''],
            actors: ['', '', ''],
            imageURL: '',
            description: ''
        });
    }

    return (
        <form onSubmit={handleSubmit} style={{backgroundColor: 'light-gray'}}>
            <Grid container justifyContent="center">
                <Grid item>
                    <h2>Create a Movie!</h2>
                </Grid>
            </Grid>
            <Grid container gap={'15px'} sx={{margin: '20px 0px'}} justifyContent={"space-between"}>
                <Grid item xs={6}>
                    <TextField size="small" label="Movie Title" variant="filled" fullWidth value={movieData.title} onChange={e => setMovieData({...movieData, title: e.target.value})}/>
                </Grid>
                <Grid item xs={5}>
                    <TextField size="small" label="Movie Director" variant="filled" fullWidth value={movieData.director} onChange={e => setMovieData({...movieData, director: e.target.value})}/>
                </Grid>
            </Grid>
            <Grid container gap={'15px'} sx={{margin: '20px 0px'}}>
                <Grid item>
                    <TextField size="small" label="Release Year" variant="filled" value={movieData.releaseYear} onChange={e => setMovieData({...movieData, releaseYear: e.target.value})}/>
                </Grid>
                <Grid item>
                    <TextField size="small" label="Run Time" variant="filled" value={movieData.runTime} onChange={e => setMovieData({...movieData, runTime: e.target.value})} />
                </Grid>
                <Grid item>
                    <TextField size="small" label="Content Rating" variant="filled" value={movieData.contentRating} onChange={e => setMovieData({...movieData, contentRating: e.target.value})} />
                </Grid>
            </Grid>
            <Grid container gap={'15px'} sx={{margin: '20px 0px'}}>
                <Grid item>
                    <TextField size="small" label="Actor 1" variant="filled" value={movieData.actors[0]} onChange={e => {const arr = movieData.actors; arr[0] = e.target.value; setMovieData({...movieData, actors: arr}) }} />
                </Grid>
                <Grid item>
                    <TextField size="small" label="Actor 2" variant="filled" value={movieData.actors[1]} onChange={e => {const arr = movieData.actors; arr[1] = e.target.value; setMovieData({...movieData, actors: arr}) }} />
                </Grid>
                <Grid item>
                    <TextField size="small" label="Actor 3" variant="filled" value={movieData.actors[2]} onChange={e => {const arr = movieData.actors; arr[2] = e.target.value; setMovieData({...movieData, actors: arr}) }} />
                </Grid>
            </Grid>
            <Grid container gap={'15px'} sx={{margin: '20px 0px'}}>
                <Grid item>
                    <TextField size="small" label="Writer 1" variant="filled" value={movieData.writers[0]} onChange={e => {const arr = movieData.writers; arr[0] = e.target.value; setMovieData({...movieData, writers: arr}) }} />
                </Grid>
                <Grid item>
                    <TextField size="small" label="Writer 2" variant="filled" value={movieData.writers[1]} onChange={e => {const arr = movieData.writers; arr[1] = e.target.value; setMovieData({...movieData, writers: arr}) }} />
                </Grid>
                <Grid item>
                    <TextField size="small" label="Writer 3" variant="filled" value={movieData.writers[2]} onChange={e => {const arr = movieData.writers; arr[2] = e.target.value; setMovieData({...movieData, writers: arr}) }} />
                </Grid>
            </Grid>
            <Grid container gap={'15px'} sx={{margin: '20px 0px'}}>
                <Grid item xs={12}>
                    <TextField size="small" label="Image URL" variant="filled" fullWidth value={movieData.imageURL} onChange={e => setMovieData({...movieData, imageURL: e.target.value})} />
                </Grid>
            </Grid>
            <Grid container gap={'15px'} sx={{margin: '20px 0px'}}>
                <Grid item xs={12}>
                    <TextField size="small" label="Description" variant="filled" fullWidth value={movieData.description} onChange={e => setMovieData({...movieData, description: e.target.value})} />
                </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
                <Grid item xs={4}>
                    <Button variant="outlined" type="button" onClick={handleClear} fullWidth>Clear</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="outlined" type="submit" fullWidth>Submit</Button>
                </Grid>
            </Grid>
            
        </form>
    );
}