import { useState, useEffect } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import Header, { Title, Body } from './components/Header';
import { Movie as MovieCard } from './components/Cards';
import { DecoratedList } from './components/Lists';
import { Image } from './components/Image';
import { CreateMovieForm } from './components/Form';
// import movies from './utils/movies.example';
import axios from 'axios';

export const App = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_GATEWAY_URI}/${process.env.REACT_APP_GATEWAY_RESOURCE}`)
        .then(res => {console.log(res); setMovies(res.data.Items ?? [])} );
    }, []);

    return (
        <>
            <Grid container justifyContent="center">
                <Grid item>
                    {/* Please change the header title or body text to whatever you wish */}
                    <Header>
                        <Title>SkillStorm Movies</Title>
                        <Body>Movies delivered to you through the power of serverless computing!</Body>
                    </Header>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{margin: "30px 0px"}}>
                <Grid item>
                    <Card sx={{padding: '20px'}}>
                        <CreateMovieForm setMovies={setMovies}/>
                    </Card>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" spacing={2} sx={{padding: '5em 0'}}>
                {
                movies?.length > 0 
                ? movies?.map((movie) => {
                    return (
                        <Grid item>
                            <MovieCard>
                                <MovieCard.Title 
                                    title={movie.title || ''}
                                    subheader={
                                        <DecoratedList>
                                            {!!movie.releaseYear ? <DecoratedList.Item>{movie.releaseYear}</DecoratedList.Item> : null }
                                            {!!movie.contentRating ? <DecoratedList.Item decorated>{movie.contentRating}</DecoratedList.Item> : null}
                                            {!!movie.runTime ? <DecoratedList.Item decorated>{movie.runTime}</DecoratedList.Item> : null}
                                        </DecoratedList>
                                    }
                                />
                                <MovieCard.Body>
                                    <Grid container>
                                        <Grid item xs={10} sx={{padding: '0px 5px 0px 0px'}}>
                                            <Grid container direction="column" spacing="1em">
                                                <MovieCard.Description>
                                                    <Typography>
                                                        {movie.description || ''}
                                                    </Typography>
                                                </MovieCard.Description>
                                                <MovieCard.Description>
                                                    <hr/>
                                                    <DecoratedList>
                                                        <DecoratedList.Item><strong>{movie?.directors?.length > 1 || typeof movie.director != 'string' ? 'Directors' : 'Director'}</strong></DecoratedList.Item>
                                                        {typeof movie.director == 'string' ? 
                                                            <DecoratedList.Item>{movie.director}</DecoratedList.Item> : 
                                                        movie?.directors?.map((director, index) => {
                                                            return (
                                                                <DecoratedList.Item decorated={index !== 0}>{director}</DecoratedList.Item>
                                                            );
                                                        })}
                                                    </DecoratedList>
                                                </MovieCard.Description>
                                                <MovieCard.Description>
                                                    <hr/>
                                                    <DecoratedList>
                                                        <DecoratedList.Item><strong>{movie?.writers?.length > 1 ? 'Writers' : 'Writer'}</strong></DecoratedList.Item>
                                                        {movie?.writers?.map((writer, index) => {
                                                            return (
                                                                movie?.writers[index] ? <DecoratedList.Item decorated={index !== 0}>{writer}</DecoratedList.Item> : null
                                                            );
                                                        })}
                                                    </DecoratedList>
                                                </MovieCard.Description>
                                                <MovieCard.Description>
                                                    <hr/>
                                                    <DecoratedList>
                                                        <DecoratedList.Item><strong>{movie?.actors?.length > 1 ? 'Actors' : 'Actor'}</strong></DecoratedList.Item>
                                                        {movie?.actors?.map((actor, index) => {
                                                            return (
                                                                <DecoratedList.Item decorated={index !== 0}>{actor}</DecoratedList.Item>
                                                            );
                                                        })}
                                                    </DecoratedList>
                                                </MovieCard.Description>
                                            </Grid>
                                        </Grid>
                                        {!!movie.imageURL ? 
                                        <Grid item xs={2}>
                                            <Image src={movie.imageURL} width="100%"/>
                                        </Grid> :
                                        null}
                                    </Grid>
                                </MovieCard.Body>
                            </MovieCard>
                        </Grid>
                    );
                })
                : <MovieCard>
                    <Grid container justifyContent="center" textAlign="center">
                        <Grid item sx={{padding: '24px 5px 0px 0px'}}>
                            <MovieCard.Body>
                                <MovieCard.Description>
                                    <Typography sx={{maxWidth: '42vw', minWidth: '42vw'}}>
                                        Your DynamoDB table is currently empty! If you'd like to add a movie, ensure that your Lambdas and API Gateway have been properly configured and their respective endpoints have been added to the .env file. Once you've done that, use the form below to add any movies to your DynamoDB table!
                                    </Typography>
                                </MovieCard.Description>
                            </MovieCard.Body>
                        </Grid>
                    </Grid>
                </MovieCard>}
            </Grid>
        </>
    );
}